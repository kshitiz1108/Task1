import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';
import { defaultIfEmpty, Observable, Subscription } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';
import { CurrencypipePipe } from '../../pipes/currencypipe.pipe';
import { ToasterService } from '../../service/toaster.service';
import { DatePipe } from '../../pipes/date.pipe';
import { error } from 'console';
import { Employee } from '../../model/employee.model';
import { Store } from '@ngrx/store';
import { deleteEmployee, EmployeeAction, updateEmployee } from '../../store/actions/employee.action';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatMenuModule, MatIconModule,MatButtonModule,CurrencypipePipe,DatePipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit,OnDestroy {

  @Input() employeeList: any[] = [];
  
  EmployeeList$ = new Observable<Employee[]>;

  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'dateOfJoining', 'salary', 'actions'];

  private empsubs : Subscription = new Subscription();
  private empupdate: Subscription = new Subscription();
  private empdel:Subscription = new Subscription();

  constructor(private http: HttpClient,private dialog: MatDialog, private snackBar: MatSnackBar,private employeeservice : EmployeeService,private toasterservice : ToasterService,
    private store:Store<{employees:Employee[]}>
  ) {}

  ngOnInit(): void {
    // this.getAllEmployees();
    console.log("hello")
    this.store.dispatch(EmployeeAction.loadEmployees())
    this.EmployeeList$= this.store.select('employees').pipe(defaultIfEmpty([]));
  }

  getAllEmployees(): void {
    this.empsubs = this.employeeservice.getEmployees().subscribe((res:Employee[]) => {
      // this.employeeList = res;
      // this.store.dispatch(addEmployees({payload:res}))
      // this.EmployeeList$= this.store.select('employees').pipe(defaultIfEmpty([]));
      console.log(`THis is the state ${this.EmployeeList$}`)
    })
  }

  onUpdate(employee: Employee[]) {
    console.log("Hello")
    const dialogRef = this.dialog.open(EmployeeUpdateComponent, {
      data: employee,
    });

    this.empupdate = dialogRef.afterClosed().subscribe((res:Employee) => {
      // this.store.dispatch(updateEmployee({payload:res}))
      
      console.log(res);
      this.getAllEmployees();

    })

  }


  onDelete(id: string): void {
    console.log(`Delete was clicked for id :${id}`);
    const con = confirm("Are you sure you want to delete");
    if (con) {
      this.empdel = this.employeeservice.deleteEmployee(id).subscribe((res:any) => {
        console.log("Employee Deleted successfully");
        this.toasterservice.onSuccess("Employee Deleted Successfully")
        this.store.dispatch(deleteEmployee.deleteEmployeeSuccess({id}))
        this.getAllEmployees();
      },
      (error) => {
        this.store.dispatch(deleteEmployee.deleteEmployeeFailure())
        this.toasterservice.onError("Error in deleting the employee")
      }
    
    )
    }
  }


  ngOnDestroy(): void {

    if(this.empsubs) this.empsubs.unsubscribe()
    if(this.empupdate) this.empupdate.unsubscribe()

    if(this.empdel) this.empdel.unsubscribe();

  }


}

// class Employee {
//   id:number
//   name:string
//   email:string
//   department:string
//   dateOfJoining:string
//   salary:number

//   constructor(id:number,name:string,email:string,department:string,dateOfJoining:string,salary:number)
//     {
//     this.id = id;
//     this.name= name;
//     this.email=email;
//     this.department=department
//     this.dateOfJoining=dateOfJoining
//     this.salary=salary

//   }

// }


