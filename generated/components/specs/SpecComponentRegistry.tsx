import React from 'react';
import { SpecUI_Access_Online_Transactions_and_Orders } from './SpecUI_Access_Online_Transactions_and_Orders';
import { SpecUI_Account_Statements } from './SpecUI_Account_Statements';
import { SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI } from './SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI';
import { SpecUI_B2B_Virtual_Account_Payment_Method } from './SpecUI_B2B_Virtual_Account_Payment_Method';
import { SpecUI_Broker_API } from './SpecUI_Broker_API';
import { SpecUI_Card_on_File_Data_Inquiry } from './SpecUI_Card_on_File_Data_Inquiry';
import { SpecUI_CardAccountBalanceTransferEligibility_OpenAPI } from './SpecUI_CardAccountBalanceTransferEligibility_OpenAPI';
import { SpecUI_Click_to_Pay } from './SpecUI_Click_to_Pay';
import { SpecUI_Consent_Authorization } from './SpecUI_Consent_Authorization';
import { SpecUI_Corporate_Account_Information } from './SpecUI_Corporate_Account_Information';
import { SpecUI_Custody } from './SpecUI_Custody';
import { SpecUI_Customers_Profiles } from './SpecUI_Customers_Profiles';
import { SpecUI_DPS_Card_and_Account_Services } from './SpecUI_DPS_Card_and_Account_Services';
import { SpecUI_Finicity_API } from './SpecUI_Finicity_API';
import { SpecUI_Foreign_Exchange_Rates } from './SpecUI_Foreign_Exchange_Rates';
import { SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI } from './SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI';
import { SpecUI_Incoming_webhooks } from './SpecUI_Incoming_webhooks';
import { SpecUI_Kernel_in_the_Cloud } from './SpecUI_Kernel_in_the_Cloud';
import { SpecUI_PayPal_APIs } from './SpecUI_PayPal_APIs';
import { SpecUI_RewardLinkageShopWithPoints_OpenAPI } from './SpecUI_RewardLinkageShopWithPoints_OpenAPI';
import { SpecUI_RewardRedemptionSelectAndCredit_OpenAPI } from './SpecUI_RewardRedemptionSelectAndCredit_OpenAPI';
import { SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI } from './SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI';
import { SpecUI_TaxStatement_Digital_Orchestation } from './SpecUI_TaxStatement_Digital_Orchestation';
import { SpecUI_Token_Authorization } from './SpecUI_Token_Authorization';
import { SpecUI_Virtual_Card_Payments } from './SpecUI_Virtual_Card_Payments';
import { SpecUI_Visa_Accounts_Receivable_Manager } from './SpecUI_Visa_Accounts_Receivable_Manager';
import { SpecUI_Visa_BIN_Attribute_Sharing_Service } from './SpecUI_Visa_BIN_Attribute_Sharing_Service';
import { SpecUI_Visa_Card_Program_Management } from './SpecUI_Visa_Card_Program_Management';
import { SpecUI_Visa_Consumer_Authentication_Service } from './SpecUI_Visa_Consumer_Authentication_Service';
import { SpecUI_Visa_Credit_Card_Application } from './SpecUI_Visa_Credit_Card_Application';
import { SpecUI_Visa_DCVV2_Generate } from './SpecUI_Visa_DCVV2_Generate';
import { SpecUI_Visa_Direct_Connect } from './SpecUI_Visa_Direct_Connect';
import { SpecUI_Visa_Direct } from './SpecUI_Visa_Direct';
import { SpecUI_Visa_Pay } from './SpecUI_Visa_Pay';
import { SpecUI_Visa_Payment_Passkey } from './SpecUI_Visa_Payment_Passkey';
import { SpecUI_Visa_Travel_Notification_Service } from './SpecUI_Visa_Travel_Notification_Service';
import { SpecUI_VisaNet_Connect_Issuing } from './SpecUI_VisaNet_Connect_Issuing';
import { SpecUI_XML_Schema_Common_ComplexTypes_xsd_xml } from './SpecUI_XML_Schema_Common_ComplexTypes_xsd_xml';
import { SpecUI_XML_Schema_Common_Groups_xsd_xml } from './SpecUI_XML_Schema_Common_Groups_xsd_xml';

