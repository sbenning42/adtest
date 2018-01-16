import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { channelsApi, channelsPublishApi, channelsSoldApi, channelDeleteApi } from '../../api/api';
import { HttpProvider } from '../../providers/http/http';

/*
  Generated class for the ChannelsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChannelsProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello ChannelsProvider Provider');
  }

  get(): Observable<any> {
    return this.http.get(channelsApi);
  }

  publish(article, channel): Observable<any> {
    return this.http.put(channelsPublishApi(article.id, channel.id));
  }

  sold(data: {product: any, soldedBy: any}): Observable<any> {
    return this.http.post(channelsSoldApi, data);
  }

  delete(article) {
    return this.http.delete(channelDeleteApi(article.id));
  }

}
