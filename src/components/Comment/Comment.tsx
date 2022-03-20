import React, { FC } from "react";
import CommentInterface from "interfaces/Comment";

interface CommentProps {
  comment: CommentInterface;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <div className="border-2 mt-4 border-black rounded-md flex flex-row bg-slate-300 p-2">
      <div className="flex items-center justify-center px-3">
        <div
          className="rounded-full bg-gray-700 m-auto flex items-center justify-center"
          style={{ width: "48px", height: "48px" }}
        >
          <i
            style={{ width: "28px", height: "28px" }}
            className="fa-solid fa-user text-slate-100 flex justify-center items-center"
          ></i>
        </div>
      </div>
      <div className="flex flex-col p-3 grow">
        <div className="text-sm">{comment.text}</div>
        <div className="text-sm mt-3 underline underline-offset-2 hover:underline-offset-4 text-black text-right">
          <span className="cursor-pointer">{comment.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
