
const chai = require('chai')
const expect = chai.expect
const cards = require('../cards')
const goalCards = require('../goalCards')
describe('Cards Tests', () => {
 it('goals cards should be set', () => {
        const selectedGoals = cards.chooseGoals()
        expect(selectedGoals.length).to.equal(3)
        expect(selectedGoals[0].first).to.be.gte(6)
        expect(selectedGoals[0].first).to.be.lte(10)
        expect(selectedGoals[0].other).to.be.gte(3)
        expect(selectedGoals[0].other).to.be.lte(6)
    })
it('goals cards should have correct length', () => {
           const n1 = goalCards.n1
           const n2 = goalCards.n2
           const n3 = goalCards.n3
           const shuffledGoals1 = cards.shuffleGoals(n1)
           const shuffledGoals2 = cards.shuffleGoals(n2)
           const shuffledGoals3 = cards.shuffleGoals(n3)
           expect(shuffledGoals1.length).to.equal(6)
           expect(shuffledGoals2.length).to.equal(6)
           expect(shuffledGoals3.length).to.equal(6)
       })
it('goals cards should have correct length with advanced', () => {
           const n1 = goalCards.n1
           const n2 = goalCards.n2
           const n3 = goalCards.n3
           const shuffledGoals1 = cards.shuffleGoals(n1,true)
           const shuffledGoals2 = cards.shuffleGoals(n2,true)
           const shuffledGoals3 = cards.shuffleGoals(n3,true)
           expect(shuffledGoals1.length).to.equal(11)
           expect(shuffledGoals2.length).to.equal(11)
           expect(shuffledGoals3.length).to.equal(6)
       })
})