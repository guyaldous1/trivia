const express = require('express')
const router = express.Router()
const deck = require('../cards.js')
const state = {
  action: 'blank',
  currentCards: [],
  currentDeck: [],
}

const getResponse = (action) => {
  state.action = action
  if(action == 'next'){
    state.currentCards = deck.drawCards(state.currentDeck);
  } else if (action == 'newGame') {
    state.currentDeck = deck.shuffleCards();
    console.log(state.currentDeck)
    state.currentCards = deck.drawCards(state.currentDeck);
  }
  return state
}

const responseAction = (req,res) => {

  const response = getResponse(req.body.action || 'state')

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
