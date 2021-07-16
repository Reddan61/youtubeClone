export const convertNumbers = (number:number) => {
    const million = 1000000
    const billion = 1000000000
    if(number < 1000) {
        return number
    } else {
        if(number >= 1000 && number < million) {
            return `${Math.trunc(number/1000)},${String(number%1000)[0]} тыс.`
        }
        if(number >= million && number < billion) {
            return `${Math.trunc(number/million)},${String(number%million)[0]} млн.`
        }  
        if(number >= billion) {
            return `${Math.trunc(number/billion)},${String(number%billion)[0]} млрд.`
        }  
    }
}