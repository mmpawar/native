import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Grocery } from "./grocery";

@Injectable()
export class GroceryListService {
  constructor(private http: Http) {}

  load() {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);
    console.log("before getschedule ");
    return this.http.get(Config.apiUrl 
        + "api/Db/GetSchedules?tournamentID=0&teamID=3", {
      headers: headers
    })
    .map(res => res.json())
    .map(data => {
      let groceryList = [];
      data.forEach((grocery) => {
        groceryList.push(new Grocery(
            grocery.MatchNumber,
            grocery.SchDate,
            grocery.DateScheduled,
            grocery.HomeTeamName,
            grocery.VS,
            grocery.VisitingTeamName,
            grocery.LocationName,
            grocery.UmpiringTeamName,
            grocery.HomeTeamID,
            grocery.VisitingTeamID,
            grocery.Overs,
            grocery.TournamentID,
            grocery.UmpiringTeamID,
            grocery.TournamentName,
            grocery.ScheduleID,
            grocery.MatchType,
            grocery.MatchTypeName,
            grocery.MatchTypeCode,
            grocery.LocationID,
            grocery.Week,
            grocery.PoolID,
            grocery.MatchName
        ));
      });
    //console.dir(groceryList);
     return groceryList;
    } )
    .catch(this.handleErrors);
  }

  add(grocery: Grocery) {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);
    headers.append("Content-Type", "application/json");
  
    return this.http.post(
      Config.apiUrl + "Groceries",
      JSON.stringify({ Grocery: grocery }),
      { headers: headers }
    )
    .map(res => res.json())
    .map(data => {
      //return new Grocery(data.Id, name);
      return null;
    })
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log("Error:");
    console.log(error);      
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}