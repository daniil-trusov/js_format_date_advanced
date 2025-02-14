'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
const MONTH = 'MM';
const DAY = 'DD';
const YEAR_LONG = 'YYYY';
const YEAR_SHORT = 'YY';

const PREV_CENTURY_HALF = '19';
const CURR_CENTURY_HALF = '20';
const YEAR_CHECK = 30;

function formatDate(date, fromFormat, toFormat) {
  const dateObj = makeDateObject(date, fromFormat);
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    const toFormatPart = toFormat[i];
    let newPart;

    if (toFormatPart === DAY || toFormatPart === MONTH) {
      newPart = dateObj[toFormatPart];
    } else if (toFormatPart === YEAR_SHORT || toFormatPart === YEAR_LONG) {
      newPart = normalizeYear(dateObj[YEAR_SHORT], toFormatPart);
    }

    newDate.push(newPart);
  }

  return newDate.join(toFormat.slice(-1));
}

function makeDateObject(date, format) {
  const dateParts = date.split(format.slice(-1));
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    let part = format[i];

    if (part === YEAR_LONG) {
      part = YEAR_SHORT;
    }

    dateObj[part] = dateParts[i];
  }

  return dateObj;
}

function normalizeYear(year, formatYear) {
  const lengthDiff = year.length - formatYear.length;

  if (lengthDiff === 0) {
    return year;
  } else if (lengthDiff < 0) {
    return (year < YEAR_CHECK ? CURR_CENTURY_HALF : PREV_CENTURY_HALF) + year;
  } else {
    return year.slice(-2);
  }
}

/*
formatDate(
  '97/02/18',
  ['YY', 'MM', 'DD', '/'],
  ['DD', 'MM', 'YYYY', '.'],
*/

/*
function can change separator, reorder date parts,
         convert year from 4 to 2 digits and back
When convert from YYYY to YY just use 2 last digit (1997 -> 97)
When convert from YY to YYYY use 20YY if YY < 30 and 19YY otherwise
*/

module.exports = formatDate;
