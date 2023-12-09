import CryptoJS from "crypto-js";

const cryptkey = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_SECRET_CRYPTO!);
const cryptiv = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_IV_CRYPTO!);

export function criptografar(senha: string) {
  var encrypt = CryptoJS.AES.encrypt(senha, cryptkey, {
    iv: cryptiv,
    mode: CryptoJS.mode.CTR,
  });
  return encrypt.toString();
}

export function descriptografar(text: string) {
  const cipher = CryptoJS.enc.Base64.parse(text);
  var decrypt = CryptoJS.AES.decrypt({ ciphertext: cipher } as any, cryptkey, {
    iv: cryptiv,
    mode: CryptoJS.mode.CTR,
  });
  return decrypt.toString(CryptoJS.enc.Utf8);
}
