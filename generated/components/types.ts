export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

export interface ApiEndpointParam {
  name: string;
  type: string;
  required?: boolean;
  in?: 'query' | 'path' | 'header' | 'body';
  description?: string;
  defaultValue?: any;
  example?: any;
}

export interface ApiEndpoint {
  id: string;
  path: string;
  method: HttpMethod;
  summary: string;
  description?: string;
  parameters?: ApiEndpointParam[];
  requestBodyExample?: any;
  responseExample?: any;
  tags?: string[];
}

export interface SpecMetadata {
  id: string;
  title: string;
  componentName: string;
  fileName: string;
  category: string;
  endpointsCount: number;
  xsdTypesCount?: number;
  format: 'openapi' | 'swagger' | 'xsd';
  version?: string;
  description?: string;
  tags?: string[];
}

export interface EnvironmentConfig {
  id: string;
  name: string;
  baseUrl: string;
  apiKey?: string;
  sharedSecret?: string;
  certPath?: string;
  keyId?: string;
  userId?: string;
  password?: string;
  headers?: Record<string, string>;
  isDefault?: boolean;
}

export interface ExecutionLog {
  id: string;
  specId: string;
  endpointId?: string;
  method: string;
  url: string;
  status: number;
  statusText: string;
  latencyMs: number;
  timestamp: string;
  requestHeaders: Record<string, string>;
  requestBody?: any;
  responseHeaders?: Record<string, string>;
  responseData?: any;
  error?: string;
}

export interface XsdTypeDefinition {
  name: string;
  kind: 'complexType' | 'simpleType' | 'group' | 'element';
  documentation?: string;
  elements?: Array<{
    name: string;
    type: string;
    minOccurs?: string | number;
    maxOccurs?: string | number;
    documentation?: string;
  }>;
  attributes?: Array<{
    name: string;
    type: string;
    use?: 'required' | 'optional';
  }>;
}
