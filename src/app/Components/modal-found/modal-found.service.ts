import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { foundChildren } from 'src/app/Models/foundChildren';

@Injectable({
  providedIn: 'root'
})
export class ModalFoundService {
   foundChildrenSource = new Subject<any>();
  foundChildren$ = this.foundChildrenSource.asObservable();

  constructor() {}

  addFoundChild(child: any) {
    this.foundChildrenSource.next(child);
  }
}
