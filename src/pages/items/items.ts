import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToolbarTitle, ToastController, Content } from 'ionic-angular';

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
  public list: any;
  public items: Array<any>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.list = this.navParams.get('list');
    this.refreshItems();
  }

  private refreshItems(): void {
    this.api.getItems(this.list).subscribe((response: any) => {
      this.items = response.items;

    });
  }

  public create() {
    const prompt = this.alertCtrl.create({
      title: 'Nueva Tarea',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            const loading = this.loadingCtrl.create({
              content: 'Cargando...'
            });
            loading.present();
            this.api.createItem(this.list, data).subscribe((status) => {
              loading.dismiss();
              const toast = this.toastCtrl.create();
              if (status) {
                toast.setMessage('¡Tarea creada!')
                toast.setDuration(1000);
                this.refreshItems();
              } else {
                toast.setMessage('Se presento un error creando la tarea')
                toast.setDuration(3000);
              }
              toast.present();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  public finishItem(item): void {
    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    this.api.finish(this.list, item).subscribe(status => {
      loading.dismiss();
      const toast = this.toastCtrl.create();
      if(status){
        toast.setMessage('Se termino la tarea');
        this.refreshItems();
      } else {
        toast.setMessage('Se produjo un error');
      }
      toast.setDuration(2000);
      toast.present();
    })
  }


  public deleteItem(item): void {
    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    this.api.delete(this.list, item).subscribe(status => {
      loading.dismiss();
      const toast = this.toastCtrl.create();
      if(status){
        toast.setMessage('Se borro la tarea');
        this.refreshItems();
      } else {
        toast.setMessage('Se produjo un error');
      }
      toast.setDuration(2000);
      toast.present();
    })
  }

}
