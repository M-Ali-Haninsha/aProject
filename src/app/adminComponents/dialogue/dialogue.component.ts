import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ServiceService } from 'src/app/services/service.service';

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
  constructor(private formbuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public editData:any, private service: ServiceService) {}

  ngOnInit(): void {
      this.userForm = this.formbuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })

      if(this.editData) {
        this.userActionTitle = 'Edit User'
        this.actionBtn = 'update'
        this.userForm.controls['firstname'].setValue(this.editData.firstName)
        this.userForm.controls['lastname'].setValue(this.editData.lastName)
        this.userForm.controls['email'].setValue(this.editData.email)
      }
  }


  addUser() {
    if(!this.editData){
      if(this.userForm.valid) {
         console.log(this.userForm.value);
      }
    } else {
      this.updateUser();
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      const userData = {
        id: this.editData.id,
        firstName: this.userForm.value.firstname,
        lastName: this.userForm.value.lastname,
        email: this.userForm.value.email
      };
  
      this.service.putUser(userData, userData.id).subscribe((value)=> {
        console.log(value);
        
      });
      //   (response:any) => {
      //     console.log(response);
      //     // Handle the response or perform any additional actions
      //   },
      //   (error) => {
      //     console.error('Failed to update user', error);
      //     // Handle the error appropriately
      //   }
      // );
    }
  }
}
