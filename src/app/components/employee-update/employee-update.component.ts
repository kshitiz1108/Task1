import { Component, Inject,OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ToasterService } from '../../service/toaster.service';
import { Employee } from '../../model/employee.model';
import { Store } from '@ngrx/store';
import { updateEmployee } from '../../store/actions/employee.action';


@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [MatButtonModule,MatDatepickerModule,MatDialogModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,JsonPipe],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent implements OnDestroy {

  Updateform !:FormGroup
  
  constructor (private http:HttpClient,private fb:FormBuilder,private matdialog : MatDialogRef<EmployeeUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private toasterservice:ToasterService,
private store :Store){

    this.forminst();

  }

  private submitsub: Subscription = new Subscription();
  private isSubmit = false;



  forminst(){
      this.Updateform = this.fb.group({
      name: [this.data.name ,Validators.required],
      email: [{value:this.data.email,disabled:true}, [Validators.required, Validators.email]],
      department: [this.data.department, Validators.required],
      dateOfJoining: [{value:this.data.dateOfJoining,disabled:true}, Validators.required],
      salary: [this.data.salary, [Validators.required, Validators.min(0)]]
      
    });
  }

  Updateddetails:any ;

  

  onSubmit(){

    if(this.Updateform.valid){

      this.isSubmit = true; 
      this.Updateddetails = this.Updateform.getRawValue();
      console.log(this.Updateddetails)
      this.submitsub = this.http.put(`http://localhost:3000/employees/${this.data.id}`,this.Updateddetails).subscribe((res:any) => {
        this.store.dispatch(updateEmployee.updateEmployeeSuccess({payload:res}))
        console.log(res);
      })

      this.matdialog.close(this.Updateddetails)
      this.toasterservice.onSuccess("Employee Details Updated Successfullt")
  
    }
  }

  onCancel(){
    if (!this.isSubmit) {
    this.matdialog.close();  // Close dialog without sending any data
  }
  }

  ngOnDestroy(): void {
    if(this.submitsub) this.submitsub.unsubscribe();
  }

}