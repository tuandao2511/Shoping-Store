import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/enum/Role';
import { UserResponse } from 'src/app/response/UserResponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  root = '/';
  currentUser: UserResponse;
  currentUserSubscription: Subscription;
  name: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserSubscription = this.userService.currentUserObservable.subscribe(user => {
       this.currentUser = user;
       this.name = user?.name;
       if(!user || user.role == Role.Customer) {
         this.root = '/'
       }
       // xu ly manager and employee
    })
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
