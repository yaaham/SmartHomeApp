import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {AuthProvider} from '../../Providers/AuthentificationProvider/AuthentificationProvider';
import {WelcomePage} from '../welcome/welcome';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  public data : any ; 
  responseData : any ;
  public Verification :any ;  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authprovider: AuthProvider,
    private toastCtrl: ToastController) 
    {
      this.data={
      firstName : '', 
      lastName : '',
      email : '',
      password : ''
      };
      this.Verification ={
        password : ''
      };
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  SignUp(){
    if(this.data.firstName && this.data.lastName && this.data.email && this.data.password){
      if(this.data.password != this.Verification.password){
        return Observable.throw("wrong password");
      }
      this.authprovider.post(this.data, "users").then(
        result => {
          this.responseData = result;
          console.log(result);
          if (this.responseData) {
            console.log(this.responseData);
            localStorage.setItem("userData", JSON.stringify(this.responseData));
            this.presentToast("Successfully registered");
            this.navCtrl.push(WelcomePage,this.responseData);
          } else if (this.responseData.err.name) {
            this.presentToast(this.responseData.err.message);
          }
        },
        err => {
          {
            this.presentToast("Register failed ,Try again later!");
          }
        }
      );
    } else {
      this.presentToast("Please Write Valid Information");
          }

    }
}

