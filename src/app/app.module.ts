import { PopupService } from './service/popup.service';
import { LoginuserService } from 'src/app/service/loginuser.service';
import { SignalementService } from './service/signalement.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PageComponent } from './components/page/page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    MatSidenavModule,
    RouterModule.forRoot([
      { path: "", component: UserLoginComponent },
      {path:"page" ,component : PageComponent},
    ])

  ],
  providers: [],
  bootstrap: [AppComponent,LoginuserService,SignalementService,PopupService]
})
export class AppModule { }
