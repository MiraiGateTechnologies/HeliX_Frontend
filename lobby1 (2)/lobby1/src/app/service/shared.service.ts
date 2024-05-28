import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconClickService {
    hideSideBar = new Subject<void>();

  constructor() { }
}
