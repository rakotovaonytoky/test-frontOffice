import { PopupService } from './../../service/popup.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, startWith, filter } from 'rxjs';
import { SignalementService } from './../../service/signalement.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { User } from 'src/app/classes/user';
import { Signalement } from 'src/app/classes/signalement';
import { MatDrawer } from '@angular/material/sidenav';



const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements AfterViewInit {
  private user: User = new User(); 
  // map variable

  private map: any;
  private lattitude: number=-18.933333 ;
  private longitude: any = 47.516667 ;
  userstorage: any;

  // signalements
  signalements: any = [];
  signalement$ !: any;
  selected = 'Tous';
  TypesSignalements: string[] = ['Environnement', 'Route', 'Violence', 'Sociale', 'Economique', 'Politique', 'Autre', 'Tous'];
  
  // Status signalements
  status: string[] = ['Non resolus', 'En cours', 'Resolus'];
  statSelected!: string;
  regions: any;
  selectedRegion: any;
  AllRegionLatLng!: any;

  @ViewChild('drawer') public drawer!: MatDrawer ;
  
  private initMap(): void {  
    this.map = L.map('map').setView([this.lattitude,this.longitude],7);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    
  }
    ngAfterViewInit(): void {
      this.userstorage = localStorage.getItem("token");
      this.initMap();
    if (this.userstorage) {
      this.userstorage = JSON.parse(this.userstorage);
      this.getListeSignalements(this.userstorage);

      this.GetMarkerCarte(this.userstorage, this.map);
            
    }
    }
 
  constructor(
    private httpclient: HttpClient,
    private signalement: SignalementService,
    private popupservice :PopupService
  ) { }


  
  async getListeSignalements(token :string) {
      this.signalement.listeSignalement(token).subscribe(
        (data:any) => {
          this.signalements = data;
          for (const c of data) {
           
           }
        }
      );
  }
  
  async onSelectSignalement(name: any) {
    // this.signalement.listeSignalement(this.userstorage).;
    console.log(name.value);
      if (name != "Tous") {
        
        this.signalements = this.signalements.filter(
          (res :any) => {
            return res['idtypesignalement']['nom'].match(name); 
        }
      )
      
      } else {
        this.signalements=this.getListeSignalements(this.userstorage);
      }
  }
    
  async ViewAll() {
      this.signalements=this.getListeSignalements(this.userstorage);
    }

  async GetMarkerCarte(token: string, map: L.Map) {
      this.signalement.listeSignalement(token).subscribe(
        (res: any) => {
          for (const c of res) {
                
          const lon = c['idlocalisation']['longitude'];
          const lat = c['idlocalisation']['latitude'];
          const region = c['idregion']['nomregion'];
          const signalement = c['idtypesignalement']['nom'];
          const description = c['idstatus']['nom'];
          let marker = L.marker([lat, lon]);
            marker.bindPopup(this.popupservice.makeCapitalPopup(region, signalement, description));
       
            marker.on('mouseover', function (e) {
              marker.openPopup();
          });
          marker.on('mouseout', function (e) {
              marker.closePopup();
          });
          marker.on('click',  (e) => {
            marker.openPopup();
              map.flyTo([lat, lon], 10, {
                animate: true,
                duration: 1 // in seconds
              });
            this.viewSignalement(c);
          });   
            marker.addTo(map);
            // -------------------- show 
            if (lat === this.lattitude && lon === this.longitude) {
              console.log("equals");
              var marker1 = L.marker([this.lattitude,this.longitude], {
              title: signalement
            }).addTo(map);
            marker1.bindPopup(this.popupservice.makeCapitalPopup(region, signalement, description)).openPopup();
              marker1.addTo(map);
              }
            // ===============
        }
        }
      );
  }
  
 async viewSignalement(signalement: any) {
   this.signalement$ = signalement;
   console.log(this.signalement$);
    this.statSelected = this.signalement$['idstatus']['nom'];
    console.log(signalement);
    this.lattitude = signalement['idlocalisation']['latitude'];
    this.longitude = signalement['idlocalisation']['longitude'];
    this.map.flyTo([this.lattitude,this.longitude], 10, {
        animate: true,
        duration: 2 // in seconds
    });
   this.GetMarkerCarte(this.userstorage, this.map);
   if (!this.drawer.open()) {
     this.drawer.toggle();
   }
    
  }

}
