import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
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
    private alertCtrl: AlertController,
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

  private async showAddModal(o?: Objectif, i?: number){
    const modal = await this.modalControler.create({
      component: AddObjComponent,
      breakpoints: [0, 0.40],
      initialBreakpoint: 0.40,
      componentProps: {
        editedObj: o
      }
    })
    modal.onDidDismiss()
    .then(async (r)=>{
      if(r.data){
        await this.loading.loadingStart();
        if(o){
          this.userService.editObjectif(r.data.objectif,i)
          .then((v)=>this.userService.publish())
          .catch(err=>{throw err});
        } else {
          this.userService.addObjectif(r.data.objectif)
          .then((v)=>this.userService.publish())
          .catch(err=>{throw err});
        } 
      }
    })
    return await modal.present();
  }

  public onEdit(i:number){
    this.showAddModal(this.objList[i],i);
  }

  public async onDelete(i: number){
    const alert =await this.alertCtrl.create({
        header: 'Confirmation',
        message : `Est-vous sur de vouloir supprimer la dépense ${this.objList[i].name} ?`,
        buttons : [
          {
            text: 'Oui',
            role: 'confirm',
            cssClass : 'btn-dark',
            handler: () =>{
              this.userService.removeObjectif(i)
              .then((v)=>{
                this.userService.publish()
              })
            }
          },
          {
            text: 'Non',
            role: 'Cancel',
            cssClass : 'btn-secondary'
          }
        ]
    })
    await alert.present();
  }
}
