import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'

import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private http: HttpClient
  ) { }

  getDevices() {
    return this.http.get(env.url_base + env.endPoints.devices.list)
    .pipe(
      map((data: any) => data.data)
    )
  }
}
