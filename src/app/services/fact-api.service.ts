import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Fact from '../models/Fact';

@Injectable({
  providedIn: 'root',
})
export class FactApiService {
  public readonly factSubject$: Subject<Fact>;

  constructor() {
    this.factSubject$ = new Subject();
  }

  getRandomFact(): void {
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
      .then((res) => res.json())
      .then((data) => this.factSubject$.next(data))
      .catch((err) => console.error(err));
  }

  getToday(): void {
    fetch('https://uselessfacts.jsph.pl/today.json?language=en')
      .then((res) => res.json())
      .then((data) => this.factSubject$.next(data))
      .catch((err) => console.error(err));
  }
}
