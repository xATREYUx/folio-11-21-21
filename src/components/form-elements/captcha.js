import { useState } from "react";
import { defaults } from "js-cookie";
import ReCaptchaV2 from "react-google-recaptcha";

const Captcha = ({ setCaptcha, recaptchaRef }) => {
  console.log("Captcha: ", process.env.REACT_APP_SITE_KEY_DEVELOPMENT);
  const handleToken = (token) => {
    setCaptcha((captcha) => {
      console.log("captcha token: ", token);
      return { ...captcha, token };
    });
  };

  const handleExpire = () => {
    setCaptcha((captcha) => {
      return { ...captcha, token: null };
    });
  };

  let siteKey;
  if (process.env.NODE_ENV == "development") {
    siteKey = process.env.REACT_APP_SITE_KEY_DEVELOPMENT;
  } else {
    siteKey = process.env.REACT_APP_SITE_KEY;
  }
  return (
    <div style={{ transform: "scale(.9)" }}>
      <ReCaptchaV2
        sitekey={siteKey}
        onChange={handleToken}
        onExpired={handleExpire}
        ref={recaptchaRef}
      />
    </div>
  );
};

export default Captcha;
