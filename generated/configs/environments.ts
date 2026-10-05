import { EnvironmentConfig } from '../components/types';

export const DEFAULT_ENVIRONMENTS: Record<string, EnvironmentConfig> = {
  sandbox: {
    id: 'sandbox',
    name: 'Visa Developer Sandbox',
    baseUrl: 'https://sandbox.api.visa.com',
    apiKey: 'SANDBOX_API_KEY_773091',
    sharedSecret: 'sec_vdp_sand_9921_x82',
    keyId: 'key_id_sandbox_01',
    userId: 'vdp_sandbox_user',
    password: 'vdp_sandbox_secret',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Origin-Workbench': 'v1.0'
    },
    isDefault: true
  },
  certification: {
    id: 'certification',
    name: 'Visa Certification (CTE/VTS)',
    baseUrl: 'https://cert.api.visa.com',
    apiKey: 'CERT_API_KEY_442109',
    sharedSecret: 'sec_vdp_cert_2209_y91',
    keyId: 'key_id_cert_01',
    userId: 'vdp_cert_user',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Origin-Workbench': 'v1.0'
    }
  },
  production: {
    id: 'production',
    name: 'Visa Production (Live)',
    baseUrl: 'https://api.visa.com',
    apiKey: 'PROD_API_KEY_LIVE_RESTRICTED',
    sharedSecret: 'sec_vdp_prod_restricted',
    keyId: 'key_id_prod_01',
    userId: 'vdp_prod_user',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Origin-Workbench': 'v1.0'
    }
  },
  mock: {
    id: 'mock',
    name: 'Local Workbench Mock Sandbox',
    baseUrl: 'https://httpbin.org',
    apiKey: 'mock_local_workbench_key',
    sharedSecret: 'mock_secret_key_001',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
};

export function getEnvironment(id: string = 'sandbox'): EnvironmentConfig {
  return DEFAULT_ENVIRONMENTS[id] || DEFAULT_ENVIRONMENTS.sandbox;
}
