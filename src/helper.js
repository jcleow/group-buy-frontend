export default 'http://localhost:3004';

export const getInfoFromCookie = () => {
  if (document.cookie) {
    const splitCookieVal = document.cookie.split(' ');
    const usernameStartPos = splitCookieVal[0].indexOf('=') + 1;
    const usernameEndPos = splitCookieVal[0].indexOf(';');
    const loggedInUsername = splitCookieVal[0].substring(usernameStartPos, usernameEndPos);
    return (loggedInUsername);
  }
  return null;
};
