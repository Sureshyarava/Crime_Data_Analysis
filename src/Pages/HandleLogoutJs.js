import setCookie from "./SetCookieJs"; 


export default function handleLogout() {
    setCookie("authToken", "", -10);
}