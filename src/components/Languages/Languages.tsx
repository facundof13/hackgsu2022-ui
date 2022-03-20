import React, { FC, useEffect, useState } from "react";
import { API } from "constants/api";
import Language from "interfaces/Language";
import LanguageRow from "./LanguageRow/LanguageRow";
import Snippet from "interfaces/Snippet";

interface LanguagesProps {
  setLanguage: Function;
  snippet: Snippet | null;
  setSnippet: Function;
  selectedLanguage: Language | null;
}

const Languages: FC<LanguagesProps> = ({
  setLanguage,
  snippet,
  setSnippet,
  selectedLanguage,
}) => {
  const [languages, setLanguages] = useState<Array<Language>>([]);

  useEffect(() => {
    getLanguages();
  }, []);

  async function getLanguages() {
    try {
      console.log(process.env);
      const apiLanguages = await (
        await fetch(`${process.env.REACT_APP_DOMAIN}${API.LANGUAGES}`)
      ).json();
      setLanguages(apiLanguages);
    } catch (err) {
      setLanguages([]);
    }
  }

  async function setSelectedLanguage(language: Language) {
    if (snippet) {
      setSnippet(null);
    } else {
      setLanguage(language);
    }
  }

  return (
    <div className="m-5 h-full bg-zinc-200 rounded-lg shadow-md pb-3 overflow-auto">
      <div className="overflow-auto lg:grid-cols-2 lg:grid">
        <h1 className="text-center p-3 sm:pt-5 text-xl lg:col-span-2 ">
          Languages
        </h1>
        {languages.map((l, index) => (
          <LanguageRow
            key={index}
            language={l}
            setSelectedLanguage={setSelectedLanguage}
            selectedLanguage={selectedLanguage}
          />
        ))}
      </div>
    </div>
  );
};

export default Languages;
