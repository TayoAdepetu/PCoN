import { t } from "i18next";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [showButtons, setShowButtons] = useState(false);
  const [initialChoiceMade, setInitialChoiceMade] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("appLang");
    const envLang = import.meta.env.VITE_APP_LOCALE || "en";

    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setInitialChoiceMade(true);
    } else {
      // Use environment variable as default if no saved language
      i18n.changeLanguage(envLang);
      setInitialChoiceMade(true);
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("appLang", lng);
    setShowButtons(false);
    setInitialChoiceMade(true);
  };

  return (
    <div className="">
      {showButtons ? (
        <div className="flex space-x-2">
          <button
            onClick={() => changeLanguage("en")}
            className="cursor-pointer px-3 py-1"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("de")}
            className="cursor-pointer px-3 py-1"
          >
            Deutsch
          </button>
        </div>
      ) : (
        initialChoiceMade && (
          <button
            onClick={() => setShowButtons(true)}
            className=""
            title="Change Language"
          >
            {t("language")}
          </button>
        )
      )}
    </div>
  );
};

export default LanguageSwitcher;
