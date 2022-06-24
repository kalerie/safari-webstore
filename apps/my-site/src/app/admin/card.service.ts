import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, mergeMap, Observable, of, Subject, switchMap, zip } from 'rxjs';
import { HTTP_HEADERS } from '../common/constants/api-constant';
import { ColorService } from './color.service';
import { SizeService } from './size.service';
import { Product } from '../common/interfaces/product.interface';
import { CreateProductDto, UpdateProductDto } from '@safari-store/api-interfaces';

@Injectable({
    providedIn: 'root'
})

export class CardService {
    routeChange = new Subject<string>();
    updateChange = new Subject<void>();
    httpOptions = HTTP_HEADERS;

    // private apiUrl = 'http://localhost:3000/products';
    private apiUrlProdColor = 'http://localhost:3000/productsColors';
    private apiUrlProdSize = 'http://localhost:3000/productsSizes';
    private apiUrl = 'http://localhost:3333/api/products';

    constructor(
        private http: HttpClient,
        private colorService: ColorService,
        private sizeService: SizeService
    ){  }

    // getProductColorsByProductId(cardId: number) {
    //     // var query = dbSchemas.SomeValue.find({}).select('name');
    //     return this.http.get<ProductsColors[]>(`${this.apiUrlProdColor}?productId=${cardId}`)
    //         .pipe(
    //             mergeMap((obj: ProductsColors[]) => {
    //             const ids = obj.map(obj => obj.colorId);
    //             if(ids.length > 0) {
    //                 return this.colorService.getColorsById(ids)
    //             } else {
    //                 return of([])
    //               }
                
    //             })
    //         );
    // }

    // getProductSizesByProductId(cardId: number) {
    //     return this.http.get<ProductsSizes[]>(`${this.apiUrlProdSize}?productId=${cardId}`)
    //         .pipe(
    //             mergeMap((obj: ProductsSizes[]) => {
    //             const ids = obj.map(obj => obj.sizeId);
    //             if(ids.length > 0) {
    //                 return this.sizeService.getSizesById(ids)
    //             } else {
    //                 return of([])
    //               }
                
    //             })
    //         );
    // }

    // setProductsColors(productColors: ProductsColors[], id: number) {
    //     return this.deleteProductColors(id)
    //         .pipe(
    //             switchMap((obj: any) => {
    //                 return forkJoin(productColors.map(el => this.createProductColor(el)))
    //             })
    //         )
    // }

    // setProductsSizes(productSizes: ProductsSizes[], id: number) {
    //     return this.deleteProductSizes(id)
    //         .pipe(
    //             switchMap((obj: any) => {
    //                 return forkJoin(productSizes.map(el => this.createProductSize(el)))
    //             })
    //         )
    // }

    // createProductColor(productColors: ProductsColors) {
    //     return this.http.post<ProductsColors>(this.apiUrlProdColor, productColors, this.httpOptions);
    // }

    // deleteProductColor(id: number) {
    //     const url = `${this.apiUrlProdColor}/${id}`;
    //     return this.http.delete<ProductsColors>(url);
    // }

    // deleteProductColors(productId: number) {
    //     return this.http.get<ProductsColors[]>(`${this.apiUrlProdColor}?productId=${productId}`)
    //         .pipe(
    //             switchMap((obj: ProductsColors[]) => {
    //                 if(obj.length) {
    //                     return forkJoin(obj.map(obj => this.deleteProductColor(obj.id as number)));
    //                 }
    //                 return of([]);
    //             }
    //         ))
    // }

    // createProductSize(productSizes: ProductsSizes) {
    //     return this.http.post<ProductsSizes>(this.apiUrlProdSize, productSizes, this.httpOptions);
    // }

    // deleteProductSize(id: number) {
    //     const url = `${this.apiUrlProdSize}/${id}`;
    //     return this.http.delete<ProductsSizes>(url);
    // }

    // deleteProductSizes(productId: number) {
    //     return this.http.get<ProductsSizes[]>(`${this.apiUrlProdSize}?productId=${productId}`)
    //         .pipe(
    //             switchMap((obj: ProductsSizes[]) => {
    //                 if(obj.length) {
    //                     return forkJoin(obj.map(obj => this.deleteProductSize(obj.id as number)));
    //                 }
    //                 return of([]);
    //             }
    //         ))
    // }

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