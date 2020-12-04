import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { Chart } from 'chart.js';
import { zonedTimeToUtc } from 'date-fns-tz';
import { subHours } from 'date-fns';

import { DeviceService } from 'src/app/services/device/device.service';
import { MeasurementService } from 'src/app/services/measurement/measurement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  devices$: Observable<any>;
  chart: Chart;
  colors = [
    '#6bf2f4',
    '#a189d3',
    '#3479d3',
    '#14d182',
    '#a2a9f9',
    '#eac77c',
    '#5a35a3',
    '#ad2b38',
    '#f45f98',
    '#033c82'
  ]

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private measurementService: MeasurementService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        title: {
          display: true,
          text: 'Mediciones promedio por hora de CO2 en partículas por millón (últimas 12 horas)'
        }
      }
    })
    this.getDevices();
    this.getMeasurementsForGraphic({ params: {
      endDate: zonedTimeToUtc(new Date(), 'ISO').toISOString(),
      startDate: zonedTimeToUtc(subHours(new Date(), 12), 'ISO').toISOString()
    } });

  }

  getDevices() {
    this.devices$ = this.deviceService.getDevices()
  }

  getMeasurementsForGraphic({ params }) {
    this.measurementService.getMeasurementsForGraphic({ params })
      .subscribe(data => {
        const [{ measurements }] = data;
        const labels = measurements.map(date => {
          return `${date.year}-${date.month}-${date.day} ${date.hour}H`
        })
        this.chart.data.labels = [...labels]
        const med = data.map((set, index) => {
          return {
            label: `Dispositivo ${set.device}`,
            backgroundColor: this.colors[index],
            borderColor: this.colors[index],
            data: set.measurements.map(measurement => measurement.co2.toFixed(3)),
            fill: false
          }
        })
        this.chart.data.datasets = [...med]
        this.chart.update()
      })
  }

  buildForm(): void {
    this.form = this.fb.group({
      devices: [[]],
      date: [[]]
    });
    this.form.valueChanges
      .subscribe(f => {
        const { devices, date } = f
        const params: any = {
          devices: devices.join('-'),
        }

        if (date.length > 0) {
          params.startDate = zonedTimeToUtc(date[0], 'ISO').toISOString();
          params.endDate = zonedTimeToUtc(date[1], 'ISO').toISOString();
          console.log(params)
        } else {
          params.endDate = zonedTimeToUtc(new Date(), 'ISO').toISOString(),
          params.startDate = zonedTimeToUtc(subHours(new Date(), 12), 'ISO').toISOString()
        }

        this.getMeasurementsForGraphic({ params })
        this.chart.update()
      })
  }

  get devicesField() {
    return this.form.get('devices')
  }

  get date() {
    return this.form.get('date')
  }

}
