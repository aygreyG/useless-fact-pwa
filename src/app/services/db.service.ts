import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import Fact from '../models/Fact';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private readonly update$ = new Subject<void>();
  private db$: Observable<IDBDatabase>;

  constructor() {
    this.db$ = new Observable<IDBDatabase>((observer) => {
      const openRequest = indexedDB.open('factsDB');
      openRequest.onupgradeneeded = () => this.createDb(openRequest.result);
      openRequest.onsuccess = () => {
        observer.next(openRequest.result);
        observer.complete();
      };
    });
  }

  private createDb(db: IDBDatabase): void {
    db.createObjectStore('facts', { keyPath: 'id' });
    console.log('create db', db);
  }

  public async addFact(fact: Fact) {
    console.log(fact);
    this.db$.pipe(
      switchMap(
        (db) =>
          new Observable((observer) => {
            let transaction: IDBTransaction | null = db.transaction('facts', 'readwrite');
            transaction.objectStore('facts').add(fact);
            transaction.oncomplete = () => {
              transaction = null;
              this.update$.next();
              observer.complete();
            };
            return () => transaction?.abort();
          })
      )
    ).subscribe();
  }

  public deleteFact(id: string) {
    this.db$.pipe(
      switchMap(
        (db) =>
          new Observable((observer) => {
            let transaction: IDBTransaction | null = db.transaction('facts', 'readwrite');
            transaction.objectStore('facts').delete(id);
            transaction.oncomplete = () => {
              transaction = null;
              this.update$.next();
              observer.complete();
            };
            return () => transaction?.abort();
          })
      )
    ).subscribe();
  }

  public clearFacts(): void {
    this.db$.pipe(
      switchMap(
        (db) =>
          new Observable((observer) => {
            let transaction: IDBTransaction | null = db.transaction('facts', 'readwrite');
            transaction.objectStore('facts').clear();

            transaction.oncomplete = () => {
              transaction = null;
              this.update$.next();
              observer.complete();
            };
            return () => transaction?.abort();
          })
      )
    ).subscribe();
  }
}
