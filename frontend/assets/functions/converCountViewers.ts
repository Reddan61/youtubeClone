export function converCountViewers(count:number) {
    let exampleArr = ["просмотров","просмотр","просмотра"]
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
        return `${Math.trunc(count/1000)},${String(count%1000)[0]} тыс. просмотров`
    }
    if(count >= million && count < billion) {
        return `${Math.trunc(count/million)},${String(count%million)[0]} млн. просмотров`
    }  
    if(count >= billion) {
        return `${Math.trunc(count/billion)},${String(count%billion)[0]} млрд. просмотров`
    }  
}

