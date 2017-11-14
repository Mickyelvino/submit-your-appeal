'use strict';

const AppellantNINO = require('steps/identity/appellant-nino/AppellantNINO');
const { expect } = require('test/util/chai');
const paths = require('paths');
const answer = require('utils/answer');

describe.only('AppellantNINO.js', () => {

    let appellantNINOSut;

    beforeEach(() => {
        appellantNINOSut = new AppellantNINO();
        appellantNINOSut.journey = {
            Appointee: {}
        };
        appellantNINOSut.fields = {
            appointee: {}
        }
    });

    describe('get url()', () => {

        it('returns url /enter-appellant-nino', () => {
            expect(appellantNINOSut.url).to.equal('/enter-appellant-nino');
        });

    });

    describe('get isAppointee()', () => {

        it('should return true', () => {
            appellantNINOSut.fields.appointee.value = answer.YES;
            expect(appellantNINOSut.isAppointee).to.eq(true);
        });

        it('should return false', () => {
            appellantNINOSut.fields.appointee.value = answer.NO;
            expect(appellantNINOSut.isAppointee).to.eq(false);
        });

    });

});
