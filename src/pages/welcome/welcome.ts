import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams,PopoverController} from 'ionic-angular';
import { AuthProvider } from '../../Providers/AuthentificationProvider/AuthentificationProvider';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HomePage } from '../home/home'; 
import {  AlertController, Platform } from 'ionic-angular';
import { AddroomPage } from '../addroom/addroom';
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
  refresh :any ;
  distance :Number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl : PopoverController,
              private geolocation : Geolocation,
              private auth : AuthProvider) {
                this.data = localStorage.getItem("token");
                this.name = localStorage.getItem('email');
                this.refresh =localStorage.getItem("refreshtoken");
                //console.log(this.data);
                Observable.interval(15000).subscribe(x => {
                  this.getuserposition();
                  this.auth.Active({email : this.name},"getroom").then(data => {
                    console.log( data);
                    var rom= data.user.rooms;
                    var roomsf=[];
                    if(data.result!== "null"){
                    this.userlongitude=data.user.lon;
                    this.userlatitude= data.user.lat;
                
                    for(var i=1; i<data.result.length; i++){
                    roomsf[i-1]= data.result[i];
                    }
                    this.rooms=roomsf;
                                
                  
                    }else{
                    this.rooms=[];
                    }
                    console.log(this.rooms);
                    this.porte= data.porte;
                    this.presence= data.user.presence;
                    
                  });
              
                this.distance =this.DistanceTo(this.userlatitude, this.userlongitude, this.currentlatitude, this.currentlongitude);
                  
                });
              
              
                Observable.interval(30000).subscribe(x => { 
               if(this.distance <10){
                                    this.auth.Active ({ ButtonStatus:true , email:this.name } , "gen").then(data =>{
                                    })
                                 }else{
                                    this.auth.Active({ ButtonStatus:false , email:this.name } , "gen").then(data =>{
                                    })
                                 } 
                 })
                 Observable.interval(1000000).subscribe(x=>{
                   console.log(this.refresh);
                   this.auth.refreshtoken({refresh_token :this.refresh ,email : this.name}).then(data=>{
                     localStorage.removeItem("accessToken");
                     localStorage.setItem("accessToken",this.data.accessToken);

                   })
                 })
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

  pageroom(){
    this.navCtrl.setRoot(AddroomPage);
  }

  activedesactive(type){
    var data={ ButtonStatus:type , email:this.name }; 
    console.log(type);
    this.auth.Active(data,"alarmedepresence").then((res)=>{
    });
  }

  acitverdesactivemove(type){
    var data = {ButtonStatus : type , email : this.name}; 
    this.auth.Active(data,"porte").then((res)=>{

    });
  }
  dessactiverlumgenerale(type){
    var data = {ButtonStatus : type ,email : this.name}; 
    this.auth.Active(data,"lumgen").then((res)=>{

    });
  }
  dessactiverclimgenerale(type){
    var data = {ButtonStatus : type ,email : this.name}; 
    this.auth.Active(data,"climgen").then((res)=>{

    });
  }
  activerlampelocalisation(roomname ,type){
    var data= {roomname : roomname , email : this.name , ButtonStatus : type}
    this.auth.Active(data,"lamploc").then((res)=>{
    });
  }
  activerclimalocalisation(roomname,type){
    var data= {roomname : roomname , email : this.name , ButtonStatus : type}
    this.auth.Active(data,"climloc").then((res)=>{
    });
  }

  DistanceTo( lat1,  lon1,  lat2,  lon2)
  {
    var rlat1 = Math.PI * lat1/180;
    var rlat2 = Math.PI * lat2/180;
    var rlon1 = Math.PI * lon1/180;
    var rlon2 = Math.PI * lon2/180;
    var theta = lon1-lon2;
    var rtheta = Math.PI * theta/180;
    var dist = Math.sin(rlat1) * Math.sin(rlat2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    var  dist = dist * 1.609344 * 1000;
    return dist;
}
update(roomname, name){
  var data={ButtonStatus:this.notify, roomname: roomname,email: name};
  this.auth.Active(data,"lamploc").then(res => {
  })
}
updateclima(roomname, name){
  var data={ButtonStatus:this.notifyclima, roomname: roomname,email: name};
  this.auth.Active(data,"climloc").then(res => {
  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  
  logout(){   
    localStorage.removeItem("token");
   localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("email");
    this.auth.logout();
    this.navCtrl.setRoot(HomePage);
  }

}
