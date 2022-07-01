import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardService } from '../admin/card.service';
import { Product, User } from '@safari-store/api-interfaces';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentUser!: User | null;

  private apiUrlFavorites = 'http://localhost:3000/favorites';
  private apiUrlUsers = 'http://localhost:3333/api/users';
  private apiUrlCurrentUser = 'http://localhost:3333/api/auth/user-info';

  constructor(
    private http: HttpClient,
    private cardService: CardService
  ) { }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrlCurrentUser}`);
  }

  updateProfile(user: User): Observable<User> {
    const url = `${this.apiUrlUsers}/current`;
    return this.http.put<User>(url, user, httpOptions)
  }

  addFavoriteItem(id: string): Observable<void> {
    const url = `${this.apiUrlUsers}/current/favorites/${id}`;
    return this.http.put<void>(url, httpOptions);
  }

  getUserFavorites() {
    return this.http.get<Product[]>(`${this.apiUrlUsers}/current/favorites`);
  }

  removeFavorite(id: string): Observable<void> {
    const url = `${this.apiUrlUsers}/current/favorites/${id}`;
    return this.http.delete<void>(url);
  }


}
