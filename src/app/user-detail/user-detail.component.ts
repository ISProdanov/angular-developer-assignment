import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  user: User;
  private id: number;

  profileForm = this.fb.group({
    firstName: ['', Validators.required],

    lastName: [''],
    
    email: ['', [Validators.required, Validators.pattern]]
  });
  
  constructor(
    private fb:FormBuilder,

    private router: Router,

    private route: ActivatedRoute,

    private userService: UserService,
  ) {}

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.route.paramMap.subscribe( params => {
      this.id= +params.get('id');

      this.userService.getUser(this.id).subscribe(data => {
        this.user = data

        this.getUserForm(data)
      });         
    });
  }

  getUserForm(user) {
    this.profileForm.setValue({
      firstName: user.firstName,

      email: user.email,
      
      lastName: user.lastName,
    })
  }

  mapProfileFormValue() {
    this.user.firstName = this.profileForm.value.firstName;

    this.user.lastName = this.profileForm.value.lastName;

    this.user.email = this.profileForm.value.email;
  }
  
  saveUser(user: User): void {
    this.mapProfileFormValue();
    
    this.userService.updateUser(this.user).subscribe( data => data );

    this.router.navigate(['users']);
  }  

  cancel(){
    this.router.navigate(['users'])
  }

  @HostListener('window:beforeunload')
  canDeactivate() {
    if ( this.profileForm.dirty) {
      return window.confirm('Are you sure you want to discard your changes?')
    }
    
    return true;
  }
}
