import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Size } from '../common/interfaces/size.interface';
import { SharedConstants } from '../common/shared-constants';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  routeChange = new Subject<number>();
  updateChange = new Subject<void>();
  httpOptions = SharedConstants.httpOptions;

  private apiUrl = 'http://localhost:3000/sizes';

  constructor(private http: HttpClient) { }

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
