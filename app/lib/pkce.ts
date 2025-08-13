import criptojs from "crypto-js";

const { enc, SHA256 } = criptojs;
export const generatePKCE = () => {
  const codeVerifier = enc.Base64.stringify(
    enc.Utf8.parse(Math.random().toString(36).substring(2, 128))
  );
  const codeChallenge = SHA256(codeVerifier)
    .toString(enc.Base64)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  return { codeVerifier, codeChallenge };
};
