export default function setCookie(name, value, hoursToExpire) {
    let expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + hoursToExpire * 60 * 60 * 1000);

    let cookieValue = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString() + "; path=/";

    document.cookie = cookieValue;
}