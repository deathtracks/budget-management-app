import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Objectif } from 'src/app/class/base/objectif';
import { Description } from 'src/app/extra/floating-btn/floating-btn.component';
import { LoadingScreen } from 'src/app/extra/loading-screen';
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
  private loading: LoadingScreen;
  constructor(
    private userService: UserService,
    private modalControler: ModalController,
    private LoadingCtrl: LoadingController
  ) {
    this.loading = new LoadingScreen(LoadingCtrl);
  }
  

  public async ngOnInit() {
    await this.loading.generateLoading();
    await this.loading.loadingStart();
    this.userSub = this.userService.objSub.subscribe((u)=>{
      if(u){
        this.objList = u.objectifs;
      }
      this.loading.loadingStop();
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
    modal.onDidDismiss()
    .then(async (r)=>{
      if(r.data){
        await this.loading.loadingStart();
        this.userService.addObjectif(r.data.objectif)
        .then((v)=>{
          this.loading.loadingStop();
        })
        .catch(err=>{throw err});
      }
    })
    return await modal.present();
  }

}
