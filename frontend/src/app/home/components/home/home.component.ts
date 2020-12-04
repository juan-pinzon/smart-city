import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeviceService } from 'src/app/services/device/device.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  devices$: Observable<any>;

  listOfOption = [
    {
      label: 'juan',
      value: 3
    }
  ]

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.buildForm()
    this.getDevices()
  }

  getDevices() {
    this.devices$ = this.deviceService.getDevices()
  }

  buildForm(): void {
    this.form = this.fb.group({
      devices: [[]],
      date: [[]]
    });
  }

  get devicesField() {
    return this.form.get('devices')
  }

  get date() {
    return this.form.get('date')
  }

}
