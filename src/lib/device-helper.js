export function isMobile() {
    return navigator.userAgent.indexOf("iPhone") > 0 ||
        navigator.userAgent.indexOf("iPad") > 0 ||
        navigator.userAgent.indexOf("Android") > 0 ||
        navigator.userAgent.indexOf("webOS") > 0 ||
        navigator.userAgent.indexOf("iPod") > 0 ||
        navigator.userAgent.indexOf("BlackBerry") > 0 ||
        navigator.userAgent.indexOf("Windows Phone") > 0;
}

