import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Objectif } from 'src/app/class/base/objectif';
import { Description } from 'src/app/extra/floating-btn/floating-btn.component';
import { UserService } from 'src/app/services/data/user.service';
import { AddObjComponent } from '../add-obj/add-obj.component';

@Component({
  selector: 'app-obj-list',
  templateUrl: './obj-list.component.html',
  styleUrls: ['./obj-list.component.scss'],
})
export class ObjListComponent implements OnInit,OnDestroy {
  public objList: Objectif[];
  public floatingBtn : Description[] = [
    {
      name: 'add',
      icon: 'add-outline'
    }
  ]

  private userSub : Subscription;
  constructor(
    private userService: UserService,
    private modalControler: ModalController
  ) { }
  

  ngOnInit() {
    this.userSub = this.userService.objSub.subscribe((u)=>{
      if(u){
        this.objList = u.objectifs;
      }
    })
    this.userService.publish();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public onAction(name: string){
    if(name==='add'){
      this.showAddModal();
    }
  }

  public async showAddModal(){
    const modal = await this.modalControler.create({
      component: AddObjComponent,
      breakpoints: [0, 0.40],
      initialBreakpoint: 0.40
    })
    return await modal.present();
  }

}
