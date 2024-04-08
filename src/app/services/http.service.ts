import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getDocumentList(url: string): Observable<any> {
    return this._http.get(url);
  }
  sendQueryToBot(payload:any,url:string):Observable<any>{
    return this._http.post(url,payload);
  }
}
