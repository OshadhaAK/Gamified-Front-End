import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DataService } from '../services/data.service';
import { from } from 'rxjs';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { ElementAst } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  faceLoginForm: FormGroup;
  imageUrl: any;
  message: any;
  faCamera = faCamera;
  loginMethod: any;
  credentials: any;
  face: any;
  validUsername: any;
  validPass: any;
  validStudentName: any;
  validface: any;
  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute, private dataService: DataService, private ref: ChangeDetectorRef) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    this.faceLoginForm = new FormGroup({
      studentname: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    });

    this.credentials = false;
    this.face = false;
    this.validUsername = false;
    this.validPass = false;
    this.validStudentName = false;
    this.validface = false;
  }

  ngOnInit(): void {
    // this.getCameraImage();
    this.dataService.currentMessage.subscribe(message => this.message = message)
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  isfilled(controlName) {
    return this.faceLoginForm.get(controlName).invalid && this.faceLoginForm.get(controlName).touched;
  }

  login() {
    this.loginMethod = "pass";
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(data => {
        localStorage.setItem('token', data.toString());
        this.router.navigate(['/dashboard']);

      }, error => {
        console.log("invalid login");
        this.credentials = true;
      }
      );
      this.newPassMessage();
    }
    else {
      console.log("not authenticated", this.loginForm.get('username'));
      if (this.loginForm.get('username').value == null) {
        this.loginForm.get('username').valueChanges.subscribe(change => {
          this.credentials = false;
          this.validUsername = false;
        });
        this.validUsername = true;
      }
      if (this.loginForm.get('password').value == null) {
        this.loginForm.get('password').valueChanges.subscribe(change => {
          this.credentials = false;
          this.validPass = false;
        });
        this.validPass = true;
      }
    }
  }

  facelogin() {
    this.loginMethod = "face";
    this.faceLoginForm.controls['image'].setValue(this.imageUrl);
    console.log("hhhhh",this.faceLoginForm.valid)
    if (this.faceLoginForm.valid) {
      this.loginService.faceLogin(this.faceLoginForm.value).subscribe(data => {
        localStorage.setItem('token', data.toString());
        this.router.navigate(['/dashboard']);
      }, error => {
        console.log(error.error.message);
        this.face = true;
      }
      );
      this.newFaceMessage();
    }
    else {
      console.log("not authenticated");
      if (this.faceLoginForm.get('studentname').value == null) {
        this.faceLoginForm.get('studentname').valueChanges.subscribe(change => {
          this.validStudentName = false;
        });
        this.validStudentName = true;
      }
      if (this.faceLoginForm.get('image').value == undefined) {
        this.faceLoginForm.get('image').valueChanges.subscribe(change => {
          this.validface = false;
        });
        this.validface = true;
      }
    }
  }


  newPassMessage() {
    console.log(this.loginForm.value.username, this.loginMethod)
    this.dataService.changeMessage(this.loginForm.value.username, this.loginMethod);
  }

  newFaceMessage() {
    console.log(this.faceLoginForm.value.studentname, this.loginMethod)
    this.dataService.changeMessage(this.faceLoginForm.value.studentname, this.loginMethod);
  }

  imageChanged(data) {
    this.imageUrl = data;
    this.ref.detectChanges();
    this.validface = false;
    this.face = false;
  }
  
}
