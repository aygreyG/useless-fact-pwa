import { Injectable } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import Fact from '../models/Fact';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private readonly update$ = new Subject<void>();
  private db$: Observable<IDBDatabase>;
  public fact$: Observable<Fact[]>;

  constructor() {
    this.db$ = new Observable<IDBDatabase>((observer) => {
      const openRequest = indexedDB.open('factsDB');
      openRequest.onupgradeneeded = () => this.createDb(openRequest.result);
      openRequest.onsuccess = () => {
        observer.next(openRequest.result);
        observer.complete();
      };
    });

    this.fact$ = this.update$.pipe(
      startWith(undefined),
      switchMap(() =>
        this.db$.pipe(
          switchMap(
            (db) =>
              new Observable<Fact[]>((observer) => {
                let transaction: IDBTransaction | null =
                  db.transaction('facts');
                const request = transaction.objectStore('facts').getAll();
                transaction.oncomplete = () => {
                  transaction = null;
                  observer.next(request.result as Fact[]);
                  observer.complete();
                };
              })
          )
        )
      )
    );
  }

  private createDb(db: IDBDatabase): void {
    db.createObjectStore('facts', { keyPath: 'id' });
    console.log('create db', db);
  }

  public async addFact(fact: Fact) {
    this.db$
      .pipe(
        switchMap(
          (db) =>
            new Observable((observer) => {
              let transaction: IDBTransaction | null = db.transaction(
                'facts',
                'readwrite'
              );
              transaction.objectStore('facts').add(fact);
              transaction.oncomplete = () => {
                transaction = null;
                this.update$.next();
                observer.complete();
              };
              return () => transaction?.abort();
            })
        )
      )
      .subscribe();
  }

  public deleteFact(id: string) {
    this.db$
      .pipe(
        switchMap(
          (db) =>
            new Observable((observer) => {
              let transaction: IDBTransaction | null = db.transaction(
                'facts',
                'readwrite'
              );
              transaction.objectStore('facts').delete(id);
              transaction.oncomplete = () => {
                transaction = null;
                this.update$.next();
                observer.complete();
              };
              return () => transaction?.abort();
            })
        )
      )
      .subscribe();
  }

  public clearFacts(): void {
    this.db$
      .pipe(
        switchMap(
          (db) =>
            new Observable((observer) => {
              let transaction: IDBTransaction | null = db.transaction(
                'facts',
                'readwrite'
              );
              transaction.objectStore('facts').clear();

              transaction.oncomplete = () => {
                transaction = null;
                this.update$.next();
                observer.complete();
              };
              return () => transaction?.abort();
            })
        )
      )
      .subscribe();
  }
}
