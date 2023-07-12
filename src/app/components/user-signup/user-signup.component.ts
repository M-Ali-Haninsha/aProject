import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import userModel from '../../models/userModel'
import { ServiceService } from '../../services/service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  userSignupForm!: FormGroup;
  formData!:any
  userExists:boolean = false;

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private route: Router) {}

  ngOnInit(): void {
      this.userSignupForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      })
  }

  onSignup() {
    if(this.userSignupForm.valid) {
      this.formData= this.userSignupForm.value;
      this.service.addUser(this.formData).subscribe((value:any)=>{this.userExists = value
        this.route.navigate(['/'])
      })
      console.log('done');
    }
  }
}
