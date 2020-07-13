import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { mergeAnalyzedFiles } from '@angular/compiler';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentname: any;
  username: any;
  grade1: any;
  grade2: any;
  message: any;

  constructor(private loginService: LoginService, private router: Router, private dataService: DataService) {

    if (localStorage.getItem('token') != null) {
      this.loginService.getUserName().subscribe((data) => {
        this.username = data;
      }, (error) => {
        this.router.navigate(['/login']);
      });
      this.loginService.getStudentName().subscribe((data) => {
        this.studentname = data;
      }, (error) => {
        this.router.navigate(['/login']);
      });
    } else {
      this.router.navigate(['/login']);
    }


  }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.message = message);
    console.log("message", this.message)
    if (this.message.split(",")[1] === "pass") {
      this.loginService.getGrade(this.message.split(",")[0]).subscribe((data: any) => {
        console.log("grade", data.grade);
        if (data.grade === 'Grade 1') {
          this.grade1 = true;
          this.grade2 = false;
        }
        if (data.grade === 'Grade 2') {
          this.grade1 = false;
          this.grade2 = true;
        }

      }, (error: any) => {

      });
    }
    if (this.message.split(",")[1] === "face") {
      this.loginService.getStudentGrade(this.message.split(",")[0]).subscribe((data: any) => {
        console.log("grade", data.grade);
        if (data.grade === 'Grade 1') {
          this.grade1 = true;
          this.grade2 = false;
        }
        if (data.grade === 'Grade 2') {
          this.grade1 = false;
          this.grade2 = true;
        }

      }, (error: any) => {

      });
    }

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
