export function convertDate(date:Date) {
    let currentDate = Date.parse(String(new Date()));
    let days = (currentDate - Date.parse(String(date)))/86400000; 
    function convertMonth(days:number) {
        return Math.floor(days/28)
    }
    function convertYear(month:number) {
        return Math.floor(month/12)
    }
    if(days < 1) {
        return "сегодня"
    }
    if(days === 1) {
        return "1 день назад"
    }
    if(days > 1 && days < 5) {
        return `${Math.floor(days)} дня назад`
    }
    if(days > 5 && days < 7) {
        return `${Math.floor(days)} дней назад`
    }
    if(days === 7) {
        return `1 неделю назад`
    }
    if(days >= 14 && days < 28 ) {
        return `${Math.floor(days/7)} недели назад`
    }
    if(convertMonth(days) === 1) {
        return `1 месяц назад`
    }
    if(convertMonth(days) > 1 && convertMonth(days) <= 4 ) {
        return `${convertMonth(days)} месяца назад`
    }
    if(convertMonth(days) >= 5 && convertMonth(days) < 12 ) {
        return `${convertMonth(days)} месяцяв назад`
    }
    if(convertYear(convertMonth(days)) === 1) {
        return `${convertYear(convertMonth(days))} год назад`
    } else {
        return `Больше 1 года назад`
    }
}