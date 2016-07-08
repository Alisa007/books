'use strict';

module.exports = {
    create(req, res) {
        const dirname = '../../.tmp/public/uploads';
        const body = req.body;
        const title = body.title;
        const pagesCount = body.pagesCount;
        const publisher = body.publisher;
        const publishedAt = body.publishedAt;
        const printedAt = body.printedAt;
        const isbn = body.isbn;
        const file = req.file('file');

        const authors = body.authors.split(',').map(author => {
            author = author.trim().split(' ');

            return {
                firstName: author[0],
                lastName: author[1]
            };
        });

        const createBook = cover => {
            Book.create({
                title, authors, pagesCount, publisher, publishedAt, printedAt, isbn,
                cover: cover || ''
            })
                .then(created => res.json(created))
                .catch(err => res.negotiate(err));
        };

        return file.upload({dirname}, (err, uploaded) => {
            if (err) {
                return res.negotiate(err);
            }

            if (!uploaded.length) {
                return createBook();
            }

            return createBook(uploaded[0].fd.match(/\/uploads\/[\w-.]+/));
        });
    }
};