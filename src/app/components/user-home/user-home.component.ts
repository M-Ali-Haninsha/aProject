import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {

   userData: any

  constructor(private route:Router, private service: ServiceService){ 
    if(!localStorage.getItem('userValue')){
      
      this.route.navigate(['/'])
    }

  }

  ngOnInit(): void {
      this.showUser();
  }

  showUser() {
    this.service.userHomeData().subscribe((value)=>{
      this.userData = value.findvalue
    })
  }

  userSignout(){
    if(localStorage.getItem('userValue')){
      localStorage.removeItem('userValue')
      this.route.navigate(['/'])
    }
  }
}
