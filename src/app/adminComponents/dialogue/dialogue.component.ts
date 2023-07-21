import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ServiceService } from 'src/app/services/service.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {

  hide = true;
  userForm!:FormGroup
  actionBtn: string = 'save'
  userActionTitle: string = 'Add User'
  userExists: boolean = false
  updated:boolean = false

  constructor(private formbuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public editData:any, private service: ServiceService) {}

  ngOnInit(): void {
      this.userForm = this.formbuilder.group({
        firstName: ['', [Validators.required, Validators.maxLength(10)]],
        lastName: ['', [Validators.required, Validators.maxLength(10)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
      
      console.log(this.editData);
      

      if(this.editData) {
        this.userActionTitle = 'Edit User'
        this.actionBtn = 'update'
        this.userForm.controls['firstName'].setValue(this.editData.firstName)
        this.userForm.controls['lastName'].setValue(this.editData.lastName)
        this.userForm.controls['email'].setValue(this.editData.email)
        this.userForm.controls['password'].setValue(this.editData.password)
      }
  }



  addUser() {
    if(!this.editData){
      if(this.userForm.valid) {
         console.log(this.userForm.value);
         this.service.adminAddUser(this.userForm.value).subscribe((value:any)=>{this.userExists = value })
      }
    } else {
      this.updateUser();
    }
  }

  updateUser() {    
      this.service.putUser(this.userForm.value, this.editData._id).subscribe((value:any)=>{this.updated = value });
    }
  }