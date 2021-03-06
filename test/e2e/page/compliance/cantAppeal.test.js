'use strict';

const content = require('steps/compliance/cant-appeal/content.en.json');
const paths = require('paths');

Feature('Can\'t appeal');

Before((I) => {
    I.createTheSession();
    I.amOnPage(paths.compliance.cantAppeal)
});

After((I) => {
    I.endTheSession();
});

Scenario('I exit the service after being told I cannot appeal', (I) => {

    I.click(content.govuk);
    I.amOnPage('https://www.gov.uk');

});
