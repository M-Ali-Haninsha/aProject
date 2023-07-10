import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import  validateForm  from '../../helpers/validateform';
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

  constructor(private formBuilder: FormBuilder) {}

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
      console.log(this.userLoginForm.value);
      
    } else {
      console.log("form is not filled");
      validateForm.validateAllFormFields(this.userLoginForm)
      alert('Form Is Invalid')
    }
  }

}
