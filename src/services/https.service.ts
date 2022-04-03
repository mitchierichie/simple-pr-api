import { IncomingMessage } from 'http';
import https from 'https';
import { Key } from 'node-cache';
import { URL, urlToHttpOptions } from 'url';
import CacheService from './cache.service';

declare type IncomingRequestOptions = string | https.RequestOptions | URL;
declare type RequestOptions = string | https.RequestOptions;

class HttpsService {
  private options: RequestOptions;
  private response: IncomingMessage;
  private resolve: (value: unknown) => void;
  private reject: (reason?: any) => void;
  private body = [];
  private path: string;

  private initializeOptions = (options: IncomingRequestOptions) => {
    if (typeof options === 'string') {
      this.options = options;

      return;
    }

    if ('path' in options) {
      this.options = options;

      return;
    }

    if ('href' in options) {
      this.options = urlToHttpOptions(options);
    }
  };

  private errorCallback(error: Error) {
    this.reject(error);
  }

  private dataCallback() {
    this.response.on('data', data => {
      this.body.push(data);
    });
  }

  private endCallback() {
    this.response.on('end', () => this.resolve(this.parseBody()));
  }

  private parseBody() {
    const stringBody = Buffer.concat(this.body).toString();
    const parsedBody = JSON.parse(stringBody);

    return parsedBody;
  }

  public async get(options: RequestOptions): Promise<any> {
    this.initializeOptions(options);
    this.initializePath();

    return new Promise(this.promisifyRequestCallback);
  }

  private promisifyRequestCallback(resolve: (value: unknown) => void, reject: (reason?: any) => void) {
    this.resolve = resolve;
    this.reject = reject;
    // promisify the request

    const request = https.get(this.options, (response: IncomingMessage) => {
      this.response = response;
      const cacheKey = this.checkResponseCache();

      if (CacheService.isKey(cacheKey)) {
        resolve(this.returnCacheHitResponse(cacheKey as Key));

        return;
      }

      this.addResponseCallbacks();
      this.saveETag();
    });

    request.on('error', error => this.errorCallback(error));
    request.end();
  }

  private addResponseCallbacks() {
    this.dataCallback();
    this.endCallback();
  }

  private returnCacheHitResponse(cacheKey: Key) {
    return {
      data: CacheService.get(cacheKey),
      cacheHit: true,
    };
  }

  private checkResponseCache() {
    if (this.response.statusCode !== 304) {
      return false;
    }

    if (typeof this.options === 'string') {
      return false;
    }

    if (!this.options.headers || !this.options.headers['If-None-Match']) {
      return false;
    }

    const key = this.options.headers['If-None-Match'];

    return CacheService.isKey(key) && CacheService.has(key as Key) && key;
  }

  private saveETag() {
    if (this.response.headers.etag) {
      CacheService.set(this.path, this.response.headers.etag);
    }
  }

  private initializePath() {
    this.path = typeof this.options === 'string' ? this.options : this.options.path;
  }
}

export default HttpsService;
