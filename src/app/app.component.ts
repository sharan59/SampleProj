import { Component } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  datatobeedited:any;
  update:boolean=false;
  sign:any;
    
    chname:string;
    chage:string;  
  
  username:string;
  address:string;
  contact:string;
  email:string;
  adata :any[];
  constructor(private _http:Http, private test:DataService) {
    this.test.getallData().subscribe((testData) => this.adata=testData);
   }

  ngOnInit() {
  }

  transfer(a)
  {
    this.username=a.username;
  this.address=a.address;
  this.contact=a.contact;
  this.email = a.email;
  console.log(this.username+this.address+this.contact+this.email);
  console.log(a);
  var headers= new Headers();
  headers.append('Content-Type', 'application/json');
  let options = new RequestOptions({ headers: headers });
  
  this._http.post('/api/adduser',a, options)
          .subscribe(data => {
                alert('Registered Successfully');
          }, error => {
              console.log(JSON.stringify(error.json()));
          })
  
  }

  deleteData(username:any,x:any)
  {
    console.log(username);
    this.test.deleteData(username).subscribe((testData)=>this.adata=testData)
  }
  editData(i:any)
  {
   
    this.update=true;
    this.datatobeedited=i;
    console.log("obj is"+this.datatobeedited.name);
   // this._dataService.editData(name).subscribe((testData)=>this.test=testData)

  }
  saveUpdate(datatobesaved:any)
  {
    console.log("datatobesaved"+datatobesaved._id);
    console.log("datatobesaved"+datatobesaved.username+''+
        ' '+datatobesaved.address+' '+datatobesaved.email+' '+datatobesaved.contact);
        
    let _url="http://localhost:3000/api/data"+"/"+datatobesaved._id;
  
  var headers= new Headers();
  headers.append('Content-Type', 'application/json');
  let options = new RequestOptions({ headers: headers });
  
this._http.put(_url,datatobesaved, options)
          .subscribe(data => {
                alert('saved Successfully');
                this.update=false;
               // this.router.navigate(['/api/login']);
               
          }, error => {
              console.log(JSON.stringify(error.json()));
          })
      }

}
