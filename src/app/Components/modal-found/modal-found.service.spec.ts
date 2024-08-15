/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalFoundService } from './modal-found.service';

describe('Service: ModalFound', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalFoundService]
    });
  });

  it('should ...', inject([ModalFoundService], (service: ModalFoundService) => {
    expect(service).toBeTruthy();
  }));
});
