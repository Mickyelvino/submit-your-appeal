'use strict';

const { Question, goTo } = require('@hmcts/one-per-page');
const { form, textField } = require('@hmcts/one-per-page/forms');
const { benefitType } = require('utils/regex');
const Joi = require('joi');
const urls = require('urls');

class BenefitType extends Question {

    get url() {
        return urls.start.benefitType;
    }

    get form() {

        return form(

            textField('benefitType').joi(
                this.content.fields.benefitType.error.required,
                Joi.string().regex(benefitType).required()
            )
        );
    }

    next() {
        return goTo(this.journey.MRNDate);
    }
}

module.exports = BenefitType;
