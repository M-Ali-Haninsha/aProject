import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {

  hide = true;
  userForm!:FormGroup
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit(): void {
      this.userForm = this.formbuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
  }


  addUser() {
    console.log(this.userForm.value);
    
  }
}
