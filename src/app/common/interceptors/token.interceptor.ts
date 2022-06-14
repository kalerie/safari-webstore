import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() {

    }

    intercept(req: HttpRequest<any>, res: HttpHandler): Observable<HttpEvent<any>> {
        const now = new Date();
        console.log( now.toUTCString(), req.url, req.method );  // inportant
        return res.handle(req);
    }
}