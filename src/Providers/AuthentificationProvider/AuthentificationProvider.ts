import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as jwt_decode from "jwt-decode";



@Injectable()
export class AuthProvider {
    link: any;
    constructor(public http: Http, private events: Events) {
      this.link = 'https://localhost:8443/';
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
  }