export function convertTitle(text:string,textLength = 30) {
    let newText = ""
    const arrText = text.split(" ");
    let i = 0;
    while(i < arrText.length) {     
        if((newText + arrText[i]).length <= textLength) {
            newText += " " + arrText[i];
            i++
        } else {
            
            newText+= "\n" + arrText.slice(i,arrText.length).join(" ")
            
            i = arrText.length
        }
    }
    return newText.trim()
}