import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginControlService {

  public showLoginFormSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showLoginForm$: Observable<boolean> = this.showLoginFormSubject.asObservable();

  constructor() {}

  toggleLoginForm(): void {
    const currentValue = this.showLoginFormSubject.value;
    this.showLoginFormSubject.next(!currentValue);
  }

  
}
