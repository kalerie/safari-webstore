import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from '../common/interfaces/product.interface';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class CardService {
    routeChange = new Subject<number>();
    updateChange = new Subject<void>();
    private apiUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient){  }

    getCard(cardId: number): Observable<any> {
        return this.http.get<Product>(`${this.apiUrl}/${cardId}`)
    }
    
    getCards(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    addCard(card: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, card, httpOptions);
    }

    updateCard(card: Product, id:number): Observable<Product> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Product>(url, card, httpOptions);
    }

    deleteCard(card:Product): Observable<Product> {
        const url = `${this.apiUrl}/${card.id}`;
        return this.http.delete<Product>(url);
    }

    getCardsById(ids:number[]): Observable<Product[]> {
        const query = ids.map(el => `id=${el}`);
        return this.http.get<Product[]>(`${this.apiUrl}?${query.join('&')}`);
    }
    
}