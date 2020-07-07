import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router) {
    this.registerForm = new FormGroup({
      studentName: new FormControl(null, Validators.required),
      grade: new FormControl(null,Validators.required),
      faceID: new FormControl(null,Validators.required),
      userName: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      cnfpass: new FormControl(null,this.passValidator)
    });

    this.registerForm.controls.password.valueChanges.subscribe(
      x => this.registerForm.controls.cnfpass.updateValueAndValidity()
    );
   }

  ngOnInit(): void {
  }

  isValid(controlName){
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if(passControl) {
        const passValue = passControl.value;
        if(passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }
    return null;
  }

}
