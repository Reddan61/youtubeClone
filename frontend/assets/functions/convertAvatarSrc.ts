export function convertAvatarSrc(src:string | null) {
    if(!src) {
        return "/avatar.jpg"
    }

    return src
}