
const dirtyVersion = process.env.VERSION === 'dirty'

let gameCards = [
  '0000000000001000000000000',
  '0000000000001000000000000',
  '0000000000001000000000000',
  '0000000000001100000000000',
  '0000000000001100000000000',
  '0000000000001100000000000',
  '0000000100001100000000000',
  '0000000100001100000000000',
  '0000000100001100000000000',
  '0000000000011100000000000',
  '0000000000011100000000000',
  '0000000000011100000000000',
  '0000000100011000100000000',
  '0000000100001000010000100',
  '0000000100001000011000000',
  '0000000100001100010000000',
  '0000000110001100000000000',
  '0000001100010000110000000',
  '0000000100011100010000000',
  '0000001110001000010000000',
  '0000000110011100000000000',
  '0000000110011000100000000',
  '0000000000011110010000000',
  '0000001000010000111000000',
  '0000001110000110000000000',
  '0000000110001000110000000',
]


//https://github.com/Daplie/knuth-shuffle
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

module.exports = {
shuffleCards: function (){
  var clone = gameCards.slice(0);
  return shuffle(clone)
},
drawCards: function(d){
  return d.splice(0, 2)
},
// drawStarter: function(advGame = false){
//   const goals = []
//
//   const allGoals = [goalVals.n1,goalVals.n2,goalVals.n3]
//   allGoals.forEach(n => {
//     const shuffled = this.shuffleGoals(n,advGame)
//     goals.push(shuffled[0])
//   })
//
//   return goals
//
// },
}
