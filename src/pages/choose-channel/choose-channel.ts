import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChannelsProvider } from '../../providers/channels/channels';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the ChooseChannelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-channel',
  templateUrl: 'choose-channel.html',
})
export class ChooseChannelPage {

  channels: any[] = [];
  sub: Subscription;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public channelsProvider: ChannelsProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseChannelPage');
    this.sub = this.channelsProvider.get().subscribe(response => this.channels = response);
  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }

  solded(channel) {
    if (!confirm('Are you sure you want to set your article as Solded by ' + channel.name + ' ?')) { return ; }
    this.navParams.get('delegate').soldChannel = channel.name;
    this.navCtrl.pop();
  }

  back() {
    this.navParams.get('delegate').soldChannel = undefined;
    this.navCtrl.pop();
  }

}
