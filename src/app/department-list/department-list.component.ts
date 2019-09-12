import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DepartmentService } from '../service/department.service';
import { DepartmentComponent } from '../department/department.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  isPopupOpened = true;

  constructor(private dialog?: MatDialog,
    private _departmentService?: DepartmentService) { }

  ngOnInit() {
  }

  get DepartmentList() {
    return this._departmentService.getAllDepartments();
  }

  addDepartment() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(DepartmentComponent, {
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  editDepartment(id: number) {
    this.isPopupOpened = true;
    const department = this._departmentService.getAllDepartments().find(c => c.ID === id);
    const dialogRef = this.dialog.open(DepartmentComponent, {
      data: department
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  deleteDepartment(id: number) {
    this._departmentService.deleteDepartment(id);
  }
}
