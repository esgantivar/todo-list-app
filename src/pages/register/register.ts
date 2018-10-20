import { map } from 'rxjs/operators';
import { ApiProvider } from './../../providers/api/api';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public email: string;
  public password: string;
  public passwordConfirmation: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
  }

  public register() {
    const params = {
      email: this.email,
      password: this.password,
      password_confirmation: this.passwordConfirmation
    }
    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    this.api.register(params).subscribe((status: boolean) => {
      loading.dismiss();
      const toast = this.toastCtrl.create()
      if (status) {
        toast.setMessage('¡Registrado con exito!')
        toast.setDuration(1000);
        this.navCtrl.setRoot(LoginPage);
      } else {
        toast.setMessage('Se presento un error en el registro, vuelva a intentarlo')
        toast.setDuration(3000);
      }
      toast.present();
    })
  }

  public back() {
    this.navCtrl.setRoot(LoginPage);
  }
}
