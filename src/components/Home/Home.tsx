import React, { FC } from "react";
import Languages from "components/Languages/Languages";
import { useState } from "react";
import Language from "interfaces/Language";
import LanguagePage from "components/Languages/LanguagePage/LanguagePage";
import Snippet from "interfaces/Snippet";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [snippet, setSnippet] = useState<Snippet | null>(null);

  function goBack() {
    if (snippet) {
      setSnippet(null);
    } else {
      setLanguage(null);
    }
  }

  return (
    <div className="sm:grid sm:grid-cols-6 sm:grid-rows-1 sm:h-full sm:p-5">
      <div className="h-96 sm:h-full col-span-2">
        <Languages
          selectedLanguage={language}
          setLanguage={setLanguage}
          setSnippet={setSnippet}
          snippet={snippet}
        />
      </div>
      <div className="col-span-4">
        <LanguagePage
          language={language}
          goBack={goBack}
          setSnippet={setSnippet}
          snippet={snippet}
        />
      </div>
    </div>
  );
};

export default Home;
