import { expect } from 'chai';
import reducers from '../../src/reducers';
import { RECEIVE_BOOKS } from '../../src/actions';

const fixtures = require('../fixtures.json');

describe('book reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducers(undefined, {})
        ).to.deep.equal({
            book: {
                books: []
            },
            form: {}
        });
    });

    it('should handle RECEIVE_BOOKS', () => {
        const r =  reducers([], {
            type: RECEIVE_BOOKS,
            books: fixtures
        });

        expect(r).to.have.deep.property(`book.books`, fixtures);
        expect(r.book.books.length).to.be.equal(3);
        expect(r.book.receivedAt).to.be.a('date');
    });
});