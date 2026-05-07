import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/models';

@Injectable({ providedIn: 'root' })
export class StockService {
  private baseUrl = 'http://localhost:8080/api/stock';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.baseUrl);
  }

  getById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.baseUrl}/${id}`);
  }

  search(item: string): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}/search?item=${item}`);
  }

  getByBrand(brandId: number): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}/brand/${brandId}`);
  }

  getByStatus(status: string): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}/status/${status}`);
  }

  create(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.baseUrl, stock);
  }

  update(id: number, stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.baseUrl}/${id}`, stock);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
