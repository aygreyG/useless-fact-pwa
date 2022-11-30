import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import Fact from '../models/Fact';

@Injectable({
  providedIn: 'root'
})
export class FactApiService {

  constructor() { }

  getRandomFact(): Observable<Fact> {
    return from(
      fetch('https://uselessfacts.jsph.pl/random.json?language=en')
    ).pipe(
      switchMap(res => res.json())
    );
  }

  getToday(): Observable<Fact> {
    return from(
      fetch('https://uselessfacts.jsph.pl/today.json?language=en')
    ).pipe(
      switchMap(res => res.json())
    );
  }
}
