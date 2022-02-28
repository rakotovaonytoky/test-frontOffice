import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }
   makeCapitalPopup(region:any,signalement :any,status :any): string {
    return `` +
      `<div>Region: ${ region }</div>` +
      `<div>Signalement: ${ signalement }</div>` +
      `<div>Description: ${ status }</div>`
  }
}
