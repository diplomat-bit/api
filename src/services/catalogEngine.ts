import {
  WorkbenchCatalog,
  CatalogItem,
  HttpRequestItem,
  ScriptRunnerItem,
  DatasetItem,
  WorkflowItem,
  ExecutionResult,
  ValidationIssue
} from '../types/catalog';

/**
 * Replace {{variableName}} with corresponding value from variables map
 */
export function resolveVariables(text: string, variables: Record<string, string>): string {
  if (!text) return '';
  return text.replace(/\{\{\s*([a-zA-Z0-9_-]+)\s*\}\}/g, (_, key) => {
    return variables[key] !== undefined ? variables[key] : `{{${key}}}`;
  });
}

/**
 * Execute HTTP Request
 */
export async function executeHttpRequest(
  item: HttpRequestItem,
  variables: Record<string, string>
): Promise<ExecutionResult> {
  const startTime = performance.now();
  const logs: string[] = [];

  let resolvedUrl = resolveVariables(item.url, variables);

  // Append query params if present
  if (item.params && Object.keys(item.params).length > 0) {
    const urlObj = new URL(
      resolvedUrl.startsWith('http') ? resolvedUrl : `http://localhost${resolvedUrl.startsWith('/') ? '' : '/'}${resolvedUrl}`
    );
    Object.entries(item.params).forEach(([k, v]) => {
      urlObj.searchParams.set(k, resolveVariables(v, variables));
    });
    resolvedUrl = resolvedUrl.startsWith('http') ? urlObj.toString() : `${urlObj.pathname}${urlObj.search}`;
  }

  // Resolve headers
  const resolvedHeaders: Record<string, string> = {};
  if (item.headers) {
    Object.entries(item.headers).forEach(([k, v]) => {
      resolvedHeaders[k] = resolveVariables(v, variables);
    });
  }

  // Resolve body
  let resolvedBody: string | undefined = undefined;
  if (item.body && ['POST', 'PUT', 'PATCH'].includes(item.method)) {
    resolvedBody = resolveVariables(item.body, variables);
  }

  logs.push(`[HTTP] Initiating ${item.method} ${resolvedUrl}`);
  if (Object.keys(resolvedHeaders).length > 0) {
    logs.push(`[Headers] ${JSON.stringify(resolvedHeaders)}`);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(resolvedUrl, {
      method: item.method,
      headers: resolvedHeaders,
      body: resolvedBody,
      signal: controller.signal
    });
    clearTimeout(timeout);

    const durationMs = Math.round(performance.now() - startTime);
    const contentType = res.headers.get('content-type') || '';
    let responseData: any;

    if (contentType.includes('application/json')) {
      responseData = await res.json();
    } else {
      responseData = await res.text();
    }

    logs.push(`[HTTP Response] Status ${res.status} ${res.statusText} (${durationMs}ms)`);

    const isSuccess = item.expectedStatus ? res.status === item.expectedStatus : res.ok;

    return {
      itemId: item.id,
      timestamp: new Date().toISOString(),
      durationMs,
      status: isSuccess ? 'SUCCESS' : 'ERROR',
      statusCode: res.status,
      data: responseData,
      logs,
      resolvedRequest: {
        url: resolvedUrl,
        method: item.method,
        headers: resolvedHeaders,
        body: resolvedBody
      }
    };
  } catch (err: any) {
    const durationMs = Math.round(performance.now() - startTime);
    logs.push(`[Fetch Warning] ${err.name === 'AbortError' ? 'Request timed out after 8s' : err.message}`);

    // If browser CORS or network restricted, fallback safely to mock response if provided
    if (item.mockResponse) {
      logs.push(`[Sandbox Fallback] Returning catalog mockResponse payload for offline simulation.`);
      return {
        itemId: item.id,
        timestamp: new Date().toISOString(),
        durationMs,
        status: 'SUCCESS',
        statusCode: item.expectedStatus || 200,
        data: item.mockResponse,
        logs,
        resolvedRequest: {
          url: resolvedUrl,
          method: item.method,
          headers: resolvedHeaders,
          body: resolvedBody
        }
      };
    }

    return {
      itemId: item.id,
      timestamp: new Date().toISOString(),
      durationMs,
      status: 'ERROR',
      statusCode: 0,
      error: err.message,
      logs,
      resolvedRequest: {
        url: resolvedUrl,
        method: item.method,
        headers: resolvedHeaders,
        body: resolvedBody
      }
    };
  }
}

/**
 * Execute Script Runner
 */
