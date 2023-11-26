import setCookie from "./SetCookieJs"; 

export default function handleLogout() {
    setCookie("authtoken",null,2);
};