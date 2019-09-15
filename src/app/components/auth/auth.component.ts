import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user: User = {username: '', password: ''};
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    console.log(this.user);
    this.authService
      .login(this.user)
      .subscribe(
        data => this.handleSuccess(data),
        error => this.handleError(error)
      );
  }

  handleSuccess(data) {
    console.log('Logged in', data);
    this.router.navigate(['admin']);
  }

  handleError(error) {
    console.error('Not logged in', error);
  }

}
