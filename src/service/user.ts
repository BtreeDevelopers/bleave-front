import Cookies from "universal-cookie";

const baseName = "bleave_btree";
const COOKIES_KEY = `user_data_${baseName}`;

interface IUser {
  email: string;
  token: string;
  token_bauth: string;
  userId: string;
  name: string;
  image: string;
  theme: string;
}

const cookies = new Cookies(null, { path: "/" });

export const removerTokenCookies = () => {
  cookies.remove(COOKIES_KEY, {
    path: "/",
  });
  window.location.href = window.location.origin + "/login";
};
export const salvarToken = (data: IUser) => {
  const dataAtual = new Date();
  const TTL_TOKEN_EXPIRA_24_HORAS = new Date(
    dataAtual.getTime() + 24 * 60 * 60 * 1000
  );

  cookies.set(COOKIES_KEY, data, {
    expires: TTL_TOKEN_EXPIRA_24_HORAS,
    sameSite: true,
  });
  return data;
};

export const obterUserData = (redirect = true): IUser => {
  let token = cookies.get(COOKIES_KEY);

  if (!token && redirect) {
    removerTokenCookies();

    window.location.href = window.location.origin + "/login";
  }

  return token;
};
