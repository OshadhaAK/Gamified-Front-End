import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName = '';
  constructor(private loginService: LoginService, private router: Router) {
    if(localStorage.getItem('token') != null){
      loginService.getUserName().subscribe(
        data => this.userName = data.toString(),
        error => this.router.navigate(['/login'])
      )
    }else{
      this.router.navigate(['/login']);
    }
   }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
