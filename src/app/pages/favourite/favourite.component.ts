import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Fact from 'src/app/models/Fact';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  public fact$: Observable<Fact[]>;

  constructor(private db: DbService) {
    this.fact$ = db.fact$;
  }

  ngOnInit(): void {
  }

  public deleteFact(id: string) {
    this.db.deleteFact(id);
  }

  public clearFacts() {
    this.db.clearFacts();
  }
}
