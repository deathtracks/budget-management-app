import { AlertController, LoadingController } from "@ionic/angular";

export class LoadingScreen {
    private loadingScreen: HTMLIonLoadingElement;

    constructor(
        private loadingCtrl: LoadingController
    ){}

    public async generateLoading(){
        this.loadingScreen = await this.loadingCtrl.create({
            message : 'Chargement'
        })
    }

    public async loadingStart(){
        await this.loadingScreen.present();
    }

    public async loadingStop(){
        await this.loadingScreen.dismiss();
    }
}
