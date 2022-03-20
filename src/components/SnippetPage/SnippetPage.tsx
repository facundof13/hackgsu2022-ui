import { Transition, Dialog } from "@headlessui/react";
import Comment from "components/Comment/Comment";
import { API } from "constants/api";
import useAuth from "hooks/useAuth";
import Snippet from "interfaces/Snippet";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ModalStyle } from "constants/modalStyle";
import { toast } from "react-toastify";
import FavoriteButton from "components/FavoriteButton/FavoriteButton";

interface SnippetPageProps {
  snippet: Snippet;
}

const SnippetPage: FC<SnippetPageProps> = ({ snippet }) => {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const commentRef = useRef(null);
  const auth = useAuth();

  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    const apiComments = await (
      await fetch(`${API.COMMENTS}/${snippet.id}`)
    ).json();

    setComments(apiComments);
  }

  async function postComment() {
    const body = {
      text: (commentRef.current as any).value,
      snippet_id: snippet.id,
    };

    try {
      const success = await fetch(`${API.COMMENTS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...auth.headers() },
        body: JSON.stringify(body),
      });

      if (success) {
        setShowModal(false);
        await getComments();
        return;
      } else {
      }
    } catch (err) {
      toast.error("There was an error posting your comment. Please try again.");
    }
  }

  return (
    <div className="rounded-md p-2 mx-4">
      <div className="flex flex-row">
        <div>{snippet.description}</div>
        <div className="ml-auto">
          <FavoriteButton snippet={snippet} />
        </div>
      </div>
      <div className="mt-3">
        <CopyBlock
          wrapLines
          codeBlock={true}
          text={snippet.code}
          theme={dracula}
          language={snippet.key}
          showLineNumbers={false}
        />
      </div>
      <div className="mt-3 text-right text-slate-500">
        <span>Posted by - {snippet.username}</span>
      </div>
      <div className="text-lg text-center mt-5">
        <div>
          <span>Comments</span>
        </div>
        {auth.authed && (
          <div className="text-xs">
            <span
              className="underline cursor-pointer underline-offset-2 hover:underline-offset-4"
              onClick={() => setShowModal(true)}
            >
              Leave a comment
            </span>
          </div>
        )}
      </div>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        disableAutoFocus
      >
        <Box sx={ModalStyle} className="font-mono">
          <div className="bg-slate-300 rounded-t-lg p-4 font-bold text-xl text-center">
            Leave a comment
          </div>
          <div className="p-3">
            <div className="h-48 flex flex-col">
              <label className="mb-2" htmlFor="comment">
                Comment
              </label>
              <textarea
                ref={commentRef}
                placeholder="Enter a comment"
                className="resize-none border-black border-2 rounded-md p-3"
                rows={4}
                required
              ></textarea>
            </div>
          </div>
          <div className="bg-slate-300 rounded-b-lg p-4">
            <div className="flex flex-row items-end justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="p-2 bg-gray-200 rounded-md text-gray-700 mr-2 hover:text-gray-900 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={postComment}
                className="p-2 bg-gray-200 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-400"
              >
                Submit
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SnippetPage;
