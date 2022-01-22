import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const API_HOST = environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  token: string;

  constructor(private http: HttpClient) {
  }

  static handleError(error: Error) {
    alert(error.message);
  }

  static extractData(res: HttpEvent<any>) {
    const body = res;
    return body || {};
  }

  setAuthToken(token) {
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `jwt ${token}`);
    this.token = token;
  }

  get(endpoint): Promise<any> {
    const url = `${API_HOST}${endpoint}`;
    console.log("this.get endpoint: " + endpoint);
    const req = this.http.get(url, this.httpOptions).pipe(map(ApiService.extractData));

    return req
      .toPromise()
      .catch((e) => {
        ApiService.handleError(e);
        throw e;
      });
  }

  post(endpoint, data): Promise<any> {
    const url = `${API_HOST}${endpoint}`;
    console.log("this.post endpoint: " + endpoint);
    return this.http.post<HttpEvent<any>>(url, data, this.httpOptions)
      .toPromise()
      .catch((e) => {
        ApiService.handleError(e);
        throw e;
      });
  }

  async upload(endpoint: string, file: File, payload: any): Promise<any> {
    const signed_url = (await this.get(`${endpoint}/signed-url/${file.name}`)).url;
    console.log("this.upload signed_url: " + signed_url);
    const headers = new HttpHeaders({ 'Content-Type': file.type });
    const req = new HttpRequest('PUT', signed_url, file,
      {
        headers: headers,
        reportProgress: true, // track progress
      });
    let ranOnce = true;
    return new Promise(resolve => {
      console.log("In return new Promise.");
      // This subscribe line is causing duplicate post commands. Introduced the boolean to get it to stop doing that.
      this.http.request(req).subscribe((resp) => {
        console.log("In subscribe.");
        if (ranOnce) {
          console.log("Should only run once before status check.");
          if (resp && (<any>resp).status && (<any>resp).status === 200) {
            console.log("Should only run once after status check.");
            ranOnce = false;
            resolve(this.post(endpoint, payload));
          }
        } else { }
      });
    });
  }
}
