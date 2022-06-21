import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Color } from '../common/interfaces/color.interface';
import { HTTP_HEADERS } from '../common/constants/api-constant';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  routeChange = new Subject<number>();
  updateChange = new Subject<void>();
  httpOptions = HTTP_HEADERS;

  private apiUrl = 'http://localhost:3000/colors';

  constructor(private http: HttpClient) { }

  getColorsById(ids:number[]): Observable<Color[]> {
    const query = ids.map(el => `id=${el}`);
    return this.http.get<Color[]>(`${this.apiUrl}?${query.join('&')}`);
  }

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.apiUrl);
  }

  getColor(id: number): Observable<Color> {
    return this.http.get<Color>(`${this.apiUrl}/${id}`)
  }

  addColor(color: Color): Observable<Color> {
    return this.http.post<Color>(this.apiUrl, color, this.httpOptions);
  }

  updateColor(id:number, color: Color): Observable<Color> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<Color>(url, color, this.httpOptions);
  }

  deleteColor(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
