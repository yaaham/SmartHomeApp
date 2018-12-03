import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import {AuthProvider} from '../../Providers/AuthentificationProvider/AuthentificationProvider';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public data : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,private authprovider:AuthProvider,private events: Events ) {
    this.data = {
      email : '',
      password: ''
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    this.authprovider.login(this.data)
      .then(
        data => this.handleLoginSuccess(data)
      ).catch(()=>{
        console.log("catched auth")
      }
    )
    
  }
  handleLoginSuccess(data) {
    this.events.publish('app:setUser', data);
  }
  checkLoginDisable(){
    if(this.data.email === '' || this.data.password ===''){
      return false;
    }
    return true;
  }


}
