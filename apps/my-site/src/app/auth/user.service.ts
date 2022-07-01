import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreateUserDto, LoginResultDto, LoginUserDto, User } from '@safari-store/api-interfaces';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiUrl = 'http://localhost:3000/users';
  private apiAuthUrl = 'http://localhost:3333/api/auth';
  // private apiUserUrl = 'http://localhost:3333/api/user';


  constructor(private http: HttpClient) { }

  register(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiAuthUrl}/register`, user, httpOptions);
  }

  getCurrentUser(): Observable<User | null> {
    const currentUser = localStorage.getItem('user');
    if(currentUser === null) {
      return of(null);
    } else {
      return this.http.get<User>(`${this.apiAuthUrl}/user-info`);
    }
  }

  login(user: LoginUserDto): Observable<LoginResultDto> {
    return this.http.post<LoginResultDto>(`${this.apiAuthUrl}/login`, user, httpOptions);
  }

  signout() {
    return localStorage.removeItem('user');
  }

  checkAuth(): boolean {
    return !!localStorage.getItem('user')
  }

  setUserIdToLocalStorage(token: any) {
    localStorage.setItem('user', token);
  }



//   addCard(card: Product): Observable<Product> {
//     return this.http.post<Product>(this.apiUrl, card, httpOptions);
// }
}
