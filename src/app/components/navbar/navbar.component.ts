import { GoodRead } from './../../core/models/good-read.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BackendService } from '../../core/services/backend.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public backendService: BackendService) { }
  // readCounter$: Observable<number>;

  ngOnInit() {
    // this.readCounter$ = this.backendService.allReads$
    //   .do(x => console.log(`Reading counter at ${Date.now()}`))
    //   .map((arr: GoodRead[]) => arr.filter(read => read.isRead).length);
  }

}
