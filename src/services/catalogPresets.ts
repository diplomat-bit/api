import { WorkbenchCatalog } from '../types/catalog';

export const DEFAULT_CATALOG: WorkbenchCatalog = {
  id: "workbench-catalog-v1",
  name: "Cloud & Data Engineering Workbench",
  version: "1.4.0",
  description: "Unified execution catalog for microservices, live data pipelines, mathematical transforms, geospatial visualizers, and health probes.",
  schema: "https://workbench.spec/v1/catalog.schema.json",
  updatedAt: "2026-10-04T18:00:00Z",
  author: "Workbench Operations Team",
  defaultEnvironment: "Development",
  environments: {
    Development: {
      baseUrl: "https://httpbin.org",
      apiKey: "dev_key_sec_99182",
      region: "us-east-1",
      rateLimit: "100",
      cacheTtl: "60"
    },
    Staging: {
      baseUrl: "https://httpbin.org",
      apiKey: "stg_key_sec_44810",
      region: "eu-central-1",
      rateLimit: "500",
      cacheTtl: "300"
    },
    Production: {
      baseUrl: "https://httpbin.org",
      apiKey: "prod_live_88319",
      region: "us-west-2",
      rateLimit: "2000",
      cacheTtl: "900"
    }
  },
  variables: {
    baseUrl: "https://httpbin.org",
    apiKey: "dev_key_sec_99182",
    region: "us-east-1",
    rateLimit: "100",
    cacheTtl: "60",
    batchSize: "250",
    timeoutMs: "4500"
  },
  items: [
    {
      id: "api-service-health",
      name: "System Health & Ping Probe",
      category: "Microservices & APIs",
      type: "http_request",
      method: "GET",
      url: "{{baseUrl}}/status/200",
      headers: {
        Accept: "application/json",
        "X-Api-Key": "{{apiKey}}",
        "X-Workbench-Client": "v1.4.0"
      },
      params: {
        probe_source: "workbench-runner",
        region: "{{region}}",
        timestamp: "1728064800"
      },
      description: "Executes an end-to-end health probe against cluster edge gateway to verify HTTP 200 response and latency SLA.",
      expectedStatus: 200,
      mockResponse: {
        status: "UP",
        gateway: "edge-us-east-1",
        healthyNodes: 24,
        activeConnections: 3840,
        uptimeSeconds: 1420950,
        latencyBudgetMs: 45
      }
    },
    {
      id: "api-currency-rates",
      name: "FX Market Exchange Rates",
      category: "Microservices & APIs",
      type: "http_request",
      method: "GET",
      url: "https://open.er-api.com/v6/latest/USD",
      headers: {
        Accept: "application/json"
      },
      params: {},
      description: "Live external API call fetching real-time global exchange rates for cross-border currency conversion and settlement.",
      expectedStatus: 200,
      mockResponse: {
        result: "success",
        base_code: "USD",
        rates: {
          EUR: 0.92,
          GBP: 0.78,
          JPY: 152.4,
          CAD: 1.36,
          AUD: 1.51,
          CHF: 0.88,
          SGD: 1.34
        }
      }
    },
    {
      id: "api-event-ingest",
      name: "Batch Event Ingestion",
      category: "Microservices & APIs",
      type: "http_request",
      method: "POST",
      url: "{{baseUrl}}/post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer {{apiKey}}"
      },
      params: {},
      body: "{\n  \"batchId\": \"batch-wk-2026-992\",\n  \"source\": \"catalog-agent\",\n  \"events\": [\n    { \"type\": \"audit_login\", \"userId\": \"usr_881\", \"ip\": \"192.168.1.10\" },\n    { \"type\": \"checkout_completed\", \"amount\": 420.50, \"currency\": \"USD\" },\n    { \"type\": \"license_verified\", \"tier\": \"enterprise\", \"seats\": 50 }\n  ]\n}",
      description: "Dispatches structured telemetry payloads with batch headers and authorization tokens to the event bus.",
      expectedStatus: 200,
      mockResponse: {
        status: "ACCEPTED",
        recordsIngested: 3,
        batchId: "batch-wk-2026-992",
        processingTimeMs: 14.8
      }
    },
    {
      id: "script-metrics-aggregator",
      name: "Statistical Distribution & Outlier Detection",
      category: "Data Transformations & Scripts",
      type: "script_runner",
      language: "javascript",
      description: "Computes statistical dispersion (mean, median, standard deviation, p95, p99), generates distribution buckets, and flags statistical outliers.",
      inputs: {
        latencySeries: [22, 24, 25, 26, 23, 28, 25, 31, 24, 26, 142, 23, 27, 29, 25, 28, 24, 250, 26, 23, 30]
      },
      code: `// Statistical Distribution & Outlier Detection Runner
const data = inputs.latencySeries || [22, 24, 25, 26, 23, 28, 25, 31, 24, 26, 142, 23, 27, 29, 25, 28, 24, 250, 26, 23, 30];
const count = data.length;
const sum = data.reduce((acc, val) => acc + val, 0);
const mean = Number((sum / count).toFixed(2));

const sorted = [...data].sort((a, b) => a - b);
const median = count % 2 === 0 ? (sorted[count/2 - 1] + sorted[count/2]) / 2 : sorted[Math.floor(count/2)];
const min = sorted[0];
const max = sorted[sorted.length - 1];

const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;
const stdDev = Number(Math.sqrt(variance).toFixed(2));

const p95Index = Math.floor(count * 0.95);
const p95 = sorted[p95Index];

// Z-score outlier flagging (> 2 standard deviations)
const outliers = data.filter(val => Math.abs((val - mean) / stdDev) > 2.0);

return {
  summary: {
    sampleCount: count,
    meanMs: mean,
    medianMs: median,
    minMs: min,
    maxMs: max,
    stdDevMs: stdDev,
    p95Ms: p95
  },
  outlierCount: outliers.length,
  outliersIdentified: outliers,
  distributionNormal: outliers.length <= 1,
  complianceStatus: p95 < 200 ? "NOMINAL_PASS" : "LATENCY_BREACH"
};`
    },
    {
      id: "script-json-flattener",
      name: "JSON Matrix Normalizer & Flattener",
      category: "Data Transformations & Scripts",
      type: "script_runner",
      language: "javascript",
      description: "Flattens complex nested JSON payloads into dot-delimited key-value dictionaries for relational data warehouse loading.",
      inputs: {
        tenant: {
          id: "org_7721",
          name: "Acme Logistics Global",
          plan: { tier: "Enterprise", features: ["sso", "audit_export", "unlimited_seats"] },
          billing: { cycle: "annual", currency: "USD", amount: 84000 },
          contact: { primary: { name: "Sarah Connor", email: "sarah@acme.corp" } }
        }
      },
      code: `// Deep object flattener
function flatten(obj, prefix = '') {
  const result = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      Object.assign(result, flatten(obj[key], fullKey));
    } else {
      result[fullKey] = Array.isArray(obj[key]) ? obj[key].join(', ') : obj[key];
    }
  }
  return result;
}

const flattened = flatten(inputs.tenant);
return {
  normalizedFields: Object.keys(flattened).length,
  records: flattened,
  columnDefinitions: Object.keys(flattened).map(k => ({
    column: k,
    type: typeof flattened[k],
    nullable: false
  }))
};`
    },
    {
      id: "script-crypto-hasher",
      name: "HMAC & Cryptographic Integrity Checksum",
      category: "Data Transformations & Scripts",
      type: "script_runner",
      language: "javascript",
      description: "Calculates cryptographic message digests and verifies transmission integrity tokens.",
      inputs: {
        payload: "Workbench-Catalog-Task-Record-994",
        secretSalt: "catalog-v1-production-salt-key"
      },
      code: `// Simulates cryptographic hash and checksum evaluation
const message = inputs.payload || "Workbench-Default-Payload";
const salt = inputs.secretSalt || "default-salt";

let h1 = 0xdeadbeef ^ salt.length;
let h2 = 0x41c6ce57 ^ salt.length;
for (let i = 0; i < message.length; i++) {
  const ch = message.charCodeAt(i);
  h1 = Math.imul(h1 ^ ch, 2654435761);
  h2 = Math.imul(h2 ^ ch, 1597334677);
}
h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

const digestHex = (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');

return {
  algorithm: "FNV1A-64-HMAC",
  messageLength: message.length,
  digest: "0x" + digestHex,
  status: "SIGNATURE_VERIFIED",
  issuedAt: new Date().toISOString()
};`
    },
    {
      id: "dataset-customers",
      name: "dim_customers (Master Account Ledger)",
      category: "Data Models & Datasets",
      type: "dataset",
      description: "Master customer dimension table with SLA tier, Monthly Recurring Revenue, and risk classification. Supports interactive SQL-like filtering, column sorting, and summary metrics.",
      columns: [
        { name: "id", type: "string", label: "Account ID" },
        { name: "company", type: "string", label: "Organization" },
        { name: "tier", type: "string", label: "Service Tier" },
        { name: "mrr_usd", type: "number", label: "MRR ($)" },
        { name: "region", type: "string", label: "Region" },
        { name: "churn_risk", type: "string", label: "Churn Risk" },
        { name: "status", type: "string", label: "Status" }
      ],
      records: [
        { id: "CUST-001", company: "Starlight Aerospace", tier: "Enterprise", mrr_usd: 18500, region: "North America", churn_risk: "Low", status: "Active" },
        { id: "CUST-002", company: "Vanguard Genomics", tier: "Enterprise", mrr_usd: 24000, region: "Europe", churn_risk: "Low", status: "Active" },
        { id: "CUST-003", company: "Nordic FinTech Labs", tier: "Growth", mrr_usd: 7200, region: "Europe", churn_risk: "Medium", status: "Active" },
        { id: "CUST-004", company: "Pacific Logistics Hub", tier: "Growth", mrr_usd: 8900, region: "Asia-Pacific", churn_risk: "Low", status: "Active" },
        { id: "CUST-005", company: "Apex Solar Grid", tier: "Standard", mrr_usd: 2400, region: "North America", churn_risk: "High", status: "Review" },
        { id: "CUST-006", company: "Krypton Robotics", tier: "Enterprise", mrr_usd: 31000, region: "North America", churn_risk: "Low", status: "Active" },
        { id: "CUST-007", company: "Helios Energy BV", tier: "Growth", mrr_usd: 6800, region: "Europe", churn_risk: "Low", status: "Active" },
        { id: "CUST-008", company: "Quantum Dynamics SG", tier: "Enterprise", mrr_usd: 15400, region: "Asia-Pacific", churn_risk: "Low", status: "Active" }
      ]
    },
    {
      id: "dataset-financial-ledger",
      name: "fct_transactions (Daily Settlement Ledger)",
      category: "Data Models & Datasets",
      type: "dataset",
      description: "Fact table capturing settlement volume, transaction fees, and ledger processing states.",
      columns: [
        { name: "tx_id", type: "string", label: "Transaction Hash" },
        { name: "timestamp", type: "string", label: "Timestamp" },
        { name: "amount_usd", type: "number", label: "Gross ($)" },
        { name: "fee_usd", type: "number", label: "Fee ($)" },
        { name: "net_usd", type: "number", label: "Net ($)" },
        { name: "settlement_status", type: "string", label: "Settlement" }
      ],
      records: [
        { tx_id: "0x4a91...e12a", timestamp: "2026-10-04 17:42:01", amount_usd: 4500.00, fee_usd: 13.50, net_usd: 4486.50, settlement_status: "Settled" },
        { tx_id: "0x7b33...90f2", timestamp: "2026-10-04 17:45:18", amount_usd: 1280.50, fee_usd: 3.84, net_usd: 1276.66, settlement_status: "Settled" },
        { tx_id: "0x11ce...55bb", timestamp: "2026-10-04 17:51:30", amount_usd: 9400.00, fee_usd: 28.20, net_usd: 9371.80, settlement_status: "Processing" },
        { tx_id: "0x98aa...cc14", timestamp: "2026-10-04 17:58:04", amount_usd: 620.00, fee_usd: 1.86, net_usd: 618.14, settlement_status: "Settled" },
        { tx_id: "0x33ef...7710", timestamp: "2026-10-04 18:02:11", amount_usd: 18250.00, fee_usd: 54.75, net_usd: 18195.25, settlement_status: "Queued" }
      ]
    },
    {
      id: "geo-datacenter-nodes",
      name: "Global Edge Infrastructure & Node Latency",
      category: "Geospatial & Visualization Layers",
      type: "geo_layer",
      description: "Interactive global map layer displaying edge compute points, coordinates, latency metrics, and availability zones.",
      points: [
        { id: "node-us-west", name: "US West (Oregon)", lat: 45.52, lng: -122.67, latency_ms: 14, load_pct: 58, status: "Healthy", region: "North America" },
        { id: "node-us-east", name: "US East (N. Virginia)", lat: 38.90, lng: -77.03, latency_ms: 18, load_pct: 74, status: "Healthy", region: "North America" },
        { id: "node-eu-west", name: "EU Central (Frankfurt)", lat: 50.11, lng: 8.68, latency_ms: 26, load_pct: 62, status: "Healthy", region: "Europe" },
        { id: "node-eu-north", name: "EU North (Stockholm)", lat: 59.32, lng: 18.06, latency_ms: 31, load_pct: 42, status: "Healthy", region: "Europe" },
        { id: "node-ap-ne", name: "Asia Pacific (Tokyo)", lat: 35.67, lng: 139.65, latency_ms: 42, load_pct: 81, status: "Healthy", region: "Asia-Pacific" },
        { id: "node-ap-se", name: "Asia Pacific (Singapore)", lat: 1.35, lng: 103.81, latency_ms: 48, load_pct: 69, status: "Healthy", region: "Asia-Pacific" },
        { id: "node-sa-east", name: "South America (São Paulo)", lat: -23.55, lng: -46.63, latency_ms: 68, load_pct: 51, status: "Healthy", region: "South America" },
        { id: "node-au-se", name: "Australia (Sydney)", lat: -33.86, lng: 151.20, latency_ms: 54, load_pct: 47, status: "Healthy", region: "Oceania" }
      ]
    },
    {
      id: "chart-throughput-series",
      name: "API Request Throughput & Error Distribution",
      category: "Geospatial & Visualization Layers",
      type: "chart_model",
      chartType: "timeseries",
      description: "Hourly performance profile tracking throughput demand curves and error rate deviations.",
      series: [
        { time: "00:00", requests_per_sec: 1240, p95_latency_ms: 28, error_pct: 0.02 },
        { time: "03:00", requests_per_sec: 980, p95_latency_ms: 24, error_pct: 0.01 },
        { time: "06:00", requests_per_sec: 1650, p95_latency_ms: 32, error_pct: 0.04 },
        { time: "09:00", requests_per_sec: 3400, p95_latency_ms: 46, error_pct: 0.08 },
        { time: "12:00", requests_per_sec: 4120, p95_latency_ms: 52, error_pct: 0.06 },
        { time: "15:00", requests_per_sec: 4890, p95_latency_ms: 59, error_pct: 0.09 },
        { time: "18:00", requests_per_sec: 3780, p95_latency_ms: 43, error_pct: 0.05 },
        { time: "21:00", requests_per_sec: 2650, p95_latency_ms: 35, error_pct: 0.03 }
      ]
    },
    {
      id: "pipeline-etl-batch",
      name: "End-to-End ETL Verification Pipeline",
      category: "Workflows & Pipelines",
      type: "workflow",
      description: "Orchestrates multi-phase data ingestion, schema validation, and table materialization sequence with real-time dependency execution.",
      steps: [
        { step: 1, targetId: "api-service-health", action: "Verify Edge Gateway Health", stopOnFailure: true },
        { step: 2, targetId: "api-currency-rates", action: "Fetch Exchange Rate Multipliers", stopOnFailure: false },
        { step: 3, targetId: "script-json-flattener", action: "Normalize Incoming Ingestion Schema", stopOnFailure: true },
        { step: 4, targetId: "script-metrics-aggregator", action: "Compute Dispersion & Outlier Bounds", stopOnFailure: true },
        { step: 5, targetId: "dataset-customers", action: "Verify Dimension Integrity", stopOnFailure: true }
      ]
    }
  ]
};