export interface SpecRegistryEntry {
  id: string;
  title: string;
  componentName: string;
  fileName: string;
  endpointsCount: number;
  xsdTypesCount?: number;
  format: 'openapi' | 'swagger' | 'xsd';
  component: React.FC<any>;
}

export const SPEC_COMPONENTS_MAP: Record<string, React.FC<any>> = {
  'access-online-transactions-and-orders': SpecUI_Access_Online_Transactions_and_Orders,
  'account-statements': SpecUI_Account_Statements,
  'accounts-financial-details': SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI,
  'b2b-virtual-account-payment-method': SpecUI_B2B_Virtual_Account_Payment_Method,
  'broker-api': SpecUI_Broker_API,
  'card-on-file-data-inquiry': SpecUI_Card_on_File_Data_Inquiry,
  'card-account-balance-transfer-eligibility': SpecUI_CardAccountBalanceTransferEligibility_OpenAPI,
  'click-to-pay': SpecUI_Click_to_Pay,
  'consent-authorization': SpecUI_Consent_Authorization,
  'corporate-account-information': SpecUI_Corporate_Account_Information,
  'custody': SpecUI_Custody,
  'customers-profiles': SpecUI_Customers_Profiles,
  'dps-card-and-account-services': SpecUI_DPS_Card_and_Account_Services,
  'finicity-api': SpecUI_Finicity_API,
  'foreign-exchange-rates': SpecUI_Foreign_Exchange_Rates,
  'iam-token-management-partner-oauth2': SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI,
  'incoming-webhooks': SpecUI_Incoming_webhooks,
  'kernel-in-the-cloud': SpecUI_Kernel_in_the_Cloud,
  'paypal-apis': SpecUI_PayPal_APIs,
  'reward-linkage-shop-with-points': SpecUI_RewardLinkageShopWithPoints_OpenAPI,
  'reward-redemption-select-and-credit': SpecUI_RewardRedemptionSelectAndCredit_OpenAPI,
  'security-e2e-key-exchange-prelogin': SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI,
  'tax-statement-digital-orchestration': SpecUI_TaxStatement_Digital_Orchestation,
  'token-authorization': SpecUI_Token_Authorization,
  'virtual-card-payments': SpecUI_Virtual_Card_Payments,
  'visa-accounts-receivable-manager': SpecUI_Visa_Accounts_Receivable_Manager,
  'visa-bin-attribute-sharing-service': SpecUI_Visa_BIN_Attribute_Sharing_Service,
  'visa-card-program-management': SpecUI_Visa_Card_Program_Management,
  'visa-consumer-authentication-service': SpecUI_Visa_Consumer_Authentication_Service,
  'visa-credit-card-application': SpecUI_Visa_Credit_Card_Application,
  'visa-dcvv2-generate': SpecUI_Visa_DCVV2_Generate,
  'visa-direct-connect': SpecUI_Visa_Direct_Connect,
  'visa-direct': SpecUI_Visa_Direct,
  'visa-pay': SpecUI_Visa_Pay,
  'visa-payment-passkey': SpecUI_Visa_Payment_Passkey,
  'visa-travel-notification-service': SpecUI_Visa_Travel_Notification_Service,
  'visanet-connect-issuing': SpecUI_VisaNet_Connect_Issuing,
  'xml-schema-common-complextypes': SpecUI_XML_Schema_Common_ComplexTypes_xsd_xml,
  'xml-schema-common-groups': SpecUI_XML_Schema_Common_Groups_xsd_xml,
};

