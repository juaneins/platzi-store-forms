import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent implements OnInit {
  groupedForm: FormGroup;

  // nameField = new FormControl('', [
  //   Validators.required,
  //   Validators.maxLength(10),
  // ]);
  //emailField = new FormControl('');
  //phoneField = new FormControl('');
  // colorField = new FormControl('#31a061');
  // numberField = new FormControl('');
  //dateField = new FormControl('');

  // categoryField = new FormControl('');
  //tagField = new FormControl('');

  // agreeField = new FormControl(false);
  // genderField = new FormControl('');
  // zoneField = new FormControl('');

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((value) => {
      console.log('reactive value:' + value);
    });
    this.groupedForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  private buildForm() {
    this.groupedForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(10)]],
      email: [''],
      phone: ['', [Validators.required]],
      color: ['#31a061'],
      number: [''],
      date: [''],
      category: [''],
      tag: [''],
      agree: [false],
      gender: [''],
      zone: [''],
    });
  }

  getNameValue() {
    console.log('event value: ', this.nameField.value);
  }

  get nameField() {
    return this.groupedForm.get('name');
  }

  get emailField() {
    return this.groupedForm.get('email');
  }

  get phoneField() {
    return this.groupedForm.get('phone');
  }

  get colorField() {
    return this.groupedForm.get('color');
  }

  get numberField() {
    return this.groupedForm.get('number');
  }

  get dateField() {
    return this.groupedForm.get('date');
  }

  get categoryField() {
    return this.groupedForm.get('category');
  }

  get tagField() {
    return this.groupedForm.get('tag');
  }

  get agreeField() {
    return this.groupedForm.get('agree');
  }

  get genderField() {
    return this.groupedForm.get('gender');
  }
  get zoneField() {
    return this.groupedForm.get('zone');
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }

  save(event) {
    console.log('event: ', event);
    if (this.groupedForm.valid) {
      console.log(this.groupedForm.value);
    } else {
      this.groupedForm.markAllAsTouched();
    }
  }
}
