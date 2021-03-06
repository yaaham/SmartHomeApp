import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as jwt_decode from "jwt-decode";



@Injectable()
export class AuthProvider {
    link: any;
    data :any;
    token : any ; 
    constructor(public http: Http) {
      this.link = 'https://localhost:8443/';
      this.token = localStorage.getItem('accessToken'); 
     // this.token = this.data.accessToken;
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
        headers.append('Authorization','Bearer '+token);
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
    
    refreshtoken(credentials){
      return new Promise((resolve, reject) =>{
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('authorization','Bearer '+ this.token);
        console.log(credentials.roomname);
        this.http.post(this.link+"auth/refresh",JSON.stringify(credentials), {headers: headers}).subscribe(res=>{
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
    addRoom(credentials){
      return new Promise((resolve, reject) =>{
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('authorization','Bearer '+ this.token);
        console.log(credentials.roomname);
        this.http.post(this.link+"addroom",JSON.stringify(credentials), {headers: headers}).subscribe(res=>{
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
    

    Active(credentials,type){
      return new Promise((resolve, reject) =>{
          
          let headers = new Headers();
          headers.append('Content-Type','application/json');
          headers.append('authorization','Bearer '+ this.token);
          
          this.http.post(this.link+type,JSON.stringify(credentials), {headers: headers}).subscribe(res=>{
            console.log("1111");
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