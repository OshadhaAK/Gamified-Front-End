import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DataService } from '../services/data.service';
import { from } from 'rxjs';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
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

  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute, private dataService: DataService, private ref: ChangeDetectorRef) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    this.faceLoginForm = new FormGroup({
      studentname: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    });

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
      }
      );
      this.newPassMessage();
    }
  }

  facelogin(){
    this.loginMethod = "face";
    this.faceLoginForm.controls['image'].setValue(this.imageUrl);
    console.log(this.faceLoginForm.value);
    if(this.faceLoginForm.valid) {
      this.loginService.faceLogin(this.faceLoginForm.value).subscribe(data => {
        localStorage.setItem('token', data.toString());
        this.router.navigate(['/dashboard']);
      },error => {
        console.log("invalide login");
      }
      );
      this.newFaceMessage();
    }
  }


  newPassMessage() {
    console.log(this.loginForm.value.username,this.loginMethod)
    this.dataService.changeMessage(this.loginForm.value.username,this.loginMethod);
  }

  newFaceMessage() {
    console.log(this.faceLoginForm.value.studentname,this.loginMethod)
    this.dataService.changeMessage(this.faceLoginForm.value.studentname,this.loginMethod);
  }

  imageChanged(data) {
    this.imageUrl = data;
    this.ref.detectChanges();
  }
}
