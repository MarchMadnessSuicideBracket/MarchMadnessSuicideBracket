import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { DateDTO, Game, Picks, Tourney, TPlayer } from './interfaces/tourney';
import { CurrentUser, Player } from './interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class TourneyService {

  url = "http://marchmadnesssurvivorpool2-env.eba-smc268nu.us-east-2.elasticbeanstalk.com/api/v1";

  private httpOptions ={
    headers: new HttpHeaders().set("Authorization",<string> localStorage.getItem("JWT"))
  }

  constructor(private client: HttpClient ) {




   }


  getListOfTourneyByPlayerId(id: number): Observable<Tourney[]> {
    console.log(this.httpOptions)

    return this.client.get<Tourney[]>(this.url + "/players/tourney/" + id, this.httpOptions)
  }


  getSetOfTPlayerByPlayerId(id: number): Observable<TPlayer[]> {

    console.log(this.httpOptions)
    return this.client.get<TPlayer[]>(this.url + "/players/tps/" + id, this.httpOptions)
  }


  getTourneyByTouneyId(id: number): Observable<Tourney> {

    return this.client.get<Tourney>(this.url + "/tourney/"+id, this.httpOptions);
  }

  getListOfGamesByDate(date: DateDTO): Observable<Game[]>{

    return this.client.post<Game[]>(this.url +"/games/date",date,this.httpOptions)
  }

  createTourney(tourney: Tourney): Observable<Tourney>{

    return this.client.post<Tourney>(this.url + "/tourney", tourney,this.httpOptions)
  }

  addTPtoTourney( playerId: number,tourneyId: number): Observable<TPlayer>{

    let body = new TPlayer();
    body.alive = true;
    return this.client.post<TPlayer>(this.url +"/tp/"+playerId +"/tourney/"+tourneyId,body,this.httpOptions);
  }

  getUserByUsername(username: string): Observable<Player> {

    return this.client.get<Player>(this.url+"/players/username/"+ username,this.httpOptions);
  }

  makePicks(tPlayerId: number, teamId: number, gameId:number, gameDay:number): Observable<Picks> {
    let p:Picks = new Picks();
    p.winner = null;
    return this.client.post<Picks>(this.url+"/picks/" + tPlayerId + "/team/" + teamId + "/game/" + gameId +"/day/"+ gameDay,p, this.httpOptions);
  }

  getCurrentUser(token:string):Observable<Player>{
    const httpHeader = new HttpHeaders().set("Authorization",token);
    return this.client.get<Player>(this.url+"/players/currentUser", {headers:httpHeader})
  }


}
