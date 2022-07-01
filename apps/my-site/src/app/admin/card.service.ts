import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HTTP_HEADERS } from '../common/constants/api-constant';
import { ColorService } from './color.service';
import { SizeService } from './size.service';
import { CreateProductDto, Product, UpdateProductDto } from '@safari-store/api-interfaces';

@Injectable({
    providedIn: 'root'
})

export class CardService {
    routeChange = new Subject<string>();
    updateChange = new Subject<void>();
    httpOptions = HTTP_HEADERS;

    private apiUrl = 'http://localhost:3333/api/products';

    constructor(
        private http: HttpClient,
        private colorService: ColorService,
        private sizeService: SizeService
    ){  }

    getCard(cardId: string): Observable<any> {
        return this.http.get<Product>(`${this.apiUrl}/${cardId}`)
    }

    getCards(params?: HttpParams): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl, {params});
    }

    addCard(card: CreateProductDto): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, card, this.httpOptions);
    }

    updateCard(card: UpdateProductDto, id:string): Observable<Product> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Product>(url, card, this.httpOptions);
    }

    deleteCard(card:Product): Observable<Product> {
        const url = `${this.apiUrl}/${card._id}`;
        return this.http.delete<Product>(url);
    }

    getCardsById(ids: string[]): Observable<Product[]> {
        const query = ids.map(el => `id=${el}`);
        return this.http.get<Product[]>(`${this.apiUrl}?${query.join('&')}`);
    }

}
