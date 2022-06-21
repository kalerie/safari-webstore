import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Size } from '../common/interfaces/size.interface';
import { HTTP_HEADERS } from '../common/constants/api-constant';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  routeChange = new Subject<number>();
  updateChange = new Subject<void>();
  httpOptions = HTTP_HEADERS;

  private apiUrl = 'http://localhost:3000/sizes';

  constructor(private http: HttpClient) { }

  getSizesById(ids:number[]): Observable<Size[]> {
    const query = ids.map(el => `id=${el}`);
    return this.http.get<Size[]>(`${this.apiUrl}?${query.join('&')}`);
  }

  getSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(this.apiUrl);
  }

  getSize(id: number): Observable<any> {
    return this.http.get<Size>(`${this.apiUrl}/${id}`)
  }

  addSize(size: Size): Observable<Size> {
    return this.http.post<Size>(this.apiUrl, size, this.httpOptions);
  }

  updateSize(id:number, size: Size): Observable<Size> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<Size>(url, size, this.httpOptions);
  }

  deleteSize(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
