import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  isLogout: boolean = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLogout = this.route.snapshot.queryParamMap.has('logout');
    console.log('isLogout ' + this.isLogout);
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
