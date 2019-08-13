import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users = []
  confirmDelete: false;
  isExpanded: false;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(data => this.users = data)
  }

  deleteUser(user) {
    this.userService.deleteUser(user.id)
      .subscribe(() => { this.getUsers(); });
  }
}
