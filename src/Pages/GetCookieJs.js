

// Function to get the value of a cookie by name
export default function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        const cookieName = decodeURIComponent(cookie[0]);
        const cookieValue = decodeURIComponent(cookie[1]);

        if (cookieName === name) {
            return cookieValue;
        }
    }

    return null; // Return null if the cookie with the specified name is not found
}