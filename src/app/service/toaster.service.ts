// import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

// @Injectable({
//   providedIn: 'root'
// })
// export class ToasterService {

//   constructor(private toaster :ToastrService) { }

//   onSuccess(message:string):void{
//     this.toaster.success(message,'Success');
//   }

//   onError(message:string){
//     this.toaster.error(message);
//   }
// }

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackBar: MatSnackBar) {}

  onSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      panelClass: ['snackbar-success'], 
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  onError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error'], 
      horizontalPosition: 'right', 
      verticalPosition: 'bottom' 
    });
  }
}

