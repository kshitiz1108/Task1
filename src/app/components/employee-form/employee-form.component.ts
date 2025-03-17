import { Component,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Department } from '../../model/department.model';
import { Router } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { Subscribable, Subscription } from 'rxjs';
import { MatListSubheaderCssMatStyler } from '@angular/material/list';
import { ToasterService } from '../../service/toaster.service';
import { Store } from '@ngrx/store';
import { addEmployee } from '../../store/actions/employee.action';
import { v4 as uuidv4 } from 'uuid';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, JsonPipe,MatSelectModule,MatOptionModule,MatSliderModule,CurrencyPipe],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnDestroy{
  

  departmentlist : Department[] = []

  employeeform!: FormGroup;
  employeedetails!: Employee;

  constructor(public fb: FormBuilder,
    private http : HttpClient,
    private router : Router,
    private toasterservice:ToasterService,
    private store :Store) {
    this.forminst();
    this.getdepartments();
  }


  private deptsub: Subscription = new Subscription();
  private submitsub: Subscription = new Subscription();

  forminst() {
    this.employeeform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      salary: [1000, [Validators.required, Validators.min(0)]]
    });
  }


  getdepartments() {
    this.deptsub = this.http.get("http://localhost:3000/departments").subscribe((res:any) => {
      this.departmentlist = res;
      console.log(this.departmentlist[0].name)
    })
  }

  onSubmit() {
    if (this.employeeform.valid) {
      this.employeedetails = {
        ...this.employeeform.value,
        id:this.generateUniqueId()
      }
      console.log(this.employeedetails)
      this.submitsub = this.http.post("http://localhost:3000/employees",this.employeedetails).subscribe((res:any) => {
       
        console.log(res)
      },(error) => {
        this.store.dispatch(addEmployee.addEmployeeFailure());
        this.toasterservice.onError("Error in adding employee")
      })
      this.store.dispatch(addEmployee.addEmployeeSuccess({payload:this.employeedetails}))
      this.router.navigate(['/'])
      this.toasterservice.onSuccess("Employee Added Successfully")
      console.log('Form submitted:', this.employeedetails);
    } else {
      this.store.dispatch(addEmployee.addEmployeeFailure());
      console.log('Form is not valid');
    }
  }

  private generateUniqueId(): string {
    return uuidv4().split('-')[0]; 
  }

  ngOnDestroy(): void {

    if(this.deptsub) this.deptsub.unsubscribe();

    if(this.submitsub) this.submitsub.unsubscribe();

    console.log("ondestro is called");

  }

}
