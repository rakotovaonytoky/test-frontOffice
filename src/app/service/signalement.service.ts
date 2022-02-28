import { environment } from './../../environments/environment';
import { Map } from './../classes/map';
import { PopupService } from './popup.service';
import { Observable, filter } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class SignalementService {

// private baseurl = "http://localhost:8080/api/frontusers/login";
  constructor(private httpclient: HttpClient,
              private popupservice :PopupService
  ) { }
  
  // getSignalement(token :string,map: L.Map):void {
  //    this.httpclient.get<Object[]>("http://localhost:8080/api/signalements?token=" + token).subscribe((res:any)=>
  //    {
  //      for (const c of res) {
  //       const lon = c['idlocalisation']['longitude'];
  //        const lat = c['idlocalisation']['latitude'];
  //        const region = c['idregion']['nomregion'];
  //        const signalement = c['idtypesignalement']['nom'];
  //        const description = c['idstatus']['nom'];
  //       const marker = L.marker([lat, lon]);
  //        marker.bindPopup(this.popupservice.makeCapitalPopup(region, signalement, description));
  //         marker.on('mouseover', function (e) {
  //           marker.openPopup();
  //       });
  //       marker.on('mouseout', function (e) {
  //           marker.closePopup();
  //       });
  //       marker.addTo(map);
  //     }
  //     }
  //   );
  // }

  listeSignalement(token: string) {
    let host = environment.host;
    return this.httpclient.get(host+"/signalements?token=" + token);
  }

  
  // listeRegion() {
  //   return this.httpclient.get("http://localhost:8080/regions");
  // }

}
