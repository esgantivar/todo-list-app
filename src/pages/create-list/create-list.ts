import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-create-list',
  templateUrl: 'create-list.html',
})
export class CreateListPage {
  public name: string;
  public description: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private api: ApiProvider,
    private loadingCtrl: LoadingController,
    private toast: ToastController) {
  }

  ionViewDidLoad() {
  }

  public create(): void {
    const params = {
      name: this.name,
      description: this.description
    };
    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    this.api.createList(params).subscribe((status) => {
      loading.dismiss();
      const toast = this.toast.create();
      if (status) {
        toast.setMessage('La lista se creo de forma correcta');
        toast.setDuration(1000);
        this.back();
      } else {
        toast.setMessage('Se presento un error al crear la lista');
        toast.setDuration(3000);
      }
      toast.present();
    })
  }

  public back(): void {
    this.viewCtrl.dismiss();
  }
}
