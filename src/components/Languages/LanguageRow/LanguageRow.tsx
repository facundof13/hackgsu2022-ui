import React, { FC, useEffect } from "react";
import Language from "interfaces/Language";

interface LanguageRowProps {
  language: Language;
  setSelectedLanguage: Function;
  selectedLanguage: Language | null;
}

const LanguageRow: FC<LanguageRowProps> = ({
  language, // the current language in the index of languages from api
  setSelectedLanguage,
  selectedLanguage, //the currently selected language on the left menu
}) => {
  function toggleLanguage() {
    if (selectedLanguage?.id === language.id) {
      setSelectedLanguage(null);
    } else {
      setSelectedLanguage(language);
    }
  }

  return (
    <div
      className={`${
        selectedLanguage?.id === language.id ? "bg-slate-400" : "bg-slate-300"
      } p-2 m-2 flex flex-row items-center rounded-md cursor-pointer hover:bg-slate-400`}
      onClick={toggleLanguage}
    >
      <img
        src={language.icon}
        style={{ height: "32px", width: "32px" }}
        alt="Language Icon"
      />
      <span className="text-xs ml-auto mr-auto self-center">
        {language.name}
      </span>
    </div>
  );
};

export default LanguageRow;
