import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import Fact from 'src/app/models/Fact';
import { FactApiService } from 'src/app/services/fact-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public fact$: Subject<Fact>;

  constructor(private factApi: FactApiService) {
    this.fact$ = factApi.factSubject$;
  }
  
  ngOnInit(): void {
    this.getToday();
  }

  public async updateFact() {
    this.factApi.getRandomFact();
  }

  public async getToday() {
    this.factApi.getToday();
  }
}
