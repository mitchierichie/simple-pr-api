import https from 'https';

export type IncomingRequestOptions = string | https.RequestOptions | URL;
export type RequestOptions = string | https.RequestOptions;

export interface CacheHitResponse<DataType> {
  data: DataType;
  cacheHit: true;
}
