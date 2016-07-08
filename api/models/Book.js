'use strict';

module.exports = {
    attributes: {
        title: {type: 'string', required: true, maxLength: 30},
        authors: {collection: 'author', required: true},
        pagesCount: {type: 'integer', required: true, min: 1, max: 10000},
        publisher: {type: 'string', maxLength: 30},

        publishedAt: {type: 'integer', required: true, min: 1800},
        printedAt: {type: 'string', required: true},
        isbn: { type: 'string', required: true},
        cover: {type: 'string'}
    }
};