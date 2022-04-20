import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

const URL_MAP = {
  github: [
    'https://raw.githubusercontent.com/JenHsuan/web-layout-practice/master',
    'index.html',
  ],
};

@Injectable()
export class WebLayoutService {
  constructor(private httpService: HttpService) {}

  getPage(
    practiceName: string,
    key: string,
  ): Observable<string> {
    return this.httpService.get(this.getRealUrl(practiceName, key)).pipe(
      map(res => res.data)
    );
  }

  private getRealUrl(name: string, key: string) {
    if (!URL_MAP.hasOwnProperty(key)) {
      return '';
    }
    const fragments = URL_MAP[key];
    fragments.splice(fragments.length - 1, 0, name);
    return fragments.join('/');
  }
}
