import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, mergeMap, Observable, of, Subject, switchMap, zip } from 'rxjs';
import { Product } from '../common/interfaces/product.interface';
import { HTTP_HEADERS } from '../common/constants/api-constants';
import { ProductsColors } from '../common/interfaces/products-colors.interface';
import { ColorService } from './color.service';
import { ProductsSizes } from '../common/interfaces/products-sizes.interface';
import { SizeService } from './size.service';

@Injectable({
    providedIn: 'root'
})

export class CardService {
    routeChange = new Subject<number>();
    updateChange = new Subject<void>();
    httpOptions = HTTP_HEADERS;

    private apiUrl = 'http://localhost:3000/products';
    private apiUrlProdColor = 'http://localhost:3000/productsColors';
    private apiUrlProdSize = 'http://localhost:3000/productsSizes';

    constructor(
        private http: HttpClient,
        private colorService: ColorService,
        private sizeService: SizeService
    ){  }

    getProductColorsByProductId(cardId: number) {
        return this.http.get<ProductsColors[]>(`${this.apiUrlProdColor}?productId=${cardId}`)
            .pipe(
                mergeMap((obj: ProductsColors[]) => {
                const ids = obj.map(obj => obj.colorId);
                if(ids.length > 0) {
                    return this.colorService.getColorsById(ids)
                } else {
                    return of([])
                  }
                
                })
            );
    }

    getProductSizesByProductId(cardId: number) {
        return this.http.get<ProductsSizes[]>(`${this.apiUrlProdSize}?productId=${cardId}`)
            .pipe(
                mergeMap((obj: ProductsSizes[]) => {
                const ids = obj.map(obj => obj.sizeId);
                if(ids.length > 0) {
                    return this.sizeService.getSizesById(ids)
                } else {
                    return of([])
                  }
                
                })
            );
    }

    setProductsColors(productColors: ProductsColors[], id: number) {
        return this.deleteProductColors(id)
            .pipe(
                switchMap((obj: any) => {
                    return forkJoin(productColors.map(el => this.createProductColor(el)))
                })
            )
    }

    setProductsSizes(productSizes: ProductsSizes[], id: number) {
        return this.deleteProductSizes(id)
            .pipe(
                switchMap((obj: any) => {
                    return forkJoin(productSizes.map(el => this.createProductSize(el)))
                })
            )
    }

    createProductColor(productColors: ProductsColors) {
        return this.http.post<ProductsColors>(this.apiUrlProdColor, productColors, this.httpOptions);
    }

    deleteProductColor(id: number) {
        const url = `${this.apiUrlProdColor}/${id}`;
        return this.http.delete<ProductsColors>(url);
    }

    deleteProductColors(productId: number) {
        return this.http.get<ProductsColors[]>(`${this.apiUrlProdColor}?productId=${productId}`)
            .pipe(
                switchMap((obj: ProductsColors[]) => {
                    if(obj.length) {
                        return forkJoin(obj.map(obj => this.deleteProductColor(obj.id as number)));
                    }
                    return of([]);
                }
            ))
    }

    createProductSize(productSizes: ProductsSizes) {
        return this.http.post<ProductsSizes>(this.apiUrlProdSize, productSizes, this.httpOptions);
    }

    deleteProductSize(id: number) {
        const url = `${this.apiUrlProdSize}/${id}`;
        return this.http.delete<ProductsSizes>(url);
    }

    deleteProductSizes(productId: number) {
        return this.http.get<ProductsSizes[]>(`${this.apiUrlProdSize}?productId=${productId}`)
            .pipe(
                switchMap((obj: ProductsSizes[]) => {
                    if(obj.length) {
                        return forkJoin(obj.map(obj => this.deleteProductSize(obj.id as number)));
                    }
                    return of([]);
                }
            ))
    }

    getCard(cardId: number): Observable<any> {
        return this.http.get<Product>(`${this.apiUrl}/${cardId}`)
    }
    
    getCards(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getClothesCards(params?: HttpParams): Observable<Product[]> {
        // const url = `${this.apiUrl}?type=clothes`;
        console.log(params, this.http.get<Product[]>(this.apiUrl, {params}), 'cardService');
        return this.http.get<Product[]>(this.apiUrl, {params});
    }

    getClothesCardsByCategory(category: string): Observable<Product[]> {
        const url = `${this.apiUrl}?category=${category}`;
        return this.http.get<Product[]>(url);
    }

    getShoesCards(): Observable<Product[]> {
        const url = `${this.apiUrl}?type=shoes`;
        return this.http.get<Product[]>(url);
    }

    getAccessoriesCards(): Observable<Product[]> {
        const url = `${this.apiUrl}?type=accessories`;
        return this.http.get<Product[]>(url);
    }

    addCard(card: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, card, this.httpOptions);
    }

    updateCard(card: Product, id:number): Observable<Product> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Product>(url, card, this.httpOptions);
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