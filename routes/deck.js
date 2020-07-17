const express = require('express')
const router = express.Router()
const deck = require('../cards.js')

const isDone = (player) => player.done || player.rip;

function checkNext(){
  if(state.players.every(isDone)){
    state.currentCards = deck.drawCards(state.currentDeck);
    state.players = state.players.filter(p => !p.rip);
    state.players.map(x => x.secondChances = []);
    state.players.map(x => x.done = false);
    state.players.map(x => x.starters = false);
    state.next = true
  }
}


const state = {
  action: 'blank',
  currentCards: [],
  currentDeck: [],
  players: [],
  starterDeck: [],
}

const getResponse = (action, player, players) => {

  state.action = action
  state.next = false


  if(action == 'next'){

    state.currentCards = deck.drawCards(state.currentDeck);
    state.players.map(x => x.secondChances = []);

  } else if (action == 'newGame') {

    playerArr = JSON.parse(players)

    let playerMap = []

    playerArr.forEach(function(item, i){
      playerMap.push({
        name: item
      })
    })

    state.players = playerMap;

    state.currentDeck = deck.shuffleCards();
    state.starterDeck = deck.shuffleStarters();
    state.currentCards = []
    state.players.forEach((item, i) => {
      item.secondChances = deck.drawStarters(state.starterDeck);
      item.starters = true
    });

  } else if (action == 'starter') {

    let starter = deck.drawStarters(state.starterDeck);
    state.players.find((p, i) => {
      if(p.name === player){
          p.starter = starter
      }
    });

  } else if (action == 'done') {

    state.players.find((p, i) => {
      if(p.name === player){
          p.done = !p.done
      }
    });

    checkNext()

  } else if (action == 'chance'){

    let chance = deck.drawStarters(state.currentDeck);
      state.players.find((p, i) => {
        if(p.name === player && p.secondChances.length === 0){
            p.secondChances = chance
        }
    });

  } else if (action == 'rip'){
    state.players.find((p, i) => {
        if(p.name === player){
            p.rip = !p.rip
        }
    });

    checkNext()

  }


  return state
}

const responseAction = (req,res) => {

  const response = getResponse(req.body.action || 'state', req.body.player, req.body.players)
  // console.log(req.body);


  if(response === undefined)
    res.sendStatus(500)

  res.sendStatus(200)
  return response

}

const routes = (io) => {
  /* GET home page. */
  router.post('/', (req,res) => {
    const response = responseAction(req,res)
    io.emit('data', response)
  })

  io.on('connection', () =>{
    const req = {body: {action: 'state'}}
    const res = { sendStatus : (code) => {
      console.log('a new connection, status: ' + code)
    }}
    const response = responseAction(req,res)
    io.emit('newClient', response)
  })

  return router
}

module.exports = routes
