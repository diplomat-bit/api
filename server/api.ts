import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { db } from './db';

export const apiRouter = Router();

// Load catalog cached in memory
let catalogData: any = null;
try {
  const catPath = path.resolve('generated/components/data/workbench-catalog.json');
  if (fs.existsSync(catPath)) {
    catalogData = JSON.parse(fs.readFileSync(catPath, 'utf-8'));
  }
} catch (e) {
  console.warn('Could not preload catalog in API router:', e);
}

// Global CORS & Public Access Header Middleware
apiRouter.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Api-Key, X-Key-Id, X-Pay-Token, *');
  res.header('X-API-Access', 'PUBLIC_OPEN');
  res.header('X-Database-Engine', 'Persistent-Stretched-Store');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 1. Health & Server Status
apiRouter.get('/health', (req: Request, res: Response) => {
  const stats = db.getStats();
  res.json({
    status: 'ONLINE',
    message: 'Public API & Persistent Database are online and stretched. Anyone can call any endpoint and retrieve data.',
    timestamp: new Date().toISOString(),
    cors: 'ALLOW_ALL (*)',
    authentication: 'NONE_REQUIRED (Public)',
    database: stats,
    capabilities: [
      'FULL_CRUD_COLLECTIONS',
      'FUZZY_SEARCH',
      'FILTERING_SORTING_PAGINATION',
      'UNIVERSAL_API_EXECUTION_GATEWAY',
      'DATABASE_STRETCHING',
      'EXPORT_IMPORT_JSON_CSV'
    ]
  });
});

// 2. Database Stats
apiRouter.get('/db/stats', (req: Request, res: Response) => {
  res.json(db.getStats());
});

// 3. List Collections
apiRouter.get('/db/collections', (req: Request, res: Response) => {
  const collections = db.getCollectionsList();
  const stats = db.getStats();
  res.json({
    collections: collections.map(name => ({
      name,
      count: stats.collections[name] || 0,
      url: `/api/db/${name}`,
      sampleItemUrl: `/api/db/${name}?limit=1`
    })),
    totalRecords: stats.totalRecords
  });
});

// 4. Stretch Database
apiRouter.post('/db/stretch', (req: Request, res: Response) => {
  const count = Math.min(Number(req.body.count) || 100, 1000);
  const collection = req.body.collection || 'transactions';

  if (collection === 'all') {
    const r1 = db.stretchDatabase('transactions', Math.floor(count * 0.6));
    const r2 = db.stretchDatabase('cards', Math.floor(count * 0.3));
    const r3 = db.stretchDatabase('records', Math.floor(count * 0.1));
    return res.json({
      success: true,
      message: `Database stretched across all collections with ${count} new records!`,
      details: { transactions: r1, cards: r2, records: r3 },
      stats: db.getStats()
    });
  }

  const result = db.stretchDatabase(collection, count);
  res.json({
    success: true,
    message: `Database stretched: added ${result.added} records to '${collection}'!`,
    totalInCollection: result.totalInCollection,
    stats: db.getStats()
  });
});

// 5. Reset Database
apiRouter.post('/db/reset', (req: Request, res: Response) => {
  db.resetDatabase();
  res.json({
    success: true,
    message: 'Database reset to initial rich seed state.',
    stats: db.getStats()
  });
});

// 6. Export Database (JSON or CSV)
apiRouter.get('/db/export', (req: Request, res: Response) => {
  const format = req.query.format || 'json';
  const collection = req.query.collection as string | undefined;

  if (collection) {
    const { items } = db.getCollection(collection, { limit: 10000 });
    if (format === 'csv') {
      if (items.length === 0) return res.send('');
      const keys = Object.keys(items[0]);
      const csv = [
        keys.join(','),
        ...items.map(row => keys.map(k => JSON.stringify(row[k] ?? '')).join(','))
      ].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${collection}.csv"`);
      return res.send(csv);
    }
    return res.json({ collection, count: items.length, items });
  }

  const dump = db.exportAll();
  res.setHeader('Content-Disposition', 'attachment; filename="database-export.json"');
  res.json(dump);
});

// 7. Import Data into Collection
apiRouter.post('/db/import', (req: Request, res: Response) => {
  const collection = req.body.collection || 'records';
  const items = Array.isArray(req.body.items) ? req.body.items : [req.body];
  const count = db.importCollection(collection, items);
  res.json({
    success: true,
    message: `Imported ${count} items into collection '${collection}'.`,
    stats: db.getStats()
  });
});

// 8. Advanced Query Engine
apiRouter.post('/db/query', (req: Request, res: Response) => {
  const { collection = 'transactions', search, filters, sort, order, limit, offset } = req.body;
  const result = db.getCollection(collection, {
    search,
    filters,
    sort,
    order,
    limit: limit ? Number(limit) : 100,
    offset: offset ? Number(offset) : 0
  });
  res.json(result);
});

