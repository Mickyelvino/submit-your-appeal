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

Scenario('When I enter a reason for lateness and click continue, I am taken to the no mrn page', (I) => {

    I.fillField('#MRNOverOneMonthLate_reasonForBeingLate', 'Late');
    I.click('input[type="submit"]');
    I.seeInCurrentUrl(paths.identity.areYouAnAppointee);

});

Scenario('When I click I don\'t have a good reason, I am taken to the cant appeal page', (I) => {

    I.click(content.noGoodReasonWhyLate);
    I.seeInCurrentUrl(paths.compliance.cantAppeal);

});

Scenario('I have an MRN that is over one month late, I do not enter a reason why my appeal is late, I see errors', (I) => {

    I.click('Continue');
    I.seeCurrentUrlEquals(paths.compliance.mrnOverMonthLate);
    I.see(content.fields.reasonForBeingLate.error.required);

});