export async function executeScript(
  item: ScriptRunnerItem,
  variables: Record<string, string>,
  customInputs?: any
): Promise<ExecutionResult> {
  const startTime = performance.now();
  const logs: string[] = [];

  const inputs = customInputs !== undefined ? customInputs : (item.inputs || {});

  // Custom logging sink
  const virtualConsole = {
    log: (...args: any[]) => logs.push(`[Log] ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}`),
    info: (...args: any[]) => logs.push(`[Info] ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}`),
    warn: (...args: any[]) => logs.push(`[Warn] ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}`),
    error: (...args: any[]) => logs.push(`[Error] ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}`)
  };

  try {
    logs.push(`[Script] Executing ${item.language} script: "${item.name}"`);
    logs.push(`[Inputs] ${JSON.stringify(inputs).substring(0, 120)}${JSON.stringify(inputs).length > 120 ? '...' : ''}`);

    // Create execution scope
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const scriptFunc = new Function('inputs', 'console', 'env', item.code);
    const result = scriptFunc(inputs, virtualConsole, variables);

    // If promise returned
    const finalData = result instanceof Promise ? await result : result;
    const durationMs = Math.round(performance.now() - startTime);

    logs.push(`[Script Result] Completed successfully in ${durationMs}ms`);

    return {
      itemId: item.id,
      timestamp: new Date().toISOString(),
      durationMs,
      status: 'SUCCESS',
      statusCode: 200,
      data: finalData,
      logs
    };
  } catch (err: any) {
    const durationMs = Math.round(performance.now() - startTime);
    logs.push(`[Runtime Exception] ${err.message}`);

    return {
      itemId: item.id,
      timestamp: new Date().toISOString(),
      durationMs,
      status: 'ERROR',
      statusCode: 500,
      error: err.message || String(err),
      logs
    };
  }
}

/**
 * Execute Dataset query/filter
 */
