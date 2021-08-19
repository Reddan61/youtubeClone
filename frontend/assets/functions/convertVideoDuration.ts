export const convertVideoDuration = (duration:number) => {
    const sec = Math.trunc(duration)
    const minutes = Math.trunc(sec/60)
    const seconds = sec%60

    if(minutes < 10) {
        return `0${minutes}:${seconds<10 ?`0${seconds}`: seconds}`
    } else {
        return `${minutes}:${seconds<10 ?`0${seconds}`: seconds}`
    }
}