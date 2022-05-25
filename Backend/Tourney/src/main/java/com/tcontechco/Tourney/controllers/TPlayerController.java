package com.tcontechco.Tourney.controllers;

import com.tcontechco.Tourney.models.Picks;
import com.tcontechco.Tourney.models.Player;
import com.tcontechco.Tourney.models.TPlayer;
import com.tcontechco.Tourney.models.Tourney;
import com.tcontechco.Tourney.services.PlayerService;
import com.tcontechco.Tourney.services.TourneyPlayerService;
import com.tcontechco.Tourney.services.TourneyService;
import com.tcontechco.Tourney.utils.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class TPlayerController {
    private final TourneyPlayerService service;
    private final PlayerService playerService;
    private final TourneyService tourneyService;

    @Autowired
    public TPlayerController(TourneyPlayerService service, PlayerService playerService, TourneyService tourneyService){
        this.service = service;
        this.playerService = playerService;
        this.tourneyService = tourneyService;
    }

    @CrossOrigin
    @GetMapping("/tp")
    public ResponseEntity<List<TPlayer>>  getAllTP(){return ResponseEntity.ok(service.getAllTourneyPlayers());}

    @CrossOrigin
    @GetMapping("/tp/tourney/{id}")
    public ResponseEntity<Set<TPlayer>> getTpByTourneyId(@PathVariable Integer id){
        return ResponseEntity.ok(service.getTPwithTourneyId(id));
    }

    @CrossOrigin
    @PostMapping("/tp/{id}/tourney/{tourneyId}")
    public ResponseEntity<TPlayer> createTP(@RequestBody TPlayer tp, @PathVariable Integer tourneyId,@PathVariable Integer id){
        Tourney tourney = tourneyService.getTourneyById(tourneyId);
        Set<TPlayer> set = tourney.getPlayers();
        Set<Integer> playersId = set.stream().map(tPlayer -> tPlayer.getPlayer().getPlayerId()).collect(Collectors.toSet());
        if (!playersId.contains(id)){
            Player p = playerService.getById(id);
            tp.setPlayer(p);
            tp.setTourney(tourney);

            tourney.getPlayers().add(tp);
            tourneyService.createOrSaveTourney(tourney);
            return ResponseEntity.ok(service.createTP(tp));
        }
        TPlayer nulls = new TPlayer();
        return ResponseEntity.status(403).body(nulls);
    }

//    @GetMapping("/tp/picks/{id}")
//    public ResponseEntity<List<Picks>> getPicksByTpId(@PathVariable Integer id){
//        return ResponseEntity.ok(service.picksByTPID(id));
//    }

    @CrossOrigin
    @GetMapping("/tp/kill/{id}")
    public ResponseEntity<TPlayer> killPlayerById(@PathVariable Integer id){
        TPlayer tp = service.findById(id);
        return ResponseEntity.ok(service.setTerminated(tp));
    }


}