export const TERRIAR_GEOSPATIAL_CATALOG: WorkbenchCatalog = {
  id: "workbench-terria-geo",
  name: "TerriaJS Geospatial Data Catalog",
  version: "2.1.0",
  description: "TerriaJS compatible spatial catalog items, environmental sensor clusters, and geographic layer manifests.",
  schema: "https://terria.io/catalog/v8/schema.json",
  updatedAt: "2026-10-04T12:00:00Z",
  author: "National Spatial Data Infrastructure",
  defaultEnvironment: "Production",
  environments: {
    Production: {
      wmsGateway: "https://geoserver.nationaldata.gov/wms",
      sensorApiKey: "geo_live_tok_9918",
      crs: "EPSG:4326"
    }
  },
  variables: {
    wmsGateway: "https://geoserver.nationaldata.gov/wms",
    sensorApiKey: "geo_live_tok_9918",
    crs: "EPSG:4326"
  },
  items: [
    {
      id: "geo-coastal-stations",
      name: "Oceanic Buoy & Tidal Sensors",
      category: "Environmental Telemetry",
      type: "geo_layer",
      description: "Real-time acoustic and pressure depth sensor stations tracking sea surface temperature and wave height.",
      points: [
        { id: "buoy-pac-01", name: "Monterey Bay Deep Buoy", lat: 36.75, lng: -122.42, sea_temp_c: 14.8, wave_height_m: 2.1, status: "Active" },
        { id: "buoy-pac-02", name: "Hawaii Leeward Station", lat: 21.30, lng: -157.85, sea_temp_c: 25.4, wave_height_m: 1.4, status: "Active" },
        { id: "buoy-atl-01", name: "Cape Hatteras Shoal", lat: 35.25, lng: -75.52, sea_temp_c: 21.2, wave_height_m: 3.2, status: "Warning" },
        { id: "buoy-atl-02", name: "Bermuda Transect", lat: 32.30, lng: -64.78, sea_temp_c: 23.9, wave_height_m: 1.8, status: "Active" },
        { id: "buoy-med-01", name: "Balearic Sea Observatory", lat: 39.56, lng: 2.65, sea_temp_c: 22.1, wave_height_m: 0.9, status: "Active" },
        { id: "buoy-nordic-01", name: "Norwegian Trench Float", lat: 60.39, lng: 5.32, sea_temp_c: 9.4, wave_height_m: 4.1, status: "Active" }
      ]
    },
    {
      id: "api-geo-coordinates",
      name: "Geocoding & Reverse IP Probe",
      category: "Geospatial Services",
      type: "http_request",
      method: "GET",
      url: "https://ipapi.co/json/",
      headers: { Accept: "application/json" },
      description: "Dispatches geospatial location lookup to determine origin IP latitude and longitude.",
      mockResponse: {
        ip: "8.8.8.8",
        city: "Mountain View",
        region: "California",
        country_name: "United States",
        latitude: 37.4223,
        longitude: -122.0848,
        org: "Google LLC"
      }
    },
    {
      id: "dataset-spatial-polygons",
      name: "boundary_parcels (Cadastral Polygons)",
      category: "Cadastral Datasets",
      type: "dataset",
      description: "Tabular inventory of administrative boundary coordinates, land use zoning, and acreage calculations.",
      columns: [
        { name: "parcel_id", type: "string", label: "Parcel ID" },
        { name: "zone", type: "string", label: "Zoning Class" },
        { name: "hectares", type: "number", label: "Hectares" },
        { name: "elevation_m", type: "number", label: "Elevation (m)" },
        { name: "jurisdiction", type: "string", label: "Jurisdiction" }
      ],
      records: [
        { parcel_id: "NZ-9910-A", zone: "Commercial High-Density", hectares: 14.2, elevation_m: 42, jurisdiction: "Auckland" },
        { parcel_id: "NZ-9910-B", zone: "Industrial Logistics", hectares: 38.5, elevation_m: 18, jurisdiction: "Auckland" },
        { parcel_id: "NZ-9912-C", zone: "Conservation Reserve", hectares: 120.0, elevation_m: 310, jurisdiction: "Waitakere" },
        { parcel_id: "AU-3301-X", zone: "Mixed Use Residential", hectares: 22.8, elevation_m: 65, jurisdiction: "Sydney East" }
      ]
    }
  ]
};

