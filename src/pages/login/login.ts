import { ApiProvider } from './../../providers/api/api';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ListsPage } from '../lists/lists';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: string;
  public password: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  public login(): void {
    const params = {
      email: this.email,
      password: this.password
    }
    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    this.api.login(params).subscribe((status) => {
      loading.dismiss();
      if (status) {
        const toast = this.toastCtrl.create({
          message: 'Ingresando...',
          duration: 1000
        })
        toast.present();
        this.navCtrl.push(ListsPage);
      } else {
        const toast = this.toastCtrl.create({
          message: 'Correo o contraseña invalida',
          duration: 3000
        })
        toast.present();
      }
    })
  }

  public register() {
    this.navCtrl.setRoot(RegisterPage);
  }
}
