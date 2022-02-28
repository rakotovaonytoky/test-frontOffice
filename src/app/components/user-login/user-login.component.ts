import { User } from './../../classes/user';
import { Component, OnInit } from '@angular/core';
import { LoginuserService } from 'src/app/service/loginuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user: User = new User();
  constructor(
    private loginuser: LoginuserService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }
  userLogin() {
    // console.log(this.user);
    this.loginuser.loginuser(this.user)
      .subscribe(
        data  => {
          // console.log(this.user.token)
          console.log(data);
          this.user = data;

          alert("login successfuly");
           localStorage.setItem("token",JSON.stringify(this.user.token));
          // window.sessionStorage.setItem("User", JSON.stringify(this.user));
          this.route.navigate(['/page']);
        }, error => alert("Login failed")
    )
  }

}
