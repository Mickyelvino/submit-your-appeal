const { expect } = require('test/util/chai');
const {
    firstName,
    lastName,
    whitelist,
    niNumber,
    phoneNumber,
    internationalMobileNumber,
    postCode
} = require('utils/regex');

describe('validating a string', () => {

    it('should validate an address line', () => {
        const address = '45 Wharf Road';
        const stringValidator = address.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

});

describe('validating a postcode', () => {

    it('should validate a postcode in lowercase', () => {
        const postcodeString = 'sw1p 4df';
        const postcodeValidator = postcodeString.match(postCode);
        expect(postcodeValidator).to.not.equal(null);
    });

    it('should validate a postcode in uppercase', () => {
        const postcodeString = 'SW1P 4df';
        const postcodeValidator = postcodeString.match(postCode);
        expect(postcodeValidator).to.not.equal(null);
    });

    it('should validate a postcode with no spaces', () => {
        const postcodeString = 'WV112HE';
        const postcodeValidator = postcodeString.match(postCode);
        expect(postcodeValidator).to.not.equal(null);
    });

    it('should validate a postcode with spaces', () => {
        const postcodeString = 'WV11 2HE';
        const postcodeValidator = postcodeString.match(postCode);
        expect(postcodeValidator).to.not.equal(null);
    });

    it('should validate the large user postcode in uppercase', () => {
        const postcodeString = 'GIR 0AA';
        const postcodeValidator = postcodeString.match(postCode);
        expect(postcodeValidator).to.not.equal(null);
    });

    it('should validate the large user postcode in lowercase', () => {
        const postcodeString = 'gir 0aa';
        const postcodeValidator = postcodeString.match(postCode);
        expect(postcodeValidator).to.not.equal(null);
    });

    it('should not validate an invalid postcode', () => {
        const postcodeString = 'invalid postcode';
        const postcodeValidator = postcodeString.match(postCode);
        expect(postcodeValidator).to.equal(null);
    });

    it('should not validate a postcode with special a character at the beginning', () => {
        const postcodeString = '@Wv11 2HE';
        const postcodeValidator = postcodeString.match(postCode);
        expect(postcodeValidator).to.equal(null);
    });

});

describe('validating a first name regular expression', () => {

    it('should validate against a first name like "Sarah"', () => {
        const name = 'Sarah';
        const firstNameValidator = name.match(firstName);
        expect(firstNameValidator).to.not.equal(null);
    });

    it('should validate against a double-barrelled first name like "Sarah-jane"', () => {
        const name = 'Sarah-jane';
        const firstNameValidator = name.match(firstName);
        expect(firstNameValidator).to.not.equal(null);
    });

    it('should not validate against numbers "12345"', () => {
        const name = '12345';
        const firstNameValidator = name.match(firstName);
        expect(firstNameValidator).to.equal(null);
    });

    it('should not validate against special characters "!@£$%^&*<>/"', () => {
        const name = '!@£$%^&*<>/';
        const firstNameValidator = name.match(firstName);
        expect(firstNameValidator).to.equal(null);
    });

});

describe('validating a last name regular expression', () => {

    it('should validate against a last name like "Oliver"', () => {
        const name = 'Oliver';
        const lastNameValidator = name.match(lastName);
        expect(lastNameValidator).to.not.equal(null);
    });

    it('should validate against a double-barrelled last name like "Oliver-James"', () => {
        const name = 'Oliver-James';
        const lastNameValidator = name.match(lastName);
        expect(lastNameValidator).to.not.equal(null);
    });

    it('should validate against a number of last names like "Oliver James Brown"', () => {
        const name = 'Oliver James Brown';
        const lastNameValidator = name.match(lastName);
        expect(lastNameValidator).to.not.equal(null);
    });


    it('should not validate against numbers "12345"', () => {
        const name = '12345';
        const lastNameValidator = name.match(lastName);
        expect(lastNameValidator).to.equal(null);
    });

    it('should not validate against special characters "!@£$%^&*<>/"', () => {
        const name = '!@£$%^&*<>/';
        const lastNameValidator = name.match(lastName);
        expect(lastNameValidator).to.equal(null);
    });

});

describe('validating a National Insurance number', () => {

    let number;
    let niNumberValidator;

    it('should validate against a valid National Insurance number', () => {
        number = 'AB123456C';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.not.equal(null);
    });

    it('should validate against a valid National Insurance number with spaces', () => {
        number = 'AB 123 456 C';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.not.equal(null);
    });

    it('should validate against a valid National Insurance number with lowercase letters', () => {
        number = 'ab123456c';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.not.equal(null);
    });

    it('should not validate against a National Insurance number with BG prefix', () => {
        number = 'BG123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number with GB prefix', () => {
        number = 'GB123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number with KN prefix', () => {
        number = 'KN123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number with NK prefix', () => {
        number = 'NK123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number with NT prefix', () => {
        number = 'NT123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number with TN prefix', () => {
        number = 'TN123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number with ZZ prefix', () => {
        number = 'ZZ123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when O is the second letter of prefix', () => {
        number = 'SO123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when D is the first letter of prefix', () => {
        number = 'DA123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when D is the second letter of prefix', () => {
        number = 'AD123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when F is the first letter of prefix', () => {
        number = 'FA123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when F is the second letter of prefix', () => {
        number = 'AF123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when I is the first letter of prefix', () => {
        number = 'IA123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when I is the second letter of prefix', () => {
        number = 'AI123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when Q is the first letter of prefix', () => {
        number = 'QA123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when Q is the second letter of prefix', () => {
        number = 'AQ123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when U is the first letter of prefix', () => {
        number = 'UA123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when U is the second letter of prefix', () => {
        number = 'AU123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when V is the first letter of prefix', () => {
        number = 'VA123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

    it('should not validate against a National Insurance number when V is the second letter of prefix', () => {
        number = 'AV123456A';
        niNumberValidator = number.match(niNumber);
        expect(niNumberValidator).to.equal(null);
    });

});

describe('validating a telephone number', () => {

    it('should validate a phone number', () => {
        const number = '07422735993';
        const phoneNumberValidator = number.match(phoneNumber);
        expect(phoneNumberValidator).to.not.equal(null);
    });

});

describe('validating a international mobile number', () => {

    it('should validate against number starting with 07', () => {
        const number = '07332198765';
        const mobileNumberValidator = number.match(internationalMobileNumber);
        expect(mobileNumberValidator).to.not.equal(null);
    });

    it('should validate against number starting with + before country calling code', () => {
        const number = '+447332198765';
        const mobileNumberValidator = number.match(internationalMobileNumber);
        expect(mobileNumberValidator).to.not.equal(null);
    });

    it('should validate against number starting with 00 before country calling code', () => {
        const number = '00447332198765';
        const mobileNumberValidator = number.match(internationalMobileNumber);
        expect(mobileNumberValidator).to.not.equal(null);
    });

    it('should validate against number starting with (00) before country calling code', () => {
        const number = '(00)447332198765';
        const mobileNumberValidator = number.match(internationalMobileNumber);
        expect(mobileNumberValidator).to.not.equal(null);
    });

    it('should validate against number starting with (0044)', () => {
        const number = '(0044)7332198765';
        const mobileNumberValidator = number.match(internationalMobileNumber);
        expect(mobileNumberValidator).to.not.equal(null);
    });

    it('should not validate against number starting without 07 or + + or 00 or ()', () => {
        const number = '7332198765';
        const mobileNumberValidator = number.match(internationalMobileNumber);
        expect(mobileNumberValidator).to.equal(null);
    });

    it('should not validate against number starting with country code without + or 00 or ()', () => {
        const number = '447332198765';
        const mobileNumberValidator = number.match(internationalMobileNumber);
        expect(mobileNumberValidator).to.equal(null);
    });

});

describe('validating strings with special characters', () => {

    it('should validate a string that contains a forward slash', () => {
        const string = 'special/characters';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains a backwards slash', () => {
        const string = 'special\characters';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains an underscore', () => {
        const string = 'special_characters';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains square brackets', () => {
        const string = '[special characters]';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains a plus symbol', () => {
        const string = 'special+characters';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains a percentage symbol', () => {
        const string = 'special%characters';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains an ampersand', () => {
        const string = 'special&characters';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains a full stop', () => {
        const string = 'special characters.';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains double quotes', () => {
        const string = '"special characters"';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains single quotes', () => {
        const string = '\'special characters\'';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains a question mark', () => {
        const string = 'special characters?';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains an exclamation mark', () => {
        const string = 'special characters!';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains parentheses', () => {
        const string = 'special (characters)';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains a colon', () => {
        const string = 'special: characters';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

    it('should validate a string that contains a hyphen', () => {
        const string = 'special-characters';
        const stringValidator = string.match(whitelist);
        expect(stringValidator).to.not.equal(null);
    });

});
