import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User
  isLogout: boolean = false;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { 
    this.user = new User();
  }

  ngOnInit(): void {
   
  }

  onSubmit() {
    this.userService.signUp(this.user).subscribe(u => {
      this.router.navigate(['/login']);
    }, e => {});
  }

}
