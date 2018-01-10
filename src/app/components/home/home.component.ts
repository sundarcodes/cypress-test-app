import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BackendService } from './../../core/services/backend.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GoodRead } from '../../core/models/good-read.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subscriptions: Subscription;

  constructor(public backendService: BackendService, private router: Router) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
  }

  toggleItemRead(id: number, isRead: boolean) {
    this.subscriptions = this.backendService.markItem(id, isRead)
      .subscribe(() => {
        console.log(`Item marked as ${isRead ? 'read' : 'unread'}`);
      });
  }

  editItem(read: GoodRead) {
    this.router.navigate([`/edit/${read.id}`]);
  }

  deleteItem(id: number) {
    const subs = this.backendService.deleteItem(id)
      .subscribe(() => {
        console.log('Item Deleted successfully');
      });
    this.subscriptions.add(subs);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
