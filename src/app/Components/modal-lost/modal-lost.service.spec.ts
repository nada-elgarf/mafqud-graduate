/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalLostService } from './modal-lost.service';

describe('Service: ModalLost', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalLostService]
    });
  });

  it('should ...', inject([ModalLostService], (service: ModalLostService) => {
    expect(service).toBeTruthy();
  }));
});
