import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/base/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    firebase.initializeApp(environment.firebaseConfig);
  }

}
