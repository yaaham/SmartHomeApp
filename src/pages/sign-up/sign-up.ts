import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {AuthProvider} from '../../Providers/AuthentificationProvider/AuthentificationProvider';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
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
  options : GeolocationOptions;
  public Verification :any ;  
  constructor(
    public navCtrl: NavController,
    private geolocation : Geolocation,
    public navParams: NavParams,
    private authprovider: AuthProvider,
    private toastCtrl: ToastController) 
    {
      this.data = {
      firstName : '', 
      lastName : '',
      email : '',
      password : '',
      lat : '',
      lon :''
      };
      this.Verification ={
        password : ''
      };
  }
  getuserposition(){
    this.options = {
      enableHighAccuracy : true
  };
  this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
  this.data.lat= pos.coords.latitude;
  this.data.lon= pos.coords.longitude;
  },(err : PositionError)=>{
  });
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
        console.log('verifie your password');
      }
      else{
        this.authprovider.post(this.data, "users").then(
        result => {
          this.responseData = result;
          console.log(result);
          if (this.responseData) {
            console.log(this.responseData);
            localStorage.setItem("token", JSON.stringify(this.responseData));
            localStorage.setItem("accessToken",this.responseData.accessToken);
            localStorage.setItem("refreshtoken",this.responseData.refreshtoken);
            localStorage.setItem("email",this.responseData.email);
            this.presentToast("Successfully registered");
            this.navCtrl.setRoot(WelcomePage,this.responseData);
          } else if (this.responseData.err.name) {
            this.presentToast(this.responseData.err.message);
          }
        },
        err => {
          {
            this.presentToast("Register failed ,Try again later!");
          }
        }
      );}
    } else {
      this.presentToast("Please Write Valid Information");
          }
    }
}

