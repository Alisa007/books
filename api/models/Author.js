'use strict';

module.exports = {
    attributes: {
        firstName: {type: 'string', required: true, maxLength: 20},
        lastName: {type: 'string', required: true, maxLength: 20}
    }
};