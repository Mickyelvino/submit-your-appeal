const { includes } = require('lodash');
const moment = require('moment');
const mrnDateImage = require('steps/compliance/mrn-date/mrnDateOnImage');
const {long, short} = require('utils/months');

const months = long.concat(short);

class DateUtils {

    static isLessThanOrEqualToAMonth(mDate) {
        return moment().subtract(1, 'month').isSameOrBefore(mDate, 'day');
    }

    static isLessThanOrEqualToThirteenMonths(mDate) {
        return moment().subtract(13, 'month').isSameOrBefore(mDate, 'day');
    }

    static createMoment(day, month, year) {
        return moment(`${day}-${month}-${year}`, 'D-M-YYYY', true);
    }

    static oneDayShortOfAMonthAgo() {
        return moment().subtract(1, 'month').add(1, 'day');
    }

    static oneMonthAgo() {
        return moment().subtract(1, 'month');
    }

    static oneMonthAndOneDayAgo() {
        return moment().subtract(1, 'month').subtract(1, 'day');
    }

    static oneDayShortOfThirteenMonthsAgo() {
        return moment().subtract(13, 'month').add(1, 'day');
    }

    static thirteenMonthsAgo() {
        return moment().subtract(13, 'month');
    }

    static thirteenMonthsAndOneDayAgo() {
        return moment().subtract(13, 'month').subtract(1, 'day');
    }

    static isDateValid(date) {
        return date.isValid();
    }

    static isDateInPast(date) {
        const today = moment().startOf('day');
        return today.isAfter(date);
    }

    static mrnDateSameAsImage(date) {
        const imageDate = this.createMoment(mrnDateImage.day, mrnDateImage.month, mrnDateImage.year);
        return imageDate.isSame(date);
    }

    static isGreaterThanOrEqualToFourWeeks(date) {
        const dateFourWeeksLater = moment().add(4, 'weeks');
        return date.isSameOrAfter(dateFourWeeksLater, 'day');
    }

    static isLessThanOrEqualToTwentyTwoWeeks(date) {
        const dateTwentyTwoWeeksLater = moment().add(22, 'weeks');
        return date.isSameOrBefore(dateTwentyTwoWeeksLater, 'day');
    }

    static isDateOnTheWeekend(date) {
        return date.weekday() === 0 || date.weekday() === 6;
    }

    static getRandomWeekDayFromDate(date) {
        return date.clone().weekday(DateUtils.getRandomInt(1, 5));
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getMonthValue(date) {
        if (isNaN(date.month)) {
            const month = date.month.toLowerCase();
            return includes(months, month) ? moment(`${date.day} ${month} ${date.year}`, 'DD MMMM YY').month() + 1 : false;
        } else {
            return date.month;
        }

    }

}

module.exports = DateUtils;
