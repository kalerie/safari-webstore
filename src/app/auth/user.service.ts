import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from '../common/interfaces/user.interface';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User | null> {
    const currentUser = localStorage.getItem('user');
    if(currentUser === null) {
      return of(null);
    } else {
      return this.http.get<User>(`${this.apiUrl}/${currentUser}`);
    }
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, httpOptions);
  }

  login(userCredentials: any) {
    return this.checkIfUserExist(userCredentials.email, userCredentials.password);
  }

  signout() {
    return localStorage.removeItem('user');
  }

  checkIfUserExist(email: string, password: string) {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(map((users: User[]) => {
        if(users.length > 0){
          this.setUserIdToLocalStorage(users[0]);
          return true;
        } else {
          return false;
        }
      }));
  }

  checkAuth(): boolean {
    return !!localStorage.getItem('user')
  }

  setUserIdToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user.id));
  }



//   addCard(card: Product): Observable<Product> {
//     return this.http.post<Product>(this.apiUrl, card, httpOptions);
// }
}
