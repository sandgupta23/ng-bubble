import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }
  static searchResultsFinish$ = new EventEmitter();
  static foldCodeInCodemirror$ = new EventEmitter<boolean>();

}
