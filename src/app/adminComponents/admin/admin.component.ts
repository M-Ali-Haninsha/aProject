import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { ServiceService } from 'src/app/services/service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



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


  constructor(public dialog: MatDialog, private service: ServiceService) {}

  ngOnInit(): void {
      this.getUser();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogueComponent, {
      width:'30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
    this.dialog.open(DialogueComponent, {
      width:'30%',
      data: row
    })
  }

  deleteUser(id:any) {
    this.service.deleteUser(id).subscribe((value)=> {
      if(value == 'deleted') {
        this.delete = true
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
