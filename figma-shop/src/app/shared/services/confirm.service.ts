import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  public personFormIsFilled: boolean;

  constructor() { }
}
