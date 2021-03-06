'use strict';

const { Question, goTo } = require('@hmcts/one-per-page');
const { form, text } = require('@hmcts/one-per-page/forms');
const { answer } = require('@hmcts/one-per-page/checkYourAnswers');
const { postCode, whitelist, phoneNumber } = require('utils/regex');
const { formatMobileNumber } = require('utils/stringUtils');
const sections = require('steps/check-your-appeal/sections');
const Joi = require('joi');
const paths = require('paths');
const emailOptions = require('utils/emailOptions');
const userAnswer = require('utils/answer');

class AppellantContactDetails extends Question {

    static get path() {

        return paths.identity.enterAppellantContactDetails;
    }

    get CYAPhoneNumber() {

        return this.fields.phoneNumber.value ? formatMobileNumber(this.fields.phoneNumber.value) : userAnswer.NOT_PROVIDED;
    }

    get CYAEmailAddress() {

        return this.fields.emailAddress.value || userAnswer.NOT_PROVIDED;
    }

    get form() {

        const fields = this.content.fields;

        return form({

            addressLine1: text
                .joi(
                    fields.addressLine1.error.required,
                    Joi.string().regex(whitelist).required()
                ),
            addressLine2: text
                .joi(
                    fields.addressLine2.error.invalid,
                    Joi.string().regex(whitelist).allow('')
                ),
            townCity: text
                .joi(
                    fields.townCity.error.required,
                    Joi.string().regex(whitelist).required()
                ),
            county: text
                .joi(
                    fields.county.error.required,
                    Joi.string().regex(whitelist).required()
                ),
            postCode: text
                .joi(
                    fields.postCode.error.required,
                    Joi.string().trim().regex(postCode).required()
                ),
            phoneNumber: text
                .joi(
                    fields.phoneNumber.error.invalid,
                    Joi.string().regex(phoneNumber).allow('')
                ),
            emailAddress: text
                .joi(
                    fields.emailAddress.error.invalid,
                    Joi.string().trim().email(emailOptions).allow('')
                ),


        });
    }

    answers() {

        return [

            answer(this, {
                section: sections.appellantDetails,
                template: 'answer.html'
            })
        ];
    }

    values() {

        return {
            appellant: {
                contactDetails: {
                    addressLine1: this.fields.addressLine1.value,
                    addressLine2: this.fields.addressLine2.value,
                    townCity: this.fields.townCity.value,
                    county: this.fields.county.value,
                    postCode: this.fields.postCode.value,
                    phoneNumber: this.fields.phoneNumber.value,
                    emailAddress: this.fields.emailAddress.value,
                }
            }
        };
    }

    next() {

        return goTo(this.journey.steps.TextReminders);
    }
}

module.exports = AppellantContactDetails;
