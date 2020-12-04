import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, mergeMap, groupBy, toArray} from 'rxjs/operators'

import { environment as env } from 'src/environments/environment.prod';
import { zip, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(
    private http: HttpClient
  ) { }

  getMeasurementsForGraphic({ params }) {
    const queryParams = new URLSearchParams(params)
    return this.http.get(env.url_base + env.endPoints.measurements.graphic + (queryParams.toString() ? `?${queryParams}` : ''))
      .pipe(
        map((data: any) => data.data),
        mergeMap(res => res),
        groupBy((measurement: any) => measurement.device),
        mergeMap(group$ => zip(of(group$.key), group$.pipe(
          toArray()
        ))),
        map(([device, measurements]) => ({device, measurements})),
        toArray()
      )
  }
}
