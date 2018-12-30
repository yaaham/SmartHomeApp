import { Component } from '@angular/core';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams,PopoverController} from 'ionic-angular';
import { AuthProvider } from '../../Providers/AuthentificationProvider/AuthentificationProvider';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HomePage } from '../home/home'; 
import {  AlertController, Platform } from 'ionic-angular';
//import { AlarmeProvider } from '../../Providers/OtherProviders/AlarmeProvider';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  home : number ; 
  presence : number ; 
  porte : number ;
  options : GeolocationOptions;
  currentlatitude : number ; 
  currentlongitude : number ; 
  userlongitude : number ; 
  userlatitude : number ; 
  name : string ; 
  rooms:object ; 
  things:string[];
  notify: any;
  notifyclima: any;
  notifyporte: any;
  notifypresence: any; 
  data : any ; 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl : PopoverController,
              private geolocation : Geolocation,
              private auth : AuthProvider) {
                this.data = localStorage.getItem("token");
                this.porte = 1; 
                this.home = 1;
                this.presence = 1 ;
                console.log(this.data.firstname);
                console.log(this.data);
  }
  
  getuserposition(){
    this.options = {
      enableHighAccuracy : true
  };
  this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
  this.currentlatitude= pos.coords.latitude;
  this.currentlongitude= pos.coords.longitude;
  },(err : PositionError)=>{
  });
  }


  activepresence(name){
    var data={ etat:true , username:name }; 
    this.auth.ActivePresence(data);
  }
  desactivepresence(name){
    var data={ etat:false , username:name }; 
    this.auth.ActivePresence(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  
  logout(){   
    window.localStorage.removeItem("token");
    this.auth.logout();
    this.navCtrl.setRoot(HomePage);
  }

}
