import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user : any = {
    email : '',
    password: '',
    remembered: false
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignIn() {
    this.userService.login(this.user).subscribe(user => {
        this.router.navigateByUrl('/');
    });
  }

  fillLoginFields(u, p) {
    this.user.username = u;
    this.user.password = p;
    this.onSignIn();
  }
}
