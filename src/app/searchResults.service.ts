import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { foundChildren } from './Models/foundChildren';
import { LostChildren } from './Models/lostChildren';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  private foundResultsSource = new BehaviorSubject<foundChildren[] | null>(null);
  foundCurrentResults = this.foundResultsSource.asObservable();

  private lostResultsSource = new BehaviorSubject<LostChildren[] | null>(null);
  lostCurrentResults = this.lostResultsSource.asObservable();

  constructor() { }

  updateFoundResults(results: foundChildren[] | null) {
    this.foundResultsSource.next(results);
  }

  updateLostResults(results: LostChildren[] | null): void {
    this.lostResultsSource.next(results);
  }
}
