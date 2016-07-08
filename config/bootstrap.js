const fixtures = require('../test/fixtures.json');

module.exports.bootstrap = cb => {
    Book.find({}).exec((err, posts) => {
        if (posts.length > 0) {
            return cb();
        }

        Book.create(fixtures).exec((err, created) => {
            if (err) {
                return cb(err);
            }

            cb();
        });
    });
};
