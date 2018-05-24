import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class DataService {
  dig :any[];
  private url="http://localhost:5000/api/java";
  private url2="http://localhost:5000/api/mean";
  private url3="http://localhost:3000/api/all";
  constructor(private _http:Http) { }

  getallData():Observable<any[]>
   {
     return this._http.get(this.url3).map((res:Response)=> <any[]>res.json())
     }
     deleteData(username):Observable<any[]>
     {
       return this._http.delete(this.url3+"/"+username)
       .map(function(response:Response){{return <any>response.json()}})
     }

}
