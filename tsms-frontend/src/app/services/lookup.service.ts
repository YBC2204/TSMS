import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupCategory } from '../models/models';

@Injectable({ providedIn: 'root' })
export class LookupService {
  private baseUrl = 'http://localhost:8080/api/lookups';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LookupCategory[]> {
    return this.http.get<LookupCategory[]>(this.baseUrl);
  }

  getByType(type: string): Observable<LookupCategory[]> {
    return this.http.get<LookupCategory[]>(`${this.baseUrl}/type/${type}`);
  }

  getAllByType(type: string): Observable<LookupCategory[]> {
    return this.http.get<LookupCategory[]>(`${this.baseUrl}/type/${type}/all`);
  }

  getById(id: number): Observable<LookupCategory> {
    return this.http.get<LookupCategory>(`${this.baseUrl}/${id}`);
  }

  create(lookup: LookupCategory): Observable<LookupCategory> {
    return this.http.post<LookupCategory>(this.baseUrl, lookup);
  }

  update(id: number, lookup: LookupCategory): Observable<LookupCategory> {
    return this.http.put<LookupCategory>(`${this.baseUrl}/${id}`, lookup);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
