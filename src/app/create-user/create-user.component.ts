import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent implements OnInit {
  user: User = new User();

  showMsg: boolean = false

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    
    lastName: [''],
    
    email: ['', [Validators.required, Validators.pattern]]
  });
  
  constructor(
    private fb: FormBuilder,

    private userService: UserService,
    
    private route: Router
  ) { }

  ngOnInit() {
  }

  saveUser(): void {
    this.showMsg = true;

    this.userService
      .createUser(this.profileForm.value)
      
      .subscribe((data)=> {});
      
    this.profileForm.reset();
    
    this.route.navigate(['users']);
  }
  
  cancel(){
    this.route.navigate(['users'])
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    if (this.profileForm.dirty) {
      return window.confirm('Are you sure you want to discard your changes?')
    }
    
    return true;
  }
}
