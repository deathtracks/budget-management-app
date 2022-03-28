import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router
  ) {
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
  }

  ngOnInit(): void {
    this.router.navigate(['home']);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    document.body.classList.remove('dark');
  }
}
