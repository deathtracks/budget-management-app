import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserObject } from 'src/app/class/base/user-object';
import { AuthService } from 'src/app/services/base/auth.service';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-param-page',
  templateUrl: './param-page.component.html',
  styleUrls: ['./param-page.component.scss'],
})
export class ParamPageComponent implements OnInit,OnDestroy {
  public singleU : UserObject;

  private userSub: Subscription;
  private authSub: Subscription;
  constructor(
    private user: UserService,
    private auth: AuthService
  ) { }

  

  ngOnInit() {
    this.userSub = this.user.objSub.subscribe((u)=>{
      if(u) this.singleU = u;
    });
    this.user.publish();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
