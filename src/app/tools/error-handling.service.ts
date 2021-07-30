import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    private alertController: AlertController
  ) { }


  public async showError(fonction: string,object: string,message: string){
    const alert = await this.alertController.create({
      header : 'Error',
      subHeader:`Process : ${fonction} in ${object}`,
      message: `${message}`,
      buttons : ['OK']
    });
    await alert.present();
  }
}
