import axios from "axios";
import Cookies from "universal-cookie";

const baseName = process.env.BASE_URL!.replace(/\//g, "").replace(/-/g, "_");
const COOKIES_KEY = `access_token_${baseName}`;

const cookies = new Cookies(null, { path: "/" });

const obterTokenApi = async () => {
  let novoAccessToken = "";

  await axios
    .get(`${process.env.VUE_APP_API_URL}/api/v1/token`)
    .then((response) => (novoAccessToken = response.data))
    .catch((erro) => {
      console.error("Erro ao obter token - tokenService:", erro);
    });

  return novoAccessToken;
};

export const removerTokenCookies = () => {
  cookies.remove(COOKIES_KEY, {
    path: "/",
  });
};

export const obterAccessToken = async () => {
  let token = cookies.get(COOKIES_KEY);

  if (token !== null && token !== undefined) {
    return token;
  }

  token = await obterTokenApi();

  const TTL_TOKEN_EXPIRA_60_MINUTOS = new Date(
    new Date().getTime() + 60 * 60 * 1000
  );

  cookies.set(COOKIES_KEY, token, {
    expires: TTL_TOKEN_EXPIRA_60_MINUTOS,
    sameSite: true,
  });

  return token;
};
