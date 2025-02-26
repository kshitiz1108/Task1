import { Component, NgModule,OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmployeeListComponent } from "../employee-list/employee-list.component";
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatListModule,
    EmployeeListComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  SearchText: string = '';
  buttonStyle = {
    'border-radius': '25px',
    'padding': '8px 20px',
    'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
    'background-color': '#4caf50',
    'transition': 'background-color 0.3s ease-in-out'
  };

  originalEmployeeList: any[] = [];
  filteredEmployeeList: any[] = [];

  currentUrl : string = '';



  constructor(private router: Router, private http: HttpClient,private current : ActivatedRoute,private employeeservice:EmployeeService) {
    console.log(this.current.snapshot.url.join('/'));
  }




  ngOnInit(): void {   
    this.router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        this.currentUrl = res.urlAfterRedirects; 
      }
    })
  
    this.getAllEmployees();
  }

  onButtonHover(isHovered: boolean) {
    this.buttonStyle['background-color'] = isHovered ? '#45a049' : '#4caf50';
  }

  employeeform() {

    this.router.navigate(['/employeeform']);
  }

  gohome() {
    this.router.navigate(['/']);
  }

  getAllEmployees() {
    this.employeeservice.getEmployees().subscribe((res: any) => {
      this.originalEmployeeList = res;
      this.filteredEmployeeList = [...this.originalEmployeeList]; 
      console.log("Employee List fetched:", this.originalEmployeeList);
    });
  }

  onSearch() {
    console.log(`text: ${this.SearchText}`);

    if (this.SearchText.trim()) {
      this.filteredEmployeeList = this.originalEmployeeList.filter((employee: any) => {
        return (
          employee.name.toLowerCase().includes(this.SearchText.toLowerCase()) ||
          employee.email.toLowerCase().includes(this.SearchText.toLowerCase())
        );
      });

      console.log("Filtered employee list:", this.filteredEmployeeList);
    } else {
      this.filteredEmployeeList = [...this.originalEmployeeList];
      console.log("reset to all employees:", this.filteredEmployeeList);
    }
  }

}
