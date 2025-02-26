import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { EmployeeFormComponent } from "./components/employee-form/employee-form.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    EmployeeListComponent,
    EmployeeFormComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employees';
}