export const SPEC_COMPONENTS_BY_NAME: Record<string, React.FC<any>> = {
  'SpecUI_Access_Online_Transactions_and_Orders': SpecUI_Access_Online_Transactions_and_Orders,
  'SpecUI_Account_Statements': SpecUI_Account_Statements,
  'SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI': SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI,
  'SpecUI_B2B_Virtual_Account_Payment_Method': SpecUI_B2B_Virtual_Account_Payment_Method,
  'SpecUI_Broker_API': SpecUI_Broker_API,
  'SpecUI_Card_on_File_Data_Inquiry': SpecUI_Card_on_File_Data_Inquiry,
  'SpecUI_CardAccountBalanceTransferEligibility_OpenAPI': SpecUI_CardAccountBalanceTransferEligibility_OpenAPI,
  'SpecUI_Click_to_Pay': SpecUI_Click_to_Pay,
  'SpecUI_Consent_Authorization': SpecUI_Consent_Authorization,
  'SpecUI_Corporate_Account_Information': SpecUI_Corporate_Account_Information,
  'SpecUI_Custody': SpecUI_Custody,
  'SpecUI_Customers_Profiles': SpecUI_Customers_Profiles,
  'SpecUI_DPS_Card_and_Account_Services': SpecUI_DPS_Card_and_Account_Services,
  'SpecUI_Finicity_API': SpecUI_Finicity_API,
  'SpecUI_Foreign_Exchange_Rates': SpecUI_Foreign_Exchange_Rates,
  'SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI': SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI,
  'SpecUI_Incoming_webhooks': SpecUI_Incoming_webhooks,
  'SpecUI_Kernel_in_the_Cloud': SpecUI_Kernel_in_the_Cloud,
  'SpecUI_PayPal_APIs': SpecUI_PayPal_APIs,
  'SpecUI_RewardLinkageShopWithPoints_OpenAPI': SpecUI_RewardLinkageShopWithPoints_OpenAPI,
  'SpecUI_RewardRedemptionSelectAndCredit_OpenAPI': SpecUI_RewardRedemptionSelectAndCredit_OpenAPI,
  'SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI': SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI,
  'SpecUI_TaxStatement_Digital_Orchestation': SpecUI_TaxStatement_Digital_Orchestation,
  'SpecUI_Token_Authorization': SpecUI_Token_Authorization,
  'SpecUI_Virtual_Card_Payments': SpecUI_Virtual_Card_Payments,
  'SpecUI_Visa_Accounts_Receivable_Manager': SpecUI_Visa_Accounts_Receivable_Manager,
  'SpecUI_Visa_BIN_Attribute_Sharing_Service': SpecUI_Visa_BIN_Attribute_Sharing_Service,
  'SpecUI_Visa_Card_Program_Management': SpecUI_Visa_Card_Program_Management,
  'SpecUI_Visa_Consumer_Authentication_Service': SpecUI_Visa_Consumer_Authentication_Service,
  'SpecUI_Visa_Credit_Card_Application': SpecUI_Visa_Credit_Card_Application,
  'SpecUI_Visa_DCVV2_Generate': SpecUI_Visa_DCVV2_Generate,
  'SpecUI_Visa_Direct_Connect': SpecUI_Visa_Direct_Connect,
  'SpecUI_Visa_Direct': SpecUI_Visa_Direct,
  'SpecUI_Visa_Pay': SpecUI_Visa_Pay,
  'SpecUI_Visa_Payment_Passkey': SpecUI_Visa_Payment_Passkey,
  'SpecUI_Visa_Travel_Notification_Service': SpecUI_Visa_Travel_Notification_Service,
  'SpecUI_VisaNet_Connect_Issuing': SpecUI_VisaNet_Connect_Issuing,
  'SpecUI_XML_Schema_Common_ComplexTypes_xsd_xml': SpecUI_XML_Schema_Common_ComplexTypes_xsd_xml,
  'SpecUI_XML_Schema_Common_Groups_xsd_xml': SpecUI_XML_Schema_Common_Groups_xsd_xml,
};

