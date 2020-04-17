import Cookies from 'js-cookie';
export const setToken = (token, tokenName = 'token', ) => {
    Cookies.set(tokenName, token )
  }
  
  export const getToken = (tokenName = 't') => {
    console.log(Cookies.get(tokenName))
    // console.log(Cookies)
    return Cookies.get(tokenName)
  }