import SnippetPage from "components/SnippetPage/SnippetPage";
import SnippetRow from "components/SnippetRow/SnippetRow";
import { API } from "constants/api";
import Language from "interfaces/Language";
import Snippet from "interfaces/Snippet";
import React, { FC, MouseEventHandler, useEffect, useState } from "react";

interface LanguagePageProps {
  language?: Language | null;
  goBack: MouseEventHandler;
  setSnippet: Function;
  snippet: Snippet | null;
}

const LanguagePage: FC<LanguagePageProps> = ({
  language,
  goBack,
  setSnippet,
  snippet,
}) => {
  const [snippets, setSnippets] = useState<Array<Snippet>>([]);

  useEffect(() => {
    getSnippets();
  }, [language]);

  async function getSnippets() {
    try {
      if (language) {
        const apiSnippets = await (
          await fetch(`${API.SNIPPETS}/${language.id}`)
        ).json();

        setSnippets([...apiSnippets]);
      } else {
        getPopularSnippets();
      }
    } catch (err) {
      setSnippets([]);
    }
  }

  async function getPopularSnippets() {
    try {
      const apiSnippets = await (await fetch(`${API.SNIPPETS}`)).json();

      setSnippets([...apiSnippets]);
    } catch (err) {
      setSnippets([]);
    }
  }

  function chooseSnippet(snippet: Snippet) {
    setSnippet(snippet);
  }

  async function goBackAndRefresh(e: any) {
    goBack(e);
    // await getSnippets();
  }

  return (
    <div className="m-5 sm:h-full rounded-lg shadow-md bg-zinc-200 overflow-auto">
      <div className="grid grid-cols-3 h-16 justify-items-center items-center">
        <div className="flex flex-row w-full justify-start items-center">
          {(language || snippet) && (
            <div onClick={goBackAndRefresh} className="ml-3 cursor-pointer">
              <i className="fa-solid fa-chevron-left" />
            </div>
          )}
        </div>
        <div>
          <h1 className="text-xl whitespace-nowrap sm:text-xl">
            {!snippet
              ? language
                ? `${language.name} Snippets`
                : "Most Popular Snippets"
              : `${snippet.title}`}
          </h1>
        </div>
      </div>

      {!snippet ? (
        <div className="md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 pb-3">
          {snippets.map((snippet, index) => (
            <SnippetRow
              key={index}
              snippet={snippet}
              chooseSnippet={chooseSnippet}
            />
          ))}
          {snippets.length === 0 && (
            <div className="text-center text-gray-500 text-xs col-span-full">
              <span>There are no snippets for this language.</span>
            </div>
          )}
        </div>
      ) : (
        <SnippetPage snippet={snippet} />
      )}
    </div>
  );
};

export default LanguagePage;
