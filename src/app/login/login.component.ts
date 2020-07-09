import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  imageUrl: any;

  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute,private ref: ChangeDetectorRef) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

   }

  ngOnInit(): void {
  }

  isValid(controlName){
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }
  
  login(){
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value).subscribe(data => {
        console.log(data);
        localStorage.setItem('token', data.toString());
        this.router.navigate(['/dashboard'])
      },error => {}
      );
    }
  }

  imageChanged(data) {
    console.log(data)
    this.imageUrl = data;
    this.ref.detectChanges();
  }

}
