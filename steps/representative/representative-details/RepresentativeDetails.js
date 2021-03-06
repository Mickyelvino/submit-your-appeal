'use strict';

const { Question, goTo } = require('@hmcts/one-per-page');
const { form, text, object } = require('@hmcts/one-per-page/forms');
const { answer } = require('@hmcts/one-per-page/checkYourAnswers');
const { errorFor } = require('@hmcts/one-per-page/src/forms/validator');
const { postCode, firstName, lastName, whitelist, phoneNumber } = require('utils/regex');
const { formatMobileNumber } = require('utils/stringUtils');
const { joiValidation } = require('utils/validationUtils');
const sections = require('steps/check-your-appeal/sections');
const Joi = require('joi');
const paths = require('paths');
const emailOptions = require('utils/emailOptions');
const userAnswer = require('utils/answer');

class RepresentativeDetails extends Question {

    static get path() {

        return paths.representative.representativeDetails;
    }

    get CYAName() {

        const firstName = this.fields.name.first.value || '';
        const lastName = this.fields.name.last.value || '';
        return firstName === '' && lastName === '' ? userAnswer.NOT_PROVIDED : `${firstName} ${lastName}`.trim();
    }

    get CYAOrganisation() {

        return this.fields.name.organisation.value || userAnswer.NOT_PROVIDED;
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

            name: object({
                first: text,
                last: text,
                organisation: text
            }).check(
                fields.name.error.required,
                value => Object.keys(value).length > 0
            ).check(
                errorFor('first', fields.name.first.error.invalid),
                value => joiValidation(value.first, Joi.string().trim().regex(firstName))
            ).check(
                errorFor('last', fields.name.last.error.invalid),
                value => joiValidation(value.last, Joi.string().trim().regex(lastName))
            ).check(
                errorFor('organisation', fields.name.organisation.error.invalid),
                value => joiValidation(value.organisation,  Joi.string().regex(whitelist))
            ),
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
            emailAddress: text
                .joi(
                    fields.emailAddress.error.invalid,
                    Joi.string().trim().email(emailOptions).allow('')
                ),
            phoneNumber: text
                .joi(
                    fields.phoneNumber.error.invalid,
                    Joi.string().regex(phoneNumber).allow('')
                )
        });
    }

    answers() {

        return [

            answer(this, {
                section: sections.representative,
                template: 'answer.html'
            })
        ];
    }

    values() {

        return {
            representative: {
                firstName: this.fields.name.first.value,
                lastName: this.fields.name.last.value,
                organisation: this.fields.name.organisation.value,
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
        }
    }

    next() {

        return goTo(this.journey.steps.ReasonForAppealing);
    }
}

module.exports = RepresentativeDetails;
