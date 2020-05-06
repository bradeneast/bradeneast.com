export function formatDate(date = new Date(), format = 'Mon Jan 01 2020') {

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

    let result = [];
    let dateParsed = false;
    let monthParsed = false;

    format.split(/[-/ ]/).map((part, index) => {

        let partResult;
        let isNumber = parseInt(part);
        let hasComma = /,/.test(part);
        let isAbbreviated = part.length < 5;
        let sliceLength = isAbbreviated && !isNumber ? 3 : 99;

        part = part.slice(0, sliceLength);
        part = hasComma ? part.replace(',', '') : part;

        if (weekdays.find(d => d.slice(0, sliceLength).toLowerCase() == part)) {
            let value = weekdays[date.getDay()];
            partResult = value.slice(0, sliceLength)
        }

        if (months.find(m => m.slice(0, sliceLength).toLowerCase() == part)) {
            let value = months[date.getMonth()];
            partResult = value.slice(0, sliceLength)
        }

        if (isNumber) {
            if (part.length == 4) {
                partResult = date.getFullYear()
            }
            if (part.length < 4) {

                partResult = dateParsed ? date.getFullYear() : date.getDate();
                dateParsed = true;
            }
        }

        result.push(hasComma ? partResult + ',' : partResult);

    })

    return result.join(' ');

}