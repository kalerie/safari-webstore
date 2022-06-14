import { HttpHeaders } from "@angular/common/http";

export class SharedConstants {
    public static httpOptions: object = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
}