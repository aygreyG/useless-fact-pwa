import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'kotprog';

  constructor(private update: SwUpdate, private router: Router) {}

  public ngOnInit(): void {
    this.checkUpdate();
  }

  public toggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  public navigate(sidenav: MatSidenav, url: string) {
    sidenav.close();
    this.router.navigate([url]);
  }

  private checkUpdate() {
    this.update.checkForUpdate().then((canUpdate) => {
      if (canUpdate) {
        alert('There is a new version available!');
        window.location.reload();
      }
    });
  }
}
