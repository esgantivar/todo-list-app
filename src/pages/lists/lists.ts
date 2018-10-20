import { ItemsPage } from './../items/items';
import { LoginPage } from './../login/login';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { CreateListPage } from '../create-list/create-list';

/**
 * Generated class for the ListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {
  public lists: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider, private modalCtrl: ModalController) {
    this.lists = [];

  }

  ionViewWillEnter() {
    this.refreshLists();
  }

  public addList(): void {
    const modal = this.modalCtrl.create(CreateListPage)
    modal.present();
    modal.onDidDismiss(() => {
      this.refreshLists();
    });
  }

  private refreshLists(): void {
    this.api.getLists().subscribe((response: any) => {
      this.lists = response.lists;
    })
  }


  public logout(): void {
    this.api.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  public selectList(list) {
    this.navCtrl.push(ItemsPage, {
      list: list
    });
  }
}
