import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {AuthProvider} from '../../Providers/AuthentificationProvider/AuthentificationProvider';
import {WelcomePage} from '../welcome/welcome';
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
  resposeData: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authprovider:AuthProvider,
    private toastCtrl : ToastController) 
    {
      this.data = {
        email : '',
        password: ''
      };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    }); 
    toast.present();
  }

  checkLoginDisable(){
    if(this.data.email === '' || this.data.password ===''){
      return false;
    }
    return true;
  }

  login()  {
    if (this.data.email && this.data.password) {
      this.authprovider.post(this.data, "auth").then(
        result => {
          this.resposeData = result;
          console.log(this.resposeData);
          if (this.resposeData.accessToken) {
            localStorage.setItem("userData", JSON.stringify(this.resposeData));
            this.navCtrl.push(WelcomePage,this.resposeData);
          } else if (this.resposeData.statusText) {
            this.presentToast("You subbmited wrong email or password");
          } else {
            this.presentToast("Please give valid email and password");
          }
        },
        err => {
          {
            this.presentToast("Login failed ,Try again later !");
          }
        }
      );
    } else {
      this.presentToast("Username and Password cannot be empty ! ");
    }
  }

}
