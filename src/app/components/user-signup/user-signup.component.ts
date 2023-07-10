import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import  validateForm  from '../../helpers/validateform';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  userSignupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
      this.userSignupForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
  }

  onSignup() {
    if(this.userSignupForm.valid) {
      console.log(this.userSignupForm.value);
    } else {
      validateForm.validateAllFormFields(this.userSignupForm)
      alert("Form is invalid")
    }
  }
}
