import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse , HttpErrorResponse} from "@angular/common/http";
import { Admin, LoginDTO, Player, RegisterPlayer } from './interfaces/auth';
import { Observable, throwError} from "rxjs";
import { retry , catchError} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "https://marchmadnesssurvivorpool2-env.eba-smc268nu.us-east-2.elasticbeanstalk.com/api/v1";

  constructor(private client: HttpClient ) { }

  handleError(error: HttpErrorResponse) {
    if (error.status == 500 && error.url === "https://marchmadnesssurvivorpool2-env.eba-smc268nu.us-east-2.elasticbeanstalk.com/api/v1/login"){
      alert("Login Failed!");
      return throwError(() => error);
    } else {
      return throwError(() => error);
    }
  }

  login(cred: LoginDTO) {


    return this.client.post<any>(this.url +"/login", cred,{observe:"response"}).pipe();
  }


  register(newUser: RegisterPlayer): Observable<Player>{

    const headerOptions = new HttpHeaders();

    headerOptions.set("Content-Type", "application/json");
    return this.client.post<Player>(this.url + "/register", newUser, {headers: headerOptions});
  }


  admin(id: number): Observable<Admin> {
    const headerOptions = new HttpHeaders();
    headerOptions.set("Content-Type", "application/json")
    return this.client.post<Admin>(this.url + "/admin/" + id, null, {headers: headerOptions})
  }
}
