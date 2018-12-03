import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {  Events } from 'ionic-angular';
import 'rxjs/add/operator/map';



@Injectable()
export class AuthProvider {
    link: any;
  
    constructor(public http: Http, private events: Events) {
      this.link = 'https://localhost:8443';
    }

    login(cred){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return new Promise(resolve => {
        this.http.post(this.link + "/auth", cred, {headers: headers})
            .map(res => res.json())
            .subscribe(
              data => {resolve(data)},
              error=> {
                this.events.publish('app:toast', JSON.parse(error._body).message);
              }
            )
        })
    }
  }