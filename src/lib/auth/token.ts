import Cookies from "js-cookie";

export const storeTokenInCookie = (jwt: string) => {
  if (jwt) {
    Cookies.set("jwt", jwt);
  }
};

export const getTokenFromCookie = () => {
  const token = Cookies.get("jwt");
  return token;
};
