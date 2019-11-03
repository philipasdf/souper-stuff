import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SouperPagesModule} from './modules/souper-pages/souper-pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SouperPagesModule,
    BrowserAnimationsModule,
    NgxAuthFirebaseUIModule.forRoot({
      apiKey: 'AIzaSyCv8JHkKy9coTrgzBO_s6iwOVKQQ61gcBY',
      authDomain: 'souper-stuff-firebase.firebaseapp.com',
      databaseURL: 'https://souper-stuff-firebase.firebaseio.com',
      projectId: 'souper-stuff-firebase',
      storageBucket: 'souper-stuff-firebase.appspot.com',
      messagingSenderId: '468610452325',
      appId: '1:468610452325:web:ac8aad479def2f37136f8c'
    },
      null,
      {
        authGuardFallbackURL: '/login', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/main' // url for authenticated users - to use in combination with canActivate feature on a route
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
