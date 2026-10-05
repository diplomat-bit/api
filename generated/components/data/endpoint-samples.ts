// Auto-generated samples for every single endpoint in the catalog (176 total)
export interface EndpointSampleItem {
  id: string;
  specId: string;
  specTitle: string;
  category: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  componentName: string;
  sampleParams: Record<string, any>;
  sampleBody: any;
  sampleResponse: any;
}

export const ENDPOINT_SAMPLES_LIST: EndpointSampleItem[] = [
  {
    "id": "access-online-transactions-and-orders::/v1/transactions::GET",
    "specId": "access-online-transactions-and-orders",
    "specTitle": "Access Online Transactions and Orders",
    "category": "Transactions & Orders",
    "method": "GET",
    "path": "/v1/transactions",
    "summary": "Search transaction history",
    "componentName": "SpecUI_Access_Online_Transactions_and_Orders",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Access Online Transactions and Orders",
      "endpoint": "GET /v1/transactions",
      "summary": "Search transaction history",
      "timestamp": "2026-10-05T01:52:28.022Z",
      "responseCode": "00",
      "transactionId": "TXN_65OEC5PO",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK83324"
    }
  },
  {
    "id": "access-online-transactions-and-orders::/v1/transactions/{transactionId}::GET",
    "specId": "access-online-transactions-and-orders",
    "specTitle": "Access Online Transactions and Orders",
    "category": "Transactions & Orders",
    "method": "GET",
    "path": "/v1/transactions/{transactionId}",
    "summary": "Retrieve transaction by ID",
    "componentName": "SpecUI_Access_Online_Transactions_and_Orders",
    "sampleParams": {
      "transactionId": "transaction_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Access Online Transactions and Orders",
      "endpoint": "GET /v1/transactions/{transactionId}",
      "summary": "Retrieve transaction by ID",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_3SKUF1CU",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK83069"
    }
  },
  {
    "id": "access-online-transactions-and-orders::/v1/orders/reconcile::POST",
    "specId": "access-online-transactions-and-orders",
    "specTitle": "Access Online Transactions and Orders",
    "category": "Transactions & Orders",
    "method": "POST",
    "path": "/v1/orders/reconcile",
    "summary": "Submit order reconciliation batch",
    "componentName": "SpecUI_Access_Online_Transactions_and_Orders",
    "sampleParams": {},
    "sampleBody": {
      "accountNumber": "BRK_ACC_77401",
      "symbol": "NVDA",
      "quantity": 50,
      "orderType": "MARKET",
      "side": "BUY",
      "timeInForce": "DAY"
    },
    "sampleResponse": {
      "orderId": "ORD_EQUITY_9888668",
      "symbol": "NVDA",
      "executedPrice": 122.45,
      "filledQuantity": 50,
      "executionStatus": "FILLED",
      "exchange": "NASDAQ",
      "commission": 0,
      "netSettlement": 6122.5,
      "timestamp": "2026-10-05T01:52:28.023Z"
    }
  },
  {
    "id": "access-online-transactions-and-orders::/v1/orders/{orderId}/status::GET",
    "specId": "access-online-transactions-and-orders",
    "specTitle": "Access Online Transactions and Orders",
    "category": "Transactions & Orders",
    "method": "GET",
    "path": "/v1/orders/{orderId}/status",
    "summary": "Check order fulfillment status",
    "componentName": "SpecUI_Access_Online_Transactions_and_Orders",
    "sampleParams": {
      "orderId": "order_9921"
    },
    "sampleBody": {
      "accountNumber": "BRK_ACC_77401",
      "symbol": "NVDA",
      "quantity": 50,
      "orderType": "MARKET",
      "side": "BUY",
      "timeInForce": "DAY"
    },
    "sampleResponse": {
      "orderId": "ORD_EQUITY_2081128",
      "symbol": "NVDA",
      "executedPrice": 122.45,
      "filledQuantity": 50,
      "executionStatus": "FILLED",
      "exchange": "NASDAQ",
      "commission": 0,
      "netSettlement": 6122.5,
      "timestamp": "2026-10-05T01:52:28.023Z"
    }
  },
  {
    "id": "access-online-transactions-and-orders::/v1/disputes/inquire::POST",
    "specId": "access-online-transactions-and-orders",
    "specTitle": "Access Online Transactions and Orders",
    "category": "Transactions & Orders",
    "method": "POST",
    "path": "/v1/disputes/inquire",
    "summary": "Inquire cardholder dispute details",
    "componentName": "SpecUI_Access_Online_Transactions_and_Orders",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_5GW6CXE",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_45868"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Access Online Transactions and Orders",
      "endpoint": "POST /v1/disputes/inquire",
      "summary": "Inquire cardholder dispute details",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_M28OQJ39",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK95483"
    }
  },
  {
    "id": "access-online-transactions-and-orders::/v1/settlements/summary::GET",
    "specId": "access-online-transactions-and-orders",
    "specTitle": "Access Online Transactions and Orders",
    "category": "Transactions & Orders",
    "method": "GET",
    "path": "/v1/settlements/summary",
    "summary": "Daily batch settlement summary",
    "componentName": "SpecUI_Access_Online_Transactions_and_Orders",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Access Online Transactions and Orders",
      "endpoint": "GET /v1/settlements/summary",
      "summary": "Daily batch settlement summary",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_919M37LN",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK77080"
    }
  },
  {
    "id": "account-statements::/v2/statements/accounts/{accountId}::GET",
    "specId": "account-statements",
    "specTitle": "Account Statements",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v2/statements/accounts/{accountId}",
    "summary": "Get billing cycles for account",
    "componentName": "SpecUI_Account_Statements",
    "sampleParams": {
      "accountId": "account_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "account-statements::/v2/statements/{statementId}/pdf::GET",
    "specId": "account-statements",
    "specTitle": "Account Statements",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v2/statements/{statementId}/pdf",
    "summary": "Download statement PDF",
    "componentName": "SpecUI_Account_Statements",
    "sampleParams": {
      "statementId": "statement_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "account-statements::/v2/statements/current-balance::GET",
    "specId": "account-statements",
    "specTitle": "Account Statements",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v2/statements/current-balance",
    "summary": "Get real-time ledger balance",
    "componentName": "SpecUI_Account_Statements",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "account-statements::/v2/statements/delivery-preferences::POST",
    "specId": "account-statements",
    "specTitle": "Account Statements",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v2/statements/delivery-preferences",
    "summary": "Update statement delivery channel",
    "componentName": "SpecUI_Account_Statements",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "accounts-financial-details::/digital/v3/accounts::GET",
    "specId": "accounts-financial-details",
    "specTitle": "Accounts & Financial Details OpenAPI",
    "category": "Open Banking & Data",
    "method": "GET",
    "path": "/digital/v3/accounts",
    "summary": "List linked financial accounts",
    "componentName": "SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "accounts-financial-details::/digital/v3/accounts/{accountId}/balances::GET",
    "specId": "accounts-financial-details",
    "specTitle": "Accounts & Financial Details OpenAPI",
    "category": "Open Banking & Data",
    "method": "GET",
    "path": "/digital/v3/accounts/{accountId}/balances",
    "summary": "Get ledger and available balances",
    "componentName": "SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI",
    "sampleParams": {
      "accountId": "account_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "accounts-financial-details::/digital/v3/accounts/{accountId}/transactions::GET",
    "specId": "accounts-financial-details",
    "specTitle": "Accounts & Financial Details OpenAPI",
    "category": "Open Banking & Data",
    "method": "GET",
    "path": "/digital/v3/accounts/{accountId}/transactions",
    "summary": "Get posted and pending transactions",
    "componentName": "SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI",
    "sampleParams": {
      "accountId": "account_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "accounts-financial-details::/digital/v3/accounts/{accountId}/details::GET",
    "specId": "accounts-financial-details",
    "specTitle": "Accounts & Financial Details OpenAPI",
    "category": "Open Banking & Data",
    "method": "GET",
    "path": "/digital/v3/accounts/{accountId}/details",
    "summary": "Get routing, IBAN, and account numbers",
    "componentName": "SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI",
    "sampleParams": {
      "accountId": "account_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "accounts-financial-details::/digital/v3/accounts/sync::POST",
    "specId": "accounts-financial-details",
    "specTitle": "Accounts & Financial Details OpenAPI",
    "category": "Open Banking & Data",
    "method": "POST",
    "path": "/digital/v3/accounts/sync",
    "summary": "Trigger instantaneous core bank sync",
    "componentName": "SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "accounts-financial-details::/digital/v3/accounts/{accountId}/interest::GET",
    "specId": "accounts-financial-details",
    "specTitle": "Accounts & Financial Details OpenAPI",
    "category": "Open Banking & Data",
    "method": "GET",
    "path": "/digital/v3/accounts/{accountId}/interest",
    "summary": "Year-to-date accrued interest",
    "componentName": "SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI",
    "sampleParams": {
      "accountId": "account_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "accounts-financial-details::/digital/v3/accounts/{accountId}/overdraft::GET",
    "specId": "accounts-financial-details",
    "specTitle": "Accounts & Financial Details OpenAPI",
    "category": "Open Banking & Data",
    "method": "GET",
    "path": "/digital/v3/accounts/{accountId}/overdraft",
    "summary": "Overdraft protection limits",
    "componentName": "SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI",
    "sampleParams": {
      "accountId": "account_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "accounts-financial-details::/digital/v3/accounts/categorize::POST",
    "specId": "accounts-financial-details",
    "specTitle": "Accounts & Financial Details OpenAPI",
    "category": "Open Banking & Data",
    "method": "POST",
    "path": "/digital/v3/accounts/categorize",
    "summary": "Trigger automated transaction tagging",
    "componentName": "SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "b2b-virtual-account-payment-method::/v1/b2b/accounts/create::POST",
    "specId": "b2b-virtual-account-payment-method",
    "specTitle": "B2B Virtual Account Payment Method",
    "category": "Virtual Cards & B2B",
    "method": "POST",
    "path": "/v1/b2b/accounts/create",
    "summary": "Issue single-use virtual account",
    "componentName": "SpecUI_B2B_Virtual_Account_Payment_Method",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "b2b-virtual-account-payment-method::/v1/b2b/accounts/{accountNumber}/details::GET",
    "specId": "b2b-virtual-account-payment-method",
    "specTitle": "B2B Virtual Account Payment Method",
    "category": "Virtual Cards & B2B",
    "method": "GET",
    "path": "/v1/b2b/accounts/{accountNumber}/details",
    "summary": "Query virtual account spend metrics",
    "componentName": "SpecUI_B2B_Virtual_Account_Payment_Method",
    "sampleParams": {
      "accountNumber": "4000123456789010"
    },
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "b2b-virtual-account-payment-method::/v1/b2b/accounts/{accountNumber}/spend-limit::PUT",
    "specId": "b2b-virtual-account-payment-method",
    "specTitle": "B2B Virtual Account Payment Method",
    "category": "Virtual Cards & B2B",
    "method": "PUT",
    "path": "/v1/b2b/accounts/{accountNumber}/spend-limit",
    "summary": "Update dynamic spend ceiling",
    "componentName": "SpecUI_B2B_Virtual_Account_Payment_Method",
    "sampleParams": {
      "accountNumber": "4000123456789010"
    },
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "b2b-virtual-account-payment-method::/v1/b2b/accounts/{accountNumber}/cancel::POST",
    "specId": "b2b-virtual-account-payment-method",
    "specTitle": "B2B Virtual Account Payment Method",
    "category": "Virtual Cards & B2B",
    "method": "POST",
    "path": "/v1/b2b/accounts/{accountNumber}/cancel",
    "summary": "Deactivate virtual card number",
    "componentName": "SpecUI_B2B_Virtual_Account_Payment_Method",
    "sampleParams": {
      "accountNumber": "4000123456789010"
    },
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "b2b-virtual-account-payment-method::/v1/b2b/suppliers/directory::GET",
    "specId": "b2b-virtual-account-payment-method",
    "specTitle": "B2B Virtual Account Payment Method",
    "category": "Virtual Cards & B2B",
    "method": "GET",
    "path": "/v1/b2b/suppliers/directory",
    "summary": "Search supplier acceptance directory",
    "componentName": "SpecUI_B2B_Virtual_Account_Payment_Method",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "B2B Virtual Account Payment Method",
      "endpoint": "GET /v1/b2b/suppliers/directory",
      "summary": "Search supplier acceptance directory",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_FB5WRLJS",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK84568"
    }
  },
  {
    "id": "b2b-virtual-account-payment-method::/v1/b2b/remittance/advise::POST",
    "specId": "b2b-virtual-account-payment-method",
    "specTitle": "B2B Virtual Account Payment Method",
    "category": "Virtual Cards & B2B",
    "method": "POST",
    "path": "/v1/b2b/remittance/advise",
    "summary": "Send automated remittance advice to payee",
    "componentName": "SpecUI_B2B_Virtual_Account_Payment_Method",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_ASUERXR",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_43229"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "B2B Virtual Account Payment Method",
      "endpoint": "POST /v1/b2b/remittance/advise",
      "summary": "Send automated remittance advice to payee",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_078SSYGN",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK33353"
    }
  },
  {
    "id": "b2b-virtual-account-payment-method::/v1/b2b/reconciliation/report::GET",
    "specId": "b2b-virtual-account-payment-method",
    "specTitle": "B2B Virtual Account Payment Method",
    "category": "Virtual Cards & B2B",
    "method": "GET",
    "path": "/v1/b2b/reconciliation/report",
    "summary": "Retrieve ERP reconciliation matching file",
    "componentName": "SpecUI_B2B_Virtual_Account_Payment_Method",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "B2B Virtual Account Payment Method",
      "endpoint": "GET /v1/b2b/reconciliation/report",
      "summary": "Retrieve ERP reconciliation matching file",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_FFYRPH26",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK12119"
    }
  },
  {
    "id": "broker-api::/broker/v2/accounts::GET",
    "specId": "broker-api",
    "specTitle": "Broker API",
    "category": "Broker & Financial Services",
    "method": "GET",
    "path": "/broker/v2/accounts",
    "summary": "List brokerage accounts",
    "componentName": "SpecUI_Broker_API",
    "sampleParams": {},
    "sampleBody": {
      "accountNumber": "BRK_ACC_77401",
      "symbol": "NVDA",
      "quantity": 50,
      "orderType": "MARKET",
      "side": "BUY",
      "timeInForce": "DAY"
    },
    "sampleResponse": {
      "orderId": "ORD_EQUITY_9680578",
      "symbol": "NVDA",
      "executedPrice": 122.45,
      "filledQuantity": 50,
      "executionStatus": "FILLED",
      "exchange": "NASDAQ",
      "commission": 0,
      "netSettlement": 6122.5,
      "timestamp": "2026-10-05T01:52:28.023Z"
    }
  },
  {
    "id": "broker-api::/broker/v2/orders::POST",
    "specId": "broker-api",
    "specTitle": "Broker API",
    "category": "Broker & Financial Services",
    "method": "POST",
    "path": "/broker/v2/orders",
    "summary": "Place equity or ETF market order",
    "componentName": "SpecUI_Broker_API",
    "sampleParams": {},
    "sampleBody": {
      "accountNumber": "BRK_ACC_77401",
      "symbol": "NVDA",
      "quantity": 50,
      "orderType": "MARKET",
      "side": "BUY",
      "timeInForce": "DAY"
    },
    "sampleResponse": {
      "orderId": "ORD_EQUITY_4623214",
      "symbol": "NVDA",
      "executedPrice": 122.45,
      "filledQuantity": 50,
      "executionStatus": "FILLED",
      "exchange": "NASDAQ",
      "commission": 0,
      "netSettlement": 6122.5,
      "timestamp": "2026-10-05T01:52:28.023Z"
    }
  },
  {
    "id": "broker-api::/broker/v2/orders/{orderId}::GET",
    "specId": "broker-api",
    "specTitle": "Broker API",
    "category": "Broker & Financial Services",
    "method": "GET",
    "path": "/broker/v2/orders/{orderId}",
    "summary": "Get order execution status",
    "componentName": "SpecUI_Broker_API",
    "sampleParams": {
      "orderId": "order_9921"
    },
    "sampleBody": {
      "accountNumber": "BRK_ACC_77401",
      "symbol": "NVDA",
      "quantity": 50,
      "orderType": "MARKET",
      "side": "BUY",
      "timeInForce": "DAY"
    },
    "sampleResponse": {
      "orderId": "ORD_EQUITY_3572705",
      "symbol": "NVDA",
      "executedPrice": 122.45,
      "filledQuantity": 50,
      "executionStatus": "FILLED",
      "exchange": "NASDAQ",
      "commission": 0,
      "netSettlement": 6122.5,
      "timestamp": "2026-10-05T01:52:28.023Z"
    }
  },
  {
    "id": "broker-api::/broker/v2/orders/{orderId}::DELETE",
    "specId": "broker-api",
    "specTitle": "Broker API",
    "category": "Broker & Financial Services",
    "method": "DELETE",
    "path": "/broker/v2/orders/{orderId}",
    "summary": "Cancel open order",
    "componentName": "SpecUI_Broker_API",
    "sampleParams": {
      "orderId": "order_9921"
    },
    "sampleBody": {
      "accountNumber": "BRK_ACC_77401",
      "symbol": "NVDA",
      "quantity": 50,
      "orderType": "MARKET",
      "side": "BUY",
      "timeInForce": "DAY"
    },
    "sampleResponse": {
      "orderId": "ORD_EQUITY_1651861",
      "symbol": "NVDA",
      "executedPrice": 122.45,
      "filledQuantity": 50,
      "executionStatus": "FILLED",
      "exchange": "NASDAQ",
      "commission": 0,
      "netSettlement": 6122.5,
      "timestamp": "2026-10-05T01:52:28.023Z"
    }
  },
  {
    "id": "broker-api::/broker/v2/positions::GET",
    "specId": "broker-api",
    "specTitle": "Broker API",
    "category": "Broker & Financial Services",
    "method": "GET",
    "path": "/broker/v2/positions",
    "summary": "Get client open positions and cost basis",
    "componentName": "SpecUI_Broker_API",
    "sampleParams": {},
    "sampleBody": {
      "accountNumber": "BRK_ACC_77401",
      "symbol": "NVDA",
      "quantity": 50,
      "orderType": "MARKET",
      "side": "BUY",
      "timeInForce": "DAY"
    },
    "sampleResponse": {
      "orderId": "ORD_EQUITY_6565631",
      "symbol": "NVDA",
      "executedPrice": 122.45,
      "filledQuantity": 50,
      "executionStatus": "FILLED",
      "exchange": "NASDAQ",
      "commission": 0,
      "netSettlement": 6122.5,
      "timestamp": "2026-10-05T01:52:28.023Z"
    }
  },
  {
    "id": "broker-api::/broker/v2/quotes/{symbol}::GET",
    "specId": "broker-api",
    "specTitle": "Broker API",
    "category": "Broker & Financial Services",
    "method": "GET",
    "path": "/broker/v2/quotes/{symbol}",
    "summary": "Get real-time level 1 market quote",
    "componentName": "SpecUI_Broker_API",
    "sampleParams": {
      "symbol": "AAPL"
    },
    "sampleBody": null,
    "sampleResponse": {
      "baseCurrency": "USD",
      "asOfTimestamp": "2026-10-05T01:52:28.023Z",
      "rates": {
        "EUR": 0.9234,
        "GBP": 0.7812,
        "JPY": 152.45,
        "CAD": 1.358,
        "AUD": 1.512,
        "CHF": 0.884,
        "SGD": 1.341
      },
      "interbankTier": "WHOLESALE_PRIME"
    }
  },
  {
    "id": "broker-api::/broker/v2/history/trades::GET",
    "specId": "broker-api",
    "specTitle": "Broker API",
    "category": "Broker & Financial Services",
    "method": "GET",
    "path": "/broker/v2/history/trades",
    "summary": "Historical trade execution blotter",
    "componentName": "SpecUI_Broker_API",
    "sampleParams": {},
    "sampleBody": {
      "accountNumber": "BRK_ACC_77401",
      "symbol": "NVDA",
      "quantity": 50,
      "orderType": "MARKET",
      "side": "BUY",
      "timeInForce": "DAY"
    },
    "sampleResponse": {
      "orderId": "ORD_EQUITY_5569230",
      "symbol": "NVDA",
      "executedPrice": 122.45,
      "filledQuantity": 50,
      "executionStatus": "FILLED",
      "exchange": "NASDAQ",
      "commission": 0,
      "netSettlement": 6122.5,
      "timestamp": "2026-10-05T01:52:28.023Z"
    }
  },
  {
    "id": "broker-api::/broker/v2/transfers/ach::POST",
    "specId": "broker-api",
    "specTitle": "Broker API",
    "category": "Broker & Financial Services",
    "method": "POST",
    "path": "/broker/v2/transfers/ach",
    "summary": "Initiate ACH bank deposit to trading balance",
    "componentName": "SpecUI_Broker_API",
    "sampleParams": {},
    "sampleBody": {
      "accountNumber": "BRK_ACC_77401",
      "symbol": "NVDA",
      "quantity": 50,
      "orderType": "MARKET",
      "side": "BUY",
      "timeInForce": "DAY"
    },
    "sampleResponse": {
      "orderId": "ORD_EQUITY_5102820",
      "symbol": "NVDA",
      "executedPrice": 122.45,
      "filledQuantity": 50,
      "executionStatus": "FILLED",
      "exchange": "NASDAQ",
      "commission": 0,
      "netSettlement": 6122.5,
      "timestamp": "2026-10-05T01:52:28.023Z"
    }
  },
  {
    "id": "card-on-file-data-inquiry::/v1/cof/inquire::POST",
    "specId": "card-on-file-data-inquiry",
    "specTitle": "Card on File Data Inquiry",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v1/cof/inquire",
    "summary": "Inquire stored cardholder credential status",
    "componentName": "SpecUI_Card_on_File_Data_Inquiry",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_LM8BG40",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_14303"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Card on File Data Inquiry",
      "endpoint": "POST /v1/cof/inquire",
      "summary": "Inquire stored cardholder credential status",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_381A45AB",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK55836"
    }
  },
  {
    "id": "card-on-file-data-inquiry::/v1/cof/merchant/{merchantId}/tokens::GET",
    "specId": "card-on-file-data-inquiry",
    "specTitle": "Card on File Data Inquiry",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v1/cof/merchant/{merchantId}/tokens",
    "summary": "List merchant token credentials",
    "componentName": "SpecUI_Card_on_File_Data_Inquiry",
    "sampleParams": {
      "merchantId": "merchant_9921"
    },
    "sampleBody": {
      "panReferenceId": "PAN_REF_991823",
      "tokenRequestorId": "40000000001",
      "deviceType": "SECURE_ELEMENT_MOBILE",
      "tokenReason": "MOBILE_WALLET_ENROLLMENT"
    },
    "sampleResponse": {
      "tokenReferenceId": "TKN_REF_MSC25DS",
      "tokenStatus": "ACTIVE",
      "tokenExpiryDate": "2029-05",
      "tavvCryptogram": "AQABAAAAAA...bE=",
      "deviceBindingHash": "SHA256:7f8a9b2c3d4e5f...",
      "panLastFour": "8910"
    }
  },
  {
    "id": "card-on-file-data-inquiry::/v1/cof/update-notification::POST",
    "specId": "card-on-file-data-inquiry",
    "specTitle": "Card on File Data Inquiry",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v1/cof/update-notification",
    "summary": "Subscribe to automated card update push",
    "componentName": "SpecUI_Card_on_File_Data_Inquiry",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_2Z9DFDK",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_18824"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Card on File Data Inquiry",
      "endpoint": "POST /v1/cof/update-notification",
      "summary": "Subscribe to automated card update push",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_KZ1CS2A7",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK95011"
    }
  },
  {
    "id": "card-account-balance-transfer-eligibility::/v1/balance-transfer/check-eligibility::POST",
    "specId": "card-account-balance-transfer-eligibility",
    "specTitle": "Card Account Balance Transfer Eligibility OpenAPI",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v1/balance-transfer/check-eligibility",
    "summary": "Check account balance transfer eligibility",
    "componentName": "SpecUI_CardAccountBalanceTransferEligibility_OpenAPI",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "card-account-balance-transfer-eligibility::/v1/balance-transfer/simulate-terms::POST",
    "specId": "card-account-balance-transfer-eligibility",
    "specTitle": "Card Account Balance Transfer Eligibility OpenAPI",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v1/balance-transfer/simulate-terms",
    "summary": "Simulate promo APR and monthly schedule",
    "componentName": "SpecUI_CardAccountBalanceTransferEligibility_OpenAPI",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "card-account-balance-transfer-eligibility::/v1/balance-transfer/submit::POST",
    "specId": "card-account-balance-transfer-eligibility",
    "specTitle": "Card Account Balance Transfer Eligibility OpenAPI",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v1/balance-transfer/submit",
    "summary": "Submit transfer request to creditor",
    "componentName": "SpecUI_CardAccountBalanceTransferEligibility_OpenAPI",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "card-account-balance-transfer-eligibility::/v1/balance-transfer/{transferId}/status::GET",
    "specId": "card-account-balance-transfer-eligibility",
    "specTitle": "Card Account Balance Transfer Eligibility OpenAPI",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v1/balance-transfer/{transferId}/status",
    "summary": "Track transfer settlement status",
    "componentName": "SpecUI_CardAccountBalanceTransferEligibility_OpenAPI",
    "sampleParams": {
      "transferId": "transfer_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "click-to-pay::/v2/src/profile/lookup::POST",
    "specId": "click-to-pay",
    "specTitle": "Click to Pay",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v2/src/profile/lookup",
    "summary": "Lookup consumer Click to Pay profile by email",
    "componentName": "SpecUI_Click_to_Pay",
    "sampleParams": {},
    "sampleBody": {
      "consumerEmail": "shopper@example.com",
      "orderAmount": 89.95,
      "merchantId": "MERCH_US_99812",
      "srcCorrelationId": "SRC_wt9wewd"
    },
    "sampleResponse": {
      "checkoutStatus": "SRC_RECOGNIZED",
      "consumerProfileId": "SRC_USR_882910",
      "enrolledCardsCount": 3,
      "maskedCards": [
        {
          "cardId": "c_1",
          "brand": "VISA",
          "lastFour": "4242",
          "expMonth": "08",
          "expYear": "2028",
          "default": true
        },
        {
          "cardId": "c_2",
          "brand": "VISA",
          "lastFour": "9012",
          "expMonth": "11",
          "expYear": "2027",
          "default": false
        }
      ],
      "encryptedPaymentData": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0..."
    }
  },
  {
    "id": "click-to-pay::/v2/src/checkout/initiate::POST",
    "specId": "click-to-pay",
    "specTitle": "Click to Pay",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v2/src/checkout/initiate",
    "summary": "Initiate SRC checkout payload",
    "componentName": "SpecUI_Click_to_Pay",
    "sampleParams": {},
    "sampleBody": {
      "consumerEmail": "shopper@example.com",
      "orderAmount": 89.95,
      "merchantId": "MERCH_US_99812",
      "srcCorrelationId": "SRC_fimvv71"
    },
    "sampleResponse": {
      "checkoutStatus": "SRC_RECOGNIZED",
      "consumerProfileId": "SRC_USR_882910",
      "enrolledCardsCount": 3,
      "maskedCards": [
        {
          "cardId": "c_1",
          "brand": "VISA",
          "lastFour": "4242",
          "expMonth": "08",
          "expYear": "2028",
          "default": true
        },
        {
          "cardId": "c_2",
          "brand": "VISA",
          "lastFour": "9012",
          "expMonth": "11",
          "expYear": "2027",
          "default": false
        }
      ],
      "encryptedPaymentData": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0..."
    }
  },
  {
    "id": "click-to-pay::/v2/src/tokens/decrypt::POST",
    "specId": "click-to-pay",
    "specTitle": "Click to Pay",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v2/src/tokens/decrypt",
    "summary": "Decrypt secure card payload for merchant gateway",
    "componentName": "SpecUI_Click_to_Pay",
    "sampleParams": {},
    "sampleBody": {
      "consumerEmail": "shopper@example.com",
      "orderAmount": 89.95,
      "merchantId": "MERCH_US_99812",
      "srcCorrelationId": "SRC_lz2nyfw"
    },
    "sampleResponse": {
      "checkoutStatus": "SRC_RECOGNIZED",
      "consumerProfileId": "SRC_USR_882910",
      "enrolledCardsCount": 3,
      "maskedCards": [
        {
          "cardId": "c_1",
          "brand": "VISA",
          "lastFour": "4242",
          "expMonth": "08",
          "expYear": "2028",
          "default": true
        },
        {
          "cardId": "c_2",
          "brand": "VISA",
          "lastFour": "9012",
          "expMonth": "11",
          "expYear": "2027",
          "default": false
        }
      ],
      "encryptedPaymentData": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0..."
    }
  },
  {
    "id": "click-to-pay::/v2/src/cards/enrolled::GET",
    "specId": "click-to-pay",
    "specTitle": "Click to Pay",
    "category": "Digital Solutions & Payments",
    "method": "GET",
    "path": "/v2/src/cards/enrolled",
    "summary": "Retrieve masked enrolled card cards list",
    "componentName": "SpecUI_Click_to_Pay",
    "sampleParams": {},
    "sampleBody": {
      "consumerEmail": "shopper@example.com",
      "orderAmount": 89.95,
      "merchantId": "MERCH_US_99812",
      "srcCorrelationId": "SRC_vzn604p"
    },
    "sampleResponse": {
      "checkoutStatus": "SRC_RECOGNIZED",
      "consumerProfileId": "SRC_USR_882910",
      "enrolledCardsCount": 3,
      "maskedCards": [
        {
          "cardId": "c_1",
          "brand": "VISA",
          "lastFour": "4242",
          "expMonth": "08",
          "expYear": "2028",
          "default": true
        },
        {
          "cardId": "c_2",
          "brand": "VISA",
          "lastFour": "9012",
          "expMonth": "11",
          "expYear": "2027",
          "default": false
        }
      ],
      "encryptedPaymentData": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0..."
    }
  },
  {
    "id": "click-to-pay::/v2/src/checkout/confirm::POST",
    "specId": "click-to-pay",
    "specTitle": "Click to Pay",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v2/src/checkout/confirm",
    "summary": "Confirm payment authorization",
    "componentName": "SpecUI_Click_to_Pay",
    "sampleParams": {},
    "sampleBody": {
      "consumerEmail": "shopper@example.com",
      "orderAmount": 89.95,
      "merchantId": "MERCH_US_99812",
      "srcCorrelationId": "SRC_8o2jm4j"
    },
    "sampleResponse": {
      "checkoutStatus": "SRC_RECOGNIZED",
      "consumerProfileId": "SRC_USR_882910",
      "enrolledCardsCount": 3,
      "maskedCards": [
        {
          "cardId": "c_1",
          "brand": "VISA",
          "lastFour": "4242",
          "expMonth": "08",
          "expYear": "2028",
          "default": true
        },
        {
          "cardId": "c_2",
          "brand": "VISA",
          "lastFour": "9012",
          "expMonth": "11",
          "expYear": "2027",
          "default": false
        }
      ],
      "encryptedPaymentData": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0..."
    }
  },
  {
    "id": "consent-authorization::/v1/consent/grants::POST",
    "specId": "consent-authorization",
    "specTitle": "Consent Authorization",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/v1/consent/grants",
    "summary": "Create explicit customer data sharing grant",
    "componentName": "SpecUI_Consent_Authorization",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_ZO07HU2",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_58271"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Consent Authorization",
      "endpoint": "POST /v1/consent/grants",
      "summary": "Create explicit customer data sharing grant",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_L2RZI2YP",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK24592"
    }
  },
  {
    "id": "consent-authorization::/v1/consent/grants/{grantId}::GET",
    "specId": "consent-authorization",
    "specTitle": "Consent Authorization",
    "category": "Risk & Identity",
    "method": "GET",
    "path": "/v1/consent/grants/{grantId}",
    "summary": "Inspect active consent grant status",
    "componentName": "SpecUI_Consent_Authorization",
    "sampleParams": {
      "grantId": "grant_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Consent Authorization",
      "endpoint": "GET /v1/consent/grants/{grantId}",
      "summary": "Inspect active consent grant status",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_6TXQEIN8",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK95177"
    }
  },
  {
    "id": "consent-authorization::/v1/consent/grants/{grantId}::DELETE",
    "specId": "consent-authorization",
    "specTitle": "Consent Authorization",
    "category": "Risk & Identity",
    "method": "DELETE",
    "path": "/v1/consent/grants/{grantId}",
    "summary": "Revoke consent grant immediately",
    "componentName": "SpecUI_Consent_Authorization",
    "sampleParams": {
      "grantId": "grant_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Consent Authorization",
      "endpoint": "DELETE /v1/consent/grants/{grantId}",
      "summary": "Revoke consent grant immediately",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_M96CDH72",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK16566"
    }
  },
  {
    "id": "consent-authorization::/v1/consent/audit-log::GET",
    "specId": "consent-authorization",
    "specTitle": "Consent Authorization",
    "category": "Risk & Identity",
    "method": "GET",
    "path": "/v1/consent/audit-log",
    "summary": "Retrieve access compliance audit log",
    "componentName": "SpecUI_Consent_Authorization",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Consent Authorization",
      "endpoint": "GET /v1/consent/audit-log",
      "summary": "Retrieve access compliance audit log",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_E3H4Z2DI",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK25358"
    }
  },
  {
    "id": "corporate-account-information::/v2/corporate/enterprises/{enterpriseId}::GET",
    "specId": "corporate-account-information",
    "specTitle": "Corporate Account Information",
    "category": "Corporate & Commercial",
    "method": "GET",
    "path": "/v2/corporate/enterprises/{enterpriseId}",
    "summary": "Get corporate entity profile",
    "componentName": "SpecUI_Corporate_Account_Information",
    "sampleParams": {
      "enterpriseId": "enterprise_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "baseCurrency": "USD",
      "asOfTimestamp": "2026-10-05T01:52:28.023Z",
      "rates": {
        "EUR": 0.9234,
        "GBP": 0.7812,
        "JPY": 152.45,
        "CAD": 1.358,
        "AUD": 1.512,
        "CHF": 0.884,
        "SGD": 1.341
      },
      "interbankTier": "WHOLESALE_PRIME"
    }
  },
  {
    "id": "corporate-account-information::/v2/corporate/subsidiaries::GET",
    "specId": "corporate-account-information",
    "specTitle": "Corporate Account Information",
    "category": "Corporate & Commercial",
    "method": "GET",
    "path": "/v2/corporate/subsidiaries",
    "summary": "List child entities and departments",
    "componentName": "SpecUI_Corporate_Account_Information",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "baseCurrency": "USD",
      "asOfTimestamp": "2026-10-05T01:52:28.023Z",
      "rates": {
        "EUR": 0.9234,
        "GBP": 0.7812,
        "JPY": 152.45,
        "CAD": 1.358,
        "AUD": 1.512,
        "CHF": 0.884,
        "SGD": 1.341
      },
      "interbankTier": "WHOLESALE_PRIME"
    }
  },
  {
    "id": "corporate-account-information::/v2/corporate/credit-lines::GET",
    "specId": "corporate-account-information",
    "specTitle": "Corporate Account Information",
    "category": "Corporate & Commercial",
    "method": "GET",
    "path": "/v2/corporate/credit-lines",
    "summary": "Query corporate credit facilities and sub-limits",
    "componentName": "SpecUI_Corporate_Account_Information",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "baseCurrency": "USD",
      "asOfTimestamp": "2026-10-05T01:52:28.023Z",
      "rates": {
        "EUR": 0.9234,
        "GBP": 0.7812,
        "JPY": 152.45,
        "CAD": 1.358,
        "AUD": 1.512,
        "CHF": 0.884,
        "SGD": 1.341
      },
      "interbankTier": "WHOLESALE_PRIME"
    }
  },
  {
    "id": "corporate-account-information::/v2/corporate/sub-limits/allocate::POST",
    "specId": "corporate-account-information",
    "specTitle": "Corporate Account Information",
    "category": "Corporate & Commercial",
    "method": "POST",
    "path": "/v2/corporate/sub-limits/allocate",
    "summary": "Allocate budget limit to cost center",
    "componentName": "SpecUI_Corporate_Account_Information",
    "sampleParams": {},
    "sampleBody": {
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "amount": 2500,
      "quoteType": "GUARANTEED_15_MIN"
    },
    "sampleResponse": {
      "quoteId": "QTE_FX_231876",
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "sourceAmount": 2500,
      "targetAmount": 2307.5,
      "exchangeRate": 0.923,
      "rateExpiresAt": "2026-10-05T02:07:28.023Z",
      "feeAmount": 3.5,
      "status": "GUARANTEED"
    }
  },
  {
    "id": "corporate-account-information::/v2/corporate/spend-analysis::GET",
    "specId": "corporate-account-information",
    "specTitle": "Corporate Account Information",
    "category": "Corporate & Commercial",
    "method": "GET",
    "path": "/v2/corporate/spend-analysis",
    "summary": "Executive corporate spend breakdown",
    "componentName": "SpecUI_Corporate_Account_Information",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "baseCurrency": "USD",
      "asOfTimestamp": "2026-10-05T01:52:28.023Z",
      "rates": {
        "EUR": 0.9234,
        "GBP": 0.7812,
        "JPY": 152.45,
        "CAD": 1.358,
        "AUD": 1.512,
        "CHF": 0.884,
        "SGD": 1.341
      },
      "interbankTier": "WHOLESALE_PRIME"
    }
  },
  {
    "id": "custody::/v1/custody/vaults::GET",
    "specId": "custody",
    "specTitle": "Custody",
    "category": "Broker & Financial Services",
    "method": "GET",
    "path": "/v1/custody/vaults",
    "summary": "List institutional custody vaults",
    "componentName": "SpecUI_Custody",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Custody",
      "endpoint": "GET /v1/custody/vaults",
      "summary": "List institutional custody vaults",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_6TZLM8VZ",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK15071"
    }
  },
  {
    "id": "custody::/v1/custody/assets/{assetId}::GET",
    "specId": "custody",
    "specTitle": "Custody",
    "category": "Broker & Financial Services",
    "method": "GET",
    "path": "/v1/custody/assets/{assetId}",
    "summary": "Get segregated asset balance & proof of reserves",
    "componentName": "SpecUI_Custody",
    "sampleParams": {
      "assetId": "asset_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Custody",
      "endpoint": "GET /v1/custody/assets/{assetId}",
      "summary": "Get segregated asset balance & proof of reserves",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_SE0Y48V9",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK71900"
    }
  },
  {
    "id": "custody::/v1/custody/transfers/inbound::POST",
    "specId": "custody",
    "specTitle": "Custody",
    "category": "Broker & Financial Services",
    "method": "POST",
    "path": "/v1/custody/transfers/inbound",
    "summary": "Generate cold vault deposit address",
    "componentName": "SpecUI_Custody",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_3VPCVX8",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_34262"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Custody",
      "endpoint": "POST /v1/custody/transfers/inbound",
      "summary": "Generate cold vault deposit address",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_41J069G4",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK33334"
    }
  },
  {
    "id": "custody::/v1/custody/transfers/outbound::POST",
    "specId": "custody",
    "specTitle": "Custody",
    "category": "Broker & Financial Services",
    "method": "POST",
    "path": "/v1/custody/transfers/outbound",
    "summary": "Initiate multi-sig approval withdrawal",
    "componentName": "SpecUI_Custody",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_QKBPNXE",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_43045"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Custody",
      "endpoint": "POST /v1/custody/transfers/outbound",
      "summary": "Initiate multi-sig approval withdrawal",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_AV3XMOQ9",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK13802"
    }
  },
  {
    "id": "custody::/v1/custody/approvals/pending::GET",
    "specId": "custody",
    "specTitle": "Custody",
    "category": "Broker & Financial Services",
    "method": "GET",
    "path": "/v1/custody/approvals/pending",
    "summary": "List pending policy approval quorums",
    "componentName": "SpecUI_Custody",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Custody",
      "endpoint": "GET /v1/custody/approvals/pending",
      "summary": "List pending policy approval quorums",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_94YOZBRO",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK28383"
    }
  },
  {
    "id": "custody::/v1/custody/keys/rotate::POST",
    "specId": "custody",
    "specTitle": "Custody",
    "category": "Broker & Financial Services",
    "method": "POST",
    "path": "/v1/custody/keys/rotate",
    "summary": "Schedule cryptographic key rotation",
    "componentName": "SpecUI_Custody",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_C1D93BR",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_13696"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Custody",
      "endpoint": "POST /v1/custody/keys/rotate",
      "summary": "Schedule cryptographic key rotation",
      "timestamp": "2026-10-05T01:52:28.023Z",
      "responseCode": "00",
      "transactionId": "TXN_QEY7T5U6",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK54152"
    }
  },
  {
    "id": "customers-profiles::/v3/customers/create::POST",
    "specId": "customers-profiles",
    "specTitle": "Customers Profiles",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v3/customers/create",
    "summary": "Create verified customer profile",
    "componentName": "SpecUI_Customers_Profiles",
    "sampleParams": {},
    "sampleBody": {
      "username": "client_corp_99",
      "firstName": "Jordan",
      "lastName": "Vance",
      "email": "jordan.vance@fintech.io"
    },
    "sampleResponse": {
      "customerId": "CUST_997331",
      "enrolledDate": "2026-10-05T01:52:28.023Z",
      "institutionAccounts": [
        {
          "accountId": "acc_01",
          "institution": "Chase Commercial",
          "type": "checking",
          "balance": 148920.5,
          "currency": "USD"
        },
        {
          "accountId": "acc_02",
          "institution": "Silicon Valley Bank",
          "type": "treasury",
          "balance": 840250,
          "currency": "USD"
        }
      ],
      "statementAnalysisScore": 845,
      "verificationStatus": "VERIFIED"
    }
  },
  {
    "id": "customers-profiles::/v3/customers/{customerId}::GET",
    "specId": "customers-profiles",
    "specTitle": "Customers Profiles",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v3/customers/{customerId}",
    "summary": "Retrieve customer demographic record",
    "componentName": "SpecUI_Customers_Profiles",
    "sampleParams": {
      "customerId": "customer_9921"
    },
    "sampleBody": {
      "username": "client_corp_99",
      "firstName": "Jordan",
      "lastName": "Vance",
      "email": "jordan.vance@fintech.io"
    },
    "sampleResponse": {
      "customerId": "CUST_253106",
      "enrolledDate": "2026-10-05T01:52:28.023Z",
      "institutionAccounts": [
        {
          "accountId": "acc_01",
          "institution": "Chase Commercial",
          "type": "checking",
          "balance": 148920.5,
          "currency": "USD"
        },
        {
          "accountId": "acc_02",
          "institution": "Silicon Valley Bank",
          "type": "treasury",
          "balance": 840250,
          "currency": "USD"
        }
      ],
      "statementAnalysisScore": 845,
      "verificationStatus": "VERIFIED"
    }
  },
  {
    "id": "customers-profiles::/v3/customers/{customerId}/kyc::PUT",
    "specId": "customers-profiles",
    "specTitle": "Customers Profiles",
    "category": "Card & Account Services",
    "method": "PUT",
    "path": "/v3/customers/{customerId}/kyc",
    "summary": "Submit identity KYC verification documents",
    "componentName": "SpecUI_Customers_Profiles",
    "sampleParams": {
      "customerId": "customer_9921"
    },
    "sampleBody": {
      "username": "client_corp_99",
      "firstName": "Jordan",
      "lastName": "Vance",
      "email": "jordan.vance@fintech.io"
    },
    "sampleResponse": {
      "customerId": "CUST_778650",
      "enrolledDate": "2026-10-05T01:52:28.024Z",
      "institutionAccounts": [
        {
          "accountId": "acc_01",
          "institution": "Chase Commercial",
          "type": "checking",
          "balance": 148920.5,
          "currency": "USD"
        },
        {
          "accountId": "acc_02",
          "institution": "Silicon Valley Bank",
          "type": "treasury",
          "balance": 840250,
          "currency": "USD"
        }
      ],
      "statementAnalysisScore": 845,
      "verificationStatus": "VERIFIED"
    }
  },
  {
    "id": "customers-profiles::/v3/customers/{customerId}/cards::GET",
    "specId": "customers-profiles",
    "specTitle": "Customers Profiles",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v3/customers/{customerId}/cards",
    "summary": "List payment cards issued to customer",
    "componentName": "SpecUI_Customers_Profiles",
    "sampleParams": {
      "customerId": "customer_9921"
    },
    "sampleBody": {
      "username": "client_corp_99",
      "firstName": "Jordan",
      "lastName": "Vance",
      "email": "jordan.vance@fintech.io"
    },
    "sampleResponse": {
      "customerId": "CUST_167504",
      "enrolledDate": "2026-10-05T01:52:28.024Z",
      "institutionAccounts": [
        {
          "accountId": "acc_01",
          "institution": "Chase Commercial",
          "type": "checking",
          "balance": 148920.5,
          "currency": "USD"
        },
        {
          "accountId": "acc_02",
          "institution": "Silicon Valley Bank",
          "type": "treasury",
          "balance": 840250,
          "currency": "USD"
        }
      ],
      "statementAnalysisScore": 845,
      "verificationStatus": "VERIFIED"
    }
  },
  {
    "id": "customers-profiles::/v3/customers/{customerId}/preferences::POST",
    "specId": "customers-profiles",
    "specTitle": "Customers Profiles",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v3/customers/{customerId}/preferences",
    "summary": "Update communication and notification preferences",
    "componentName": "SpecUI_Customers_Profiles",
    "sampleParams": {
      "customerId": "customer_9921"
    },
    "sampleBody": {
      "username": "client_corp_99",
      "firstName": "Jordan",
      "lastName": "Vance",
      "email": "jordan.vance@fintech.io"
    },
    "sampleResponse": {
      "customerId": "CUST_254072",
      "enrolledDate": "2026-10-05T01:52:28.024Z",
      "institutionAccounts": [
        {
          "accountId": "acc_01",
          "institution": "Chase Commercial",
          "type": "checking",
          "balance": 148920.5,
          "currency": "USD"
        },
        {
          "accountId": "acc_02",
          "institution": "Silicon Valley Bank",
          "type": "treasury",
          "balance": 840250,
          "currency": "USD"
        }
      ],
      "statementAnalysisScore": 845,
      "verificationStatus": "VERIFIED"
    }
  },
  {
    "id": "customers-profiles::/v3/customers/sanctions-check::GET",
    "specId": "customers-profiles",
    "specTitle": "Customers Profiles",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v3/customers/sanctions-check",
    "summary": "Run OFAC / PEP automated screening",
    "componentName": "SpecUI_Customers_Profiles",
    "sampleParams": {},
    "sampleBody": {
      "username": "client_corp_99",
      "firstName": "Jordan",
      "lastName": "Vance",
      "email": "jordan.vance@fintech.io"
    },
    "sampleResponse": {
      "customerId": "CUST_282056",
      "enrolledDate": "2026-10-05T01:52:28.024Z",
      "institutionAccounts": [
        {
          "accountId": "acc_01",
          "institution": "Chase Commercial",
          "type": "checking",
          "balance": 148920.5,
          "currency": "USD"
        },
        {
          "accountId": "acc_02",
          "institution": "Silicon Valley Bank",
          "type": "treasury",
          "balance": 840250,
          "currency": "USD"
        }
      ],
      "statementAnalysisScore": 845,
      "verificationStatus": "VERIFIED"
    }
  },
  {
    "id": "dps-card-and-account-services::/dps/v4/cards/activate::POST",
    "specId": "dps-card-and-account-services",
    "specTitle": "DPS Card and Account Services",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/dps/v4/cards/activate",
    "summary": "Activate physical debit card",
    "componentName": "SpecUI_DPS_Card_and_Account_Services",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_7REEUE6",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_81059"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "DPS Card and Account Services",
      "endpoint": "POST /dps/v4/cards/activate",
      "summary": "Activate physical debit card",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_TR7LGETZ",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK59128"
    }
  },
  {
    "id": "dps-card-and-account-services::/dps/v4/cards/{cardId}/status::PUT",
    "specId": "dps-card-and-account-services",
    "specTitle": "DPS Card and Account Services",
    "category": "Issuing & Processing",
    "method": "PUT",
    "path": "/dps/v4/cards/{cardId}/status",
    "summary": "Update card block status (Lost/Stolen/Frozen)",
    "componentName": "SpecUI_DPS_Card_and_Account_Services",
    "sampleParams": {
      "cardId": "card_9921"
    },
    "sampleBody": {
      "requestId": "REQ_9953ZED",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_27938"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "DPS Card and Account Services",
      "endpoint": "PUT /dps/v4/cards/{cardId}/status",
      "summary": "Update card block status (Lost/Stolen/Frozen)",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_ZQHK7EPN",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK19673"
    }
  },
  {
    "id": "dps-card-and-account-services::/dps/v4/cards/{cardId}/pin/set::POST",
    "specId": "dps-card-and-account-services",
    "specTitle": "DPS Card and Account Services",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/dps/v4/cards/{cardId}/pin/set",
    "summary": "Set or reset card encrypted PIN",
    "componentName": "SpecUI_DPS_Card_and_Account_Services",
    "sampleParams": {
      "cardId": "card_9921"
    },
    "sampleBody": {
      "requestId": "REQ_US7GQX3",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_98100"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "DPS Card and Account Services",
      "endpoint": "POST /dps/v4/cards/{cardId}/pin/set",
      "summary": "Set or reset card encrypted PIN",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_SJN9Q161",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK44696"
    }
  },
  {
    "id": "dps-card-and-account-services::/dps/v4/cards/{cardId}/velocity-limits::GET",
    "specId": "dps-card-and-account-services",
    "specTitle": "DPS Card and Account Services",
    "category": "Issuing & Processing",
    "method": "GET",
    "path": "/dps/v4/cards/{cardId}/velocity-limits",
    "summary": "Query daily ATM and POS spend caps",
    "componentName": "SpecUI_DPS_Card_and_Account_Services",
    "sampleParams": {
      "cardId": "card_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "DPS Card and Account Services",
      "endpoint": "GET /dps/v4/cards/{cardId}/velocity-limits",
      "summary": "Query daily ATM and POS spend caps",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_NVUUH80Q",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK89544"
    }
  },
  {
    "id": "dps-card-and-account-services::/dps/v4/cards/{cardId}/velocity-limits::PUT",
    "specId": "dps-card-and-account-services",
    "specTitle": "DPS Card and Account Services",
    "category": "Issuing & Processing",
    "method": "PUT",
    "path": "/dps/v4/cards/{cardId}/velocity-limits",
    "summary": "Adjust dynamic transaction limits",
    "componentName": "SpecUI_DPS_Card_and_Account_Services",
    "sampleParams": {
      "cardId": "card_9921"
    },
    "sampleBody": {
      "requestId": "REQ_BOC61ET",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_88614"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "DPS Card and Account Services",
      "endpoint": "PUT /dps/v4/cards/{cardId}/velocity-limits",
      "summary": "Adjust dynamic transaction limits",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_FIX3D5OG",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK83117"
    }
  },
  {
    "id": "dps-card-and-account-services::/dps/v4/cards/reissue::POST",
    "specId": "dps-card-and-account-services",
    "specTitle": "DPS Card and Account Services",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/dps/v4/cards/reissue",
    "summary": "Order replacement card",
    "componentName": "SpecUI_DPS_Card_and_Account_Services",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_5CN6HYO",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_23117"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "DPS Card and Account Services",
      "endpoint": "POST /dps/v4/cards/reissue",
      "summary": "Order replacement card",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_WSW0BLB8",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK77172"
    }
  },
  {
    "id": "dps-card-and-account-services::/dps/v4/authorizations/real-time::GET",
    "specId": "dps-card-and-account-services",
    "specTitle": "DPS Card and Account Services",
    "category": "Issuing & Processing",
    "method": "GET",
    "path": "/dps/v4/authorizations/real-time",
    "summary": "Live authorization stream query",
    "componentName": "SpecUI_DPS_Card_and_Account_Services",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_ba3wfa",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "dps-card-and-account-services::/dps/v4/stand-in/rules::POST",
    "specId": "dps-card-and-account-services",
    "specTitle": "DPS Card and Account Services",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/dps/v4/stand-in/rules",
    "summary": "Configure STIP stand-in fallback logic",
    "componentName": "SpecUI_DPS_Card_and_Account_Services",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_PNEQN62",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_38441"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "DPS Card and Account Services",
      "endpoint": "POST /dps/v4/stand-in/rules",
      "summary": "Configure STIP stand-in fallback logic",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_21Q4CJ3J",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK74276"
    }
  },
  {
    "id": "finicity-api::/aggregation/v1/customers::POST",
    "specId": "finicity-api",
    "specTitle": "Finicity API",
    "category": "Open Banking & Data",
    "method": "POST",
    "path": "/aggregation/v1/customers",
    "summary": "Enroll Finicity consumer",
    "componentName": "SpecUI_Finicity_API",
    "sampleParams": {},
    "sampleBody": {
      "username": "client_corp_99",
      "firstName": "Jordan",
      "lastName": "Vance",
      "email": "jordan.vance@fintech.io"
    },
    "sampleResponse": {
      "customerId": "CUST_803212",
      "enrolledDate": "2026-10-05T01:52:28.024Z",
      "institutionAccounts": [
        {
          "accountId": "acc_01",
          "institution": "Chase Commercial",
          "type": "checking",
          "balance": 148920.5,
          "currency": "USD"
        },
        {
          "accountId": "acc_02",
          "institution": "Silicon Valley Bank",
          "type": "treasury",
          "balance": 840250,
          "currency": "USD"
        }
      ],
      "statementAnalysisScore": 845,
      "verificationStatus": "VERIFIED"
    }
  },
  {
    "id": "finicity-api::/aggregation/v1/institutions::GET",
    "specId": "finicity-api",
    "specTitle": "Finicity API",
    "category": "Open Banking & Data",
    "method": "GET",
    "path": "/aggregation/v1/institutions",
    "summary": "Search financial institutions directory",
    "componentName": "SpecUI_Finicity_API",
    "sampleParams": {},
    "sampleBody": {
      "username": "client_corp_99",
      "firstName": "Jordan",
      "lastName": "Vance",
      "email": "jordan.vance@fintech.io"
    },
    "sampleResponse": {
      "customerId": "CUST_287462",
      "enrolledDate": "2026-10-05T01:52:28.024Z",
      "institutionAccounts": [
        {
          "accountId": "acc_01",
          "institution": "Chase Commercial",
          "type": "checking",
          "balance": 148920.5,
          "currency": "USD"
        },
        {
          "accountId": "acc_02",
          "institution": "Silicon Valley Bank",
          "type": "treasury",
          "balance": 840250,
          "currency": "USD"
        }
      ],
      "statementAnalysisScore": 845,
      "verificationStatus": "VERIFIED"
    }
  },
  {
    "id": "finicity-api::/aggregation/v1/connect/url::POST",
    "specId": "finicity-api",
    "specTitle": "Finicity API",
    "category": "Open Banking & Data",
    "method": "POST",
    "path": "/aggregation/v1/connect/url",
    "summary": "Generate Finicity Connect webview URL",
    "componentName": "SpecUI_Finicity_API",
    "sampleParams": {},
    "sampleBody": {
      "username": "client_corp_99",
      "firstName": "Jordan",
      "lastName": "Vance",
      "email": "jordan.vance@fintech.io"
    },
    "sampleResponse": {
      "customerId": "CUST_352269",
      "enrolledDate": "2026-10-05T01:52:28.024Z",
      "institutionAccounts": [
        {
          "accountId": "acc_01",
          "institution": "Chase Commercial",
          "type": "checking",
          "balance": 148920.5,
          "currency": "USD"
        },
        {
          "accountId": "acc_02",
          "institution": "Silicon Valley Bank",
          "type": "treasury",
          "balance": 840250,
          "currency": "USD"
        }
      ],
      "statementAnalysisScore": 845,
      "verificationStatus": "VERIFIED"
    }
  },
  {
    "id": "finicity-api::/aggregation/v1/customers/{customerId}/accounts::GET",
    "specId": "finicity-api",
    "specTitle": "Finicity API",
    "category": "Open Banking & Data",
    "method": "GET",
    "path": "/aggregation/v1/customers/{customerId}/accounts",
    "summary": "Retrieve consumer aggregated accounts",
    "componentName": "SpecUI_Finicity_API",
    "sampleParams": {
      "customerId": "customer_9921"
    },
    "sampleBody": {
      "username": "client_corp_99",
      "firstName": "Jordan",
      "lastName": "Vance",
      "email": "jordan.vance@fintech.io"
    },
    "sampleResponse": {
      "customerId": "CUST_432133",
      "enrolledDate": "2026-10-05T01:52:28.024Z",
      "institutionAccounts": [
        {
          "accountId": "acc_01",
          "institution": "Chase Commercial",
          "type": "checking",
          "balance": 148920.5,
          "currency": "USD"
        },
        {
          "accountId": "acc_02",
          "institution": "Silicon Valley Bank",
          "type": "treasury",
          "balance": 840250,
          "currency": "USD"
        }
      ],
      "statementAnalysisScore": 845,
      "verificationStatus": "VERIFIED"
    }
  },
  {
    "id": "finicity-api::/aggregation/v1/customers/{customerId}/transactions::GET",
    "specId": "finicity-api",
    "specTitle": "Finicity API",
    "category": "Open Banking & Data",
    "method": "GET",
    "path": "/aggregation/v1/customers/{customerId}/transactions",
    "summary": "Download verified bank statement transactions",
    "componentName": "SpecUI_Finicity_API",
    "sampleParams": {
      "customerId": "customer_9921"
    },
    "sampleBody": {
      "username": "client_corp_99",
      "firstName": "Jordan",
      "lastName": "Vance",
      "email": "jordan.vance@fintech.io"
    },
    "sampleResponse": {
      "customerId": "CUST_353482",
      "enrolledDate": "2026-10-05T01:52:28.024Z",
      "institutionAccounts": [
        {
          "accountId": "acc_01",
          "institution": "Chase Commercial",
          "type": "checking",
          "balance": 148920.5,
          "currency": "USD"
        },
        {
          "accountId": "acc_02",
          "institution": "Silicon Valley Bank",
          "type": "treasury",
          "balance": 840250,
          "currency": "USD"
        }
      ],
      "statementAnalysisScore": 845,
      "verificationStatus": "VERIFIED"
    }
  },
  {
    "id": "finicity-api::/decisioning/v2/reports/voa::POST",
    "specId": "finicity-api",
    "specTitle": "Finicity API",
    "category": "Open Banking & Data",
    "method": "POST",
    "path": "/decisioning/v2/reports/voa",
    "summary": "Generate Verification of Assets (VOA) report",
    "componentName": "SpecUI_Finicity_API",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_MSWX3ET",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_47056"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Finicity API",
      "endpoint": "POST /decisioning/v2/reports/voa",
      "summary": "Generate Verification of Assets (VOA) report",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_8G5LSAZ9",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK49903"
    }
  },
  {
    "id": "finicity-api::/decisioning/v2/reports/voi::POST",
    "specId": "finicity-api",
    "specTitle": "Finicity API",
    "category": "Open Banking & Data",
    "method": "POST",
    "path": "/decisioning/v2/reports/voi",
    "summary": "Generate Verification of Income (VOI) report",
    "componentName": "SpecUI_Finicity_API",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_J2JPI4V",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_61173"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Finicity API",
      "endpoint": "POST /decisioning/v2/reports/voi",
      "summary": "Generate Verification of Income (VOI) report",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_T3PIU2P8",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK84219"
    }
  },
  {
    "id": "foreign-exchange-rates::/v1/forex/rates/latest::GET",
    "specId": "foreign-exchange-rates",
    "specTitle": "Foreign Exchange Rates",
    "category": "Transactions & Orders",
    "method": "GET",
    "path": "/v1/forex/rates/latest",
    "summary": "Get latest interbank FX quotes",
    "componentName": "SpecUI_Foreign_Exchange_Rates",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "baseCurrency": "USD",
      "asOfTimestamp": "2026-10-05T01:52:28.024Z",
      "rates": {
        "EUR": 0.9234,
        "GBP": 0.7812,
        "JPY": 152.45,
        "CAD": 1.358,
        "AUD": 1.512,
        "CHF": 0.884,
        "SGD": 1.341
      },
      "interbankTier": "WHOLESALE_PRIME"
    }
  },
  {
    "id": "foreign-exchange-rates::/v1/forex/quotes/guaranteed::POST",
    "specId": "foreign-exchange-rates",
    "specTitle": "Foreign Exchange Rates",
    "category": "Transactions & Orders",
    "method": "POST",
    "path": "/v1/forex/quotes/guaranteed",
    "summary": "Lock in guaranteed cross-border rate for 15 mins",
    "componentName": "SpecUI_Foreign_Exchange_Rates",
    "sampleParams": {},
    "sampleBody": {
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "amount": 2500,
      "quoteType": "GUARANTEED_15_MIN"
    },
    "sampleResponse": {
      "quoteId": "QTE_FX_791831",
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "sourceAmount": 2500,
      "targetAmount": 2307.5,
      "exchangeRate": 0.923,
      "rateExpiresAt": "2026-10-05T02:07:28.024Z",
      "feeAmount": 3.5,
      "status": "GUARANTEED"
    }
  },
  {
    "id": "foreign-exchange-rates::/v1/forex/pairs/{pair}/history::GET",
    "specId": "foreign-exchange-rates",
    "specTitle": "Foreign Exchange Rates",
    "category": "Transactions & Orders",
    "method": "GET",
    "path": "/v1/forex/pairs/{pair}/history",
    "summary": "Historical daily FX settlement rates",
    "componentName": "SpecUI_Foreign_Exchange_Rates",
    "sampleParams": {
      "pair": "USD-EUR"
    },
    "sampleBody": null,
    "sampleResponse": {
      "baseCurrency": "USD",
      "asOfTimestamp": "2026-10-05T01:52:28.024Z",
      "rates": {
        "EUR": 0.9234,
        "GBP": 0.7812,
        "JPY": 152.45,
        "CAD": 1.358,
        "AUD": 1.512,
        "CHF": 0.884,
        "SGD": 1.341
      },
      "interbankTier": "WHOLESALE_PRIME"
    }
  },
  {
    "id": "foreign-exchange-rates::/v1/forex/contracts/execute::POST",
    "specId": "foreign-exchange-rates",
    "specTitle": "Foreign Exchange Rates",
    "category": "Transactions & Orders",
    "method": "POST",
    "path": "/v1/forex/contracts/execute",
    "summary": "Execute FX forward or spot contract",
    "componentName": "SpecUI_Foreign_Exchange_Rates",
    "sampleParams": {},
    "sampleBody": {
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "amount": 2500,
      "quoteType": "GUARANTEED_15_MIN"
    },
    "sampleResponse": {
      "quoteId": "QTE_FX_285347",
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "sourceAmount": 2500,
      "targetAmount": 2307.5,
      "exchangeRate": 0.923,
      "rateExpiresAt": "2026-10-05T02:07:28.024Z",
      "feeAmount": 3.5,
      "status": "GUARANTEED"
    }
  },
  {
    "id": "iam-token-management-partner-oauth2::/oauth2/v2/token::POST",
    "specId": "iam-token-management-partner-oauth2",
    "specTitle": "IAM TokenManagement Partner OAuth2",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/oauth2/v2/token",
    "summary": "Mint partner OAuth2 Bearer token",
    "componentName": "SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "panReferenceId": "PAN_REF_991823",
      "tokenRequestorId": "40000000001",
      "deviceType": "SECURE_ELEMENT_MOBILE",
      "tokenReason": "MOBILE_WALLET_ENROLLMENT"
    },
    "sampleResponse": {
      "tokenReferenceId": "TKN_REF_VMS4792",
      "tokenStatus": "ACTIVE",
      "tokenExpiryDate": "2029-05",
      "tavvCryptogram": "AQABAAAAAA...bE=",
      "deviceBindingHash": "SHA256:7f8a9b2c3d4e5f...",
      "panLastFour": "8910"
    }
  },
  {
    "id": "iam-token-management-partner-oauth2::/oauth2/v2/authorize/code::POST",
    "specId": "iam-token-management-partner-oauth2",
    "specTitle": "IAM TokenManagement Partner OAuth2",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/oauth2/v2/authorize/code",
    "summary": "PKCE authorization code redemption",
    "componentName": "SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_oosqh7",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "iam-token-management-partner-oauth2::/oauth2/v2/revoke::POST",
    "specId": "iam-token-management-partner-oauth2",
    "specTitle": "IAM TokenManagement Partner OAuth2",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/oauth2/v2/revoke",
    "summary": "Revoke active token pair",
    "componentName": "SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_flsufd",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "iam-token-management-partner-oauth2::/oauth2/v2/introspect::POST",
    "specId": "iam-token-management-partner-oauth2",
    "specTitle": "IAM TokenManagement Partner OAuth2",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/oauth2/v2/introspect",
    "summary": "RFC 7662 token introspection",
    "componentName": "SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_p7pwq8",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "iam-token-management-partner-oauth2::/oauth2/v2/certs::GET",
    "specId": "iam-token-management-partner-oauth2",
    "specTitle": "IAM TokenManagement Partner OAuth2",
    "category": "Risk & Identity",
    "method": "GET",
    "path": "/oauth2/v2/certs",
    "summary": "JSON Web Key Set (JWKS) public keys",
    "componentName": "SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_l558ui",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "incoming-webhooks::/webhooks/v1/endpoints::POST",
    "specId": "incoming-webhooks",
    "specTitle": "Incoming Webhooks",
    "category": "Developer Tools",
    "method": "POST",
    "path": "/webhooks/v1/endpoints",
    "summary": "Register webhook listener URL",
    "componentName": "SpecUI_Incoming_webhooks",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_FR93MW9",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_88500"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Incoming Webhooks",
      "endpoint": "POST /webhooks/v1/endpoints",
      "summary": "Register webhook listener URL",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_7V51SKB7",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK72829"
    }
  },
  {
    "id": "incoming-webhooks::/webhooks/v1/deliveries/failed::GET",
    "specId": "incoming-webhooks",
    "specTitle": "Incoming Webhooks",
    "category": "Developer Tools",
    "method": "GET",
    "path": "/webhooks/v1/deliveries/failed",
    "summary": "List failed events and retry triggers",
    "componentName": "SpecUI_Incoming_webhooks",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Incoming Webhooks",
      "endpoint": "GET /webhooks/v1/deliveries/failed",
      "summary": "List failed events and retry triggers",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_4HROS78P",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK43050"
    }
  },
  {
    "id": "incoming-webhooks::/webhooks/v1/test-event::POST",
    "specId": "incoming-webhooks",
    "specTitle": "Incoming Webhooks",
    "category": "Developer Tools",
    "method": "POST",
    "path": "/webhooks/v1/test-event",
    "summary": "Dispatch simulated sample event payload",
    "componentName": "SpecUI_Incoming_webhooks",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_P4CUCIR",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_31127"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Incoming Webhooks",
      "endpoint": "POST /webhooks/v1/test-event",
      "summary": "Dispatch simulated sample event payload",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_A66DEN5H",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK78026"
    }
  },
  {
    "id": "kernel-in-the-cloud::/kernel/v1/sessions/initiate::POST",
    "specId": "kernel-in-the-cloud",
    "specTitle": "Kernel in the Cloud",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/kernel/v1/sessions/initiate",
    "summary": "Initiate cloud terminal kernel session",
    "componentName": "SpecUI_Kernel_in_the_Cloud",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_22OOH54",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_26064"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Kernel in the Cloud",
      "endpoint": "POST /kernel/v1/sessions/initiate",
      "summary": "Initiate cloud terminal kernel session",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_VO5H579U",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK32930"
    }
  },
  {
    "id": "kernel-in-the-cloud::/kernel/v1/emv/process-apdu::POST",
    "specId": "kernel-in-the-cloud",
    "specTitle": "Kernel in the Cloud",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/kernel/v1/emv/process-apdu",
    "summary": "Process EMV chip APDU command script",
    "componentName": "SpecUI_Kernel_in_the_Cloud",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_WHTV110",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_51827"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Kernel in the Cloud",
      "endpoint": "POST /kernel/v1/emv/process-apdu",
      "summary": "Process EMV chip APDU command script",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_3SCYMOG8",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK72671"
    }
  },
  {
    "id": "kernel-in-the-cloud::/kernel/v1/nfc/contactless-read::POST",
    "specId": "kernel-in-the-cloud",
    "specTitle": "Kernel in the Cloud",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/kernel/v1/nfc/contactless-read",
    "summary": "Process contactless NFC tag payload",
    "componentName": "SpecUI_Kernel_in_the_Cloud",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_992E199",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_51738"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Kernel in the Cloud",
      "endpoint": "POST /kernel/v1/nfc/contactless-read",
      "summary": "Process contactless NFC tag payload",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_BBTGEFB3",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK68597"
    }
  },
  {
    "id": "kernel-in-the-cloud::/kernel/v1/terminals/{terminalId}/health::GET",
    "specId": "kernel-in-the-cloud",
    "specTitle": "Kernel in the Cloud",
    "category": "Issuing & Processing",
    "method": "GET",
    "path": "/kernel/v1/terminals/{terminalId}/health",
    "summary": "Check POS terminal attestation & key state",
    "componentName": "SpecUI_Kernel_in_the_Cloud",
    "sampleParams": {
      "terminalId": "terminal_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Kernel in the Cloud",
      "endpoint": "GET /kernel/v1/terminals/{terminalId}/health",
      "summary": "Check POS terminal attestation & key state",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_UHZN770X",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK73742"
    }
  },
  {
    "id": "kernel-in-the-cloud::/kernel/v1/certificates/inject::POST",
    "specId": "kernel-in-the-cloud",
    "specTitle": "Kernel in the Cloud",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/kernel/v1/certificates/inject",
    "summary": "Inject CA public key certificate",
    "componentName": "SpecUI_Kernel_in_the_Cloud",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_UDA9TXZ",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_59829"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Kernel in the Cloud",
      "endpoint": "POST /kernel/v1/certificates/inject",
      "summary": "Inject CA public key certificate",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_8JEUMTPT",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK46919"
    }
  },
  {
    "id": "paypal-apis::/v2/checkout/orders::POST",
    "specId": "paypal-apis",
    "specTitle": "PayPal APIs",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v2/checkout/orders",
    "summary": "Create PayPal wallet order",
    "componentName": "SpecUI_PayPal_APIs",
    "sampleParams": {},
    "sampleBody": {
      "consumerEmail": "shopper@example.com",
      "orderAmount": 89.95,
      "merchantId": "MERCH_US_99812",
      "srcCorrelationId": "SRC_85le8mp"
    },
    "sampleResponse": {
      "checkoutStatus": "SRC_RECOGNIZED",
      "consumerProfileId": "SRC_USR_882910",
      "enrolledCardsCount": 3,
      "maskedCards": [
        {
          "cardId": "c_1",
          "brand": "VISA",
          "lastFour": "4242",
          "expMonth": "08",
          "expYear": "2028",
          "default": true
        },
        {
          "cardId": "c_2",
          "brand": "VISA",
          "lastFour": "9012",
          "expMonth": "11",
          "expYear": "2027",
          "default": false
        }
      ],
      "encryptedPaymentData": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0..."
    }
  },
  {
    "id": "paypal-apis::/v2/checkout/orders/{orderId}/capture::POST",
    "specId": "paypal-apis",
    "specTitle": "PayPal APIs",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v2/checkout/orders/{orderId}/capture",
    "summary": "Capture authorized payment",
    "componentName": "SpecUI_PayPal_APIs",
    "sampleParams": {
      "orderId": "order_9921"
    },
    "sampleBody": {
      "consumerEmail": "shopper@example.com",
      "orderAmount": 89.95,
      "merchantId": "MERCH_US_99812",
      "srcCorrelationId": "SRC_54zqi00"
    },
    "sampleResponse": {
      "checkoutStatus": "SRC_RECOGNIZED",
      "consumerProfileId": "SRC_USR_882910",
      "enrolledCardsCount": 3,
      "maskedCards": [
        {
          "cardId": "c_1",
          "brand": "VISA",
          "lastFour": "4242",
          "expMonth": "08",
          "expYear": "2028",
          "default": true
        },
        {
          "cardId": "c_2",
          "brand": "VISA",
          "lastFour": "9012",
          "expMonth": "11",
          "expYear": "2027",
          "default": false
        }
      ],
      "encryptedPaymentData": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0..."
    }
  },
  {
    "id": "paypal-apis::/v2/payments/captures/{captureId}/refund::POST",
    "specId": "paypal-apis",
    "specTitle": "PayPal APIs",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v2/payments/captures/{captureId}/refund",
    "summary": "Issue partial or full refund",
    "componentName": "SpecUI_PayPal_APIs",
    "sampleParams": {
      "captureId": "capture_9921"
    },
    "sampleBody": {
      "requestId": "REQ_HWPTA05",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_98410"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "PayPal APIs",
      "endpoint": "POST /v2/payments/captures/{captureId}/refund",
      "summary": "Issue partial or full refund",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_GY0OOGE9",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK84581"
    }
  },
  {
    "id": "paypal-apis::/v2/checkout/orders/{orderId}::GET",
    "specId": "paypal-apis",
    "specTitle": "PayPal APIs",
    "category": "Digital Solutions & Payments",
    "method": "GET",
    "path": "/v2/checkout/orders/{orderId}",
    "summary": "Inspect order details and shipping",
    "componentName": "SpecUI_PayPal_APIs",
    "sampleParams": {
      "orderId": "order_9921"
    },
    "sampleBody": {
      "consumerEmail": "shopper@example.com",
      "orderAmount": 89.95,
      "merchantId": "MERCH_US_99812",
      "srcCorrelationId": "SRC_khxep56"
    },
    "sampleResponse": {
      "checkoutStatus": "SRC_RECOGNIZED",
      "consumerProfileId": "SRC_USR_882910",
      "enrolledCardsCount": 3,
      "maskedCards": [
        {
          "cardId": "c_1",
          "brand": "VISA",
          "lastFour": "4242",
          "expMonth": "08",
          "expYear": "2028",
          "default": true
        },
        {
          "cardId": "c_2",
          "brand": "VISA",
          "lastFour": "9012",
          "expMonth": "11",
          "expYear": "2027",
          "default": false
        }
      ],
      "encryptedPaymentData": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0..."
    }
  },
  {
    "id": "paypal-apis::/v1/payments/payouts::POST",
    "specId": "paypal-apis",
    "specTitle": "PayPal APIs",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v1/payments/payouts",
    "summary": "Send batch payouts to multiple recipients",
    "componentName": "SpecUI_PayPal_APIs",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_UFYJPV5",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_74790"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "PayPal APIs",
      "endpoint": "POST /v1/payments/payouts",
      "summary": "Send batch payouts to multiple recipients",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_ZW1HQKC9",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK66010"
    }
  },
  {
    "id": "reward-linkage-shop-with-points::/v1/rewards/link::POST",
    "specId": "reward-linkage-shop-with-points",
    "specTitle": "Reward Linkage Shop With Points OpenAPI",
    "category": "Rewards & Loyalty",
    "method": "POST",
    "path": "/v1/rewards/link",
    "summary": "Link reward program to card account",
    "componentName": "SpecUI_RewardLinkageShopWithPoints_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_0X4938S",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_47701"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Reward Linkage Shop With Points OpenAPI",
      "endpoint": "POST /v1/rewards/link",
      "summary": "Link reward program to card account",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_D4893XG0",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK17559"
    }
  },
  {
    "id": "reward-linkage-shop-with-points::/v1/rewards/balance::GET",
    "specId": "reward-linkage-shop-with-points",
    "specTitle": "Reward Linkage Shop With Points OpenAPI",
    "category": "Rewards & Loyalty",
    "method": "GET",
    "path": "/v1/rewards/balance",
    "summary": "Get spendable points balance & conversion value",
    "componentName": "SpecUI_RewardLinkageShopWithPoints_OpenAPI",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "reward-linkage-shop-with-points::/v1/rewards/quote::POST",
    "specId": "reward-linkage-shop-with-points",
    "specTitle": "Reward Linkage Shop With Points OpenAPI",
    "category": "Rewards & Loyalty",
    "method": "POST",
    "path": "/v1/rewards/quote",
    "summary": "Quote point redemption rate for merchant cart",
    "componentName": "SpecUI_RewardLinkageShopWithPoints_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "amount": 2500,
      "quoteType": "GUARANTEED_15_MIN"
    },
    "sampleResponse": {
      "quoteId": "QTE_FX_103736",
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "sourceAmount": 2500,
      "targetAmount": 2307.5,
      "exchangeRate": 0.923,
      "rateExpiresAt": "2026-10-05T02:07:28.024Z",
      "feeAmount": 3.5,
      "status": "GUARANTEED"
    }
  },
  {
    "id": "reward-linkage-shop-with-points::/v1/rewards/unlink::DELETE",
    "specId": "reward-linkage-shop-with-points",
    "specTitle": "Reward Linkage Shop With Points OpenAPI",
    "category": "Rewards & Loyalty",
    "method": "DELETE",
    "path": "/v1/rewards/unlink",
    "summary": "Unlink merchant loyalty program",
    "componentName": "SpecUI_RewardLinkageShopWithPoints_OpenAPI",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Reward Linkage Shop With Points OpenAPI",
      "endpoint": "DELETE /v1/rewards/unlink",
      "summary": "Unlink merchant loyalty program",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_12P4S4DZ",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK25966"
    }
  },
  {
    "id": "reward-redemption-select-and-credit::/v1/redemptions/statement-credit::POST",
    "specId": "reward-redemption-select-and-credit",
    "specTitle": "Reward Redemption Select And Credit OpenAPI",
    "category": "Rewards & Loyalty",
    "method": "POST",
    "path": "/v1/redemptions/statement-credit",
    "summary": "Redeem points for statement credit",
    "componentName": "SpecUI_RewardRedemptionSelectAndCredit_OpenAPI",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "accountId": "ACC_8819203",
      "currentBalance": 14250.8,
      "availableCredit": 35749.2,
      "creditLimit": 50000,
      "paymentDueDate": "2026-10-26",
      "minimumPaymentDue": 250,
      "lastPaymentAmount": 4500,
      "billingCycle": "MONTHLY_CALENDAR"
    }
  },
  {
    "id": "reward-redemption-select-and-credit::/v1/redemptions/cashback::POST",
    "specId": "reward-redemption-select-and-credit",
    "specTitle": "Reward Redemption Select And Credit OpenAPI",
    "category": "Rewards & Loyalty",
    "method": "POST",
    "path": "/v1/redemptions/cashback",
    "summary": "Disburse cash back to checking account",
    "componentName": "SpecUI_RewardRedemptionSelectAndCredit_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_Q0PFXCG",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_35832"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Reward Redemption Select And Credit OpenAPI",
      "endpoint": "POST /v1/redemptions/cashback",
      "summary": "Disburse cash back to checking account",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_VJX70SPK",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK78461"
    }
  },
  {
    "id": "reward-redemption-select-and-credit::/v1/redemptions/history::GET",
    "specId": "reward-redemption-select-and-credit",
    "specTitle": "Reward Redemption Select And Credit OpenAPI",
    "category": "Rewards & Loyalty",
    "method": "GET",
    "path": "/v1/redemptions/history",
    "summary": "Query past redemption transaction logs",
    "componentName": "SpecUI_RewardRedemptionSelectAndCredit_OpenAPI",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Reward Redemption Select And Credit OpenAPI",
      "endpoint": "GET /v1/redemptions/history",
      "summary": "Query past redemption transaction logs",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_WT6EPXQR",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK10743"
    }
  },
  {
    "id": "reward-redemption-select-and-credit::/v1/redemptions/cancel::POST",
    "specId": "reward-redemption-select-and-credit",
    "specTitle": "Reward Redemption Select And Credit OpenAPI",
    "category": "Rewards & Loyalty",
    "method": "POST",
    "path": "/v1/redemptions/cancel",
    "summary": "Cancel pending unposted redemption",
    "componentName": "SpecUI_RewardRedemptionSelectAndCredit_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_5KSUVL7",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_89284"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Reward Redemption Select And Credit OpenAPI",
      "endpoint": "POST /v1/redemptions/cancel",
      "summary": "Cancel pending unposted redemption",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_2HAIOTDU",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK97631"
    }
  },
  {
    "id": "security-e2e-key-exchange-prelogin::/security/v2/key-exchange/initiate::POST",
    "specId": "security-e2e-key-exchange-prelogin",
    "specTitle": "Security E2E Key Exchange PreLogin Partner OpenAPI",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/security/v2/key-exchange/initiate",
    "summary": "Initiate ECDH Diffie-Hellman handshake",
    "componentName": "SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_7KKESI1",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_79341"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Security E2E Key Exchange PreLogin Partner OpenAPI",
      "endpoint": "POST /security/v2/key-exchange/initiate",
      "summary": "Initiate ECDH Diffie-Hellman handshake",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_407IS1R1",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK33777"
    }
  },
  {
    "id": "security-e2e-key-exchange-prelogin::/security/v2/key-exchange/finalize::POST",
    "specId": "security-e2e-key-exchange-prelogin",
    "specTitle": "Security E2E Key Exchange PreLogin Partner OpenAPI",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/security/v2/key-exchange/finalize",
    "summary": "Finalize shared secret and session token",
    "componentName": "SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_VBD276C",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_27052"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Security E2E Key Exchange PreLogin Partner OpenAPI",
      "endpoint": "POST /security/v2/key-exchange/finalize",
      "summary": "Finalize shared secret and session token",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_G71MRYKX",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK38106"
    }
  },
  {
    "id": "security-e2e-key-exchange-prelogin::/security/v2/payload/encrypt::POST",
    "specId": "security-e2e-key-exchange-prelogin",
    "specTitle": "Security E2E Key Exchange PreLogin Partner OpenAPI",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/security/v2/payload/encrypt",
    "summary": "Encrypt sensitive cardholder fields",
    "componentName": "SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_3IOPES0",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_35429"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Security E2E Key Exchange PreLogin Partner OpenAPI",
      "endpoint": "POST /security/v2/payload/encrypt",
      "summary": "Encrypt sensitive cardholder fields",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_CA9KVLGD",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK69998"
    }
  },
  {
    "id": "security-e2e-key-exchange-prelogin::/security/v2/session/validate::POST",
    "specId": "security-e2e-key-exchange-prelogin",
    "specTitle": "Security E2E Key Exchange PreLogin Partner OpenAPI",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/security/v2/session/validate",
    "summary": "Validate cryptographic session heartbeat",
    "componentName": "SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_AI6BQEG",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_55977"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Security E2E Key Exchange PreLogin Partner OpenAPI",
      "endpoint": "POST /security/v2/session/validate",
      "summary": "Validate cryptographic session heartbeat",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_5NHE4I1E",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK65594"
    }
  },
  {
    "id": "tax-statement-digital-orchestration::/v1/taxes/1099/generate::POST",
    "specId": "tax-statement-digital-orchestration",
    "specTitle": "Tax Statement Digital Orchestration",
    "category": "Corporate & Commercial",
    "method": "POST",
    "path": "/v1/taxes/1099/generate",
    "summary": "Generate IRS 1099-K electronic statement",
    "componentName": "SpecUI_TaxStatement_Digital_Orchestation",
    "sampleParams": {},
    "sampleBody": {
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "amount": 2500,
      "quoteType": "GUARANTEED_15_MIN"
    },
    "sampleResponse": {
      "quoteId": "QTE_FX_627485",
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "sourceAmount": 2500,
      "targetAmount": 2307.5,
      "exchangeRate": 0.923,
      "rateExpiresAt": "2026-10-05T02:07:28.024Z",
      "feeAmount": 3.5,
      "status": "GUARANTEED"
    }
  },
  {
    "id": "tax-statement-digital-orchestration::/v1/taxes/documents/{documentId}::GET",
    "specId": "tax-statement-digital-orchestration",
    "specTitle": "Tax Statement Digital Orchestration",
    "category": "Corporate & Commercial",
    "method": "GET",
    "path": "/v1/taxes/documents/{documentId}",
    "summary": "Download encrypted PDF tax slip",
    "componentName": "SpecUI_TaxStatement_Digital_Orchestation",
    "sampleParams": {
      "documentId": "document_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Tax Statement Digital Orchestration",
      "endpoint": "GET /v1/taxes/documents/{documentId}",
      "summary": "Download encrypted PDF tax slip",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_PCS5ZJBR",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK43895"
    }
  },
  {
    "id": "tax-statement-digital-orchestration::/v1/taxes/w8ben/submit::POST",
    "specId": "tax-statement-digital-orchestration",
    "specTitle": "Tax Statement Digital Orchestration",
    "category": "Corporate & Commercial",
    "method": "POST",
    "path": "/v1/taxes/w8ben/submit",
    "summary": "Submit foreign entity W-8BEN withholding certification",
    "componentName": "SpecUI_TaxStatement_Digital_Orchestation",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_OWOYSUP",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_87355"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Tax Statement Digital Orchestration",
      "endpoint": "POST /v1/taxes/w8ben/submit",
      "summary": "Submit foreign entity W-8BEN withholding certification",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_3ML0RPBF",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK80114"
    }
  },
  {
    "id": "tax-statement-digital-orchestration::/v1/taxes/withholding/summary::GET",
    "specId": "tax-statement-digital-orchestration",
    "specTitle": "Tax Statement Digital Orchestration",
    "category": "Corporate & Commercial",
    "method": "GET",
    "path": "/v1/taxes/withholding/summary",
    "summary": "Annual withholding tax ledger breakdown",
    "componentName": "SpecUI_TaxStatement_Digital_Orchestation",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Tax Statement Digital Orchestration",
      "endpoint": "GET /v1/taxes/withholding/summary",
      "summary": "Annual withholding tax ledger breakdown",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_XCZRYT7A",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK31238"
    }
  },
  {
    "id": "token-authorization::/v3/tokens/authorize::POST",
    "specId": "token-authorization",
    "specTitle": "Token Authorization",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v3/tokens/authorize",
    "summary": "Authorize digital wallet payment token",
    "componentName": "SpecUI_Token_Authorization",
    "sampleParams": {},
    "sampleBody": {
      "panReferenceId": "PAN_REF_991823",
      "tokenRequestorId": "40000000001",
      "deviceType": "SECURE_ELEMENT_MOBILE",
      "tokenReason": "MOBILE_WALLET_ENROLLMENT"
    },
    "sampleResponse": {
      "tokenReferenceId": "TKN_REF_TH2G6ZA",
      "tokenStatus": "ACTIVE",
      "tokenExpiryDate": "2029-05",
      "tavvCryptogram": "AQABAAAAAA...bE=",
      "deviceBindingHash": "SHA256:7f8a9b2c3d4e5f...",
      "panLastFour": "8910"
    }
  },
  {
    "id": "token-authorization::/v3/tokens/cryptogram/verify::POST",
    "specId": "token-authorization",
    "specTitle": "Token Authorization",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v3/tokens/cryptogram/verify",
    "summary": "Verify 3DS / TAVV cryptographic payload",
    "componentName": "SpecUI_Token_Authorization",
    "sampleParams": {},
    "sampleBody": {
      "panReferenceId": "PAN_REF_991823",
      "tokenRequestorId": "40000000001",
      "deviceType": "SECURE_ELEMENT_MOBILE",
      "tokenReason": "MOBILE_WALLET_ENROLLMENT"
    },
    "sampleResponse": {
      "tokenReferenceId": "TKN_REF_BXQ2HG1",
      "tokenStatus": "ACTIVE",
      "tokenExpiryDate": "2029-05",
      "tavvCryptogram": "AQABAAAAAA...bE=",
      "deviceBindingHash": "SHA256:7f8a9b2c3d4e5f...",
      "panLastFour": "8910"
    }
  },
  {
    "id": "token-authorization::/v3/tokens/{tokenReferenceId}/status::GET",
    "specId": "token-authorization",
    "specTitle": "Token Authorization",
    "category": "Digital Solutions & Payments",
    "method": "GET",
    "path": "/v3/tokens/{tokenReferenceId}/status",
    "summary": "Query VTS token status and PAN lifecycle",
    "componentName": "SpecUI_Token_Authorization",
    "sampleParams": {
      "tokenReferenceId": "tokenReference_9921"
    },
    "sampleBody": {
      "panReferenceId": "PAN_REF_991823",
      "tokenRequestorId": "40000000001",
      "deviceType": "SECURE_ELEMENT_MOBILE",
      "tokenReason": "MOBILE_WALLET_ENROLLMENT"
    },
    "sampleResponse": {
      "tokenReferenceId": "TKN_REF_NSG1XC2",
      "tokenStatus": "ACTIVE",
      "tokenExpiryDate": "2029-05",
      "tavvCryptogram": "AQABAAAAAA...bE=",
      "deviceBindingHash": "SHA256:7f8a9b2c3d4e5f...",
      "panLastFour": "8910"
    }
  },
  {
    "id": "token-authorization::/v3/tokens/{tokenReferenceId}/suspend::POST",
    "specId": "token-authorization",
    "specTitle": "Token Authorization",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v3/tokens/{tokenReferenceId}/suspend",
    "summary": "Suspend token immediately",
    "componentName": "SpecUI_Token_Authorization",
    "sampleParams": {
      "tokenReferenceId": "tokenReference_9921"
    },
    "sampleBody": {
      "panReferenceId": "PAN_REF_991823",
      "tokenRequestorId": "40000000001",
      "deviceType": "SECURE_ELEMENT_MOBILE",
      "tokenReason": "MOBILE_WALLET_ENROLLMENT"
    },
    "sampleResponse": {
      "tokenReferenceId": "TKN_REF_7HZL7FV",
      "tokenStatus": "ACTIVE",
      "tokenExpiryDate": "2029-05",
      "tavvCryptogram": "AQABAAAAAA...bE=",
      "deviceBindingHash": "SHA256:7f8a9b2c3d4e5f...",
      "panLastFour": "8910"
    }
  },
  {
    "id": "token-authorization::/v3/tokens/{tokenReferenceId}/resume::POST",
    "specId": "token-authorization",
    "specTitle": "Token Authorization",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v3/tokens/{tokenReferenceId}/resume",
    "summary": "Resume suspended token",
    "componentName": "SpecUI_Token_Authorization",
    "sampleParams": {
      "tokenReferenceId": "tokenReference_9921"
    },
    "sampleBody": {
      "panReferenceId": "PAN_REF_991823",
      "tokenRequestorId": "40000000001",
      "deviceType": "SECURE_ELEMENT_MOBILE",
      "tokenReason": "MOBILE_WALLET_ENROLLMENT"
    },
    "sampleResponse": {
      "tokenReferenceId": "TKN_REF_LFOOEBJ",
      "tokenStatus": "ACTIVE",
      "tokenExpiryDate": "2029-05",
      "tavvCryptogram": "AQABAAAAAA...bE=",
      "deviceBindingHash": "SHA256:7f8a9b2c3d4e5f...",
      "panLastFour": "8910"
    }
  },
  {
    "id": "virtual-card-payments::/v2/virtual-cards/issue::POST",
    "specId": "virtual-card-payments",
    "specTitle": "Virtual Card Payments",
    "category": "Virtual Cards & B2B",
    "method": "POST",
    "path": "/v2/virtual-cards/issue",
    "summary": "Generate single or multi-use virtual card",
    "componentName": "SpecUI_Virtual_Card_Payments",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_ZUM06SG",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_70033"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Virtual Card Payments",
      "endpoint": "POST /v2/virtual-cards/issue",
      "summary": "Generate single or multi-use virtual card",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_7TOFM5RF",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK57381"
    }
  },
  {
    "id": "virtual-card-payments::/v2/virtual-cards/{cardId}::GET",
    "specId": "virtual-card-payments",
    "specTitle": "Virtual Card Payments",
    "category": "Virtual Cards & B2B",
    "method": "GET",
    "path": "/v2/virtual-cards/{cardId}",
    "summary": "Get masked card number, CVV, and expiration",
    "componentName": "SpecUI_Virtual_Card_Payments",
    "sampleParams": {
      "cardId": "card_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Virtual Card Payments",
      "endpoint": "GET /v2/virtual-cards/{cardId}",
      "summary": "Get masked card number, CVV, and expiration",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_WC9ZIUEG",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK32542"
    }
  },
  {
    "id": "virtual-card-payments::/v2/virtual-cards/{cardId}/controls::PUT",
    "specId": "virtual-card-payments",
    "specTitle": "Virtual Card Payments",
    "category": "Virtual Cards & B2B",
    "method": "PUT",
    "path": "/v2/virtual-cards/{cardId}/controls",
    "summary": "Set Merchant Category Code (MCC) filters",
    "componentName": "SpecUI_Virtual_Card_Payments",
    "sampleParams": {
      "cardId": "card_9921"
    },
    "sampleBody": {
      "requestId": "REQ_1OJXUKR",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_89489"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Virtual Card Payments",
      "endpoint": "PUT /v2/virtual-cards/{cardId}/controls",
      "summary": "Set Merchant Category Code (MCC) filters",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_WZB2Q2AC",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK56233"
    }
  },
  {
    "id": "virtual-card-payments::/v2/virtual-cards/{cardId}/cancel::POST",
    "specId": "virtual-card-payments",
    "specTitle": "Virtual Card Payments",
    "category": "Virtual Cards & B2B",
    "method": "POST",
    "path": "/v2/virtual-cards/{cardId}/cancel",
    "summary": "Cancel virtual card upon invoice match",
    "componentName": "SpecUI_Virtual_Card_Payments",
    "sampleParams": {
      "cardId": "card_9921"
    },
    "sampleBody": {
      "requestId": "REQ_WBLZSK0",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_18747"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Virtual Card Payments",
      "endpoint": "POST /v2/virtual-cards/{cardId}/cancel",
      "summary": "Cancel virtual card upon invoice match",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_M83S0HNK",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK22860"
    }
  },
  {
    "id": "virtual-card-payments::/v2/virtual-cards/transactions::GET",
    "specId": "virtual-card-payments",
    "specTitle": "Virtual Card Payments",
    "category": "Virtual Cards & B2B",
    "method": "GET",
    "path": "/v2/virtual-cards/transactions",
    "summary": "Search transactions across all virtual cards",
    "componentName": "SpecUI_Virtual_Card_Payments",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Virtual Card Payments",
      "endpoint": "GET /v2/virtual-cards/transactions",
      "summary": "Search transactions across all virtual cards",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_9TE2K6YP",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK63617"
    }
  },
  {
    "id": "visa-accounts-receivable-manager::/v1/arm/invoices/upload::POST",
    "specId": "visa-accounts-receivable-manager",
    "specTitle": "Visa Accounts Receivable Manager",
    "category": "Corporate & Commercial",
    "method": "POST",
    "path": "/v1/arm/invoices/upload",
    "summary": "Upload enterprise ERP invoice batch",
    "componentName": "SpecUI_Visa_Accounts_Receivable_Manager",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_PDWMKCT",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_67356"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Accounts Receivable Manager",
      "endpoint": "POST /v1/arm/invoices/upload",
      "summary": "Upload enterprise ERP invoice batch",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_IDR90WXM",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK91034"
    }
  },
  {
    "id": "visa-accounts-receivable-manager::/v1/arm/invoices/{invoiceId}/status::GET",
    "specId": "visa-accounts-receivable-manager",
    "specTitle": "Visa Accounts Receivable Manager",
    "category": "Corporate & Commercial",
    "method": "GET",
    "path": "/v1/arm/invoices/{invoiceId}/status",
    "summary": "Check matching and settlement status",
    "componentName": "SpecUI_Visa_Accounts_Receivable_Manager",
    "sampleParams": {
      "invoiceId": "invoice_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Accounts Receivable Manager",
      "endpoint": "GET /v1/arm/invoices/{invoiceId}/status",
      "summary": "Check matching and settlement status",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_1VXTZPQG",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK69707"
    }
  },
  {
    "id": "visa-accounts-receivable-manager::/v1/arm/remittance/match::POST",
    "specId": "visa-accounts-receivable-manager",
    "specTitle": "Visa Accounts Receivable Manager",
    "category": "Corporate & Commercial",
    "method": "POST",
    "path": "/v1/arm/remittance/match",
    "summary": "Trigger automated machine learning invoice reconciliation",
    "componentName": "SpecUI_Visa_Accounts_Receivable_Manager",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_YTYDEMG",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_90506"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Accounts Receivable Manager",
      "endpoint": "POST /v1/arm/remittance/match",
      "summary": "Trigger automated machine learning invoice reconciliation",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_AJJ4N3U9",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK87658"
    }
  },
  {
    "id": "visa-accounts-receivable-manager::/v1/arm/discrepancies::GET",
    "specId": "visa-accounts-receivable-manager",
    "specTitle": "Visa Accounts Receivable Manager",
    "category": "Corporate & Commercial",
    "method": "GET",
    "path": "/v1/arm/discrepancies",
    "summary": "List payment underpayment / overpayment exceptions",
    "componentName": "SpecUI_Visa_Accounts_Receivable_Manager",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Accounts Receivable Manager",
      "endpoint": "GET /v1/arm/discrepancies",
      "summary": "List payment underpayment / overpayment exceptions",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_DTOCGI4J",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK86840"
    }
  },
  {
    "id": "visa-bin-attribute-sharing-service::/v2/bin/inquire::POST",
    "specId": "visa-bin-attribute-sharing-service",
    "specTitle": "Visa BIN Attribute Sharing Service",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v2/bin/inquire",
    "summary": "Inquire 6-digit or 8-digit BIN table metadata",
    "componentName": "SpecUI_Visa_BIN_Attribute_Sharing_Service",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "binNumber": "414720",
      "brand": "VISA",
      "cardType": "CREDIT",
      "productCode": "SIGNATURE_PREFERRED",
      "issuingBank": "JPMorgan Chase Bank, N.A.",
      "issuingCountryIso2": "US",
      "currencyCode": "USD",
      "commercialIndicator": "N",
      "contactlessEnabled": true,
      "domesticRoutingEligible": true
    }
  },
  {
    "id": "visa-bin-attribute-sharing-service::/v2/bin/ranges/{binNumber}::GET",
    "specId": "visa-bin-attribute-sharing-service",
    "specTitle": "Visa BIN Attribute Sharing Service",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v2/bin/ranges/{binNumber}",
    "summary": "Get card brand, product code, issuing bank, country",
    "componentName": "SpecUI_Visa_BIN_Attribute_Sharing_Service",
    "sampleParams": {
      "binNumber": "4000123456789010"
    },
    "sampleBody": null,
    "sampleResponse": {
      "binNumber": "414720",
      "brand": "VISA",
      "cardType": "CREDIT",
      "productCode": "SIGNATURE_PREFERRED",
      "issuingBank": "JPMorgan Chase Bank, N.A.",
      "issuingCountryIso2": "US",
      "currencyCode": "USD",
      "commercialIndicator": "N",
      "contactlessEnabled": true,
      "domesticRoutingEligible": true
    }
  },
  {
    "id": "visa-bin-attribute-sharing-service::/v2/bin/routing/fast-path::GET",
    "specId": "visa-bin-attribute-sharing-service",
    "specTitle": "Visa BIN Attribute Sharing Service",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v2/bin/routing/fast-path",
    "summary": "Identify low-cost domestic routing eligibility",
    "componentName": "SpecUI_Visa_BIN_Attribute_Sharing_Service",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "binNumber": "414720",
      "brand": "VISA",
      "cardType": "CREDIT",
      "productCode": "SIGNATURE_PREFERRED",
      "issuingBank": "JPMorgan Chase Bank, N.A.",
      "issuingCountryIso2": "US",
      "currencyCode": "USD",
      "commercialIndicator": "N",
      "contactlessEnabled": true,
      "domesticRoutingEligible": true
    }
  },
  {
    "id": "visa-bin-attribute-sharing-service::/v2/bin/commercial-indicator::GET",
    "specId": "visa-bin-attribute-sharing-service",
    "specTitle": "Visa BIN Attribute Sharing Service",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v2/bin/commercial-indicator",
    "summary": "Check if card is Corporate, Fleet, or Purchasing",
    "componentName": "SpecUI_Visa_BIN_Attribute_Sharing_Service",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "binNumber": "414720",
      "brand": "VISA",
      "cardType": "CREDIT",
      "productCode": "SIGNATURE_PREFERRED",
      "issuingBank": "JPMorgan Chase Bank, N.A.",
      "issuingCountryIso2": "US",
      "currencyCode": "USD",
      "commercialIndicator": "N",
      "contactlessEnabled": true,
      "domesticRoutingEligible": true
    }
  },
  {
    "id": "visa-card-program-management::/v3/programs::GET",
    "specId": "visa-card-program-management",
    "specTitle": "Visa Card Program Management",
    "category": "Issuing & Processing",
    "method": "GET",
    "path": "/v3/programs",
    "summary": "List active card programs",
    "componentName": "SpecUI_Visa_Card_Program_Management",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Card Program Management",
      "endpoint": "GET /v3/programs",
      "summary": "List active card programs",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_N166UFK7",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK11894"
    }
  },
  {
    "id": "visa-card-program-management::/v3/programs/create::POST",
    "specId": "visa-card-program-management",
    "specTitle": "Visa Card Program Management",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/v3/programs/create",
    "summary": "Configure new card product definition",
    "componentName": "SpecUI_Visa_Card_Program_Management",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_ARWGSFZ",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_99235"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Card Program Management",
      "endpoint": "POST /v3/programs/create",
      "summary": "Configure new card product definition",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_4IRL8F2J",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK33692"
    }
  },
  {
    "id": "visa-card-program-management::/v3/programs/{programId}/limits::PUT",
    "specId": "visa-card-program-management",
    "specTitle": "Visa Card Program Management",
    "category": "Issuing & Processing",
    "method": "PUT",
    "path": "/v3/programs/{programId}/limits",
    "summary": "Update default daily authorization caps",
    "componentName": "SpecUI_Visa_Card_Program_Management",
    "sampleParams": {
      "programId": "program_9921"
    },
    "sampleBody": {
      "requestId": "REQ_NKW201F",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_96509"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Card Program Management",
      "endpoint": "PUT /v3/programs/{programId}/limits",
      "summary": "Update default daily authorization caps",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_ODNAVNUS",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK21798"
    }
  },
  {
    "id": "visa-card-program-management::/v3/programs/{programId}/art-profiles::POST",
    "specId": "visa-card-program-management",
    "specTitle": "Visa Card Program Management",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/v3/programs/{programId}/art-profiles",
    "summary": "Upload digital wallet card artwork asset",
    "componentName": "SpecUI_Visa_Card_Program_Management",
    "sampleParams": {
      "programId": "program_9921"
    },
    "sampleBody": {
      "requestId": "REQ_DTE5N1P",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_81436"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Card Program Management",
      "endpoint": "POST /v3/programs/{programId}/art-profiles",
      "summary": "Upload digital wallet card artwork asset",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_B08BK9KY",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK33895"
    }
  },
  {
    "id": "visa-card-program-management::/v3/programs/{programId}/metrics::GET",
    "specId": "visa-card-program-management",
    "specTitle": "Visa Card Program Management",
    "category": "Issuing & Processing",
    "method": "GET",
    "path": "/v3/programs/{programId}/metrics",
    "summary": "Query cardholder activation and interchange revenue",
    "componentName": "SpecUI_Visa_Card_Program_Management",
    "sampleParams": {
      "programId": "program_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Card Program Management",
      "endpoint": "GET /v3/programs/{programId}/metrics",
      "summary": "Query cardholder activation and interchange revenue",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_7DIWKJQT",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK94347"
    }
  },
  {
    "id": "visa-consumer-authentication-service::/v2/vcas/auth-request::POST",
    "specId": "visa-consumer-authentication-service",
    "specTitle": "Visa Consumer Authentication Service",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/v2/vcas/auth-request",
    "summary": "Submit 3-D Secure 2.2 authentication request",
    "componentName": "SpecUI_Visa_Consumer_Authentication_Service",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_uzn669",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "visa-consumer-authentication-service::/v2/vcas/challenge/result::POST",
    "specId": "visa-consumer-authentication-service",
    "specTitle": "Visa Consumer Authentication Service",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/v2/vcas/challenge/result",
    "summary": "Resolve cardholder OTP or biometric challenge",
    "componentName": "SpecUI_Visa_Consumer_Authentication_Service",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_ibpe1r",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "visa-consumer-authentication-service::/v2/vcas/risk-score/{transactionId}::GET",
    "specId": "visa-consumer-authentication-service",
    "specTitle": "Visa Consumer Authentication Service",
    "category": "Risk & Identity",
    "method": "GET",
    "path": "/v2/vcas/risk-score/{transactionId}",
    "summary": "Retrieve machine learning risk evaluation score",
    "componentName": "SpecUI_Visa_Consumer_Authentication_Service",
    "sampleParams": {
      "transactionId": "transaction_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Consumer Authentication Service",
      "endpoint": "GET /v2/vcas/risk-score/{transactionId}",
      "summary": "Retrieve machine learning risk evaluation score",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_Y21RHGSN",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK87065"
    }
  },
  {
    "id": "visa-consumer-authentication-service::/v2/vcas/exemptions/request::POST",
    "specId": "visa-consumer-authentication-service",
    "specTitle": "Visa Consumer Authentication Service",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/v2/vcas/exemptions/request",
    "summary": "Request PSD2 Low-Value or Tra Transaction Risk Exemption",
    "componentName": "SpecUI_Visa_Consumer_Authentication_Service",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_OYMXZSS",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_65876"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Consumer Authentication Service",
      "endpoint": "POST /v2/vcas/exemptions/request",
      "summary": "Request PSD2 Low-Value or Tra Transaction Risk Exemption",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_C95MCEEZ",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK47992"
    }
  },
  {
    "id": "visa-credit-card-application::/v1/applications/submit::POST",
    "specId": "visa-credit-card-application",
    "specTitle": "Visa Credit Card Application",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v1/applications/submit",
    "summary": "Submit digital credit card application",
    "componentName": "SpecUI_Visa_Credit_Card_Application",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_UVB87MC",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_26633"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Credit Card Application",
      "endpoint": "POST /v1/applications/submit",
      "summary": "Submit digital credit card application",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_P4AIVURF",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK64607"
    }
  },
  {
    "id": "visa-credit-card-application::/v1/applications/{applicationId}/status::GET",
    "specId": "visa-credit-card-application",
    "specTitle": "Visa Credit Card Application",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v1/applications/{applicationId}/status",
    "summary": "Query real-time automated underwriting decision",
    "componentName": "SpecUI_Visa_Credit_Card_Application",
    "sampleParams": {
      "applicationId": "application_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Credit Card Application",
      "endpoint": "GET /v1/applications/{applicationId}/status",
      "summary": "Query real-time automated underwriting decision",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_G1IH1ERE",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK65731"
    }
  },
  {
    "id": "visa-credit-card-application::/v1/applications/{applicationId}/accept-terms::POST",
    "specId": "visa-credit-card-application",
    "specTitle": "Visa Credit Card Application",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v1/applications/{applicationId}/accept-terms",
    "summary": "Record cardholder electronic disclosures consent",
    "componentName": "SpecUI_Visa_Credit_Card_Application",
    "sampleParams": {
      "applicationId": "application_9921"
    },
    "sampleBody": {
      "requestId": "REQ_FY7I25W",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_61885"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Credit Card Application",
      "endpoint": "POST /v1/applications/{applicationId}/accept-terms",
      "summary": "Record cardholder electronic disclosures consent",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_S7LSRT8T",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK30309"
    }
  },
  {
    "id": "visa-credit-card-application::/v1/applications/{applicationId}/instant-issue::POST",
    "specId": "visa-credit-card-application",
    "specTitle": "Visa Credit Card Application",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v1/applications/{applicationId}/instant-issue",
    "summary": "Provision instant digital card to Apple/Google Pay",
    "componentName": "SpecUI_Visa_Credit_Card_Application",
    "sampleParams": {
      "applicationId": "application_9921"
    },
    "sampleBody": {
      "requestId": "REQ_2IGN7G0",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_83408"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Credit Card Application",
      "endpoint": "POST /v1/applications/{applicationId}/instant-issue",
      "summary": "Provision instant digital card to Apple/Google Pay",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_QN8MG0K8",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK90698"
    }
  },
  {
    "id": "visa-dcvv2-generate::/v1/dcvv2/generate::POST",
    "specId": "visa-dcvv2-generate",
    "specTitle": "Visa DCVV2 Generate",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/v1/dcvv2/generate",
    "summary": "Generate dynamic CVV2 security code",
    "componentName": "SpecUI_Visa_DCVV2_Generate",
    "sampleParams": {},
    "sampleBody": {
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "amount": 2500,
      "quoteType": "GUARANTEED_15_MIN"
    },
    "sampleResponse": {
      "quoteId": "QTE_FX_524293",
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "sourceAmount": 2500,
      "targetAmount": 2307.5,
      "exchangeRate": 0.923,
      "rateExpiresAt": "2026-10-05T02:07:28.024Z",
      "feeAmount": 3.5,
      "status": "GUARANTEED"
    }
  },
  {
    "id": "visa-dcvv2-generate::/v1/dcvv2/verify::POST",
    "specId": "visa-dcvv2-generate",
    "specTitle": "Visa DCVV2 Generate",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/v1/dcvv2/verify",
    "summary": "Verify incoming merchant dynamic CVV2",
    "componentName": "SpecUI_Visa_DCVV2_Generate",
    "sampleParams": {},
    "sampleBody": {
      "primaryAccountNumber": "4000123456789010",
      "expirationDate": "2028-12",
      "cardVerificationValue": "992",
      "generationContext": "CONTACTLESS_ECOMMERCE"
    },
    "sampleResponse": {
      "dcvv2": "856",
      "expirationTimestamp": "2026-10-05T02:52:28.024Z",
      "validationResult": "VALID",
      "keyIndex": "KEY_HSM_04"
    }
  },
  {
    "id": "visa-dcvv2-generate::/v1/dcvv2/keys/{keyId}::GET",
    "specId": "visa-dcvv2-generate",
    "specTitle": "Visa DCVV2 Generate",
    "category": "Risk & Identity",
    "method": "GET",
    "path": "/v1/dcvv2/keys/{keyId}",
    "summary": "Check HSM symmetric encryption key status",
    "componentName": "SpecUI_Visa_DCVV2_Generate",
    "sampleParams": {
      "keyId": "key_9921"
    },
    "sampleBody": {
      "primaryAccountNumber": "4000123456789010",
      "expirationDate": "2028-12",
      "cardVerificationValue": "992",
      "generationContext": "CONTACTLESS_ECOMMERCE"
    },
    "sampleResponse": {
      "dcvv2": "387",
      "expirationTimestamp": "2026-10-05T02:52:28.024Z",
      "validationResult": "VALID",
      "keyIndex": "KEY_HSM_04"
    }
  },
  {
    "id": "visa-direct-connect::/direct-connect/v2/funds-transfer::POST",
    "specId": "visa-direct-connect",
    "specTitle": "Visa Direct Connect",
    "category": "Transactions & Orders",
    "method": "POST",
    "path": "/direct-connect/v2/funds-transfer",
    "summary": "High-throughput funds disbursement",
    "componentName": "SpecUI_Visa_Direct_Connect",
    "sampleParams": {},
    "sampleBody": {
      "acquiringBin": "408999",
      "retrievalReferenceNumber": "RRN_61027487",
      "amount": 175.5,
      "currencyCode": "USD",
      "recipientCardNumber": "411111******1111",
      "senderName": "Apex Enterprise Payments LLC",
      "businessApplicationIdentifier": "PP"
    },
    "sampleResponse": {
      "transactionIdentifier": 191120208,
      "actionCode": "00",
      "approvalCode": "OK43961",
      "responseCode": "00",
      "status": "FUNDS_DISBURSED",
      "settlementDate": "2026-10-05",
      "feeProgramIndicator": "103",
      "fastFundsAvailable": true
    }
  },
  {
    "id": "visa-direct-connect::/direct-connect/v2/network-query::POST",
    "specId": "visa-direct-connect",
    "specTitle": "Visa Direct Connect",
    "category": "Transactions & Orders",
    "method": "POST",
    "path": "/direct-connect/v2/network-query",
    "summary": "Low-latency network gateway query",
    "componentName": "SpecUI_Visa_Direct_Connect",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_ZUPEKEV",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_20925"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Direct Connect",
      "endpoint": "POST /direct-connect/v2/network-query",
      "summary": "Low-latency network gateway query",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_LIBXK1OS",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK17049"
    }
  },
  {
    "id": "visa-direct-connect::/direct-connect/v2/routes/health::GET",
    "specId": "visa-direct-connect",
    "specTitle": "Visa Direct Connect",
    "category": "Transactions & Orders",
    "method": "GET",
    "path": "/direct-connect/v2/routes/health",
    "summary": "Direct data center gateway ping and latency metrics",
    "componentName": "SpecUI_Visa_Direct_Connect",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Direct Connect",
      "endpoint": "GET /direct-connect/v2/routes/health",
      "summary": "Direct data center gateway ping and latency metrics",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_SE9UQNOT",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK54879"
    }
  },
  {
    "id": "visa-direct::/visadirect/v3/push-funds::POST",
    "specId": "visa-direct",
    "specTitle": "Visa Direct",
    "category": "Transactions & Orders",
    "method": "POST",
    "path": "/visadirect/v3/push-funds",
    "summary": "Push Funds Original Credit Transaction (OCT)",
    "componentName": "SpecUI_Visa_Direct",
    "sampleParams": {},
    "sampleBody": {
      "acquiringBin": "408999",
      "retrievalReferenceNumber": "RRN_7205192",
      "amount": 175.5,
      "currencyCode": "USD",
      "recipientCardNumber": "411111******1111",
      "senderName": "Apex Enterprise Payments LLC",
      "businessApplicationIdentifier": "PP"
    },
    "sampleResponse": {
      "transactionIdentifier": 175010388,
      "actionCode": "00",
      "approvalCode": "OK68806",
      "responseCode": "00",
      "status": "FUNDS_DISBURSED",
      "settlementDate": "2026-10-05",
      "feeProgramIndicator": "103",
      "fastFundsAvailable": true
    }
  },
  {
    "id": "visa-direct::/visadirect/v3/pull-funds::POST",
    "specId": "visa-direct",
    "specTitle": "Visa Direct",
    "category": "Transactions & Orders",
    "method": "POST",
    "path": "/visadirect/v3/pull-funds",
    "summary": "Pull Funds Account Funding Transaction (AFT)",
    "componentName": "SpecUI_Visa_Direct",
    "sampleParams": {},
    "sampleBody": {
      "acquiringBin": "408999",
      "retrievalReferenceNumber": "RRN_26425519",
      "amount": 175.5,
      "currencyCode": "USD",
      "recipientCardNumber": "411111******1111",
      "senderName": "Apex Enterprise Payments LLC",
      "businessApplicationIdentifier": "PP"
    },
    "sampleResponse": {
      "transactionIdentifier": 812763587,
      "actionCode": "00",
      "approvalCode": "OK93500",
      "responseCode": "00",
      "status": "FUNDS_DISBURSED",
      "settlementDate": "2026-10-05",
      "feeProgramIndicator": "103",
      "fastFundsAvailable": true
    }
  },
  {
    "id": "visa-direct::/visadirect/v3/card-query::POST",
    "specId": "visa-direct",
    "specTitle": "Visa Direct",
    "category": "Transactions & Orders",
    "method": "POST",
    "path": "/visadirect/v3/card-query",
    "summary": "Query cardholder recipient fast-funds capability",
    "componentName": "SpecUI_Visa_Direct",
    "sampleParams": {},
    "sampleBody": {
      "acquiringBin": "408999",
      "retrievalReferenceNumber": "RRN_86462420",
      "amount": 175.5,
      "currencyCode": "USD",
      "recipientCardNumber": "411111******1111",
      "senderName": "Apex Enterprise Payments LLC",
      "businessApplicationIdentifier": "PP"
    },
    "sampleResponse": {
      "transactionIdentifier": 326906443,
      "actionCode": "00",
      "approvalCode": "OK82281",
      "responseCode": "00",
      "status": "FUNDS_DISBURSED",
      "settlementDate": "2026-10-05",
      "feeProgramIndicator": "103",
      "fastFundsAvailable": true
    }
  },
  {
    "id": "visa-direct::/visadirect/v3/cross-border/quote::POST",
    "specId": "visa-direct",
    "specTitle": "Visa Direct",
    "category": "Transactions & Orders",
    "method": "POST",
    "path": "/visadirect/v3/cross-border/quote",
    "summary": "Obtain real-time cross-border exchange fee quote",
    "componentName": "SpecUI_Visa_Direct",
    "sampleParams": {},
    "sampleBody": {
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "amount": 2500,
      "quoteType": "GUARANTEED_15_MIN"
    },
    "sampleResponse": {
      "quoteId": "QTE_FX_291907",
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "sourceAmount": 2500,
      "targetAmount": 2307.5,
      "exchangeRate": 0.923,
      "rateExpiresAt": "2026-10-05T02:07:28.024Z",
      "feeAmount": 3.5,
      "status": "GUARANTEED"
    }
  },
  {
    "id": "visa-direct::/visadirect/v3/transactions/{transactionId}::GET",
    "specId": "visa-direct",
    "specTitle": "Visa Direct",
    "category": "Transactions & Orders",
    "method": "GET",
    "path": "/visadirect/v3/transactions/{transactionId}",
    "summary": "Track real-time disbursement settlement status",
    "componentName": "SpecUI_Visa_Direct",
    "sampleParams": {
      "transactionId": "transaction_9921"
    },
    "sampleBody": {
      "acquiringBin": "408999",
      "retrievalReferenceNumber": "RRN_4406590",
      "amount": 175.5,
      "currencyCode": "USD",
      "recipientCardNumber": "411111******1111",
      "senderName": "Apex Enterprise Payments LLC",
      "businessApplicationIdentifier": "PP"
    },
    "sampleResponse": {
      "transactionIdentifier": 285422295,
      "actionCode": "00",
      "approvalCode": "OK88655",
      "responseCode": "00",
      "status": "FUNDS_DISBURSED",
      "settlementDate": "2026-10-05",
      "feeProgramIndicator": "103",
      "fastFundsAvailable": true
    }
  },
  {
    "id": "visa-pay::/v1/pay/qr/generate::POST",
    "specId": "visa-pay",
    "specTitle": "Visa Pay",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v1/pay/qr/generate",
    "summary": "Generate EMVCo dynamic payment QR code",
    "componentName": "SpecUI_Visa_Pay",
    "sampleParams": {},
    "sampleBody": {
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "amount": 2500,
      "quoteType": "GUARANTEED_15_MIN"
    },
    "sampleResponse": {
      "quoteId": "QTE_FX_320678",
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "sourceAmount": 2500,
      "targetAmount": 2307.5,
      "exchangeRate": 0.923,
      "rateExpiresAt": "2026-10-05T02:07:28.024Z",
      "feeAmount": 3.5,
      "status": "GUARANTEED"
    }
  },
  {
    "id": "visa-pay::/v1/pay/qr/scan-and-pay::POST",
    "specId": "visa-pay",
    "specTitle": "Visa Pay",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v1/pay/qr/scan-and-pay",
    "summary": "Authorize push payment against merchant QR",
    "componentName": "SpecUI_Visa_Pay",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_XOPPVCI",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_22308"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Pay",
      "endpoint": "POST /v1/pay/qr/scan-and-pay",
      "summary": "Authorize push payment against merchant QR",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_U4RIUO9Y",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK46593"
    }
  },
  {
    "id": "visa-pay::/v1/pay/aliases/resolve::POST",
    "specId": "visa-pay",
    "specTitle": "Visa Pay",
    "category": "Digital Solutions & Payments",
    "method": "POST",
    "path": "/v1/pay/aliases/resolve",
    "summary": "Resolve mobile phone / national ID alias to PAN",
    "componentName": "SpecUI_Visa_Pay",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_8DZTXTZ",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_68894"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Pay",
      "endpoint": "POST /v1/pay/aliases/resolve",
      "summary": "Resolve mobile phone / national ID alias to PAN",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_6EO5IM42",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK32893"
    }
  },
  {
    "id": "visa-pay::/v1/pay/notifications/status::GET",
    "specId": "visa-pay",
    "specTitle": "Visa Pay",
    "category": "Digital Solutions & Payments",
    "method": "GET",
    "path": "/v1/pay/notifications/status",
    "summary": "Push notification dispatch status",
    "componentName": "SpecUI_Visa_Pay",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Pay",
      "endpoint": "GET /v1/pay/notifications/status",
      "summary": "Push notification dispatch status",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_FS6E569X",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK20309"
    }
  },
  {
    "id": "visa-payment-passkey::/passkey/v1/registration/options::POST",
    "specId": "visa-payment-passkey",
    "specTitle": "Visa Payment Passkey",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/passkey/v1/registration/options",
    "summary": "Request WebAuthn registration challenge",
    "componentName": "SpecUI_Visa_Payment_Passkey",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_9swtoy",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "visa-payment-passkey::/passkey/v1/registration/verify::POST",
    "specId": "visa-payment-passkey",
    "specTitle": "Visa Payment Passkey",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/passkey/v1/registration/verify",
    "summary": "Verify public key credential & bind to card",
    "componentName": "SpecUI_Visa_Payment_Passkey",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_w30ph0",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "visa-payment-passkey::/passkey/v1/assertion/options::POST",
    "specId": "visa-payment-passkey",
    "specTitle": "Visa Payment Passkey",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/passkey/v1/assertion/options",
    "summary": "Request biometric login challenge",
    "componentName": "SpecUI_Visa_Payment_Passkey",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_4eb05d",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "visa-payment-passkey::/passkey/v1/assertion/verify::POST",
    "specId": "visa-payment-passkey",
    "specTitle": "Visa Payment Passkey",
    "category": "Risk & Identity",
    "method": "POST",
    "path": "/passkey/v1/assertion/verify",
    "summary": "Verify biometric signature for zero-friction auth",
    "componentName": "SpecUI_Visa_Payment_Passkey",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_ah2db0",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "visa-travel-notification-service::/v1/travel/itineraries::POST",
    "specId": "visa-travel-notification-service",
    "specTitle": "Visa Travel Notification Service",
    "category": "Card & Account Services",
    "method": "POST",
    "path": "/v1/travel/itineraries",
    "summary": "Register cardholder international travel itinerary",
    "componentName": "SpecUI_Visa_Travel_Notification_Service",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_PNJQCQW",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_14819"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Travel Notification Service",
      "endpoint": "POST /v1/travel/itineraries",
      "summary": "Register cardholder international travel itinerary",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_4YE1ODYS",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK91748"
    }
  },
  {
    "id": "visa-travel-notification-service::/v1/travel/itineraries/active::GET",
    "specId": "visa-travel-notification-service",
    "specTitle": "Visa Travel Notification Service",
    "category": "Card & Account Services",
    "method": "GET",
    "path": "/v1/travel/itineraries/active",
    "summary": "List active travel exemptions for cardholder",
    "componentName": "SpecUI_Visa_Travel_Notification_Service",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Travel Notification Service",
      "endpoint": "GET /v1/travel/itineraries/active",
      "summary": "List active travel exemptions for cardholder",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_UPS3KBWN",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK54160"
    }
  },
  {
    "id": "visa-travel-notification-service::/v1/travel/itineraries/{itineraryId}::DELETE",
    "specId": "visa-travel-notification-service",
    "specTitle": "Visa Travel Notification Service",
    "category": "Card & Account Services",
    "method": "DELETE",
    "path": "/v1/travel/itineraries/{itineraryId}",
    "summary": "Cancel registered travel plan",
    "componentName": "SpecUI_Visa_Travel_Notification_Service",
    "sampleParams": {
      "itineraryId": "itinerary_9921"
    },
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "Visa Travel Notification Service",
      "endpoint": "DELETE /v1/travel/itineraries/{itineraryId}",
      "summary": "Cancel registered travel plan",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_FQ7X52QG",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK48684"
    }
  },
  {
    "id": "visanet-connect-issuing::/visanet/v2/dual-message/authorize::POST",
    "specId": "visanet-connect-issuing",
    "specTitle": "VisaNet Connect Issuing",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/visanet/v2/dual-message/authorize",
    "summary": "Dual-message 0100 authorization message",
    "componentName": "SpecUI_VisaNet_Connect_Issuing",
    "sampleParams": {},
    "sampleBody": {
      "credentialId": "FIDO2_CRED_uvocc7",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoi...",
      "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4/krbrmihVWYZa+53Oyt8s...",
      "signature": "MEYCIQDx3fK309a...78aZ="
    },
    "sampleResponse": {
      "authenticationStatus": "PASSKEY_VERIFIED",
      "userPresence": true,
      "userVerification": true,
      "assertionHash": "VERIFIED_ECDSA_P256",
      "frictionlessScore": 99.8,
      "riskLevel": "LOW_RISK"
    }
  },
  {
    "id": "visanet-connect-issuing::/visanet/v2/clearing/submit::POST",
    "specId": "visanet-connect-issuing",
    "specTitle": "VisaNet Connect Issuing",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/visanet/v2/clearing/submit",
    "summary": "0200 clearing & settlement capture",
    "componentName": "SpecUI_VisaNet_Connect_Issuing",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_356SZ9I",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_70943"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "VisaNet Connect Issuing",
      "endpoint": "POST /visanet/v2/clearing/submit",
      "summary": "0200 clearing & settlement capture",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_6HUV5HO4",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK13125"
    }
  },
  {
    "id": "visanet-connect-issuing::/visanet/v2/reversals::POST",
    "specId": "visanet-connect-issuing",
    "specTitle": "VisaNet Connect Issuing",
    "category": "Issuing & Processing",
    "method": "POST",
    "path": "/visanet/v2/reversals",
    "summary": "0400 transaction reversal and advice",
    "componentName": "SpecUI_VisaNet_Connect_Issuing",
    "sampleParams": {},
    "sampleBody": {
      "requestId": "REQ_U0ECU8N",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "channel": "WORKBENCH_VDP",
      "parameters": {
        "testMode": true,
        "referenceId": "REF_85019"
      }
    },
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "VisaNet Connect Issuing",
      "endpoint": "POST /visanet/v2/reversals",
      "summary": "0400 transaction reversal and advice",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_M22S8XC6",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK90849"
    }
  },
  {
    "id": "visanet-connect-issuing::/visanet/v2/interchange/qualification::GET",
    "specId": "visanet-connect-issuing",
    "specTitle": "VisaNet Connect Issuing",
    "category": "Issuing & Processing",
    "method": "GET",
    "path": "/visanet/v2/interchange/qualification",
    "summary": "Determine fee program qualification code",
    "componentName": "SpecUI_VisaNet_Connect_Issuing",
    "sampleParams": {},
    "sampleBody": null,
    "sampleResponse": {
      "status": "SUCCESS",
      "service": "VisaNet Connect Issuing",
      "endpoint": "GET /visanet/v2/interchange/qualification",
      "summary": "Determine fee program qualification code",
      "timestamp": "2026-10-05T01:52:28.024Z",
      "responseCode": "00",
      "transactionId": "TXN_DS8W76QB",
      "message": "Processed successfully by Workbench client.",
      "approvalCode": "OK10350"
    }
  }
];

export const ENDPOINT_SAMPLES_MAP: Record<string, EndpointSampleItem> = {};
ENDPOINT_SAMPLES_LIST.forEach(item => {
  ENDPOINT_SAMPLES_MAP[item.id] = item;
  ENDPOINT_SAMPLES_MAP[item.path + '::' + item.method] = item;
  ENDPOINT_SAMPLES_MAP[item.path] = item;
});
