import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Employee } from "../../model/employee.model";
import { act } from "@ngrx/effects";



export const EmployeeAction = createActionGroup({
    source:"Employee",
    events:{
        'Load Employees':emptyProps(),
        'Load Employee Success':props<{payload:Employee[]}>(),
        'Load Employee Failure':emptyProps()
    }
})

export const addEmployee = createActionGroup({
    source:"Employee",
    events:{
        'Add Employee Success': props<{payload:Employee}>(),
        'Add Employee Failure':emptyProps()
    }
})

export const deleteEmployee = createActionGroup({
    source:"Employee",
    events:{
        'Delete Employee Success':props<{id:string}>(),
        'Delete Employee Failure':emptyProps()
    }
})

export const updateEmployee = createActionGroup({
    source:"Employee",
    events:{
        'Update Employee Success':props<{payload:Employee}>(),
        'Update Employee Failure':emptyProps()
    }
})




// export const addEmployee = createAction(
//     '[Employee] Add',
//     props<{payload:Employee}>()
// )

// // export const addEmployees = createAction(
// //     '[Employees] Add',
// //     props<{payload:Employee[]}>()
// // )

// export const deleteEmployee = createAction(
//     "[Employee] Delete",
//     props<{id:string}>()
// )

// export const updateEmployee = createAction(
//     '[Employee] Update',
//     props<{payload:Employee}>()
// )