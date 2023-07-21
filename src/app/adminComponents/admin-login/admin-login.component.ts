import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  passCheckErr: boolean = false
  wrongEmail: boolean = false
  formData!:any
  adminLoginForm!: FormGroup
  type: string = "password";

  isText:boolean = false
  eyeIcon: string = "fa-eye-slash"

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private route: Router) {
    if(localStorage.getItem('adminValue')) {
      this.route.navigate(['/adminHome'])
    }
  }

  ngOnInit(): void {
      this.adminLoginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
  }



  onSubmit() {
    if(this.adminLoginForm.valid) {
      this.formData= this.adminLoginForm.value;
      this.service.adminLogin(this.formData).subscribe((value:any)=>{
        console.log('login',value);
        if(value.msg == 'passwordWrong') {
          this.passCheckErr = true

        } else if(value.msg == 'wrongEmail') {
          this.wrongEmail = true
        } else {
          const strValue = JSON.stringify(value)
          localStorage.setItem('adminValue', strValue)
          this.route.navigate(['/adminHome'])

        }
      })
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }

}
