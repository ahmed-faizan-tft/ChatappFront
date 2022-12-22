import Cookies from 'js-cookie'
let cookie = {
    setCookie: (cookieName, cookieValue)=>{
        Cookies.set(cookieName, cookieValue, { expires: 1, path: '/' });
    },

    getCookie: (cookieName)=>{
        return Cookies.get(cookieName);
    },

    clearCookie: (cookieName)=>{
        Cookies.remove(cookieName, { path: '/' })
    }
}


export default cookie