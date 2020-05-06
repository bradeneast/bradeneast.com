export function formatDate(date: Date, format = 'Mon Jan 01 2020') {

    format = format.trim().toLowerCase();

    const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const matchSeparators = /[.\-/ ]/g;

    let result = [];
    let dateParsed = false;
    let monthParsed = false;
    let separators = format.match(matchSeparators);

    format.split(matchSeparators).map((part, index) => {

        let partResult;
        let isNumber = parseInt(part);
        let separator = separators[index] || '';
        let hasComma = /,/.test(part);
        let isAbbreviated = part.length < 5;
        let sliceLength = isAbbreviated && !isNumber ? 3 : 99;

        part = part.slice(0, sliceLength).replace(/,/g, '');

        if (!isNumber) {

            if (weekdays.find(d => d.slice(0, sliceLength).toLowerCase() == part)) {
                let value = weekdays[date.getDay()];
                partResult = value.slice(0, sliceLength)
            }

            if (months.find(m => m.slice(0, sliceLength).toLowerCase() == part)) {
                let value = months[date.getMonth()];
                partResult = value.slice(0, sliceLength)
            }

        }

        if (isNumber) {

            if (part.length == 4) {
                partResult = date.getFullYear()
            }

            if (part.length < 4) {

                if (dateParsed) {
                    partResult = date.getFullYear();
                }
                else if (monthParsed) {
                    partResult = date.getDate();
                    dateParsed = true;
                }
                else {
                    partResult = date.getMonth();
                    monthParsed = true;
                }

            }

        }

        partResult += hasComma ? ',' : '';
        result.push(partResult + separator);

    })

    return result.join('');

}