import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { ServiceService } from 'src/app/services/service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import  UserModel  from '../../models/userModel';
import { deleteUser, fetchUsers } from '../../adminComponents/states/user.actions';
import { getUsers } from '../../adminComponents/states/user.selector';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  displayedColumns: string[] = ['id','firstName', 'lastName', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;
  delete: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialog: MatDialog, private service: ServiceService, private confirmService: NgConfirmService, private route: Router, private store: Store) {
    if(!localStorage.getItem('adminValue')){
      this.route.navigate(['/admin'])
    }

    this.dataSource = new MatTableDataSource<UserModel>();
  }

  ngOnInit(): void {
      this.store.dispatch(fetchUsers());
      this.store.pipe(select(getUsers)).subscribe((users) => {
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogueComponent, {
      width:'30%'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.getUser()
        // this.store.dispatch(fetchUsers());
      }
    });
  }

  getUser() {
    this.service.getUsers().subscribe((value)=>{
      this.dataSource = new MatTableDataSource(value.user)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }

  editUser(row: any) {
    const dialogRef = this.dialog.open(DialogueComponent, {
      width:'30%',
      data: row
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.store.dispatch(fetchUsers());
      }
      console.log(`Dialog result: ${result}`);
    });
  }



  deleteUser(userId:any) {

    this.confirmService.showConfirm("are you sure you want to delete ", 
    ()=>{
      // this.service.deleteUser(id).subscribe((value)=> {
      //   this.getUser()
      //   if(value == 'deleted') {
      //     this.delete = true
      //   }
      //   alert('user deleted')
      // })
      this.store.dispatch(deleteUser({ userId }));
    },
    ()=>{

    }
    )
  }

 

  adminSignout(){
    if(localStorage.getItem('adminValue')){
      localStorage.removeItem('adminValue')
      this.route.navigate(['/admin'])
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