export const SPEC_REGISTRY_LIST: SpecRegistryEntry[] = [
  {
    id: 'access-online-transactions-and-orders',
    title: 'Access Online Transactions and Orders',
    componentName: 'SpecUI_Access_Online_Transactions_and_Orders',
    fileName: 'SpecUI_Access_Online_Transactions_and_Orders.tsx',
    endpointsCount: 6,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Access_Online_Transactions_and_Orders
  },
  {
    id: 'account-statements',
    title: 'Account Statements',
    componentName: 'SpecUI_Account_Statements',
    fileName: 'SpecUI_Account_Statements.tsx',
    endpointsCount: 4,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Account_Statements
  },
  {
    id: 'accounts-financial-details',
    title: 'Accounts & Financial Details OpenAPI',
    componentName: 'SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI',
    fileName: 'SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI.tsx',
    endpointsCount: 8,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Accounts_AccountTransactions_FinancialDetails_Digital_Domain_OpenAPI
  },
  {
    id: 'b2b-virtual-account-payment-method',
    title: 'B2B Virtual Account Payment Method',
    componentName: 'SpecUI_B2B_Virtual_Account_Payment_Method',
    fileName: 'SpecUI_B2B_Virtual_Account_Payment_Method.tsx',
    endpointsCount: 7,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_B2B_Virtual_Account_Payment_Method
  },
  {
    id: 'broker-api',
    title: 'Broker API',
    componentName: 'SpecUI_Broker_API',
    fileName: 'SpecUI_Broker_API.tsx',
    endpointsCount: 12,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Broker_API
  },
  {
    id: 'card-on-file-data-inquiry',
    title: 'Card on File Data Inquiry',
    componentName: 'SpecUI_Card_on_File_Data_Inquiry',
    fileName: 'SpecUI_Card_on_File_Data_Inquiry.tsx',
    endpointsCount: 3,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Card_on_File_Data_Inquiry
  },
  {
    id: 'card-account-balance-transfer-eligibility',
    title: 'Card Account Balance Transfer Eligibility OpenAPI',
    componentName: 'SpecUI_CardAccountBalanceTransferEligibility_OpenAPI',
    fileName: 'SpecUI_CardAccountBalanceTransferEligibility_OpenAPI.tsx',
    endpointsCount: 4,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_CardAccountBalanceTransferEligibility_OpenAPI
  },
  {
    id: 'click-to-pay',
    title: 'Click to Pay',
    componentName: 'SpecUI_Click_to_Pay',
    fileName: 'SpecUI_Click_to_Pay.tsx',
    endpointsCount: 5,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Click_to_Pay
  },
  {
    id: 'consent-authorization',
    title: 'Consent Authorization',
    componentName: 'SpecUI_Consent_Authorization',
    fileName: 'SpecUI_Consent_Authorization.tsx',
    endpointsCount: 4,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Consent_Authorization
  },
  {
    id: 'corporate-account-information',
    title: 'Corporate Account Information',
    componentName: 'SpecUI_Corporate_Account_Information',
    fileName: 'SpecUI_Corporate_Account_Information.tsx',
    endpointsCount: 5,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Corporate_Account_Information
  },
  {
    id: 'custody',
    title: 'Custody',
    componentName: 'SpecUI_Custody',
    fileName: 'SpecUI_Custody.tsx',
    endpointsCount: 6,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Custody
  },
  {
    id: 'customers-profiles',
    title: 'Customers Profiles',
    componentName: 'SpecUI_Customers_Profiles',
    fileName: 'SpecUI_Customers_Profiles.tsx',
    endpointsCount: 6,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Customers_Profiles
  },
  {
    id: 'dps-card-and-account-services',
    title: 'DPS Card and Account Services',
    componentName: 'SpecUI_DPS_Card_and_Account_Services',
    fileName: 'SpecUI_DPS_Card_and_Account_Services.tsx',
    endpointsCount: 9,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_DPS_Card_and_Account_Services
  },
  {
    id: 'finicity-api',
    title: 'Finicity API',
    componentName: 'SpecUI_Finicity_API',
    fileName: 'SpecUI_Finicity_API.tsx',
    endpointsCount: 11,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Finicity_API
  },
  {
    id: 'foreign-exchange-rates',
    title: 'Foreign Exchange Rates',
    componentName: 'SpecUI_Foreign_Exchange_Rates',
    fileName: 'SpecUI_Foreign_Exchange_Rates.tsx',
    endpointsCount: 4,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Foreign_Exchange_Rates
  },
  {
    id: 'iam-token-management-partner-oauth2',
    title: 'IAM TokenManagement Partner OAuth2',
    componentName: 'SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI',
    fileName: 'SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI.tsx',
    endpointsCount: 5,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI
  },
  {
    id: 'incoming-webhooks',
    title: 'Incoming Webhooks',
    componentName: 'SpecUI_Incoming_webhooks',
    fileName: 'SpecUI_Incoming_webhooks.tsx',
    endpointsCount: 3,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Incoming_webhooks
  },
  {
    id: 'kernel-in-the-cloud',
    title: 'Kernel in the Cloud',
    componentName: 'SpecUI_Kernel_in_the_Cloud',
    fileName: 'SpecUI_Kernel_in_the_Cloud.tsx',
    endpointsCount: 5,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Kernel_in_the_Cloud
  },
  {
    id: 'paypal-apis',
    title: 'PayPal APIs',
    componentName: 'SpecUI_PayPal_APIs',
    fileName: 'SpecUI_PayPal_APIs.tsx',
    endpointsCount: 8,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_PayPal_APIs
  },
  {
    id: 'reward-linkage-shop-with-points',
    title: 'Reward Linkage Shop With Points OpenAPI',
    componentName: 'SpecUI_RewardLinkageShopWithPoints_OpenAPI',
    fileName: 'SpecUI_RewardLinkageShopWithPoints_OpenAPI.tsx',
    endpointsCount: 4,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_RewardLinkageShopWithPoints_OpenAPI
  },
  {
    id: 'reward-redemption-select-and-credit',
    title: 'Reward Redemption Select And Credit OpenAPI',
    componentName: 'SpecUI_RewardRedemptionSelectAndCredit_OpenAPI',
    fileName: 'SpecUI_RewardRedemptionSelectAndCredit_OpenAPI.tsx',
    endpointsCount: 5,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_RewardRedemptionSelectAndCredit_OpenAPI
  },
  {
    id: 'security-e2e-key-exchange-prelogin',
    title: 'Security E2E Key Exchange PreLogin Partner OpenAPI',
    componentName: 'SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI',
    fileName: 'SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI.tsx',
    endpointsCount: 4,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_SecurityE2EKeyExchangePreLogin_Partner_OpenAPI
  },
  {
    id: 'tax-statement-digital-orchestration',
    title: 'Tax Statement Digital Orchestration',
    componentName: 'SpecUI_TaxStatement_Digital_Orchestation',
    fileName: 'SpecUI_TaxStatement_Digital_Orchestation.tsx',
    endpointsCount: 4,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_TaxStatement_Digital_Orchestation
  },
  {
    id: 'token-authorization',
    title: 'Token Authorization',
    componentName: 'SpecUI_Token_Authorization',
    fileName: 'SpecUI_Token_Authorization.tsx',
    endpointsCount: 5,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Token_Authorization
  },
  {
    id: 'virtual-card-payments',
    title: 'Virtual Card Payments',
    componentName: 'SpecUI_Virtual_Card_Payments',
    fileName: 'SpecUI_Virtual_Card_Payments.tsx',
    endpointsCount: 6,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Virtual_Card_Payments
  },
  {
    id: 'visa-accounts-receivable-manager',
    title: 'Visa Accounts Receivable Manager',
    componentName: 'SpecUI_Visa_Accounts_Receivable_Manager',
    fileName: 'SpecUI_Visa_Accounts_Receivable_Manager.tsx',
    endpointsCount: 5,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Visa_Accounts_Receivable_Manager
  },
  {
    id: 'visa-bin-attribute-sharing-service',
    title: 'Visa BIN Attribute Sharing Service',
    componentName: 'SpecUI_Visa_BIN_Attribute_Sharing_Service',
    fileName: 'SpecUI_Visa_BIN_Attribute_Sharing_Service.tsx',
    endpointsCount: 4,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Visa_BIN_Attribute_Sharing_Service
  },
  {
    id: 'visa-card-program-management',
    title: 'Visa Card Program Management',
    componentName: 'SpecUI_Visa_Card_Program_Management',
    fileName: 'SpecUI_Visa_Card_Program_Management.tsx',
    endpointsCount: 7,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Visa_Card_Program_Management
  },
  {
    id: 'visa-consumer-authentication-service',
    title: 'Visa Consumer Authentication Service',
    componentName: 'SpecUI_Visa_Consumer_Authentication_Service',
    fileName: 'SpecUI_Visa_Consumer_Authentication_Service.tsx',
    endpointsCount: 5,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Visa_Consumer_Authentication_Service
  },
  {
    id: 'visa-credit-card-application',
    title: 'Visa Credit Card Application',
    componentName: 'SpecUI_Visa_Credit_Card_Application',
    fileName: 'SpecUI_Visa_Credit_Card_Application.tsx',
    endpointsCount: 5,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Visa_Credit_Card_Application
  },
  {
    id: 'visa-dcvv2-generate',
    title: 'Visa DCVV2 Generate',
    componentName: 'SpecUI_Visa_DCVV2_Generate',
    fileName: 'SpecUI_Visa_DCVV2_Generate.tsx',
    endpointsCount: 3,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Visa_DCVV2_Generate
  },
  {
    id: 'visa-direct-connect',
    title: 'Visa Direct Connect',
    componentName: 'SpecUI_Visa_Direct_Connect',
    fileName: 'SpecUI_Visa_Direct_Connect.tsx',
    endpointsCount: 6,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Visa_Direct_Connect
  },
  {
    id: 'visa-direct',
    title: 'Visa Direct',
    componentName: 'SpecUI_Visa_Direct',
    fileName: 'SpecUI_Visa_Direct.tsx',
    endpointsCount: 9,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Visa_Direct
  },
  {
    id: 'visa-pay',
    title: 'Visa Pay',
    componentName: 'SpecUI_Visa_Pay',
    fileName: 'SpecUI_Visa_Pay.tsx',
    endpointsCount: 6,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Visa_Pay
  },
  {
    id: 'visa-payment-passkey',
    title: 'Visa Payment Passkey',
    componentName: 'SpecUI_Visa_Payment_Passkey',
    fileName: 'SpecUI_Visa_Payment_Passkey.tsx',
    endpointsCount: 4,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Visa_Payment_Passkey
  },
  {
    id: 'visa-travel-notification-service',
    title: 'Visa Travel Notification Service',
    componentName: 'SpecUI_Visa_Travel_Notification_Service',
    fileName: 'SpecUI_Visa_Travel_Notification_Service.tsx',
    endpointsCount: 3,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_Visa_Travel_Notification_Service
  },
  {
    id: 'visanet-connect-issuing',
    title: 'VisaNet Connect Issuing',
    componentName: 'SpecUI_VisaNet_Connect_Issuing',
    fileName: 'SpecUI_VisaNet_Connect_Issuing.tsx',
    endpointsCount: 8,
    xsdTypesCount: 0,
    format: 'openapi',
    component: SpecUI_VisaNet_Connect_Issuing
  },
  {
    id: 'xml-schema-common-complextypes',
    title: 'XML Schema: Common ComplexTypes',
    componentName: 'SpecUI_XML_Schema_Common_ComplexTypes_xsd_xml',
    fileName: 'SpecUI_XML_Schema_Common_ComplexTypes_xsd_xml.tsx',
    endpointsCount: 0,
    xsdTypesCount: 42,
    format: 'xsd',
    component: SpecUI_XML_Schema_Common_ComplexTypes_xsd_xml
  },
  {
    id: 'xml-schema-common-groups',
    title: 'XML Schema: Common Groups',
    componentName: 'SpecUI_XML_Schema_Common_Groups_xsd_xml',
    fileName: 'SpecUI_XML_Schema_Common_Groups_xsd_xml.tsx',
    endpointsCount: 0,
    xsdTypesCount: 28,
    format: 'xsd',
    component: SpecUI_XML_Schema_Common_Groups_xsd_xml
  },
];

export function getSpecComponent(specIdOrName: string): React.FC<any> | null {
  if (!specIdOrName) return null;
  return SPEC_COMPONENTS_MAP[specIdOrName] || SPEC_COMPONENTS_BY_NAME[specIdOrName] || null;
}
