import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlingService } from '../error-handling.service';
import { TranslationService } from '../translation/translation.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  constructor(
    private translation: TranslationService,
    private error: ErrorHandlingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.translation.loadFile()
    .then((err)=>{
      if(err){
        this.error.showError('ngOnInit','loading.components.ts',err.message);
      } else {
        this.router.navigate(['months']);
      }
    });
  }

}
