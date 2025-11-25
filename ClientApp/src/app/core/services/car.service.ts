import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    vin: string;
    mileage: number;
    description?: string;
    imageUrl?: string;
    isAvailable: boolean;
    pricePerDay: number;
    ownerId: string;
    createdAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private apiUrl = `${environment.apiUrl}/cars`;

    constructor(private http: HttpClient) { }

    getCars(isAvailable?: boolean): Observable<Car[]> {
        let params = new HttpParams();
        if (isAvailable !== undefined) {
            params = params.set('isAvailable', isAvailable);
        }
        return this.http.get<Car[]>(this.apiUrl, { params });
    }

    getCar(id: string): Observable<Car> {
        return this.http.get<Car>(`${this.apiUrl}/${id}`);
    }
}
