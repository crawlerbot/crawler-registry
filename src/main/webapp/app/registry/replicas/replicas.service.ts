import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SimReplicasService {
    constructor(private http: HttpClient) {}

    findAll(): Observable<any> {
        return this.http.get('api/eureka/replicas').map((res: HttpResponse<any>) => res.body);
    }
}
