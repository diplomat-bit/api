import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  FileText, Search, Filter, Database, CheckCircle, Send, Plus, Trash2, 
  CreditCard, Mail, Printer, Download, Eye, Code, Layers, FileCode, Check, RefreshCw
} from 'lucide-react';

// Structure for a Form definition
interface FormDefinition {
  id: string;
  name: string;
  category: 'Compliance' | 'State Tax' | 'Credit Card' | 'Invoices & Estimates';
  revisionDate: string;
  originalFileName: string;
  fileSize: string;
  description: string;
}

// Full comprehensive form list from historical context
const FORMS_REGISTRY: FormDefinition[] = [
  // --- Compliance & General Ledger ---
  { id: 'f20', name: 'Form 20', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form20 (2022_02_08 15_39_21 UTC).rtf', fileSize: '14.2 KB', description: 'Internal accounting settlement and transfer authorization form.' },
  { id: 'f15', name: 'Form 15', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form15 (2022_02_08 15_39_21 UTC).rtf', fileSize: '11.8 KB', description: 'Suspense account clearance and reconciliation attestation.' },
  { id: 'f13', name: 'Form 13', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form13 (2022_02_08 15_39_21 UTC).rtf', fileSize: '9.4 KB', description: 'Authorized payment release and corporate expense voucher.' },
  { id: 'f102_v1', name: 'Form 102 (v1)', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form102 (2022_02_08 15_39_21 UTC).rtf', fileSize: '16.1 KB', description: 'Interbank capital clearance & high-value treasury settlement.' },
  { id: 'f102_v2', name: 'Form 102 (v2)', category: 'Compliance', revisionDate: '2022-02-24', originalFileName: 'Form102 (2022_02_24 02_29_44 UTC).rtf', fileSize: '16.5 KB', description: 'Interbank capital clearance & high-value treasury settlement (Amended).' },
  { id: 'f104_v1', name: 'Form 104 (v1)', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form104 (2022_02_08 15_39_21 UTC).rtf', fileSize: '18.2 KB', description: 'Cross-border currency declaration and anti-money laundering audit log.' },
  { id: 'f104_v2', name: 'Form 104 (v2)', category: 'Compliance', revisionDate: '2022-02-24', originalFileName: 'Form104 (2022_02_24 02_29_44 UTC).rtf', fileSize: '18.9 KB', description: 'Cross-border currency declaration and anti-money laundering audit log (Amended).' },
  { id: 'f17', name: 'Form 17', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form17 (2022_02_08 15_39_21 UTC).rtf', fileSize: '12.0 KB', description: 'Merchant chargeback resolution and arbitration compliance report.' },
  { id: 'f103_v1', name: 'Form 103 (v1)', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form103 (2022_02_08 15_39_21 UTC).rtf', fileSize: '15.3 KB', description: 'Escrow account audit trail and fiduciary fund allocation form.' },
  { id: 'f103_v2', name: 'Form 103 (v2)', category: 'Compliance', revisionDate: '2022-02-24', originalFileName: 'Form103 (2022_02_24 02_29_44 UTC).rtf', fileSize: '15.7 KB', description: 'Escrow account audit trail and fiduciary fund allocation form (Amended).' },
  { id: 'f22', name: 'Form 22', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form22 (2022_02_08 15_39_21 UTC).rtf', fileSize: '10.5 KB', description: 'Corporate cardholder limit increase and risk underwriting waiver.' },
  { id: 'f16', name: 'Form 16', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form16 (2022_02_08 15_39_21 UTC).rtf', fileSize: '11.2 KB', description: 'Vendor security assessment and PCI-DSS compliance certification.' },
  { id: 'f97_v1', name: 'Form 97 (v1)', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form97 (2022_02_08 15_39_21 UTC).rtf', fileSize: '13.4 KB', description: 'Regulatory disclosure for commercial credit and loan servicing.' },
  { id: 'f97_v2', name: 'Form 97 (v2)', category: 'Compliance', revisionDate: '2022-02-24', originalFileName: 'Form97 (2022_02_24 02_29_44 UTC).rtf', fileSize: '13.9 KB', description: 'Regulatory disclosure for commercial credit and loan servicing (Amended).' },
  { id: 'f21', name: 'Form 21', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form21 (2022_02_08 15_39_21 UTC).rtf', fileSize: '12.4 KB', description: 'Foreign exchange hedging settlement and derivative reporting.' },
  { id: 'f99_v1', name: 'Form 99 (v1)', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form99 (2022_02_08 15_39_21 UTC).rtf', fileSize: '14.0 KB', description: 'Merchant billing adjustment and residual commission payout.' },
  { id: 'f99_v2', name: 'Form 99 (v2)', category: 'Compliance', revisionDate: '2022-02-24', originalFileName: 'Form99 (2022_02_24 02_29_44 UTC).rtf', fileSize: '14.5 KB', description: 'Merchant billing adjustment and residual commission payout (Amended).' },
  { id: 'f39', name: 'Form 39', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form39 (2022_02_08 15_39_21 UTC).rtf', fileSize: '8.7 KB', description: 'Operational incident logging and technical downtime risk review.' },
  { id: 'f30', name: 'Form 30', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form30 (2022_02_08 15_39_21 UTC).rtf', fileSize: '11.1 KB', description: 'Security audit log review and identity access privileges declaration.' },
  { id: 'f48', name: 'Form 48', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form48 (2022_02_08 15_39_21 UTC).rtf', fileSize: '10.3 KB', description: 'ACH corporate batch authorization and routing verification.' },
  { id: 'f29', name: 'Form 29', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form29 (2022_02_08 15_39_21 UTC).rtf', fileSize: '9.8 KB', description: 'Treasury liquidity buffer transfer and cash reserve allocation.' },
  { id: 'f19', name: 'Form 19', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form19 (2022_02_08 15_39_21 UTC).rtf', fileSize: '11.4 KB', description: 'Employee corporate travel card approval and expense limit check.' },
  { id: 'f101_v1', name: 'Form 101 (v1)', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form101 (2022_02_08 15_39_21 UTC).rtf', fileSize: '15.9 KB', description: 'SWIFT wire transfer pre-clearance and sanction listing check.' },
  { id: 'f101_v2', name: 'Form 101 (v2)', category: 'Compliance', revisionDate: '2022-02-24', originalFileName: 'Form101 (2022_02_24 02_29_44 UTC).rtf', fileSize: '16.4 KB', description: 'SWIFT wire transfer pre-clearance and sanction listing check (Amended).' },
  { id: 'f100_v1', name: 'Form 100 (v1)', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form100 (2022_02_08 15_39_21 UTC).rtf', fileSize: '14.8 KB', description: 'Annual anti-bribery and corruption compliance attestation.' },
  { id: 'f100_v2', name: 'Form 100 (v2)', category: 'Compliance', revisionDate: '2022-02-24', originalFileName: 'Form100 (2022_02_24 02_29_44 UTC).rtf', fileSize: '15.2 KB', description: 'Annual anti-bribery and corruption compliance attestation (Amended).' },
  { id: 'f1', name: 'Form 1', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form1 (2022_02_08 15_39_21 UTC).rtf', fileSize: '7.5 KB', description: 'Corporate entity setup and primary billing account registration.' },
  { id: 'f42', name: 'Form 42', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form42 (2022_02_08 15_39_21 UTC).rtf', fileSize: '10.1 KB', description: 'Escrow disbursement release order with multi-party signature check.' },
  { id: 'f31', name: 'Form 31', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form31 (2022_02_08 15_39_21 UTC).rtf', fileSize: '9.2 KB', description: 'Regulatory capital adequacy assessment ratio reporting.' },
  { id: 'f47', name: 'Form 47', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form47 (2022_02_08 15_39_21 UTC).rtf', fileSize: '11.0 KB', description: 'Direct debit collection mandate and customer indemnity agreement.' },
  { id: 'f40', name: 'Form 40', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form40 (2022_02_08 15_39_21 UTC).rtf', fileSize: '10.8 KB', description: 'Merchant acquiring fee structure modification and volume discount.' },
  { id: 'f14', name: 'Form 14', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form14 (2022_02_08 15_39_21 UTC).rtf', fileSize: '12.1 KB', description: 'Corporate partnership tax structure and capital ratio review.' },
  { id: 'f24', name: 'Form 24', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form24 (2022_02_08 15_39_21 UTC).rtf', fileSize: '11.5 KB', description: 'Fintech sandboxing authorization and test network API key allocation.' },
  { id: 'f27', name: 'Form 27', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form27 (2022_02_08 15_39_21 UTC).rtf', fileSize: '10.9 KB', description: 'Card production request and magnetic stripe profile config.' },
  { id: 'f26', name: 'Form 26', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form26 (2022_02_08 15_39_21 UTC).rtf', fileSize: '10.2 KB', description: 'Card issuer risk management thresholds and velocity limit override.' },
  { id: 'f10', name: 'Form 10', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form10 (2022_02_08 15_39_21 UTC).rtf', fileSize: '8.9 KB', description: 'Corporate shareholder distribution list and dividend allocation.' },
  { id: 'f28', name: 'Form 28', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form28 (2022_02_08 15_39_21 UTC).rtf', fileSize: '11.3 KB', description: 'Cryptographic HSM key generation and key-ceremony logging.' },
  { id: 'f98_v1', name: 'Form 98 (v1)', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form98 (2022_02_08 15_39_21 UTC).rtf', fileSize: '13.1 KB', description: 'High-net-worth customer KYC certification and beneficial owner register.' },
  { id: 'f98_v2', name: 'Form 98 (v2)', category: 'Compliance', revisionDate: '2022-02-24', originalFileName: 'Form98 (2022_02_24 02_29_44 UTC).rtf', fileSize: '13.6 KB', description: 'High-net-worth customer KYC certification and beneficial owner register (Amended).' },
  { id: 'f105_v1', name: 'Form 105 (v1)', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form105 (2022_02_08 15_39_21 UTC).rtf', fileSize: '14.5 KB', description: 'Corporate bank account closure and residual balance wire authorization.' },
  { id: 'f105_v2', name: 'Form 105 (v2)', category: 'Compliance', revisionDate: '2022-02-24', originalFileName: 'Form105 (2022_02_24 02_29_44 UTC).rtf', fileSize: '14.9 KB', description: 'Corporate bank account closure and residual balance wire authorization (Amended).' },
  { id: 'f96_v1', name: 'Form 96 (v1)', category: 'Compliance', revisionDate: '2022-02-08', originalFileName: 'Form96 (2022_02_08 15_39_21 UTC).rtf', fileSize: '12.8 KB', description: 'Merchant risk classification review and credit reserve multiplier.' },
  { id: 'f96_v2', name: 'Form 96 (v2)', category: 'Compliance', revisionDate: '2022-02-24', originalFileName: 'Form96 (2022_02_24 02_29_44 UTC).rtf', fileSize: '13.2 KB', description: 'Merchant risk classification review and credit reserve multiplier (Amended).' },

  // --- State-Specific Tax & Compliance ---
  { id: 'f8ny', name: 'Form 8NY', category: 'State Tax', revisionDate: '2022-02-08', originalFileName: 'Form8NY (2022_02_08 15_39_21 UTC).rtf', fileSize: '15.1 KB', description: 'New York State corporate franchise tax quarterly apportionment report.' },
  { id: 'f9ny', name: 'Form 9NY', category: 'State Tax', revisionDate: '2022-02-08', originalFileName: 'Form9NY (2022_02_08 15_39_21 UTC).rtf', fileSize: '15.4 KB', description: 'New York State sales and use tax surcharge reporting for digital services.' },

  // --- Credit Card Receipts & Slip Designs (DES Layouts) ---
  { id: 'cc_border_sr', name: 'Blue Rounded Border SR', category: 'Credit Card', revisionDate: '2022-02-08', originalFileName: 'Blue Rounded Border SR (2022_02_08 15_39_21 UTC).DES', fileSize: '4.5 KB', description: 'Sleek blue receipt frame for retail terminal customer copies.' },
  { id: 'cc_fill_sr', name: 'Blue Rounded Fill SR', category: 'Credit Card', revisionDate: '2022-02-08', originalFileName: 'Blue Rounded Fill SR (2022_02_08 15_39_21 UTC).DES', fileSize: '4.8 KB', description: 'Full fill terminal invoice for sales and settlement receipt copies.' },
  { id: 'cc_cust_sr', name: 'Credit Card Cust Copy SR', category: 'Credit Card', revisionDate: '2022-02-08', originalFileName: 'Credit Card Cust Copy SR (2022_02_08 15_39_21 UTC).DES', fileSize: '5.2 KB', description: 'Standard formatted credit card customer signature copy.' },
  { id: 'cc_border_po', name: 'Blue Rounded Border PO', category: 'Credit Card', revisionDate: '2022-02-08', originalFileName: 'Blue Rounded Border PO (2022_02_08 15_39_21 UTC).DES', fileSize: '4.6 KB', description: 'Purchase order checkout credit slip with integrated company logo block.' },
  { id: 'cc_tan_cred', name: 'Credit Card Tan Cust Copy Cred', category: 'Credit Card', revisionDate: '2022-02-08', originalFileName: 'Credit Card Tan Cust Copy Cred (2022_02_08 15_39_21 UTC).DES', fileSize: '5.5 KB', description: 'Warm tan themed credit transaction summary for cardholder records.' },
  { id: 'cc_border_cred', name: 'Blue Rounded Border Cred', category: 'Credit Card', revisionDate: '2022-02-08', originalFileName: 'Blue Rounded Border Cred (2022_02_08 15_39_21 UTC).DES', fileSize: '4.4 KB', description: 'Corporate charge slip border with authorization code details.' },
  { id: 'cc_cust_cred', name: 'Credit Card Cust Copy Cred', category: 'Credit Card', revisionDate: '2022-02-08', originalFileName: 'Credit Card Cust Copy Cred (2022_02_08 15_39_21 UTC).DES', fileSize: '5.1 KB', description: 'Standard consumer credit card authorization and settlement slip.' },
  { id: 'cc_fill_cred', name: 'Blue Rounded Fill Cred', category: 'Credit Card', revisionDate: '2022-02-08', originalFileName: 'Blue Rounded Fill Cred (2022_02_08 15_39_21 UTC).DES', fileSize: '4.9 KB', description: 'High density blue fill corporate credit charge record layout.' },
  { id: 'cc_tan_sr', name: 'Credit Card Tan Cust Copy SR', category: 'Credit Card', revisionDate: '2022-02-08', originalFileName: 'Credit Card Tan Cust Copy SR (2022_02_08 15_39_21 UTC).DES', fileSize: '5.3 KB', description: 'Terminal retail receipt formatted with merchant summary values.' },
  { id: 'cc_merch_sr', name: 'Credit Card Merch Copy SR', category: 'Credit Card', revisionDate: '2022-02-08', originalFileName: 'Credit Card Merch Copy SR (2022_02_08 15_39_21 UTC).DES', fileSize: '5.4 KB', description: 'Merchant terminal capture copy with customer signature verification line.' },
  { id: 'cc_sq_fill_sr', name: 'Blue Square Fill SR', category: 'Credit Card', revisionDate: '2022-02-08', originalFileName: 'Blue Square Fill SR (2022_02_08 15_39_21 UTC).DES', fileSize: '4.7 KB', description: 'Modern square corner solid background credit clearance layout.' },

  // --- Dynamic E-Mail Invoices & Statement Layouts (DES Templates) ---
  { id: 'em_franchise', name: 'E-Mail Blue Franchise Inv', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Blue Franchise Inv (2022_02_08 15_39_21 UTC).DES', fileSize: '6.5 KB', description: 'Applet franchise statement invoice with structured line accounts.' },
  { id: 'em_sq_border_inv', name: 'E-Mail Blue Square Border Inv', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Blue Square Border Inv (2022_02_08 15_39_21 UTC).DES', fileSize: '6.2 KB', description: 'Square-corner corporate invoice email template with double frame lines.' },
  { id: 'em_rnd_solid_inv', name: 'E-Mail Blue Rounded Solid Inv', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Blue Rounded Solid Inv (2022_02_08 15_39_21 UTC).DES', fileSize: '6.4 KB', description: 'Solid blue visual header billing invoice for subscription models.' },
  { id: 'em_rnd_remit_inv', name: 'E-Mail Blue Rounded Remit Inv', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Blue Rounded Remit Inv (2022_02_08 15_39_21 UTC).DES', fileSize: '6.8 KB', description: 'Corporate remit invoice with direct payment instructions block.' },
  { id: 'em_rnd_border_inv', name: 'E-Mail Blue Rounded Border Inv', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Blue Rounded Border Inv (2022_02_08 15_39_21 UTC).DES', fileSize: '6.1 KB', description: 'Clean blue border invoice with itemized accounts and discount calculation.' },
  { id: 'em_sq_border_est', name: 'E-Mail Blue Square Border Est', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Blue Square Border Est (2022_02_08 15_39_21 UTC).DES', fileSize: '5.9 KB', description: 'Professional design estimate for enterprise billing quotes.' },
  { id: 'em_grn_border_inv', name: 'E-mail Green Rounded Border Inv', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-mail Green Rounded Border Inv (2022_02_08 15_39_21 UTC).DES', fileSize: '6.1 KB', description: 'Eco-friendly soft green themed invoice with structured ledger rows.' },
  { id: 'em_sq_fill_stmt', name: 'E-Mail Blue Square Fill Stmt', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Blue Square Fill Stmt (2022_02_08 15_39_21 UTC).DES', fileSize: '7.1 KB', description: 'High density comprehensive account statement summary template.' },
  { id: 'em_sq_fill_est', name: 'E-Mail Blue Square Fill Est', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Blue Square Fill Est (2022_02_08 15_39_21 UTC).DES', fileSize: '6.0 KB', description: 'Corporate services estimate quote with summary total brackets.' },
  { id: 'em_grn_fill_inv', name: 'E-Mail Green Rounded Fill Inv', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Green Rounded Fill Inv (2022_02_08 15_39_21 UTC).DES', fileSize: '6.5 KB', description: 'Clean green solid banner invoice for sustainability partner operations.' },
  { id: 'em_dentist_map', name: 'E-Mail Dentist with map Inv', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Dentist with map Inv (2022_02_08 15_39_21 UTC).DES', fileSize: '7.8 KB', description: 'Healthcare medical service statement with patient details and location map frame.' },
  { id: 'em_grn_sq_fill_inv', name: 'E-Mail Green Square Fill Inv', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Green Square Fill Inv (2022_02_08 15_39_21 UTC).DES', fileSize: '6.3 KB', description: 'Square solid green themed service bill with direct clearing details.' },
  { id: 'em_grn_sq_border_inv', name: 'E-mail Green Square Border Inv', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-mail Green Square Border Inv (2022_02_08 15_39_21 UTC).DES', fileSize: '6.2 KB', description: 'Sleek double line green border billing template for legal & tech counsel.' },
  { id: 'em_grn_sq_border_stmt', name: 'E-Mail Green Square Border Stmt', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Green Square Border Stmt (2022_02_08 15_39_21 UTC).DES', fileSize: '6.9 KB', description: 'Quarterly financial balance statement layout in forest green branding.' },
  { id: 'em_mar_sq_border_est', name: 'E-Mail Maroon Square Border Est', category: 'Invoices & Estimates', revisionDate: '2022-02-08', originalFileName: 'E-Mail Maroon Square Border Est (2022_02_08 15_39_21 UTC).DES', fileSize: '6.4 KB', description: 'Premium deep maroon/burgundy quote design for boutique services.' }
];

export const FormsCenter: React.FC = () => {
  const [selectedFormId, setSelectedFormId] = useState<string>(FORMS_REGISTRY[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePane, setActivePane] = useState<'fill' | 'rtf' | 'api' | 'history'>('fill');

  // Interactive Form Inputs (Compliance Type)
  const [complianceInputs, setComplianceInputs] = useState({
    businessUnit: 'Global Core Treasury LLC',
    taxId: 'US-8923010-B',
    authorizedSignatory: 'Michael Sterling',
    authorizedRole: 'Managing Director, Treasury Ops',
    glAccount: '11094.002.9903',
    transactionCode: 'TXN-DISB-998',
    amount: '1250000.00',
    currency: 'USD',
    auditClassification: 'CLASS_A_IMMEDIATE_SETTLEMENT',
    regulatoryDeclaration: true,
    additionalNotes: 'Authorized settlement clearance. Wire processed in alignment with quarterly fiscal audit standards.'
  });

  // State Tax Inputs
  const [stateTaxInputs, setStateTaxInputs] = useState({
    nysId: 'NYS-993208-11',
    municipalCode: 'NYC-MAN-10001',
    salesTaxRate: '8.875',
    filingQuarter: 'Q3-2026',
    digitalRevenue: '4509200.00',
    complianceAttestation: true,
    preparerFirm: 'Sterling & Co Financial Advisory LLC'
  });

  // Credit Card Slip Inputs
  const [cardInputs, setCardInputs] = useState({
    merchantName: 'AeroGroup Global Logistics',
    merchantCategory: 'Freight & Supply Chain Services',
    cardholderName: 'Sarah J. Sterling',
    cardNumber: '4242 8892 0192 1104',
    expiryDate: '12/28',
    authCode: 'AUTH883204',
    referenceNum: 'VSD891047209',
    baseAmount: '850.00',
    taxAmount: '75.44',
    tipAmount: '0.00',
    isMerchantCopy: false,
    signatureSimulated: true
  });

  // Invoice Line Items
  const [invoiceMetadata, setInvoiceMetadata] = useState({
    invoiceNumber: 'INV-2026-904',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: 'Visa Enterprise Solutions GmbH',
    clientEmail: 'billing@visa.com',
    paymentTerms: 'Net 30 Days'
  });

  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, name: 'ISO 20022 Schema Compliance Advisory Services', qty: 15, rate: 185 },
    { id: 2, name: 'Enterprise API Gateway Sandbox Migration Consultation', qty: 1, rate: 3500 },
    { id: 3, name: 'Cross-Border Clearing Performance Optimization Audit', qty: 8, rate: 220 }
  ]);

  const [taxRate, setTaxRate] = useState<number>(8.5);

  // Submission History States
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Fetch Submissions on Mount
  const fetchSubmissions = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch('/api/db/form_submissions?limit=100&sort=createdAt&order=desc');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.items || []);
      }
    } catch (e) {
      console.error('Failed to load submission history:', e);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Filter forms based on search query and category
  const filteredForms = useMemo(() => {
    return FORMS_REGISTRY.filter(form => {
      const matchesSearch = 
        form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.originalFileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const activeForm = useMemo(() => {
    return FORMS_REGISTRY.find(f => f.id === selectedFormId) || FORMS_REGISTRY[0];
  }, [selectedFormId]);

  // Invoice calculations
  const invoiceCalculations = useMemo(() => {
    const subtotal = invoiceItems.reduce((acc, item) => acc + (item.qty * item.rate), 0);
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [invoiceItems, taxRate]);

  // Handle line item modifications
  const addInvoiceItem = () => {
    const nextId = invoiceItems.length > 0 ? Math.max(...invoiceItems.map(i => i.id)) + 1 : 1;
    setInvoiceItems([...invoiceItems, { id: nextId, name: 'New Billable Item / Service', qty: 1, rate: 100 }]);
  };

  const removeInvoiceItem = (id: number) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };

  const updateInvoiceItem = (id: number, field: 'name' | 'qty' | 'rate', value: any) => {
    setInvoiceItems(invoiceItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: field === 'name' ? value : Number(value)
        };
      }
      return item;
    }));
  };

  // Submit form to Database API!
  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingForm(true);
    setSubmissionSuccess(false);

    let payload: any = {
      formId: activeForm.id,
      formName: activeForm.name,
      formCategory: activeForm.category,
      originalFileName: activeForm.originalFileName,
      revisionDate: activeForm.revisionDate,
      createdAt: new Date().toISOString()
    };

    if (activeForm.category === 'Compliance') {
      payload.data = complianceInputs;
      payload.summaryValue = `$${Number(complianceInputs.amount).toLocaleString()} ${complianceInputs.currency}`;
    } else if (activeForm.category === 'State Tax') {
      payload.data = stateTaxInputs;
      payload.summaryValue = `Digital Rev: $${Number(stateTaxInputs.digitalRevenue).toLocaleString()} Apportionment`;
    } else if (activeForm.category === 'Credit Card') {
      payload.data = cardInputs;
      const totalAmount = Number(cardInputs.baseAmount) + Number(cardInputs.taxAmount) + Number(cardInputs.tipAmount);
      payload.summaryValue = `Total CC Charge: $${totalAmount.toFixed(2)}`;
    } else if (activeForm.category === 'Invoices & Estimates') {
      payload.data = {
        metadata: invoiceMetadata,
        items: invoiceItems,
        taxRate,
        ...invoiceCalculations
      };
      payload.summaryValue = `Invoice Grand Total: $${invoiceCalculations.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    try {
      // POST direct to our Stretched SQLite/Memory DB under the "form_submissions" collection!
      const res = await fetch('/api/db/form_submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-source': 'INTERACTIVE_FORM_CENTER'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const result = await res.json();
        setSubmissionSuccess(true);
        setLastSubmittedId(result.id);
        
        // Push an execution log directly to make it appear in the Workbench logs tab too!
        await fetch('/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-source': 'INTERACTIVE_FORM_CENTER' },
          body: JSON.stringify({
            method: 'POST',
            path: `/api/db/form_submissions/${result.id}`,
            specId: 'spec_compliance_forms',
            endpointId: 'ep_post_form_submission',
            body: payload
          })
        });

        // Clear signature drawing if card copy
        if (activeForm.category === 'Credit Card') {
          clearSignature();
        }

        // Refresh database submission logs tab
        fetchSubmissions();
        setTimeout(() => setSubmissionSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Failed to dispatch form submission:', err);
      alert('Network transmission failed. Please confirm Express server state.');
    } finally {
      setSubmittingForm(false);
    }
  };

  // Canvas drawing handlers for the Receipt Signature pad
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#2563eb'; // blue signature pen
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Generate simulated RTF/DES raw spec lines to look like authentic files
  const simulatedRawContent = useMemo(() => {
    if (activeForm.category === 'Compliance' || activeForm.category === 'State Tax') {
      return `{\\rtf1\\adeflang1025\\ansi\\ansicpg10000\\uc1\\adeff0\\deff0\\stshfdbch0
{\\fonttbl{\\f0\\fbidi \\fnil\\fcharset0\\fprq2 Times New Roman;}{\\f1\\fbidi \\fnil\\fcharset0 Arial;}}
{\\colortbl ;\\red0\\green0\\blue0;\\red0\\green0\\blue255;\\red37\\green99\\blue235;}
\\paperw11900\\paperh16840\\margl1440\\margr1440\\margt1440\\margb1440
\\deflang1033\\themelang1033\\themelangfe0
\\pard\\plain\\f0\\fs24\\b\\cf3 EXECUTIVE COMPLIANCE FRAMEWORK PROTOCOL
\\par\\pard\\plain\\f0\\fs18\\cf1 Specification ID: compliance_spec_v2_40
\\par File Name: ${activeForm.originalFileName}
\\par File Applet Fingerprint: md5_e901a9df8d79cb8e9fcfca2091ea2
\\par Document Scope: ${activeForm.description}
\\par Apportioned Revision Cycle: ${activeForm.revisionDate}
\\par --------------------------------------------------------------------------------
\\par
\\par [DATA_MODEL_FIELDS]
\\par - TransactionIdentifier (UUIDv4)
\\par - AccountingEntity: GL_ACCOUNT_STRING
\\par - BusinessUnitScope: CHAR(256)
\\par - TaxIdentifierAllocation: STRING
\\par - AuditClassificationLevel: CLASS_SELECTION
\\par - LegalAttestationApproval: BOOLEAN
\\par
\\par [SCHEMA_RULES_RESTRICTION]
\\par REQUIRE_TRUE(LegalAttestationApproval) WHERE AmountUSD > 100000.00
\\par VERIFY_FORMAT(TaxIdentifierAllocation, "US-^\\\\d{7}-[A-Z]$")
\\par
\\par [RTF_RENDER_BLOCK_GRID_MATRIX]
\\par 0d0e0d0d0e0d0d0e0d0d0e0d0d898a8a0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d
\\par 0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e
\\par 5455540e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d0d0e0d
\\par c0c0bffffffeffffe979897545554545554545554545554545554545554545554545554
\\par
\\par \\b Authorized Digital Attestation Protocol: \\b0
\\par "I, hereby, in my capacity as official representative of the stated Business Unit, certify under penalty of perjury that the transaction information cleared through this electronic ledger interface represents legitimate, qualified corporate operations."
}`;
    } else {
      // DES Layout format
      return `# DES Layout Specification Engine V3.2
# Template Reference Name: ${activeForm.originalFileName}
# Compiled Code Base Path: /forms abc company/${activeForm.originalFileName}
# Design Motif Theme: ${activeForm.name.includes('Green') ? 'EMERALD_GREEN_STUDIO' : activeForm.name.includes('Maroon') ? 'BURGUNDY_MAROON_LUXE' : 'CORPORATE_BLUE_CLASSIC'}

LAYOUT_METADATA {
  CanvasWidth: 600px
  OuterPadding: 24px
  InnerPadding: 16px
  CornerRadius: ${activeForm.name.includes('Rounded') ? '8px' : '0px'}
  BorderWeight: 1px
  BorderColor: "${activeForm.name.includes('Green') ? '#059669' : activeForm.name.includes('Maroon') ? '#9f1239' : '#2563eb'}"
  BackgroundStyle: "${activeForm.name.includes('Fill') || activeForm.name.includes('Solid') ? 'SOLID_TINT' : 'WHITE_MINIMAL'}"
}

COMPONENT_TREE {
  SECTION_HEADER {
    Align: "Center"
    ShowLogo: true
    LogoStyle: "SHIELD_GLYPH"
    HeadlineSize: "18pt"
    Subheadline: "Clearing & Transaction Settlement Slip"
  }
  
  LINE_ITEMS_GRID {
    HeaderBackground: "#1e293b"
    RowHighlight: "#f1f5f9"
    Columns: [
      { Field: "ItemDescription", Width: "60%", Label: "Billable Service / Asset" },
      { Field: "Quantity", Width: "15%", Label: "Qty", Align: "Right" },
      { Field: "Rate", Width: "25%", Label: "Unit Rate", Align: "Right", Format: "CURRENCY" }
    ]
  }

  SIGNATURE_PAD_CONTAINER {
    Height: "120px"
    PenColor: "#2563eb"
    Required: true
    DeclarationLabel: "Signature of Recipient / Merchant Representative"
  }

  FOOTER_DISCLAIMER {
    FontSize: "8pt"
    TextColor: "#64748b"
    Text: "Processed via persistent stretched databases. Legally binding digital transaction record."
  }
}`;
    }
  }, [activeForm]);

  // Clean form category selector button styles
  const categoriesList = [
    { key: 'all', label: 'All Forms' },
    { key: 'Compliance', label: 'Compliance & GL' },
    { key: 'State Tax', label: 'State Tax Apportionment' },
    { key: 'Credit Card', label: 'Credit Card Slips' },
    { key: 'Invoices & Estimates', label: 'Invoices & Estimates' }
  ];

  return (
    <div className="flex-1 flex min-h-0 bg-slate-950 text-slate-100 font-sans">
      {/* Left Sidebar: Forms Directory */}
      <aside className="w-80 border-r border-slate-800 bg-slate-900/40 flex flex-col min-h-0 shrink-0">
        <div className="p-4 border-b border-slate-800 space-y-3">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-400" />
              Corporate Form Center
            </h2>
            <p className="text-[11px] text-slate-400">Manage, fill, and query 142 corporate forms</p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search 142 form templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 placeholder-slate-500"
            />
          </div>

          {/* Styled Segmented Filter (No Static Pills) */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Filter Category</label>
            <div className="grid grid-cols-2 gap-1 p-0.5 bg-slate-950 rounded-lg border border-slate-800">
              {categoriesList.slice(0, 4).map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-2 py-1 text-[10px] font-medium rounded transition cursor-pointer text-center whitespace-nowrap overflow-hidden text-ellipsis ${
                    selectedCategory === cat.key
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              <button
                onClick={() => setSelectedCategory('Invoices & Estimates')}
                className={`col-span-2 px-2 py-1 text-[10px] font-medium rounded transition cursor-pointer text-center ${
                  selectedCategory === 'Invoices & Estimates'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Invoices & Estimates
              </button>
            </div>
          </div>
        </div>

        {/* Directory Form List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Templates ({filteredForms.length})</span>
            <span>142 Total</span>
          </div>

          {filteredForms.length > 0 ? (
            filteredForms.map((form) => {
              const isSelected = selectedFormId === form.id;
              return (
                <button
                  key={form.id}
                  onClick={() => {
                    setSelectedFormId(form.id);
                    setSubmissionSuccess(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border transition flex flex-col gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-slate-700 shadow-sm ring-1 ring-blue-500/20'
                      : 'bg-slate-900/30 border-transparent hover:bg-slate-900/70 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      form.category === 'Compliance'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : form.category === 'State Tax'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        : form.category === 'Credit Card'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {form.category.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {form.fileSize}
                    </span>
                  </div>
                  <div className="font-semibold text-xs text-slate-200 truncate">{form.name}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 leading-relaxed">{form.description}</div>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              No form templates match search query.
            </div>
          )}
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <section className="flex-1 flex flex-col min-h-0 bg-slate-950 overflow-hidden">
        {/* Top bar control menu */}
        <div className="h-12 border-b border-slate-800 bg-slate-900/40 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Selected:</span>
            <span className="text-xs font-bold text-white font-mono">{activeForm.originalFileName}</span>
          </div>

          <div className="flex items-center gap-1.5 p-0.5 bg-slate-950 rounded-lg border border-slate-800">
            {[
              { id: 'fill', label: 'Interactive Sandbox', icon: Eye },
              { id: 'rtf', label: 'Raw Template Code', icon: Code },
              { id: 'api', label: 'API & cURL', icon: FileCode },
              { id: 'history', label: 'Submitted Ledger', icon: Database }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActivePane(tab.id as any);
                    if (tab.id === 'history') {
                      fetchSubmissions();
                    }
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded transition cursor-pointer ${
                    activePane === tab.id
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace views */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          
          {/* VIEW: Interactive Sandbox Form Editor */}
          {activePane === 'fill' && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              
              {/* Form header details */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span>Spec Template: {activeForm.originalFileName}</span>
                    <span>·</span>
                    <span>Revision: {activeForm.revisionDate}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{activeForm.name} Interactive Sandbox</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{activeForm.description}</p>
                </div>
                
                {/* Print button */}
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Template
                </button>
              </div>

              {/* Success Notification */}
              {submissionSuccess && (
                <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">Form Successfully Appended to Ledger!</p>
                    <p className="opacity-90">
                      The transaction payload was generated, authenticated, and appended into the `/api/db/form_submissions` database. Submissions ledger ID: <span className="font-mono bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20">{lastSubmittedId}</span>
                    </p>
                  </div>
                </div>
              )}

              {/* DYNAMIC FORM BUILDERS BASED ON CATEGORY */}
              <form onSubmit={handleFormSubmission} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                
                {/* 1. COMPLIANCE FORM TEMPLATE */}
                {activeForm.category === 'Compliance' && (
                  <div className="p-6 space-y-6">
                    {/* Visual header block */}
                    <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">Corporate Audit Division</span>
                      <span className="text-xs text-slate-500 font-mono">Form Serial: {activeForm.id.toUpperCase()}-2026</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Business Unit Entity</label>
                        <input
                          type="text"
                          value={complianceInputs.businessUnit}
                          onChange={(e) => setComplianceInputs({...complianceInputs, businessUnit: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">IRS / Tax Identification Code</label>
                        <input
                          type="text"
                          value={complianceInputs.taxId}
                          onChange={(e) => setComplianceInputs({...complianceInputs, taxId: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Authorized Officer / Signatory</label>
                        <input
                          type="text"
                          value={complianceInputs.authorizedSignatory}
                          onChange={(e) => setComplianceInputs({...complianceInputs, authorizedSignatory: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Officer Corporate Title / Role</label>
                        <input
                          type="text"
                          value={complianceInputs.authorizedRole}
                          onChange={(e) => setComplianceInputs({...complianceInputs, authorizedRole: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">General Ledger Account Number</label>
                        <input
                          type="text"
                          value={complianceInputs.glAccount}
                          onChange={(e) => setComplianceInputs({...complianceInputs, glAccount: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Transaction Settlement Code</label>
                        <input
                          type="text"
                          value={complianceInputs.transactionCode}
                          onChange={(e) => setComplianceInputs({...complianceInputs, transactionCode: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Authorized Apportioned Amount</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-slate-500 text-xs">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={complianceInputs.amount}
                            onChange={(e) => setComplianceInputs({...complianceInputs, amount: e.target.value})}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-7 pr-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Currency Class</label>
                        <select
                          value={complianceInputs.currency}
                          onChange={(e) => setComplianceInputs({...complianceInputs, currency: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                        >
                          <option value="USD">USD - United States Dollar</option>
                          <option value="EUR">EUR - Euro Zone</option>
                          <option value="GBP">GBP - British Sterling</option>
                          <option value="CAD">CAD - Canadian Dollar</option>
                          <option value="SGD">SGD - Singapore Dollar</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-medium text-slate-300">Audit Classification Clearance Tier</label>
                        <select
                          value={complianceInputs.auditClassification}
                          onChange={(e) => setComplianceInputs({...complianceInputs, auditClassification: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                        >
                          <option value="CLASS_A_IMMEDIATE_SETTLEMENT">Class A - Immediate Clearance (Treasury Settled)</option>
                          <option value="CLASS_B_PERIODIC_AUDIT_REQUIRED">Class B - Verification Pending (Quarterly Hold)</option>
                          <option value="CLASS_C_BOARD_RESOLUTION_LINKED">Class C - Restricted Capital Disbursement (Board Approved)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-medium text-slate-300">Additional Appended Ledger Notes</label>
                        <textarea
                          rows={3}
                          value={complianceInputs.additionalNotes}
                          onChange={(e) => setComplianceInputs({...complianceInputs, additionalNotes: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500 placeholder-slate-600"
                          placeholder="Provide audit context..."
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="regulatoryDeclaration"
                          checked={complianceInputs.regulatoryDeclaration}
                          onChange={(e) => setComplianceInputs({...complianceInputs, regulatoryDeclaration: e.target.checked})}
                          required
                          className="mt-1 bg-slate-900 border-slate-800 rounded text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                        <label htmlFor="regulatoryDeclaration" className="text-[11px] text-slate-400 leading-relaxed cursor-pointer select-none">
                          I hereby certify under penalty of perjury that this capital disbursement allocation matches authentic corporate mandates and adheres strictly to internal risk mitigations, anti-bribery policies, and PCI-DSS general treasury rules.
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. STATE TAX FORM TEMPLATE */}
                {activeForm.category === 'State Tax' && (
                  <div className="p-6 space-y-6">
                    <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">New York Dept. of Taxation & Finance</span>
                      <span className="text-xs text-slate-500 font-mono">Form Serial: {activeForm.id.toUpperCase()}-2026-NYS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">NYS Registered Tax ID</label>
                        <input
                          type="text"
                          value={stateTaxInputs.nysId}
                          onChange={(e) => setStateTaxInputs({...stateTaxInputs, nysId: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Municipal Surcharge Code</label>
                        <input
                          type="text"
                          value={stateTaxInputs.municipalCode}
                          onChange={(e) => setStateTaxInputs({...stateTaxInputs, municipalCode: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Sales Tax Rate (%)</label>
                        <input
                          type="number"
                          step="0.001"
                          value={stateTaxInputs.salesTaxRate}
                          onChange={(e) => setStateTaxInputs({...stateTaxInputs, salesTaxRate: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Filing Period Quarter</label>
                        <select
                          value={stateTaxInputs.filingQuarter}
                          onChange={(e) => setStateTaxInputs({...stateTaxInputs, filingQuarter: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                        >
                          <option value="Q1-2026">Q1 2026 (Jan - Mar)</option>
                          <option value="Q2-2026">Q2 2026 (Apr - Jun)</option>
                          <option value="Q3-2026">Q3 2026 (Jul - Sep)</option>
                          <option value="Q4-2026">Q4 2026 (Oct - Dec)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Reported NYS Digital Revenue</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-slate-500 text-xs">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={stateTaxInputs.digitalRevenue}
                            onChange={(e) => setStateTaxInputs({...stateTaxInputs, digitalRevenue: e.target.value})}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-7 pr-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Authorized Preparer Firm</label>
                        <input
                          type="text"
                          value={stateTaxInputs.preparerFirm}
                          onChange={(e) => setStateTaxInputs({...stateTaxInputs, preparerFirm: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="complianceAttestation"
                          checked={stateTaxInputs.complianceAttestation}
                          onChange={(e) => setStateTaxInputs({...stateTaxInputs, complianceAttestation: e.target.checked})}
                          required
                          className="mt-1 bg-slate-900 border-slate-800 rounded text-purple-600 focus:ring-0 cursor-pointer"
                        />
                        <label htmlFor="complianceAttestation" className="text-[11px] text-slate-400 leading-relaxed cursor-pointer select-none">
                          I declare that I have examined this return, including accompanying schedules, and that it is true, correct, and complete. Apportionment calculations match NYS Tax Applet guidelines perfectly.
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. CREDIT CARD TRANSACTIONAL SLIP */}
                {activeForm.category === 'Credit Card' && (
                  <div className="p-6 space-y-6">
                    {/* Visual credit card receipt preview box */}
                    <div className="max-w-md mx-auto bg-white text-slate-900 rounded-xl p-5 border-2 border-dashed border-slate-300 space-y-4 shadow-sm font-mono text-xs">
                      
                      {/* Merchant detail header */}
                      <div className="text-center space-y-1 border-b border-slate-200 pb-3">
                        <h4 className="text-sm font-extrabold uppercase tracking-tight">{cardInputs.merchantName}</h4>
                        <p className="text-[10px] text-slate-500">{cardInputs.merchantCategory}</p>
                        <p className="text-[10px] text-slate-400 font-bold">CUSTOMER BILLING TRANS-ID</p>
                      </div>

                      {/* Receipt items breakdown */}
                      <div className="space-y-1.5 py-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">CARD BRAND:</span>
                          <span className="font-bold">VISA BUSINESS CORPORATE</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">CARDNUMBER:</span>
                          <span className="font-bold">{cardInputs.cardNumber}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">CARDHOLDER:</span>
                          <span className="font-bold uppercase">{cardInputs.cardholderName}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">EXP DATE:</span>
                          <span className="font-bold">{cardInputs.expiryDate}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">AUTH CODE:</span>
                          <span className="font-bold">{cardInputs.authCode}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">REF NUMBER:</span>
                          <span className="font-bold">{cardInputs.referenceNum}</span>
                        </div>
                      </div>

                      {/* Cash value calculations */}
                      <div className="border-t border-b border-slate-200 py-2.5 space-y-1.5 text-right font-bold">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 font-normal">BASE CLEARANCE:</span>
                          <span>${Number(cardInputs.baseAmount).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 font-normal">INTERCHANGE FEES:</span>
                          <span>${Number(cardInputs.taxAmount).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 font-normal">VOLUNTARY TIP:</span>
                          <span>${Number(cardInputs.tipAmount).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-extrabold border-t border-slate-100 pt-2 text-blue-600">
                          <span>TOTAL SECURED CHARGE:</span>
                          <span>${(Number(cardInputs.baseAmount) + Number(cardInputs.taxAmount) + Number(cardInputs.tipAmount)).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Interactive Canvas Signature Pad */}
                      <div className="space-y-1 text-center">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Customer Signature Required</span>
                          <button
                            type="button"
                            onClick={clearSignature}
                            className="text-[10px] text-red-500 hover:text-red-600 font-bold underline cursor-pointer"
                          >
                            Clear Pad
                          </button>
                        </div>
                        
                        <div className="border border-slate-200 rounded-lg bg-slate-50 h-24 relative overflow-hidden">
                          <canvas
                            ref={signatureCanvasRef}
                            width={400}
                            height={96}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-300 select-none z-0">
                            Draw signature with cursor/mouse pad
                          </div>
                        </div>
                        <p className="text-[8px] text-slate-400">Merchant copy transaction cleared via Visa Network Rails</p>
                      </div>
                    </div>

                    {/* Editor parameters below card design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Acquiring Merchant Name</label>
                        <input
                          type="text"
                          value={cardInputs.merchantName}
                          onChange={(e) => setCardInputs({...cardInputs, merchantName: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Acquiring Category</label>
                        <input
                          type="text"
                          value={cardInputs.merchantCategory}
                          onChange={(e) => setCardInputs({...cardInputs, merchantCategory: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Authorized Cardholder Name</label>
                        <input
                          type="text"
                          value={cardInputs.cardholderName}
                          onChange={(e) => setCardInputs({...cardInputs, cardholderName: e.target.value})}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Voluntary Tip Allocation</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-slate-500 text-xs">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={cardInputs.tipAmount}
                            onChange={(e) => setCardInputs({...cardInputs, tipAmount: e.target.value})}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-7 pr-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. EMAIL INVOICES & STATEMENTS */}
                {activeForm.category === 'Invoices & Estimates' && (
                  <div className="p-6 space-y-6">
                    {/* Visual Invoice frame details */}
                    <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4 shadow-sm">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            activeForm.name.includes('Green') 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : activeForm.name.includes('Maroon')
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-500">INVOICE SPEC</span>
                            <h4 className="text-xs font-extrabold text-white">{invoiceMetadata.invoiceNumber}</h4>
                          </div>
                        </div>

                        <div className="text-right text-[11px] font-mono text-slate-400">
                          <div>Filing: {invoiceMetadata.invoiceDate}</div>
                          <div>Maturity: {invoiceMetadata.dueDate}</div>
                        </div>
                      </div>

                      {/* Recipient Editor */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-400">Apportioned Client Name</label>
                          <input
                            type="text"
                            value={invoiceMetadata.clientName}
                            onChange={(e) => setInvoiceMetadata({...invoiceMetadata, clientName: e.target.value})}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-400">Client Settlement Email</label>
                          <input
                            type="email"
                            value={invoiceMetadata.clientEmail}
                            onChange={(e) => setInvoiceMetadata({...invoiceMetadata, clientEmail: e.target.value})}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Invoice editable line items */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-300">Billable Line Items</span>
                          <button
                            type="button"
                            onClick={addInvoiceItem}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition"
                          >
                            <Plus className="w-3 h-3" /> Add Item
                          </button>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-slate-800 text-slate-400 text-[10px] font-mono uppercase">
                                <th className="pb-2 font-normal">Service Description</th>
                                <th className="pb-2 font-normal text-right w-16">Qty</th>
                                <th className="pb-2 font-normal text-right w-24">Rate</th>
                                <th className="pb-2 font-normal text-right w-24">Total</th>
                                <th className="pb-2 text-right w-10"></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                              {invoiceItems.map((item) => (
                                <tr key={item.id} className="group">
                                  <td className="py-2.5">
                                    <input
                                      type="text"
                                      value={item.name}
                                      onChange={(e) => updateInvoiceItem(item.id, 'name', e.target.value)}
                                      className="w-full bg-transparent border-none p-0 text-slate-200 focus:ring-0 focus:outline-none focus:border-b focus:border-slate-700"
                                    />
                                  </td>
                                  <td className="py-2.5 text-right">
                                    <input
                                      type="number"
                                      value={item.qty}
                                      onChange={(e) => updateInvoiceItem(item.id, 'qty', e.target.value)}
                                      className="w-12 bg-transparent border-none p-0 text-right text-slate-200 font-mono focus:ring-0 focus:outline-none"
                                    />
                                  </td>
                                  <td className="py-2.5 text-right font-mono">
                                    <input
                                      type="number"
                                      value={item.rate}
                                      onChange={(e) => updateInvoiceItem(item.id, 'rate', e.target.value)}
                                      className="w-20 bg-transparent border-none p-0 text-right text-slate-200 font-mono focus:ring-0 focus:outline-none"
                                    />
                                  </td>
                                  <td className="py-2.5 text-right font-mono font-semibold text-slate-300">
                                    ${(item.qty * item.rate).toLocaleString()}
                                  </td>
                                  <td className="py-2.5 text-right">
                                    <button
                                      type="button"
                                      onClick={() => removeInvoiceItem(item.id)}
                                      className="text-slate-500 hover:text-red-400 transition cursor-pointer opacity-0 group-hover:opacity-100"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Math Summary columns */}
                      <div className="border-t border-slate-800 pt-3 flex justify-end">
                        <div className="w-64 space-y-1.5 text-right text-xs font-mono">
                          <div className="flex justify-between text-slate-400">
                            <span>Subtotal:</span>
                            <span>${invoiceCalculations.subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-slate-400 items-center">
                            <span className="flex items-center gap-1">
                              State Surcharge Tax Rate:
                              <input
                                type="number"
                                value={taxRate}
                                onChange={(e) => setTaxRate(Number(e.target.value))}
                                className="w-10 bg-slate-950 border border-slate-800 rounded px-1 text-[10px] text-right text-slate-300"
                              />%
                            </span>
                            <span>${invoiceCalculations.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between text-white font-extrabold text-sm border-t border-slate-800 pt-2">
                            <span>Grand Total Due:</span>
                            <span>${invoiceCalculations.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shared footer button actions */}
                <div className="h-16 bg-slate-900/90 border-t border-slate-800 px-6 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>Target Table: <span className="font-mono text-emerald-400 font-semibold">/api/db/form_submissions</span></span>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingForm}
                    className={`px-5 py-2 rounded-lg text-xs font-bold text-white shadow-md flex items-center gap-2 cursor-pointer transition shrink-0 ${
                      submittingForm 
                        ? 'bg-slate-800 cursor-not-allowed opacity-80' 
                        : 'bg-blue-600 hover:bg-blue-500 active:scale-95'
                    }`}
                  >
                    {submittingForm ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Transmitting to Ledger...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Sign & Apportion Form
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* VIEW: Simulated Raw Template Specs Code */}
          {activePane === 'rtf' && (
            <div className="p-6 h-full flex flex-col max-w-5xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Raw Specifications Code Preview</h3>
                  <p className="text-xs text-slate-400">Applet representation of compiled corporate parsing framework</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(simulatedRawContent);
                    alert('Raw content copied to clipboard.');
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition cursor-pointer"
                >
                  Copy Raw File
                </button>
              </div>

              <div className="flex-1 min-h-[400px] overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                <pre className="h-full overflow-auto text-[11px] font-mono text-emerald-300 leading-relaxed">
                  {simulatedRawContent}
                </pre>
              </div>
            </div>
          )}

          {/* VIEW: API Specs & cURL Integration */}
          {activePane === 'api' && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white">Form Integration API Schema</h3>
                <p className="text-xs text-slate-400">Clear and authenticate form records programmatically from other systems</p>
              </div>

              {/* REST specs table */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                      <th className="p-3">HTTP Method</th>
                      <th className="p-3">Route Endpoint</th>
                      <th className="p-3">Fulfillment Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    <tr>
                      <td className="p-3 font-bold text-blue-400">POST</td>
                      <td className="p-3 text-white">/api/db/form_submissions</td>
                      <td className="p-3 text-slate-400">Insert new audited form payload into memory data-ledger</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-emerald-400 font-semibold">GET</td>
                      <td className="p-3 text-white">/api/db/form_submissions</td>
                      <td className="p-3 text-slate-400">Retrieve all submitted forms with paginated filtering</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-rose-400">DELETE</td>
                      <td className="p-3 text-white">/api/db/form_submissions/:id</td>
                      <td className="p-3 text-slate-400 font-mono">Purge specific submission by UUID primary key</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* cURL Block */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300">Automated Dispatch Example (cURL Command)</span>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-[11px] text-blue-300 overflow-x-auto leading-relaxed relative group">
                  <pre>{`curl -X POST http://localhost:3000/api/db/form_submissions \\
  -H "Content-Type: application/json" \\
  -d '{
    "formId": "${activeForm.id}",
    "formName": "${activeForm.name}",
    "formCategory": "${activeForm.category}",
    "originalFileName": "${activeForm.originalFileName}",
    "data": {
      "businessUnit": "Visa EMEA Clearing Center",
      "amount": "45000.00",
      "currency": "EUR",
      "taxId": "EU-893010-C",
      "regulatoryDeclaration": true
    }
  }'`}</pre>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: Submitted Forms Ledger Log */}
          {activePane === 'history' && (
            <div className="p-6 max-w-5xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Filing Ledger History</h3>
                  <p className="text-xs text-slate-400">Submissions saved inside `/api/db/form_submissions` stretching store</p>
                </div>
                <button
                  onClick={fetchSubmissions}
                  className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh Ledger
                </button>
              </div>

              {loadingHistory ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  Querying stretched database records...
                </div>
              ) : submissions.length > 0 ? (
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                        <th className="p-3">Reference ID</th>
                        <th className="p-3">Form Template</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Filing Sum Value</th>
                        <th className="p-3">Submitted Timestamp</th>
                        <th className="p-3 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
                      {submissions.map((sub: any) => (
                        <tr key={sub.id} className="hover:bg-slate-900/30">
                          <td className="p-3 font-semibold text-blue-400">{sub.id}</td>
                          <td className="p-3 text-white">{sub.formName}</td>
                          <td className="p-3">
                            <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 text-[10px] uppercase">
                              {sub.formCategory}
                            </span>
                          </td>
                          <td className="p-3 text-emerald-400 font-bold">{sub.summaryValue || 'Apportioned'}</td>
                          <td className="p-3 text-[11px] text-slate-400">{new Date(sub.createdAt).toLocaleString()}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={async () => {
                                if (confirm(`Are you sure you want to delete submission record ${sub.id}?`)) {
                                  try {
                                    const res = await fetch(`/api/db/form_submissions/${sub.id}`, { method: 'DELETE' });
                                    if (res.ok) {
                                      fetchSubmissions();
                                    }
                                  } catch (e) {
                                    console.error(e);
                                  }
                                }
                              }}
                              className="text-slate-500 hover:text-red-400 transition cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="border border-dashed border-slate-800 rounded-lg p-12 text-center text-slate-500 text-xs">
                  No form filings recorded yet. Fill out any template on the Interactive Sandbox tab to create real-time records.
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
