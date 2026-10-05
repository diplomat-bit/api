export type CatalogItemType =
  | 'http_request'
  | 'script_runner'
  | 'dataset'
  | 'geo_layer'
  | 'chart_model'
  | 'workflow';

export interface BaseCatalogItem {
  id: string;
  name: string;
  category: string;
  type: CatalogItemType;
  description: string;
  tags?: string[];
}

export interface HttpRequestItem extends BaseCatalogItem {
  type: 'http_request';
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: string;
  expectedStatus?: number;
  mockResponse?: any;
}

export interface ScriptRunnerItem extends BaseCatalogItem {
  type: 'script_runner';
  language: 'javascript' | 'typescript' | 'python_sim';
  code: string;
  inputs?: any;
}

export interface DatasetColumn {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  label?: string;
}

export interface DatasetItem extends BaseCatalogItem {
  type: 'dataset';
  columns: DatasetColumn[];
  records: Record<string, any>[];
  query?: string;
}

export interface GeoPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  latency_ms?: number;
  load_pct?: number;
  status?: string;
  region?: string;
  [key: string]: any;
}

export interface GeoLayerItem extends BaseCatalogItem {
  type: 'geo_layer';
  points: GeoPoint[];
}

export interface ChartSeriesPoint {
  time?: string;
  label?: string;
  [key: string]: any;
}

export interface ChartModelItem extends BaseCatalogItem {
  type: 'chart_model';
  chartType: 'timeseries' | 'bar' | 'distribution';
  series: ChartSeriesPoint[];
}

export interface WorkflowStep {
  step: number;
  targetId: string;
  action: string;
  stopOnFailure?: boolean;
}

export interface WorkflowItem extends BaseCatalogItem {
  type: 'workflow';
  steps: WorkflowStep[];
}

export type CatalogItem =
  | HttpRequestItem
  | ScriptRunnerItem
  | DatasetItem
  | GeoLayerItem
  | ChartModelItem
  | WorkflowItem;

export interface WorkbenchCatalog {
  id: string;
  name: string;
  version: string;
  description: string;
  schema?: string;
  updatedAt?: string;
  author?: string;
  defaultEnvironment?: string;
  environments: Record<string, Record<string, string>>;
  variables: Record<string, string>;
  items: CatalogItem[];
}

export interface ExecutionResult {
  itemId: string;
  timestamp: string;
  durationMs: number;
  status: 'SUCCESS' | 'ERROR' | 'RUNNING' | 'SKIPPED';
  statusCode?: number;
  data?: any;
  error?: string;
  logs?: string[];
  resolvedRequest?: {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    body?: any;
  };
}

export interface ValidationIssue {
  type: 'error' | 'warning';
  path: string;
  message: string;
}

export interface BatchRunSummary {
  total: number;
  passed: number;
  failed: number;
  durationMs: number;
  results: Record<string, ExecutionResult>;
  startedAt: string;
  completedAt: string;
}
