import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Size } from '../common/interfaces/size.interface';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  routeChange = new Subject<number>();
  updateChange = new Subject<void>();

  private apiUrl = 'http://localhost:3000/sizes';

  constructor(private http: HttpClient) { }

  getSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(this.apiUrl);
  }

  getSize(itemId: number): Observable<any> {
    return this.http.get<Size>(`${this.apiUrl}/${itemId}`)
  }

  addItem(item: Size): Observable<Size> {
    return this.http.post<Size>(this.apiUrl, item, httpOptions);
  }

  updateItem(item: Size, id:number): Observable<Size> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<Size>(url, item, httpOptions);
  }

  deleteItem(item: Size): Observable<Size> {
    const url = `${this.apiUrl}/${item.id}`;
    return this.http.delete<Size>(url);
  }

}
