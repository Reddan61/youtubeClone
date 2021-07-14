export function converCount(count:number,isSub = false) {
    let viewArr = ["просмотров","просмотр","просмотра"]
    let subArr = ["подписчиков","подписчик","подписчика"]
    let exampleArr = isSub ? [...subArr] : [...viewArr]
    let strCount = String(count)
    const million = 1000000
    const billion = 1000000000
    if (count < 1000) {
        if(strCount[strCount.length-2] === "1") {
            return `${strCount} ${exampleArr[0]}`
        }
        if(strCount[strCount.length-1] === "1") {
            return `${strCount} ${exampleArr[1]}`
        }
        if(Number(strCount[strCount.length-1]) > 1 && Number(strCount[strCount.length-1]) < 5) {
            return `${strCount} ${exampleArr[2]}`
        } 
        return `${strCount} ${exampleArr[0]}`
    }
    if(count >= 1000 && count < million) {
        return `${Math.trunc(count/1000)},${String(count%1000)[0]} тыс. ${exampleArr[0]}`
    }
    if(count >= million && count < billion) {
        return `${Math.trunc(count/million)},${String(count%million)[0]} млн. ${exampleArr[0]}`
    }  
    if(count >= billion) {
        return `${Math.trunc(count/billion)},${String(count%billion)[0]} млрд. ${exampleArr[0]}`
    }  
}

