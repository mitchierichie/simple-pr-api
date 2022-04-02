import { IncomingMessage } from 'http';
import https from 'https';
import { URL } from 'url';

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

  public async get(options: string | https.RequestOptions | URL): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = https.get(options, (response: IncomingMessage) => {
        this.dataCallback(response);
        this.endCallback(response, resolve);
      });
      request.on('error', error => this.errorCallback(error, reject));
      request.end();
    });
  }
}

export default HttpsService;
