import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { foundChildren } from './Models/foundChildren';
import { LostChildren } from './Models/lostChildren';

@Injectable({
  providedIn: 'root'
})
export class MafqudService {
  private apiUrlFoundPerson = 'https://missingpersonapi.runasp.net/api/FoundPerson';
  private apiUlrFoundById = 'https://missingperson.runasp.net/api/FoundPerson';
  private apiUrlDeteleChild = 'https://missingperson.runasp.net/api/FoundPerson';
  private apiUrlLostPerson = 'https://missingpersonapi.runasp.net/api/LostPerson';
  private apiUrlLostById = 'https://missingperson.runasp.net/api/LostPerson';
  private apiUrlDeleteChild = 'https://missingperson.runasp.net/api/LostPerson';
  private apiUrlSearchFoundByName = 'https://missingpersonapi.runasp.net/api/Search/SearchByNameForFound';
  private apiUrlSearchFoundByCity = 'https://missingpersonapi.runasp.net/api/Search/SearchByCityForFound';
  private apiUrlSearchFoundByImage = 'https://missingpersonapi.runasp.net/api/Search/SearchByImage';
  private apiUrlSearchLostByName = 'https://missingperson.runasp.net/api/Search/SearchByNameForLost';
  private apiUrlSearchLostByCity = 'https://missingperson.runasp.net/api/Search/SearchByCityForLost';

  constructor(private http: HttpClient) { }

  getAllChildrenFound(): Observable<foundChildren[]> {
    return this.http.get<foundChildren[]>(this.apiUrlFoundPerson);
  }

  getChildFoundById(id: any): Observable<foundChildren> {
    const url = `${this.apiUlrFoundById}/${id}`;
    return this.http.get<foundChildren>(url);
  }

  deleteFoundChildById(id: number): Observable<foundChildren> {
    const url = `${this.apiUrlDeteleChild}/${id}`;
    return this.http.delete<foundChildren>(url);
  }

  getAllLostChildren(): Observable<LostChildren[]> {
    return this.http.get<LostChildren[]>(this.apiUrlLostPerson);
  }

  getChildLostById(id: any): Observable<LostChildren> {
    const url = `${this.apiUrlLostById}/${id}`;
    return this.http.get<LostChildren>(url);
  }

  deleteLostChildById(id: number): Observable<LostChildren> {
    const url = `${this.apiUrlDeleteChild}/${id}`;
    return this.http.delete<LostChildren>(url);
  }

  searchByNameForFound(name: string): Observable<any> {
    return this.http.get<any>(this.apiUrlSearchFoundByName, { params: { name } });
  }

  searchByCityForFound(city: string): Observable<foundChildren[]> {
    return this.http.get<foundChildren[]>(this.apiUrlSearchFoundByCity, { params: { city } });
  }

  searchByImageForFound(formData: any): Observable<foundChildren[]> {
    return this.http.post<foundChildren[]>(this.apiUrlSearchFoundByImage, formData);
  }

  searchByNameForLost(name: string): Observable<any> {
    return this.http.get<any>(this.apiUrlSearchLostByName, { params: { name } });
  }

  searchByCityForLost(city: string): Observable<any> {
    return this.http.get<any>(this.apiUrlSearchLostByCity, { params: { city } });
  }
}
