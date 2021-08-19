export function convertAvatarSrc(src:string | null) {
    if(!src) {
        return "/avatar.jpg"
    }

    return `http://localhost:8888/${src}`
}