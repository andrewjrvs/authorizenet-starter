import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { TK_CONFIG, Config, AcceptJSService } from '@openutility/acceptjs-angular-wrapper';
import * as CONSTANTS from '../../constants';
import { CCComponent } from './forms/cc.component';

import { AppRoutingModule } from './app-routing.module';
import { SuccessComponent } from './forms/success.component';
import { FormsComponent } from './forms/forms.component';

/*
  Build the configuration file passing in the AcceptJS
  URL (testing or prod)
  and your apiLoginID and client key
//*/
const AcceptJSConfig: Config = {
  acceptjsUrl: 'https://jstest.authorize.net/v1/Accept.js'
  , apiLoginID: CONSTANTS.apiLoginKey
  , clientKey: CONSTANTS.pubicKey
};

@NgModule({
  declarations: [
    AppComponent,
    CCComponent,
    FormsComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: TK_CONFIG,
      useValue: AcceptJSConfig
    },
    AcceptJSService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
