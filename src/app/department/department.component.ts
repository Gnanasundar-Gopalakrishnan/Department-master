import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DepartmentService } from '../service/department.service';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  public _contactForm: FormGroup;
  DepartmentName = new FormControl();
  ServiceType =new FormControl();
  departments:string[]=['Ground','Cargo','Engineering','Inflight Operations','Flight Operations','Security','Catering','Medical'];
  services:string[]=['Customer Service','Ramp','Ground Support','Cabin Appearence','Cargo','Engineering','Inflight Operations','Flight Operations','Security','Catering','Medical'];
  filteredOptions: Observable<string[]>;
  filteredOptions2:Observable<string[]>;
  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<DepartmentComponent>,
  private _contactService: DepartmentService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit() {
    this._contactForm = this._formBuilder.group({
      ID: [this.data.ID],
      AirportType: [ this.data.AirportType, [Validators.required]],
      DepartmentName: [ this.data.DepartmentName, [Validators.required]],
      ServiceType: [ this.data.ServiceType, [Validators.required]],
      Skill: [ this.data.Skill , [Validators.required]],
    });

    this.filteredOptions=this.DepartmentName.valueChanges
    .pipe(
      startWith(''),
      map(value=>this._filter(value))
    );
    this.filteredOptions2=this.ServiceType.valueChanges
    .pipe(
      startWith(''),
      map(value=>this._filter2(value))
    );
  }

  private _filter(value: string): string[]{
    const filterValue=value.toLowerCase();

    return this.departments.filter(department=>department.toLowerCase().includes(filterValue));
  }

  private _filter2(value: string):string[]{
    const filterValue2=value.toLowerCase();

    return this.services.filter(service=>service.toLowerCase().includes(filterValue2))
  }

  onSubmit() {
    if (isNaN(this.data.ID)) {
      this._contactService.addDepartment(this._contactForm.value);
      this.dialogRef.close();
    } else {
      this._contactService.editDepartment(this._contactForm.value);
      this.dialogRef.close();
    }
  }

//  disabledCondition(){
//    if(this._contactForm.value==="")
//    {
//    return true;
//   }
//   if(this._contactForm.value!=""){
//     return false;
//   }
//  }

}
