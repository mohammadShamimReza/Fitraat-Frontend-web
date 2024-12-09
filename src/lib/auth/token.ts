import Cookies from "js-cookie";

export const storeTokenInCookie = (jwt: string) => {
  if (jwt) {
    Cookies.set("fitraatJwt", jwt);
  }
};

export const getTokenFromCookie = () => {
  const token = Cookies.get("fitraatJwt");
  return token;
};

export const removeTokenFromCookie = () => {
  const removeToken = Cookies.remove("fitraatJwt");
  return removeToken;
};
