import formatTime from "lmw-time-format"

export function docAva(ava) {
    if (ava) {
        return ava;
    }
    return "./static/img/doctor.m.png";
}

export function timeFormat(time, format) {
    return formatTime(time, format);
}
