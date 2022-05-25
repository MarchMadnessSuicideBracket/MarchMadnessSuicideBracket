import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CurrentUser, LoginDTO, Player } from 'src/app/interfaces/auth';

import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';
import { TourneyService } from 'src/app/tourney.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() login = new EventEmitter<boolean>();

  credentials: LoginDTO = new LoginDTO();

  jwt!:string;


  constructor(private auth: AuthService, private user:TourneyService) { }

  ngOnInit(): void {
  }

  logInToApp(){
    this.login.emit(true);
  }

  onSubmit(){
    this.auth.login(this.credentials).subscribe(data => {

        console.log(data)

        localStorage.setItem("JWT",  <string>data.headers.get("Authorization"));
        this.jwt = <string>data.headers.get("Authorization");
        console.log(localStorage.getItem("JWT"))











    })

setTimeout(()=>{
  this.user.getCurrentUser(this.jwt).subscribe(data =>{
    localStorage.setItem("username", data.username)
    localStorage.setItem("playerId", data.playerId.toString())
    localStorage.setItem("firstName", data.firstName)
    localStorage.setItem("lastName", data.lastName)
    localStorage.setItem("email", data.email)

    this.logInToApp();
  }, error => console.log(error))
},1200)

  }

}
