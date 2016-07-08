import request from 'supertest';
import sails from 'sails';

describe('BookController', () => {
    before(done => {
        sails.lift({}, () => {
            done();
        });
    });

    describe('#create()', () => {
        it('should return Book created with cover', done => {
            request(sails.hooks.http.app)
                .post('/book')
                .field('title', 'Red hood')
                .field('authors', 'Bill Johnson, Bob Thornton')
                .field('pagesCount', '376')
                .field('publisher', 'Willson Pearsons')
                .field('publishedAt', 1975)
                .field('printedAt', new Date().toISOString())
                .field('isbn', 1234567890123)
                .attach('file', './test/img.jpg')
                .expect(200, done);
        });

        it('should return Book created without cover', done => {
            request(sails.hooks.http.app)
                .post('/book')
                .field('title', 'Big Bad Wolf')
                .field('authors', 'Jack Johnson')
                .field('pagesCount', '123')
                .field('publisher', 'Willson Pearsons')
                .field('publishedAt', 2016)
                .field('printedAt', new Date().toISOString())
                .field('isbn', 1234567890)
                .expect(200, done);
        });
    });
});