import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [
    // {
    //     path:'',
    //     component:EmployeeListComponent
    // },
    {
        path:"employeeform",
        component:EmployeeFormComponent
        
    }
];
