import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private successMsgSub: Subject<string> = new Subject<string>();

  constructor() { }

  sendSuccessMsg(message: string): void {
    this.successMsgSub.next(message);
  }

  getSuccessMsg(): Observable<string> {
    return this.successMsgSub.asObservable();
  }
}
