const express = require('express')
const router = express.Router()
const deck = require('../cards.js')


const state = {
  action: 'blank',
  currentCards: [],
  currentDeck: [],
  players: [],
  starterDeck: [],
}

const getResponse = (action, player, players) => {

  state.action = action

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
    state.players.forEach((item, i) => {
      item.secondChances = deck.drawStarters(state.starterDeck);
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
          p.done = true
      }
    });

    const isDone = (player) => player.done;

    if(state.players.every(isDone)){
      state.currentCards = deck.drawCards(state.currentDeck);
      state.players.map(x => x.secondChances = []);
      state.players.map(x => x.done = false);
    }

  } else if (action == 'chance'){

    let chance = deck.drawStarters(state.currentDeck);
      state.players.find((p, i) => {
        if(p.name === player && p.secondChances.length === 0){
            p.secondChances = chance
        }
    });

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
