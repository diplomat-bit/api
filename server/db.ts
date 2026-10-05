import fs from 'fs';
import path from 'path';

export interface DatabaseStats {
  totalRecords: number;
  collections: Record<string, number>;
  fileSizeBytes: number;
  lastUpdated: string;
  uptimeSeconds: number;
  accessMode: 'PUBLIC_OPEN';
  cors: 'ALLOW_ALL (*)';
}

const DB_FILE_PATH = path.resolve('data/database.json');
const startTime = Date.now();

// Default seed collections
function generateInitialData() {
  const transactions = [];
  const merchants = [
    { name: 'Amazon Web Services', cat: 'Cloud Infrastructure', fee: 1.25 },
    { name: 'Uber Technologies', cat: 'Rideshare & Mobility', fee: 0.45 },
    { name: 'Delta Air Lines', cat: 'Travel & Aviation', fee: 4.80 },
    { name: 'Starbucks Coffee', cat: 'Food & Beverage', fee: 0.15 },
    { name: 'Stripe Payouts', cat: 'Payment Settlement', fee: 2.10 },
    { name: 'Apple Store Online', cat: 'Hardware & Devices', fee: 8.50 },
    { name: 'Google Cloud Platform', cat: 'Cloud Infrastructure', fee: 3.20 },
    { name: 'Shopify Merchant Solutions', cat: 'E-Commerce Platform', fee: 1.75 },
    { name: 'Salesforce Enterprise', cat: 'Enterprise SaaS', fee: 12.00 },
    { name: 'GitHub Copilot Enterprise', cat: 'Developer Tools', fee: 0.85 },
    { name: 'Target Retail Stores', cat: 'General Merchandise', fee: 1.10 },
    { name: 'Costco Wholesale', cat: 'Wholesale & Grocery', fee: 3.40 }
  ];

  const statuses = ['APPROVED', 'SETTLED', 'APPROVED', 'SETTLED', 'PENDING', 'APPROVED', 'REFUNDED'];
  const currencies = ['USD', 'USD', 'USD', 'EUR', 'GBP', 'CAD'];
  const cardTypes = ['Visa Commercial Infinite', 'Visa Business Purchasing', 'Visa Debit Platinum', 'Visa Corporate Signature'];
  const channels = ['E-COMMERCE', 'API_RECURRING', 'POS_CONTACTLESS', 'IN_APP'];

  // Seed 60 realistic transactions
  for (let i = 1; i <= 60; i++) {
    const m = merchants[i % merchants.length];
    const amount = Number((Math.random() * 450 + 15).toFixed(2));
    const status = statuses[i % statuses.length];
    const curr = currencies[i % currencies.length];
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(Date.now() - daysAgo * 86400000 - (i * 3600000)).toISOString();
    
    transactions.push({
      id: `txn_${(1000 + i).toString().padStart(6, '0')}`,
      transactionNumber: `TRX-${(892000 + i)}`,
      date,
      merchant: m.name,
      merchantCategory: m.cat,
      amount,
      currency: curr,
      status,
      cardLast4: ['4242', '8821', '1092', '5543', '3091', '7729', '6410'][i % 7],
      cardType: cardTypes[i % cardTypes.length],
      authCode: `AUTH${(10000 + i * 37) % 90000 + 10000}`,
      channel: channels[i % channels.length],
      networkFee: Number((m.fee + Math.random() * 0.5).toFixed(2)),
      settlementDate: status === 'SETTLED' ? new Date(new Date(date).getTime() + 86400000).toISOString() : null,
      notes: `Batch clearing via VisaNet interchange gateway #${(i % 5) + 1}`
    });
  }

  // Seed 25 realistic cards
  const cards = [
    { id: 'crd_001', cardholder: 'Alex Morgan', last4: '4242', expMonth: 12, expYear: 2028, brand: 'Visa', tier: 'Infinite Business', type: 'VIRTUAL', status: 'ACTIVE', spendingLimit: 50000, spentMonth: 8420.50, currency: 'USD', department: 'Treasury' },
    { id: 'crd_002', cardholder: 'Elena Rostova', last4: '8821', expMonth: 8, expYear: 2027, brand: 'Visa', tier: 'Corporate Commercial', type: 'PHYSICAL', status: 'ACTIVE', spendingLimit: 25000, spentMonth: 3190.00, currency: 'USD', department: 'Engineering' },
    { id: 'crd_003', cardholder: 'Marcus Chen', last4: '1092', expMonth: 4, expYear: 2029, brand: 'Visa', tier: 'Platinum Purchasing', type: 'VIRTUAL', status: 'ACTIVE', spendingLimit: 100000, spentMonth: 42100.25, currency: 'USD', department: 'Operations' },
    { id: 'crd_004', cardholder: 'Sarah Jenkins', last4: '5543', expMonth: 10, expYear: 2026, brand: 'Visa', tier: 'Signature Corporate', type: 'VIRTUAL', status: 'FROZEN', spendingLimit: 15000, spentMonth: 14950.00, currency: 'USD', department: 'Marketing' },
    { id: 'crd_005', cardholder: 'DevOps Cloud Runner', last4: '3091', expMonth: 1, expYear: 2030, brand: 'Visa', tier: 'Single-Use Token', type: 'TOKENIZED', status: 'ACTIVE', spendingLimit: 10000, spentMonth: 1250.70, currency: 'USD', department: 'Cloud Infrastructure' },
    { id: 'crd_006', cardholder: 'FinTech Treasury Reserve', last4: '7729', expMonth: 6, expYear: 2028, brand: 'Visa', tier: 'Commercial Fleet', type: 'VIRTUAL', status: 'ACTIVE', spendingLimit: 75000, spentMonth: 19830.10, currency: 'EUR', department: 'Treasury EMEA' },
    { id: 'crd_007', cardholder: 'Liam O\'Connor', last4: '6410', expMonth: 3, expYear: 2027, brand: 'Visa', tier: 'Debit Platinum', type: 'PHYSICAL', status: 'ACTIVE', spendingLimit: 20000, spentMonth: 4890.30, currency: 'GBP', department: 'Executive' }
  ];

  // Seed 10 realistic corporate accounts
  const accounts = [
    { id: 'acc_101', name: 'Global Corporate Operating Account', accountNumber: 'US89VISABNK10928374', routingNumber: '121000358', type: 'OPERATING', balance: 2450890.75, availableBalance: 2410890.75, currency: 'USD', status: 'ACTIVE', country: 'USA' },
    { id: 'acc_102', name: 'FinTech Clearing Reserve (Visa Direct)', accountNumber: 'US44VISABNK90124851', routingNumber: '121000358', type: 'SETTLEMENT', balance: 5120400.00, availableBalance: 5120400.00, currency: 'USD', status: 'ACTIVE', country: 'USA' },
    { id: 'acc_103', name: 'EUR Multi-Currency Settlement Float', accountNumber: 'DE89370400440532013000', bicSwift: 'DBEUMM21XXX', type: 'SETTLEMENT', balance: 1890250.40, availableBalance: 1890250.40, currency: 'EUR', status: 'ACTIVE', country: 'DEU' },
    { id: 'acc_104', name: 'UK Faster Payments Treasury Pool', accountNumber: 'GB29NWBK60161331926819', sortCode: '60-16-13', type: 'OPERATING', balance: 940300.20, availableBalance: 925000.00, currency: 'GBP', status: 'ACTIVE', country: 'GBR' },
    { id: 'acc_105', name: 'Collateral Escrow Account', accountNumber: 'US12VISABNK77192039', routingNumber: '121000358', type: 'ESCROW', balance: 750000.00, availableBalance: 750000.00, currency: 'USD', status: 'LOCKED', country: 'USA' }
  ];

  // Seed 15 webhook events
  const webhooks = [
    { id: 'whk_001', event: 'payment.authorized', timestamp: new Date(Date.now() - 300000).toISOString(), status: 'DELIVERED', attempts: 1, destinationUrl: 'https://client-api.fintech.io/v1/webhooks', payload: { transactionId: 'txn_001060', amount: 142.50, currency: 'USD', merchant: 'Amazon Web Services' } },
    { id: 'whk_002', event: 'card.tokenized', timestamp: new Date(Date.now() - 1200000).toISOString(), status: 'DELIVERED', attempts: 1, destinationUrl: 'https://client-api.fintech.io/v1/webhooks', payload: { cardId: 'crd_001', tokenRef: 'TKN_9921384', brand: 'Visa' } },
    { id: 'whk_003', event: 'settlement.batch_closed', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'DELIVERED', attempts: 1, destinationUrl: 'https://client-api.fintech.io/v1/webhooks', payload: { batchId: 'BATCH_20261004_01', totalAmount: 89430.20, recordsCount: 42 } },
    { id: 'whk_004', event: 'fraud.risk_score_evaluated', timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'DELIVERED', attempts: 1, destinationUrl: 'https://client-api.fintech.io/v1/webhooks', payload: { transactionId: 'txn_001058', riskScore: 12, action: 'ALLOW' } }
  ];

  // Initial executions log
  const executions = [
    {
      id: 'exec_init_01',
      endpointId: 'ep_visadirect_push',
      specId: 'visa-direct-api',
      method: 'POST',
      path: '/visadirect/fundstransfer/v1/pushfundstransactions',
      url: 'https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions',
      status: 200,
      statusText: 'OK',
      latencyMs: 38,
      timestamp: new Date(Date.now() - 180000).toISOString(),
      callerIp: '127.0.0.1 (Internal Client)',
      source: 'PUBLIC_REST_API',
      requestHeaders: { 'Content-Type': 'application/json', 'X-Api-Key': 'DEMO-PUBLIC-KEY' },
      requestBody: { amount: '250.00', currency: 'USD', recipientPrimaryAccountNumber: '4000123456789010' },
      responsePreview: { status: 'APPROVED', approvalCode: 'OK8901', networkReferenceNumber: 'VSD9182374' }
    }
  ];

  const records = [
    {
      id: 'rec_meta_01',
      title: 'Global System Configuration',
      category: 'SYSTEM',
      publicAccess: true,
      openEndpoints: true,
      corsPolicy: 'ALLOW_ALL (*)',
      createdAt: new Date().toISOString()
    }
  ];

  return {
    transactions,
    cards,
    accounts,
    webhooks,
    executions,
    records
  };
}

