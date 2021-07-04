export function convertTitle(text:string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has",textLength = 30) {
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