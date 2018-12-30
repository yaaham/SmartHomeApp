import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as jwt_decode from "jwt-decode";



@Injectable()
export class AuthProvider {
    link: any;
    token : any ; 
    constructor(public http: Http) {
      this.link = 'https://localhost:8443/';
      this.token = window.localStorage.getItem('token'); 
    }
    post(credentials, type){
      return new Promise((resolve, reject) =>{
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        this.http.post(this.link+type, JSON.stringify(credentials), {headers: headers}).
        subscribe(res =>{
          resolve(res.json());
        }, (err) =>{
          if(err.statusText=="Unauthorized") {
            resolve(err);
          }
            else {
              reject(err);
            }
        });
   
      });
    } 
    getData(token, type){
      return new Promise((resolve, reject) =>{
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('Authorization','bearer '+token);
          this.http.get(this.link+type, {headers: headers}).
        subscribe(res =>{
          resolve(res.json());
        }, (err) =>{
              reject(err);
        });
   
      });
  
    }
  
    getDecodedAccessToken(token: string): any {
      try{
          return jwt_decode(token);
      }
      catch(Error){
          return null;
      }
    }

    ActivePresence(data){
      return new Promise((resolve, reject) =>{
          let headers = new Headers();
          headers.append('Content-Type','application/json');
          headers.append('Authorization','bearer '+this.token);
      var credentials = {
          'headers': headers, 
          ButtonStatus : data.etat, 
          username : data.username
      }
      return this.http.post(this.link+"alarmedepresence",credentials).subscribe(res=>{
          resolve(res.json());
      },(err)=>{
              if(err.statusText=="Unauthorized") {
                  resolve(err);
                }
                  else {
                    reject(err);
                  }
          
      });
  });
}

    logout(){
      return true;
    }
  }