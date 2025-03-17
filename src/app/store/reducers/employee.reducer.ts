import { createReducer, on } from "@ngrx/store"
import { Employee } from "../../model/employee.model"
import { addEmployee,  deleteEmployee,  EmployeeAction, updateEmployee, } from "../actions/employee.action"



const initialState:Employee[] = []


export const employeereducer = createReducer(
    initialState,
    // on(addEmployees, (state, action) => {
    //     const newEmployees = action.payload.filter(employee => 
    //       !state.some(existingEmployee => existingEmployee.id === employee.id)
    //     );
    
    //     return [
    //       ...state,
    //       ...newEmployees
    //     ];
    //   }),
    
      on(EmployeeAction.loadEmployeeSuccess,(state,action) => {
        return action.payload
      }),
      on(EmployeeAction.loadEmployeeFailure,(state,action) => {
        return []
      }),
      on(addEmployee.addEmployeeSuccess, (state, action) => {
        const newEmployee = action.payload;
        if (!state.some(existingEmployee => existingEmployee.id === newEmployee.id)) {
          return [...state, newEmployee];
        }
        return state; 
      }),
      on(addEmployee.addEmployeeFailure,(state,action) => {
        return state
      }),

      on(deleteEmployee.deleteEmployeeSuccess, (state,action) => {
        return state.filter(employee => employee.id !== action.id)
      }),
      on(deleteEmployee.deleteEmployeeFailure,(state,action) => {
        return state
      }),

      on(updateEmployee.updateEmployeeSuccess,(state,action) => {
        const updatedEmployee = action.payload;
        return state.map(employee => {
        if (employee.id === updatedEmployee.id) {
            return { ...updatedEmployee }; 
        }
        return employee;  
        });
      }),
      on(updateEmployee.updateEmployeeFailure,(state,action) => {
        return state
      })

)