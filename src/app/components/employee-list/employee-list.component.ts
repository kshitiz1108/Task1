import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';
import { CurrencypipePipe } from '../../pipes/currencypipe.pipe';
import { ToasterService } from '../../service/toaster.service';
import { error } from 'console';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatMenuModule, MatIconModule,MatButtonModule,CurrencypipePipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit,OnDestroy {

  @Input() employeeList: any[] = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'dateOfJoining', 'salary', 'actions'];

  private empsubs : Subscription = new Subscription();
  private empupdate: Subscription = new Subscription();
  private empdel:Subscription = new Subscription();

  constructor(private http: HttpClient,private dialog: MatDialog, private snackBar: MatSnackBar,private employeeservice : EmployeeService,private toasterservice : ToasterService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.empsubs = this.employeeservice.getEmployees().subscribe((res:any) => {
      this.employeeList = res;
    })
  }

  onUpdate(employee: any) {
    console.log("Hello")
    const dialogRef = this.dialog.open(EmployeeUpdateComponent, {
      data: employee,
    });

    this.empupdate = dialogRef.afterClosed().subscribe((res:any) => {

      console.log(res);
      this.getAllEmployees();

    })

  }


  onDelete(id: number): void {
    console.log(`Delete was clicked for id :${id}`);
    const con = confirm("Are you sure you want to delete");
    if (con) {
      this.empdel = this.employeeservice.deleteEmployee(id).subscribe((res:any) => {
        console.log("Employee Deleted successfully");
        this.toasterservice.onSuccess("Employee Deleted Successfully")
        this.getAllEmployees();
      },
      (error) => {
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