// 9. Retrieve Collection Data (GET /api/db/:collection)
apiRouter.get('/db/:collection', (req: Request, res: Response) => {
  const { collection } = req.params;
  const { search, limit, offset, sort, order, ...filters } = req.query;

  // Clean filters
  const cleanFilters: Record<string, any> = {};
  for (const [k, v] of Object.entries(filters)) {
    if (v !== undefined && v !== null && v !== '') {
      cleanFilters[k] = v;
    }
  }

  const result = db.getCollection(collection, {
    search: search ? String(search) : undefined,
    limit: limit ? Number(limit) : 50,
    offset: offset ? Number(offset) : 0,
    sort: sort ? String(sort) : undefined,
    order: (order === 'desc' || order === 'asc') ? order : 'desc',
    filters: Object.keys(cleanFilters).length > 0 ? cleanFilters : undefined
  });

  res.json(result);
});

// 10. Retrieve Single Item (GET /api/db/:collection/:id)
apiRouter.get('/db/:collection/:id', (req: Request, res: Response) => {
  const { collection, id } = req.params;
  const item = db.getById(collection, id);
  if (!item) {
    return res.status(404).json({ error: 'NotFound', message: `Record with id '${id}' not found in '${collection}'.` });
  }
  res.json(item);
});

// 11. Create Record (POST /api/db/:collection)
apiRouter.post('/db/:collection', (req: Request, res: Response) => {
  const { collection } = req.params;
  const created = db.insert(collection, req.body);
  
  // Also log execution
  db.insert('executions', {
    id: `exec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    method: 'POST',
    path: `/api/db/${collection}`,
    status: 201,
    statusText: 'Created',
    latencyMs: 12,
    timestamp: new Date().toISOString(),
    source: 'HTTP_REST_CLIENT',
    requestBody: req.body,
    responsePreview: { id: created.id }
  });

  res.status(201).json(created);
});

// 12. Update Record (PUT /api/db/:collection/:id)
apiRouter.put('/db/:collection/:id', (req: Request, res: Response) => {
  const { collection, id } = req.params;
  const updated = db.update(collection, id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'NotFound', message: `Record with id '${id}' not found in '${collection}'.` });
  }
  res.json(updated);
});

// 13. Partial Update Record (PATCH /api/db/:collection/:id)
apiRouter.patch('/db/:collection/:id', (req: Request, res: Response) => {
  const { collection, id } = req.params;
  const updated = db.update(collection, id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'NotFound', message: `Record with id '${id}' not found in '${collection}'.` });
  }
  res.json(updated);
});

// 14. Delete Record (DELETE /api/db/:collection/:id)
apiRouter.delete('/db/:collection/:id', (req: Request, res: Response) => {
  const { collection, id } = req.params;
  const deleted = db.delete(collection, id);
  if (!deleted) {
    return res.status(404).json({ error: 'NotFound', message: `Record with id '${id}' not found in '${collection}'.` });
  }
  res.json({ success: true, message: `Record '${id}' successfully deleted from '${collection}'.` });
});

// 15. Universal API Execution Gateway (POST /api/execute)
// Anyone can send an API request to execute, whether from cURL, Postman, or client UI!
apiRouter.post('/execute', async (req: Request, res: Response) => {
  const startTime = Date.now();
  const {
    method = 'GET',
    path: reqPath = '/v1/payments',
    specId = 'spec_general',
    endpointId,
    headers = {},
    params = {},
    body = null
  } = req.body;

  const upperMethod = String(method).toUpperCase();
  const callerIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  let status = 200;
  let statusText = 'OK';
  let responseData: any = null;

  // Real mock generation & stateful transaction handling
  if (reqPath.includes('payment') || reqPath.includes('fundstransfer') || reqPath.includes('transaction')) {
    const amount = body?.amount || params?.amount || 150.00;
    const currency = body?.currency || params?.currency || 'USD';
    const authCode = 'AUTH' + Math.floor(100000 + Math.random() * 900000);
    const txnId = 'txn_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);

    responseData = {
      status: 'APPROVED',
      approvalCode: authCode,
      transactionIdentifier: txnId,
      networkReferenceNumber: 'VSD' + Math.floor(100000000 + Math.random() * 900000000),
      settlementDate: new Date().toISOString(),
      amount: Number(amount).toFixed(2),
      currency,
      actionCode: '00',
      responseMessage: 'Transaction approved and settled through Visa interchange.'
    };

    // Statically persist into database transactions table!
    db.insert('transactions', {
      id: txnId,
      transactionNumber: 'TRX-' + Math.floor(800000 + Math.random() * 199999),
      date: new Date().toISOString(),
      merchant: body?.merchant || 'Direct API Caller',
      merchantCategory: 'Financial Services & API Gateway',
      amount: Number(amount),
      currency,
      status: 'APPROVED',
      cardLast4: body?.cardLast4 || '4242',
      cardType: 'Visa Commercial Direct',
      authCode,
      channel: 'API_GATEWAY',
      networkFee: 1.50,
      notes: `Executed via /api/execute for ${specId}`
    });
  } else if (reqPath.includes('card') || reqPath.includes('token')) {
    const cardId = 'crd_' + Date.now().toString(36);
    responseData = {
      cardId,
      tokenReference: 'TKN_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      status: 'ACTIVE',
      brand: 'Visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2028,
      message: 'Card token generated and persisted in database.'
    };

    db.insert('cards', {
      id: cardId,
      cardholder: body?.cardholder || 'API Generated Cardholder',
      last4: '4242',
      expMonth: 12,
      expYear: 2028,
      brand: 'Visa',
      tier: 'Infinite Virtual',
      type: 'VIRTUAL',
      status: 'ACTIVE',
      spendingLimit: 25000,
      spentMonth: 0,
      currency: 'USD',
      department: 'API Direct'
    });
  } else {
    responseData = {
      status: 'SUCCESS',
      executionId: 'exec_' + Math.random().toString(36).substring(2, 9),
      method: upperMethod,
      path: reqPath,
      specId,
      endpointId: endpointId || null,
      timestamp: new Date().toISOString(),
      parametersReceived: params,
      bodyReceived: body,
      result: {
        acknowledged: true,
        message: 'Endpoint called successfully via public API execution gateway.'
      }
    };
  }

  const latencyMs = Math.max(10, Date.now() - startTime);

  // Store log in persistent database executions
  const execRecord = db.insert('executions', {
    id: `exec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    endpointId: endpointId || 'ep_' + Math.random().toString(36).substring(2, 6),
    specId,
    method: upperMethod,
    path: reqPath,
    url: reqPath,
    status,
    statusText,
    latencyMs,
    timestamp: new Date().toISOString(),
    callerIp,
    source: req.headers['x-source'] || 'PUBLIC_REST_GATEWAY',
    requestHeaders: headers,
    requestBody: body,
    responsePreview: responseData
  });

  res.status(status).json({
    executionId: execRecord.id,
    status,
    statusText,
    latencyMs,
    timestamp: execRecord.timestamp,
    data: responseData
  });
});

