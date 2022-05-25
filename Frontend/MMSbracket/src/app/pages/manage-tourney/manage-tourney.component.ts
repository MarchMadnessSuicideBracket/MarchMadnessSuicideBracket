import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/interfaces/auth';
import { Tourney } from 'src/app/interfaces/tourney';
import { TourneyService } from 'src/app/tourney.service';

@Component({
  selector: 'app-manage-tourney',
  templateUrl: './manage-tourney.component.html',
  styleUrls: ['./manage-tourney.component.scss']
})
export class ManageTourneyComponent implements OnInit {

  tourneyId!:number;
  tourney!: Tourney;

  newPlayer: Player = new Player();

  constructor(private route: ActivatedRoute, private tService: TourneyService, private router: Router) { }

  ngOnInit(): void {

    this.getData();
  }




  addPlayer(): void {
    this.tService.getUserByUsername(this.newPlayer.username).subscribe(data => {
      this.newPlayer = data;
    },error=>console.log(error))


    setTimeout(()=> {
      console.log(this.newPlayer.playerId)
      console.log(this.tourneyId)
      this.tService.addTPtoTourney(this.newPlayer.playerId, this.tourneyId).subscribe(data => {
        console.log(data);
    
      }, error => {
        console.log(error)
        alert("Cannot find a user with that username.");
      }
      )
    }, 1000)

  }


  getData(){
    this.route.url.subscribe(data => {
      this.tourneyId = Number(data[2].path);
      console.log(this.tourneyId)
    })
    this.tService.getTourneyByTouneyId(this.tourneyId).subscribe(data =>{
      this.tourney = data;
      console.log(data)
    })
  }


  clickTourneyButton(){

    this.router.navigate(["home/tourney", this.tourneyId])

  }




}
