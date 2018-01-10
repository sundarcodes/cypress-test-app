import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import { GoodRead } from '../models/good-read.model';

@Injectable()
export class BackendService {
  baseAPIRURL = 'http://localhost:3000/api';
  private readsSubject: BehaviorSubject<GoodRead[]>;
  public allReads$: Observable<GoodRead[]>;
  public readsCounter$: Observable<number>;

  subs: Subscription;
  constructor(private http: HttpClient) {
    this.readsSubject = new BehaviorSubject([]);
    this.allReads$ = this.readsSubject.asObservable();
    this.readsCounter$ = this.allReads$.map((arr: GoodRead[]) => arr.filter(read => read.isRead).length);
  }

  fetchAllReads() {
    const url = `${this.baseAPIRURL}/index`;
    this.allReads$ = this.http.get<GoodRead[]>(url)
    .do(rsp => this.readsSubject.next(rsp));
  }

  getReadItem(id: number): GoodRead {
    return this.readsSubject.getValue().find(read => read.id === id);
  }

  addNewRead(read: GoodRead) {
    const url = `${this.baseAPIRURL}/create`
    return this.http.post<GoodRead>(url, read)
      .do(rsp => {
        const allReads = this.readsSubject.getValue();
        allReads.push(rsp);
        this.readsSubject.next(allReads);
      });
  }

  markItem(id: number, isRead: boolean) {
    const url = `${this.baseAPIRURL}/update/${id}`;
    return this.http.patch<GoodRead>(url, {
      isRead
    })
      .do(rsp => {
        const allReads = this.readsSubject.getValue();
        const itemToBeUpdated = allReads.find(read => read.id === id);
        itemToBeUpdated.isRead = isRead;
        this.readsSubject.next(allReads);
      })
  }

  deleteItem(id: number) {
    const url = `${this.baseAPIRURL}/delete/${id}`;
    return this.http.delete(url)
      .do(rsp => {
        const allReads = this.readsSubject.getValue();
        const indexToBeDeleted = allReads.findIndex((read) => read.id === id);
        allReads.splice(indexToBeDeleted, 1);
        this.readsSubject.next(allReads);
      })
  }

  editItem(read: GoodRead) {
    const url = `${this.baseAPIRURL}/update`;
    // Taking a copy here as updating in the original object
    // would lead to inconsistencies in behavior in case of any error response from the server
    // 
    const readCopy = Object.assign({}, read);
    return this.http.put<GoodRead>(url, readCopy)
      .do(rsp => {
        // Replace the outdated item in the readlist with the updated one
        const allReads = this.readsSubject.getValue();
        const indexToReplace = allReads.findIndex((item) => item.id === read.id);
        allReads[indexToReplace] = rsp;
        this.readsSubject.next(allReads);
      })
  }

}
