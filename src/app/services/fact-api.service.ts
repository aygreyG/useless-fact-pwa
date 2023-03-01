import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Fact from '../models/Fact';

@Injectable({
  providedIn: 'root',
})
export class FactApiService {
  public readonly factSubject$: Subject<Fact>;
  private ENDPOINT =
    'https://cors.gyergya.workers.dev/proxy/https://uselessfacts.jsph.pl/api/v2/facts';

  constructor() {
    this.factSubject$ = new Subject();
  }

  getRandomFact(): void {
    fetch(`${this.ENDPOINT}/random?language=en`)
      .then((res) => res.json())
      .then((data) => this.factSubject$.next(data))
      .catch((err) => console.error(err));
  }

  getToday(): void {
    fetch(`${this.ENDPOINT}/today?language=en`)
      .then((res) => res.json())
      .then((data) => this.factSubject$.next(data))
      .catch((err) => console.error(err));
  }
}
