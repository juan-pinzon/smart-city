import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  listOfOption = [
    {
      label: 'juan',
      value: 3
    }
  ]

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm()
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
