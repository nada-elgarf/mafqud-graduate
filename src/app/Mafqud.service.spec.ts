/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MafqudService } from './Mafqud.service';

describe('Service: Mafqud', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MafqudService]
    });
  });

  it('should ...', inject([MafqudService], (service: MafqudService) => {
    expect(service).toBeTruthy();
  }));
});
