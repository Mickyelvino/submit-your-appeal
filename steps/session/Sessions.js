'use strict';

const { BaseStep } = require('@hmcts/one-per-page');
const urls = require('urls');

class Sessions extends BaseStep {

    get url() {
        return urls.session.sessions;
    }

    handler(req, res) {
        req.sessionStore.all((error, sessions) => {
            const indentTwoSpaces = 2;
            res.send(JSON.stringify(sessions, null, indentTwoSpaces));
        });
    }
}

module.exports = Sessions;
