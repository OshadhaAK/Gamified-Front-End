import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DataService } from '../services/data.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  message:any;

  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

   }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.message = message)
  }

  isValid(controlName){
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }
  
  login(){
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value).subscribe(data => {
        localStorage.setItem('token', data.toString());
        this.router.navigate(['/dashboard']);
        
      },error => {}
      );
      this.newMessage()
    }
  }

  

  newMessage(){
    this.dataService.changeMessage(this.loginForm.value.userName)
  }
}
