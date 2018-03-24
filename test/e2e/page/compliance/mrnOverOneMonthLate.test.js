'use strict';

const paths = require('paths');
const content = require('steps/compliance/mrn-over-month-late/content.en.json');

Feature('MRN Over one month late');

Before((I) => {
    I.createTheSession();
    I.amOnPage(paths.compliance.mrnOverMonthLate);
});

After((I) => {
    I.endTheSession();
});

Scenario('When I enter a reason for lateness and click continue, I am taken to the enter-appellant-name page', (I) => {

    I.fillField('#reasonForBeingLate', 'Late');
    I.click('Continue');
    I.seeInCurrentUrl(paths.identity.enterAppellantName);

});

Scenario('I have an MRN that is over one month late, I do not enter a reason why my appeal is late, I see errors', (I) => {

    I.click('Continue');
    I.seeCurrentUrlEquals(paths.compliance.mrnOverMonthLate);
    I.see(content.fields.reasonForBeingLate.error.required);

});
