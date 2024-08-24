import moment from "moment";

export const fileFormatReader = (url = "") => {
    const fileExt = url.split(".").pop()

    if (fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif" || fileExt == "avif") return "image";
    if (fileExt == "mp4" || fileExt == "webm" || fileExt == "ogg") return "video";
    if (fileExt == "mp3" || fileExt == "wav" || fileExt == "audio") return "audio";

    return "file"


}

export const transformImage = (url = "", width = 100) => {
    url = url.replace("/upload", `/upload/w_${width}/`)
    return url
}

export const getLastSevenDays = () => {

    const LastSevenDays = []

    for (let i = 0; i < 7; i++) {
        const date = moment().subtract(i, "days").format("ddd")

        LastSevenDays.unshift(date)

    }
    return LastSevenDays

}

export const getOrSavefromLocalStorage = ({ key, value, get }) => {
    if (get) {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
    } else {
        localStorage.setItem(key, JSON.stringify(value))
    }
}