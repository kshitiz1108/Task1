import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { EmployeeService } from '../../service/employee.service';
import { EmployeeAction } from '../actions/employee.action';


@Injectable()
export class EmployeeEffects {

  constructor(private actions$ : Actions,private employeeService:EmployeeService){
  }

  loadEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeAction.loadEmployees),
      exhaustMap(() => {
        console.log('Employee load action triggered');
        return this.employeeService.getEmployees().pipe(
          map((employees) => {
            console.log('Employees fetched successfully:', employees); 
            return EmployeeAction.loadEmployeeSuccess({ payload: employees });
          }),
          catchError((error) => {
            console.error('Error loading employees:', error);
            return of(EmployeeAction.loadEmployeeFailure());
          })
        );
      })
    );
  });
  
}