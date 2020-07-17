const goalVals = require('./goalCards')

const dirtyVersion = process.env.VERSION === 'dirty'
const valuesData = {
  setA: [3, 4, 6, 7, 8, 9, 10, 12, 13],
  setB: [1, 2, 3, 5, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 13, 14, 15],
  setC: [1, 2, 4, 5, 5, 6, 7, 7, 8, 8, 9, 9, 10, 11, 11, 12, 14, 15]
}

let typesData

  typesData = {
    pools: valuesData.setA,
    bis: valuesData.setA,
    construction: valuesData.setA,
    fences: valuesData.setB,
    parks: valuesData.setC
  }
  const stonks = dirtyVersion ? 'stonks' : 'invest'
  typesData[stonks] = valuesData.setC

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

shuffleGoals: function (goalCards, advGame){
  const filtered = goalCards.filter(g => advGame || !g.adv)
  return shuffle(filtered)
},

createDeck: function(){
    const deck = []

    Object.keys(typesData).forEach(back => {
      typesData[back].forEach(front => {
        const version = dirtyVersion ? Math.floor(Math.random() * 3) + 1 : 'clean'
        deck.push({front, back, version})
      })
    })

    //return complete deck
    return shuffle(deck)
},
drawCards: function(d){
  return d.splice(0, 3)
},
chooseGoals: function(advGame = false){
  const goals = []

  const allGoals = [goalVals.n1,goalVals.n2,goalVals.n3]
  allGoals.forEach(n => {
    const shuffled = this.shuffleGoals(n,advGame)
    goals.push(shuffled[0])
  })

  return goals

},
}