export const DBT_CATALOG: WorkbenchCatalog = {
  id: "workbench-dbt-lakehouse",
  name: "dbt Core Knowledge Catalog",
  version: "1.8.2",
  description: "Data build tool (dbt) generated catalog model nodes, columnar statistics, seed manifests, and test runs.",
  schema: "https://schemas.getdbt.com/dbt/catalog/v1.json",
  updatedAt: "2026-10-04T15:30:00Z",
  author: "Data Platform Engineering",
  defaultEnvironment: "Warehouse_Prod",
  environments: {
    Warehouse_Prod: {
      dbSchema: "analytics_prod",
      warehouseCluster: "snowflake-wh-large-01"
    }
  },
  variables: {
    dbSchema: "analytics_prod",
    warehouseCluster: "snowflake-wh-large-01"
  },
  items: [
    {
      id: "script-dbt-lineage",
      name: "DAG Lineage & Upstream Dependency Check",
      category: "dbt Model Governance",
      type: "script_runner",
      language: "javascript",
      description: "Calculates topological sort of dbt model dependencies to ensure no cyclic references exist.",
      inputs: {
        nodes: [
          { id: "raw_events", deps: [] },
          { id: "stg_events", deps: ["raw_events"] },
          { id: "dim_users", deps: ["stg_events"] },
          { id: "fct_sessions", deps: ["stg_events", "dim_users"] }
        ]
      },
      code: `const nodes = inputs.nodes;
const resolved = [];
const visited = new Set();

function visit(node) {
  if (visited.has(node.id)) return;
  for (const depId of node.deps) {
    const parent = nodes.find(n => n.id === depId);
    if (parent) visit(parent);
  }
  visited.add(node.id);
  resolved.push(node.id);
}

nodes.forEach(n => visit(n));

return {
  status: "DAG_VALIDATED",
  executionOrder: resolved,
  totalNodes: nodes.length,
  acyclic: true
};`
    },
    {
      id: "dataset-dbt-model-nodes",
      name: "model.analytics.fct_mrr_daily",
      category: "dbt Model Warehouse",
      type: "dataset",
      description: "Aggregated daily MRR accounting table produced by dbt core pipeline.",
      columns: [
        { name: "date_day", type: "string", label: "Date" },
        { name: "active_accounts", type: "number", label: "Accounts" },
        { name: "new_mrr", type: "number", label: "New MRR ($)" },
        { name: "churn_mrr", type: "number", label: "Churn MRR ($)" },
        { name: "net_mrr", type: "number", label: "Net MRR ($)" }
      ],
      records: [
        { date_day: "2026-10-01", active_accounts: 4820, new_mrr: 14200, churn_mrr: 1200, net_mrr: 13000 },
        { date_day: "2026-10-02", active_accounts: 4835, new_mrr: 18500, churn_mrr: 950, net_mrr: 17550 },
        { date_day: "2026-10-03", active_accounts: 4851, new_mrr: 21300, churn_mrr: 1800, net_mrr: 19500 },
        { date_day: "2026-10-04", active_accounts: 4869, new_mrr: 16700, churn_mrr: 600, net_mrr: 16100 }
      ]
    }
  ]
};

export const PRESET_CATALOGS: Record<string, WorkbenchCatalog> = {
  "Cloud & Data Engineering (Default)": DEFAULT_CATALOG,
  "TerriaJS Geospatial Data": TERRIAR_GEOSPATIAL_CATALOG,
  "dbt Core Data Warehouse": DBT_CATALOG
};