class PersistentDatabase {
  private data: Record<string, any[]> = {};
  private inited = false;

  constructor() {
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        this.data = JSON.parse(raw);
        this.inited = true;
      } else {
        this.data = generateInitialData();
        this.save();
        this.inited = true;
      }
    } catch (err) {
      console.warn('Failed to load database from disk, creating fresh dataset:', err);
      this.data = generateInitialData();
      this.save();
      this.inited = true;
    }
  }

  private save() {
    try {
      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database to disk:', err);
    }
  }

  public getCollectionsList(): string[] {
    return Object.keys(this.data);
  }

  public getCollection(name: string, options?: {
    search?: string;
    limit?: number;
    offset?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    filters?: Record<string, any>;
  }): { items: any[]; total: number; limit: number; offset: number } {
    let items = this.data[name] || [];
    
    // Exact and comparison filters
    if (options?.filters) {
      const f = options.filters;
      items = items.filter(item => {
        for (const [key, val] of Object.entries(f)) {
          if (val === undefined || val === null || val === '') continue;
          if (item[key] === undefined) return false;
          if (typeof val === 'string' && typeof item[key] === 'string') {
            if (item[key].toLowerCase() !== val.toLowerCase()) return false;
          } else if (item[key] != val) {
            return false;
          }
        }
        return true;
      });
    }

    // Search filter across all string/number fields
    if (options?.search) {
      const q = options.search.toLowerCase().trim();
      items = items.filter(item => {
        return Object.values(item).some(v => {
          if (v === null || v === undefined) return false;
          if (typeof v === 'object') {
            return JSON.stringify(v).toLowerCase().includes(q);
          }
          return String(v).toLowerCase().includes(q);
        });
      });
    }

    // Sorting
    if (options?.sort) {
      const sortField = options.sort;
      const order = options.order === 'desc' ? -1 : 1;
      items = [...items].sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA === valB) return 0;
        if (valA === undefined) return 1;
        if (valB === undefined) return -1;
        if (typeof valA === 'number' && typeof valB === 'number') {
          return (valA - valB) * order;
        }
        return String(valA).localeCompare(String(valB)) * order;
      });
    }

    const total = items.length;
    const offset = Number(options?.offset) || 0;
    const limit = Number(options?.limit) || 100;
    const paginated = items.slice(offset, offset + limit);

    return {
      items: paginated,
      total,
      limit,
      offset
    };
  }

  public getById(collection: string, id: string): any | null {
    const list = this.data[collection] || [];
    return list.find(item => String(item.id) === String(id)) || null;
  }

  public insert(collection: string, record: any): any {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }

    const id = record.id || `${collection.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newRecord = {
      ...record,
      id,
      createdAt: record.createdAt || new Date().toISOString()
    };

    this.data[collection].unshift(newRecord);
    this.save();
    return newRecord;
  }

  public update(collection: string, id: string, updates: any): any | null {
    const list = this.data[collection];
    if (!list) return null;

    const idx = list.findIndex(item => String(item.id) === String(id));
    if (idx === -1) return null;

    const updated = {
      ...list[idx],
      ...updates,
      id: list[idx].id, // protect ID
      updatedAt: new Date().toISOString()
    };

    list[idx] = updated;
    this.save();
    return updated;
  }

  public delete(collection: string, id: string): boolean {
    const list = this.data[collection];
    if (!list) return false;

    const idx = list.findIndex(item => String(item.id) === String(id));
    if (idx === -1) return false;

    list.splice(idx, 1);
    this.save();
    return true;
  }

  public clear(collection: string): void {
    this.data[collection] = [];
    this.save();
  }

  public stretchDatabase(targetCollection: string = 'transactions', count: number = 100): { added: number; totalInCollection: number } {
    if (!this.data[targetCollection]) {
      this.data[targetCollection] = [];
    }

    const merchants = [
      'AWS Cloud Services', 'Microsoft Azure UK', 'Uber Eats Europe', 'Deliveroo London',
      'Air France Booking', 'Booking.com Amsterdam', 'WeWork Enterprise Space', 'Figma Subscription',
      'Slack Pro Technologies', 'Zoom Video Corp', 'Datadog APM Services', 'OpenAI API Platform',
      'Anthropic Compute API', 'Snowflake Cloud Data', 'Palantir Solutions', 'Stripe Terminal POS',
      'Square Cash Register', 'Adyen Global Interchange', 'Klarna Flexible Credit', 'Revolut Business FX'
    ];
    const categories = ['Cloud Hosting', 'Software & SaaS', 'Travel & Hotels', 'Food & Dining', 'FinTech & Payments'];
    const cardTypes = ['Visa Infinite Corporate', 'Visa Purchasing B2B', 'Visa Debit Commercial', 'Visa Signature Commercial'];
    const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'SGD', 'CHF'];
    const statuses = ['APPROVED', 'SETTLED', 'APPROVED', 'SETTLED', 'PENDING', 'APPROVED', 'REFUNDED'];

    const currentLen = this.data[targetCollection].length;

    for (let i = 1; i <= count; i++) {
      const idx = currentLen + i;
      let record: any;

      if (targetCollection === 'transactions') {
        const m = merchants[idx % merchants.length];
        const status = statuses[idx % statuses.length];
        const date = new Date(Date.now() - Math.floor(Math.random() * 86400000 * 45)).toISOString();
        record = {
          id: `txn_str_${Date.now().toString(36)}_${idx}`,
          transactionNumber: `STR-${900000 + idx}`,
          date,
          merchant: m,
          merchantCategory: categories[idx % categories.length],
          amount: Number((Math.random() * 950 + 20).toFixed(2)),
          currency: currencies[idx % currencies.length],
          status,
          cardLast4: ['4242', '9102', '5511', '8023', '3194', '6012', '7709'][idx % 7],
          cardType: cardTypes[idx % cardTypes.length],
          authCode: `AUTH${Math.floor(10000 + Math.random() * 89999)}`,
          channel: ['API_GATEWAY', 'E-COMMERCE', 'POS_NFC', 'RECURRING_BILLING'][idx % 4],
          networkFee: Number((Math.random() * 2.5 + 0.35).toFixed(2)),
          settlementDate: status === 'SETTLED' ? new Date().toISOString() : null,
          stretched: true
        };
      } else if (targetCollection === 'cards') {
        record = {
          id: `crd_str_${idx}`,
          cardholder: `Corporate User ${idx}`,
          last4: String(Math.floor(1000 + Math.random() * 8999)),
          expMonth: (idx % 12) + 1,
          expYear: 2027 + (idx % 4),
          brand: 'Visa',
          tier: cardTypes[idx % cardTypes.length],
          type: ['VIRTUAL', 'PHYSICAL', 'TOKENIZED'][idx % 3],
          status: 'ACTIVE',
          spendingLimit: (Math.floor(Math.random() * 10) + 1) * 10000,
          spentMonth: Number((Math.random() * 4000).toFixed(2)),
          currency: 'USD',
          department: 'Expanded Operations'
        };
      } else {
        record = {
          id: `rec_str_${idx}`,
          title: `Stretched Item #${idx}`,
          collection: targetCollection,
          data: { generatedIndex: idx, randomValue: Math.random(), timestamp: new Date().toISOString() },
          status: 'ACTIVE',
          createdAt: new Date().toISOString()
        };
      }

      this.data[targetCollection].unshift(record);
    }

    this.save();
    return {
      added: count,
      totalInCollection: this.data[targetCollection].length
    };
  }

  public resetDatabase(): void {
    this.data = generateInitialData();
    this.save();
  }

  public getStats(): DatabaseStats {
    let totalRecords = 0;
    const collections: Record<string, number> = {};

    for (const [key, val] of Object.entries(this.data)) {
      collections[key] = Array.isArray(val) ? val.length : 0;
      totalRecords += collections[key];
    }

    let fileSizeBytes = 0;
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        fileSizeBytes = fs.statSync(DB_FILE_PATH).size;
      }
    } catch {}

    return {
      totalRecords,
      collections,
      fileSizeBytes,
      lastUpdated: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
      accessMode: 'PUBLIC_OPEN',
      cors: 'ALLOW_ALL (*)'
    };
  }

  public exportAll(): Record<string, any[]> {
    return { ...this.data };
  }

  public importCollection(collection: string, items: any[]): number {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }
    const cleanItems = items.map((it, idx) => ({
      ...it,
      id: it.id || `${collection}_imp_${Date.now()}_${idx}`,
      importedAt: new Date().toISOString()
    }));
    this.data[collection] = [...cleanItems, ...this.data[collection]];
    this.save();
    return cleanItems.length;
  }
}

export const db = new PersistentDatabase();
