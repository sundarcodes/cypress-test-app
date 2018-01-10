import { BackendService } from './core/services/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 
  title = 'app';
  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.fetchAllReads();
  }
}
