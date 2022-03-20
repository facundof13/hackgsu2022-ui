import useAuth from "hooks/useAuth";
import React, { FC, useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ModalStyle } from "constants/modalStyle";
import Language from "interfaces/Language";
import Framework from "interfaces/Framework";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { API } from "constants/api";
import Select from "react-select";

interface CreateSnippetButtonProps {}

const CreateSnippetButton: FC<CreateSnippetButtonProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const [languages, setLanguages] = useState<Array<Language>>([]);
  const [frameworks, setFrameworks] = useState<Array<Framework>>([]);
  const [filteredFrameworks, setFilteredFrameworks] = useState<Array<any>>([]);

  const [language, setLanguage] = useState<any>(null);
  const [framework, setFramework] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const auth = useAuth();

  useEffect(() => {
    getLanguages();
    getFrameworks();
  }, []);

  async function postSnippet() {
    try {
      setSubmitted(true);
      const data = {
        code,
        title,
        description,
        language_id: language.value,
        framework_id: (framework as any)?.value || null,
      };

      const response = await (
        await fetch(API.SNIPPETS, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...auth.headers() },
          body: JSON.stringify(data),
        })
      ).json();

      if (response) {
        setSubmitted(false);
        closeModal();
      }
    } catch (err) {}
  }

  async function getLanguages() {
    try {
      const response = await (await fetch(API.LANGUAGES)).json();

      setLanguages(
        response
          .map((i: Language) => ({ label: i.name, value: i.id }))
          .sort((a: any, b: any) => b.label - a.label)
      );
    } catch (err) {}
  }

  async function getFrameworks() {
    try {
      const response = await (await fetch(API.FRAMEWORKS)).json();

      setFrameworks([...response]);
    } catch (err) {}
  }

  useEffect(() => {
    setFramework(null);

    if (language) {
      setFilteredFrameworks(
        [...frameworks]
          ?.filter((i) => i.language_id === language.value)
          ?.map((i: any) => ({ label: i.name, value: i.id }))
      );
    }
  }, [language]);

  function closeModal() {
    setShowModal(false);
    setSubmitted(false);
    setTitle("");
    setDescription("");
    setCode("");
    setFramework(null);
    setLanguage(null);
  }

  return (
    auth.authed && (
      <>
        <button
          className="bg-gray-200 hover:bg-gray-400 text-black rounded-md py-1 px-2"
          onClick={() => setShowModal(!showModal)}
        >
          Post
        </button>

        <Modal open={showModal} onClose={closeModal} disableAutoFocus>
          <Box
            sx={ModalStyle}
            style={{ width: "600px", height: "700px", maxHeight: "700px" }}
            className="font-mono flex flex-col"
          >
            <div className="bg-slate-300 rounded-t-lg p-4 font-bold text-xl text-center ">
              Post a snippet
            </div>
            <div className="p-3 grow">
              <div className="flex flex-col mb-2">
                <label>*Title</label>
                <input
                  type="text"
                  className={`border-2 rounded-md p-1 ${
                    !title && submitted ? "border-red-600" : "border-zinc-200"
                  }`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col mb-2">
                <label>*Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`resize-none border-2  rounded-md ${
                    !description && submitted
                      ? "border-red-600"
                      : "border-zinc-200"
                  } `}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 mb-2">
                <div className="pr-2">
                  <label>*Language</label>
                  <Select
                    className={
                      !language && submitted
                        ? "border-2 border-red-600 rounded-lg"
                        : ""
                    }
                    options={languages}
                    value={language}
                    onChange={setLanguage}
                  ></Select>
                </div>
                <div className="pl-2">
                  <label>Framework</label>
                  <Select
                    className=""
                    options={filteredFrameworks}
                    onChange={setFramework}
                    value={framework}
                    isClearable
                  ></Select>
                </div>
              </div>
              <div className="flex flex-col grow">
                <label className="" htmlFor="snippet">
                  *Snippet
                </label>
                <CodeEditor
                  style={{
                    borderRadius: "12px",
                    height: "290px",
                    overflow: "auto",
                  }}
                  className={`${
                    !title && submitted
                      ? "border-2 border-red-600 rounded-lg"
                      : ""
                  }`}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  value={code}
                />
              </div>
            </div>
            <div className="bg-slate-300 rounded-b-lg p-4">
              <div className="flex flex-row items-end justify-end">
                <button
                  onClick={closeModal}
                  className="p-2 bg-gray-200 rounded-md text-gray-700 mr-2 hover:text-gray-900 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={postSnippet}
                  className="p-2 bg-gray-200 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-400"
                >
                  Submit
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </>
    )
  );
};

export default CreateSnippetButton;
