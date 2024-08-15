import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LostChildren } from 'src/app/Models/lostChildren';

@Injectable({
  providedIn: 'root'
})
export class ModalLostService {

  private lostData = new Subject<LostChildren[]>();
  data = this.lostData.asObservable();

  constructor() { }

  sendFoundData(data: LostChildren[]) {
    this.lostData.next(data);
  }
}
