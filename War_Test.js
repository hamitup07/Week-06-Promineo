var expect = chai.expect;

describe('Deck Class', () => {
    describe('Constructor', () => {
        it('Should create deck of 52 cards', () => {
            let newDeck = new Deck();
            expect(newDeck.deck).to.have.lengthOf(52);
        })
    })
})
