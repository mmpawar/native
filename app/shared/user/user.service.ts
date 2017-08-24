import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user";
import { Config } from "../config";

@Injectable()
export class UserService {
  constructor(private http: Http) {}


    login(user: User) {
      let headers = new Headers();
      let body = "username=" + user.email + "&password=" + user.password + "&grant_type=password";
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      //console.log("user before login");
      //console.log(Config.apiUrl + "Token");
      //console.dir(user);
      return this.http.post(
        Config.apiUrl + "token",
        body,
        { headers: headers }
      )
      .map(response => response.json())
      .do(data => {
        //console.dir(data);
        //console.log(data.access_token);
        Config.token = data.access_token;
      })
      .catch(this.handleErrors );
    }
  
  register(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "Users",
      JSON.stringify({
        Username: user.email,
        Password: user.password
      }),
      { headers: headers }
    )
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log("Error:");
    console.log(error);
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}