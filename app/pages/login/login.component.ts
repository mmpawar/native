import { Component, OnInit  } from "@angular/core";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";

@Component({
  selector: "my-app",
  providers: [UserService],  
  templateUrl: 'pages/login/login.html',
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent implements OnInit {
  user: User;
  email = "mahesh_pawar@hotmail.com";
  isLoggingIn = true;

  constructor(private router: Router
        , private userService: UserService
        , private page: Page) {
    this.user = new User();
    this.user.email = this.email;
    this.user.password = "mp6272";
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundColor = new Color("gray");

    //this.page.backgroundImage = "res://bg_login";
    
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
      //console.log("login successfull");
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService.login(this.user)
    .subscribe(
      () => this.router.navigate(["/list"]),
      (error) => alert("Unfortunately we could not find your account.")
    );
  }

  signUp() {
    this.userService.register(this.user)
    .subscribe(
      () => {
        alert("Your account was successfully created.");
        this.toggleDisplay();
      },
      () => alert("Unfortunately we were unable to create your account.")
    );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}