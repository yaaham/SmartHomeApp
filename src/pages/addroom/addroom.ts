import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {  AuthProvider } from '../../Providers/AuthentificationProvider/AuthentificationProvider';
import {WelcomePage} from '../welcome/welcome'

/**
 * Generated class for the AddroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addroom',
  templateUrl: 'addroom.html',
})
export class AddroomPage {
  name :String;
  data :any ; 
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth :AuthProvider, public toastCtrl: ToastController) {
    this.name = localStorage.getItem('email');
    this.data = {
      roomname :'',
      email :this.name
    }
  }

  addroom(){
    this.auth.addRoom(this.data).then((res)=>{
    this.navCtrl.setRoot(WelcomePage,res);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddroomPage');
  }

}
