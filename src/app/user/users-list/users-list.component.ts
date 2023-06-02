import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, UserAPIList } from '../user.interfaces';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  constructor (private userService: UserService) {}

  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.
  userList: User[] = [];
  subscription: Subscription | undefined;

  usernameSortType: 'asc' | 'desc' = 'asc';
  firstnameSortType: 'asc' | 'desc' = 'asc';
  lastnameSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log("Starting Api call 'findall'.");
    this.loading = true;
    this.subscription = this.userService.findAll().subscribe({
      next: (apiData: UserAPIList) => {      // What I do with the data that I received.
        const {status, data} = apiData
        this.userList = data;
        console.log(status, data);
      },     
      error: (error) => {      // If an error occures.
        this.loading = false;
        console.log(error)
      },    
      complete: () => {
        this.loading = false;
        console.log("Api call completed with success.")
      },
    })
  }

  ngOnDestroy(): void {
  this.subscription?.unsubscribe();     // '?' if not undefined make unsubscribe.
  }

  toggleSort(key: string) {
    switch(key) {
      case 'username':
        this.usernameSortType = this.usernameSortType === 'asc' ? 'desc' : 'asc';
        this.userList = orderBy(this.userList, [key], [this.usernameSortType])
        break;
      case 'name':
        this.firstnameSortType = this.firstnameSortType === 'asc' ? 'desc' : 'asc';
        this.userList = orderBy(this.userList, [key], [this.firstnameSortType])
        break;
      case 'surname':
        this.lastnameSortType = this.lastnameSortType === 'asc' ? 'desc' : 'asc';
        this.userList = orderBy(this.userList, [key], [this.lastnameSortType])
        break;
      default:
        break;
    }
  }
}
