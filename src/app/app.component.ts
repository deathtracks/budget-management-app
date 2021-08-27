import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/base/auth.service';
import { TranslationService } from './tools/translation/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private menuController: MenuController,
    private route: Router) {
    firebase.initializeApp(environment.firebaseConfig);
  }

  ngOnInit(): void {
    this.route.navigate(['loading']);
  }



  onLink(){
    this.menuController.close();
  }

}
