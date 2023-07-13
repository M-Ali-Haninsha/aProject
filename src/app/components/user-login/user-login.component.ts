import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ServiceService } from '../../services/service.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  type: string = "password";
  isText: boolean= false;
  eyeIcon: string = "fa-eye-slash"
  userLoginForm!: FormGroup;
  formData!:any
  passCheckErr:boolean = false
  wrongEmail: boolean = false

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private route: Router ) {}

  ngOnInit(): void {
      this.userLoginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }

  onSubmit() {
    if(this.userLoginForm.valid) {
      this.formData= this.userLoginForm.value;
      this.service.login(this.formData).subscribe((value:any)=>{
        console.log('login',value);
        if(value.msg == 'passwordWrong') {
          this.passCheckErr = true
        } else if(value.msg == 'wrongEmail') {
          this.wrongEmail = true
        } else {
          this.route.navigate(['/userHome'])
        }
      })
    }
  }

}