export async function executeDatasetQuery(
  item: DatasetItem,
  queryFilter?: string
): Promise<ExecutionResult> {
  const startTime = performance.now();
  const logs: string[] = [];

  const query = (queryFilter !== undefined ? queryFilter : (item.query || '')).trim();
  logs.push(`[Dataset] Querying ${item.name} (${item.records.length} base rows)`);

  try {
    let filtered = [...item.records];

    if (query) {
      logs.push(`[Filter Clause] ${query}`);

      // Basic SQL-like or condition matching: e.g. "mrr_usd > 5000" or "company contains Solar" or text search
      if (query.includes('>')) {
        const [field, val] = query.split('>').map(s => s.trim().replace(/^where/i, '').trim());
        const num = parseFloat(val);
        filtered = filtered.filter(row => Number(row[field]) > num);
      } else if (query.includes('<')) {
        const [field, val] = query.split('<').map(s => s.trim().replace(/^where/i, '').trim());
        const num = parseFloat(val);
        filtered = filtered.filter(row => Number(row[field]) < num);
      } else if (query.includes('=')) {
        const [field, val] = query.split('=').map(s => s.trim().replace(/^where/i, '').replace(/['"]/g, '').trim());
        filtered = filtered.filter(row => String(row[field]).toLowerCase() === val.toLowerCase());
      } else {
        // Free text search across all columns
        const term = query.toLowerCase();
        filtered = filtered.filter(row =>
          Object.values(row).some(v => String(v).toLowerCase().includes(term))
        );
      }
    }

    const durationMs = Math.round(performance.now() - startTime);
    logs.push(`[Dataset Result] Matched ${filtered.length} of ${item.records.length} records (${durationMs}ms)`);

    return {
      itemId: item.id,
      timestamp: new Date().toISOString(),
      durationMs,
      status: 'SUCCESS',
      statusCode: 200,
      data: {
        rowCount: filtered.length,
        totalRows: item.records.length,
        records: filtered,
        columns: item.columns
      },
      logs
    };
  } catch (err: any) {
    const durationMs = Math.round(performance.now() - startTime);
    return {
      itemId: item.id,
      timestamp: new Date().toISOString(),
      durationMs,
      status: 'ERROR',
      statusCode: 400,
      error: err.message,
      logs
    };
  }
}

/**
 * Execute Workflow / Pipeline Step-by-Step
 */
export async function executeWorkflow(
  workflow: WorkflowItem,
  catalog: WorkbenchCatalog,
  variables: Record<string, string>,
  onStepProgress?: (stepNum: number, result: ExecutionResult) => void
): Promise<ExecutionResult> {
  const startTime = performance.now();
  const logs: string[] = [];
  const stepResults: { step: number; targetId: string; action: string; result: ExecutionResult }[] = [];

  logs.push(`[Workflow] Beginning execution of pipeline: "${workflow.name}" (${workflow.steps.length} steps)`);

  let pipelineFailed = false;

  for (const step of workflow.steps) {
    const targetItem = catalog.items.find(i => i.id === step.targetId);
    logs.push(`[Step ${step.step}] Starting: ${step.action} (Target: ${step.targetId})`);

    let result: ExecutionResult;

    if (!targetItem) {
      result = {
        itemId: step.targetId,
        timestamp: new Date().toISOString(),
        durationMs: 0,
        status: 'ERROR',
        error: `Target item "${step.targetId}" not found in catalog.`,
        logs: [`[Workflow Error] Target item "${step.targetId}" missing.`]
      };
    } else {
      result = await executeCatalogItem(targetItem, catalog, variables);
    }

    stepResults.push({
      step: step.step,
      targetId: step.targetId,
      action: step.action,
      result
    });

    if (onStepProgress) {
      onStepProgress(step.step, result);
    }

    logs.push(`[Step ${step.step}] Finished with status: ${result.status} (${result.durationMs}ms)`);

    if (result.status === 'ERROR') {
      if (step.stopOnFailure !== false) {
        pipelineFailed = true;
        logs.push(`[Workflow Halted] Step ${step.step} failed and stopOnFailure is true.`);
        break;
      } else {
        logs.push(`[Workflow Warning] Step ${step.step} failed but continuing pipeline.`);
      }
    }
  }

  const durationMs = Math.round(performance.now() - startTime);

  return {
    itemId: workflow.id,
    timestamp: new Date().toISOString(),
    durationMs,
    status: pipelineFailed ? 'ERROR' : 'SUCCESS',
    statusCode: pipelineFailed ? 500 : 200,
    data: {
      workflowName: workflow.name,
      stepsCompleted: stepResults.length,
      totalSteps: workflow.steps.length,
      steps: stepResults
    },
    logs
  };
}

/**
 * Universal Item Dispatcher
 */
export async function executeCatalogItem(
  item: CatalogItem,
  catalog: WorkbenchCatalog,
  variables: Record<string, string>
): Promise<ExecutionResult> {
  switch (item.type) {
    case 'http_request':
      return executeHttpRequest(item, variables);
    case 'script_runner':
      return executeScript(item, variables);
    case 'dataset':
      return executeDatasetQuery(item);
    case 'workflow':
      return executeWorkflow(item, catalog, variables);
    case 'geo_layer':
      return {
        itemId: item.id,
        timestamp: new Date().toISOString(),
        durationMs: 12,
        status: 'SUCCESS',
        statusCode: 200,
        data: {
          pointsCount: item.points.length,
          points: item.points
        },
        logs: [`[Geo Layer] Rendered ${item.points.length} nodes across global regions.`]
      };
    case 'chart_model':
      return {
        itemId: item.id,
        timestamp: new Date().toISOString(),
        durationMs: 8,
        status: 'SUCCESS',
        statusCode: 200,
        data: {
          chartType: item.chartType,
          datapoints: item.series.length,
          series: item.series
        },
        logs: [`[Chart Model] Processed ${item.series.length} data series points.`]
      };
    default:
      return {
        itemId: (item as any).id || 'unknown',
        timestamp: new Date().toISOString(),
        durationMs: 0,
        status: 'ERROR',
        error: `Unsupported catalog item type: ${(item as any).type}`,
        logs: [`[Error] Unsupported catalog item type`]
      };
  }
}

/**
 * Validate Workbench Catalog JSON
 */
export function validateCatalog(catalog: any): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!catalog || typeof catalog !== 'object') {
    issues.push({ type: 'error', path: 'root', message: 'Catalog must be a valid JSON object.' });
    return issues;
  }

  if (!catalog.id) {
    issues.push({ type: 'error', path: 'id', message: 'Missing root "id" property.' });
  }
  if (!catalog.name) {
    issues.push({ type: 'error', path: 'name', message: 'Missing root "name" property.' });
  }
  if (!catalog.version) {
    issues.push({ type: 'warning', path: 'version', message: 'No catalog "version" specified (e.g. "1.0.0").' });
  }
  if (!Array.isArray(catalog.items)) {
    issues.push({ type: 'error', path: 'items', message: '"items" must be an array of catalog entries.' });
  } else {
    const itemIds = new Set<string>();
    catalog.items.forEach((item: any, idx: number) => {
      const path = `items[${idx}]`;
      if (!item.id) {
        issues.push({ type: 'error', path: `${path}.id`, message: 'Item missing unique "id".' });
      } else if (itemIds.has(item.id)) {
        issues.push({ type: 'error', path: `${path}.id`, message: `Duplicate item id "${item.id}".` });
      } else {
        itemIds.add(item.id);
      }

      if (!item.name) {
        issues.push({ type: 'error', path: `${path}.name`, message: 'Item missing "name".' });
      }
      if (!item.type) {
        issues.push({ type: 'error', path: `${path}.type`, message: 'Item missing "type".' });
      } else if (!['http_request', 'script_runner', 'dataset', 'geo_layer', 'chart_model', 'workflow'].includes(item.type)) {
        issues.push({ type: 'warning', path: `${path}.type`, message: `Non-standard item type "${item.type}".` });
      }

      if (item.type === 'http_request') {
        if (!item.url) {
          issues.push({ type: 'error', path: `${path}.url`, message: 'HTTP item requires a "url" property.' });
        }
        if (!item.method) {
          issues.push({ type: 'warning', path: `${path}.method`, message: 'HTTP item missing "method", defaulting to GET.' });
        }
      }

      if (item.type === 'script_runner') {
        if (!item.code) {
          issues.push({ type: 'error', path: `${path}.code`, message: 'Script runner item requires executable "code".' });
        }
      }

      if (item.type === 'workflow') {
        if (!Array.isArray(item.steps) || item.steps.length === 0) {
          issues.push({ type: 'error', path: `${path}.steps`, message: 'Workflow requires at least one step.' });
        }
      }
    });
  }

  return issues;
}
