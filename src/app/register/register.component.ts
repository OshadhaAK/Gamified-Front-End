import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { isFormattedError } from '@angular/compiler';
import { RegisterService } from '../services/register.service';
import { error } from '@angular/compiler/src/util';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  form1: any;
  form2: any;
  form3: any;
  multipleImages = [];
  successMessage: any;
  imageUrl: any;
  faCamera = faCamera;



  constructor(private router: Router, private registerService: RegisterService, private activatedRoute: ActivatedRoute, private ref: ChangeDetectorRef) {

    this.form1 = true;
    this.form2 = false;
    this.form3 = false;

    this.registerForm = new FormGroup({
      studentname: new FormControl(null, Validators.required),
      grade: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, Validators.required)
    });

    this.registerForm.controls.password.valueChanges.subscribe(
      x => this.registerForm.controls.cnfpass.updateValueAndValidity()
    );
  }

  ngOnInit(): void {

   
  }


  isValid(controlName) {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched;
  }


  // passValidator(control: AbstractControl){
  //   if(control && (control.value != null || control.value != undefined)){
  //     const cnfpassValue = control.value;

  //     const passControl = control.root.get('password');
  //     if(passControl) {
  //       const passValue = passControl.value;
  //       if(passValue != cnfpassValue || passValue == '') {
  //         return {
  //           isError: true
  //         };
  //       }
  //     }
  //   }
  //   return null;
  // }
  next(btnName: string) {
    console.log(btnName)
    if (btnName == 'buttonRef1') {
      if ((this.registerForm.get('studentname').value != null || this.registerForm.get('studentname').value != undefined) && (this.registerForm.get('grade').value != null || this.registerForm.get('grade').value != undefined)) {
        this.form1 = false;
        this.form2 = true;
        this.form3 = false;

      }
      else {
        console.log("Error")
      }
    }
    if (btnName == 'buttonRef2') {
      
      this.registerForm.controls['image'].setValue(this.imageUrl);
      if ((this.registerForm.get('image').value != null || this.registerForm.get('image').value != undefined)) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = true;

      }
      else {
        console.log("Error")
      }
    }

  }

  submit() {
    console.log("image")
    if (this.registerForm.valid) {
      
      console.log("form", this.registerForm)
      this.registerService.register(this.registerForm.value).subscribe(data => {
        this.successMessage = 'Registration Success!';
        
      }, error => this.successMessage = 'Registration Failed!'
      
      );
      
    }
    
  }
  onChange(newValue) {
    console.log(newValue);
  }
  imageChanged(data) {
    this.imageUrl = data;
    this.ref.detectChanges();
  }
  

  /*  selectImage(event) {
     if (event.target.files.length > 0) {
       const file = event.target.files[0];
       this.images = file;
       console.log(this.images)
     }
   } */

  /* selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  } */

  /* onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);
    this.registerService.upload(formData).subscribe((data) => {
      console.log("image sent successfully")
    }, error => this.successMessage = 'Image sending Failed!'
    );
    
  }

  onMultipleSubmit(){
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
    }
  } */
}