// 16. Direct Visa / FinTech REST Endpoints
apiRouter.get('/v1/transactions', (req: Request, res: Response) => {
  const result = db.getCollection('transactions', {
    search: req.query.search as string,
    limit: Number(req.query.limit) || 50,
    offset: Number(req.query.offset) || 0,
    sort: 'date',
    order: 'desc'
  });
  res.json(result);
});

apiRouter.post('/v1/payments', (req: Request, res: Response) => {
  const { amount = 100, currency = 'USD', merchant = 'Online Purchase', cardLast4 = '4242' } = req.body;
  const authCode = 'AUTH' + Math.floor(100000 + Math.random() * 900000);
  const txn = db.insert('transactions', {
    transactionNumber: 'TRX-' + Math.floor(800000 + Math.random() * 199999),
    date: new Date().toISOString(),
    merchant,
    merchantCategory: 'Direct Payments API',
    amount: Number(amount),
    currency,
    status: 'APPROVED',
    cardLast4,
    cardType: 'Visa Platinum Commercial',
    authCode,
    channel: 'API_DIRECT',
    networkFee: 1.20
  });
  res.status(201).json({
    status: 'APPROVED',
    approvalCode: authCode,
    transaction: txn
  });
});

apiRouter.get('/v1/cards', (req: Request, res: Response) => {
  const result = db.getCollection('cards', {
    limit: Number(req.query.limit) || 50,
    offset: Number(req.query.offset) || 0
  });
  res.json(result);
});

apiRouter.post('/v1/cards', (req: Request, res: Response) => {
  const created = db.insert('cards', {
    ...req.body,
    brand: 'Visa',
    status: 'ACTIVE'
  });
  res.status(201).json(created);
});

apiRouter.get('/v1/accounts', (req: Request, res: Response) => {
  const result = db.getCollection('accounts');
  res.json(result);
});

// 17. Wildcard API for ANY /api/v1/* endpoint
apiRouter.all('/v1/*', (req: Request, res: Response) => {
  const path = req.path;
  const method = req.method;
  const result = {
    status: 'SUCCESS',
    endpoint: `${method} ${path}`,
    message: 'Wildcard Visa/FinTech API Route handled and acknowledged.',
    timestamp: new Date().toISOString(),
    params: req.query,
    body: req.body
  };
  res.json(result);
});

// 18. Catalog & Endpoints Information
apiRouter.get('/catalog', (req: Request, res: Response) => {
  if (catalogData) {
    return res.json(catalogData);
  }
  const catPath = path.resolve('public/workbench-catalog.json');
  if (fs.existsSync(catPath)) {
    const raw = JSON.parse(fs.readFileSync(catPath, 'utf-8'));
    return res.json(raw);
  }
  res.status(404).json({ error: 'CatalogNotFound' });
});

apiRouter.get('/endpoints', (req: Request, res: Response) => {
  if (!catalogData?.specs) {
    return res.json({ total: 0, endpoints: [] });
  }
  const endpoints: any[] = [];
  catalogData.specs.forEach((s: any) => {
    (s.endpoints || []).forEach((ep: any) => {
      endpoints.push({
        id: ep.id,
        specId: s.id,
        specTitle: s.title,
        method: ep.method,
        path: ep.path,
        summary: ep.summary,
        parameters: ep.parameters || []
      });
    });
  });
  res.json({
    total: endpoints.length,
    endpoints
  });
});
