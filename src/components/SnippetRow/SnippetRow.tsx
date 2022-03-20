import Snippet from "interfaces/Snippet";
import React, { FC } from "react";

interface SnippetRowProps {
  snippet: Snippet;
  chooseSnippet: Function;
}

const SnippetRow: FC<SnippetRowProps> = ({ snippet, chooseSnippet }) => {
  return (
    <div
      className="text-sm flex flex-row border-2 bg-slate-300 hover:bg-slate-400 rounded-lg m-2 cursor-pointer"
      onClick={() => chooseSnippet(snippet)}
    >
      <div className="flex flex-row p-2">
        {snippet.icon ? (
          <img
            src={snippet.icon}
            style={{ width: "32px", height: "32px" }}
            alt="framework or language icon"
          />
        ) : (
          <i className="fa-regular fa-code" />
        )}
      </div>
      <div className="flex flex-row items-center justify-start">
        <span className="">{snippet.title}</span>
      </div>
      <div className="flex flex-row items-center ml-auto mr-2">
        <span className="text-xs">{snippet.favorites}&nbsp;</span>
        <i className="fa-solid fa-heart"></i>
      </div>
    </div>
  );
};

export default SnippetRow;
