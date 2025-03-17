import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/employees'; 

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    console.log('Making HTTP request for employees');
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
