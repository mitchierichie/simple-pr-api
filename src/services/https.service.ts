import { IncomingMessage } from 'http';
import https from 'https';
import { URL } from 'url';
import CacheService from './cache.service';
import RepoService from './repo.service';

declare type RequestOptions = string | https.RequestOptions | URL;

class HttpsService {
  private body = [];

  private errorCallback(error: Error, reject: { (reason?: any): void }) {
    reject(error);
  }

  private dataCallback(response: IncomingMessage) {
    response.on('data', data => {
      this.body.push(data);
    });
  }

  private endCallback(response: IncomingMessage, resolve: { (value: unknown): void; (arg0: any): void }) {
    response.on('end', () => resolve(this.parseBody()));
  }

  private parseBody() {
    const stringBody = Buffer.concat(this.body).toString();
    const parsedBody = JSON.parse(stringBody);

    return parsedBody;
  }

  public async get(options: RequestOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      // promisify the request

      const request = https.get(options, (response: IncomingMessage) => {
        this.dataCallback(response);
        this.endCallback(response, resolve);

        if (response.headers.etag) {
          this.saveETag(options, response.headers.etag);
        }
      });

      request.on('error', error => this.errorCallback(error, reject));
      request.end();
    });
  }

  private saveETag(options: RequestOptions, etag: string) {
    const path = this.normalizePath(options);
    CacheService.addETag(path, etag);
  }

  private normalizePath(options: RequestOptions) {
    if (typeof options === 'string') {
      return options;
    }

    if ('path' in options) {
      return options.path;
    }

    if ('pathname' in options) {
      return options.pathname;
    }
  }
}

export default HttpsService;
