import { Injectable } from '@angular/core';
import { Department } from '../model/department';

@Injectable()
export class DepartmentService {

  _departmentList: Department[] = [];

  constructor() { }

  addDepartment(department: Department) {
    department.ID = this._departmentList.length + 1;
    this._departmentList.push(department);
  }

  editDepartment(department: Department) {
    const index = this._departmentList.findIndex(d => d.ID === department.ID);
    this._departmentList[index] = department;
  }

  deleteDepartment(id: number) {
    const department = this._departmentList.findIndex(d => d.ID === id);
    this._departmentList.splice(department, 1);
  }

  getAllDepartments() {
    return this._departmentList;
  }
}
