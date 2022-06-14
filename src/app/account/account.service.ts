import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, mergeMap, Observable, of, switchMap, zip } from 'rxjs';
import { CardService } from '../admin/card.service';
import { User } from '../common/interfaces/user.interface';
import { UserService } from '../auth/user.service';
import { Favorit } from '../common/interfaces/favorit.interface';

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
  private apiUrlUsers = 'http://localhost:3000/users';

  constructor(private http: HttpClient,
    private cardService: CardService) { }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrlUsers}/${localStorage.getItem('user')}`);
  }

  updateProfile(user: User): Observable<User> {
    const url = `${this.apiUrlUsers}/${localStorage.getItem('user')}`;
    return this.http.put<User>(url, user, httpOptions)
  }

  addFavoriteItem(favorit: Favorit): Observable<Favorit> {
    return this.http.post<Favorit>(this.apiUrlFavorites, favorit, httpOptions);
  }

  getFavoritesByUserId() {
    return this.http.get<Favorit[]>(`${this.apiUrlFavorites}?userId=1`)
      .pipe(
        mergeMap((obj: Favorit[]) => {
          const ids = obj.map(obj => obj.productId);
          return zip(this.cardService.getCardsById(ids), of(obj))
        }),
        map(([prod, fav]) => {
          return fav.map(el => {
            el.product = prod.find(pr => pr.id === el.productId);
            return el;
          })})
      );
  }

  removeFavorite(id: number) {
    const url = `${this.apiUrlFavorites}/${id}`;
    return this.http.delete<Favorit>(url);
  }


}
