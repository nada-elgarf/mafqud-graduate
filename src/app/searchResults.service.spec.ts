/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchResultsService } from './searchResults.service';

describe('Service: SearchResults', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchResultsService]
    });
  });

  it('should ...', inject([SearchResultsService], (service: SearchResultsService) => {
    expect(service).toBeTruthy();
  }));
});
