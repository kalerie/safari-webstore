import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Color } from '../common/interfaces/color.interface';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  routeChange = new Subject<number>();
  updateChange = new Subject<void>();

  private apiUrl = 'http://localhost:3000/colors';

  constructor(private http: HttpClient) { }

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.apiUrl);
  }

  getColor(itemId: number): Observable<any> {
    return this.http.get<Color>(`${this.apiUrl}/${itemId}`)
  }

  addItem(item: Color): Observable<Color> {
    return this.http.post<Color>(this.apiUrl, item, httpOptions);
  }

  updateItem(item: Color, id:number): Observable<Color> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<Color>(url, item, httpOptions);
  }

  deleteItem(item: Color): Observable<Color> {
    const url = `${this.apiUrl}/${item.id}`;
    return this.http.delete<Color>(url);
  }

}
