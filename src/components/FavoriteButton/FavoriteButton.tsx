import { API } from "constants/api";
import useAuth from "hooks/useAuth";
import Snippet from "interfaces/Snippet";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface FavoriteButtonProps {
  snippet: Snippet;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ snippet }) => {
  const [favorite, setFavorite] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    getFavorite();
  }, []);

  async function getFavorite() {
    try {
      const response = await (
        await fetch(`${API.FAVORITE}/${snippet.id}`, {
          headers: auth.headers(),
        })
      ).json();
      setFavorite(response);

      if (auth.authed) {
        const apiIsFavorite = await (
          await fetch(`${API.USER_FAVORITE}/${snippet.id}`, {
            headers: auth.headers(),
          })
        ).json();

        if (!apiIsFavorite.error) {
          setIsFavorite(apiIsFavorite.is_favorite);
        }
      }
    } catch (err) {}
  }

  async function toggleFavorite() {
    try {
      const response = await (
        await fetch(`${API.FAVORITE}/${snippet.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...auth.headers() },
        })
      ).json();

      if (response) {
        await getFavorite();
      } else {
        toast.error(
          "There was an error saving your favorite. Please try again."
        );
      }
    } catch (err) {}
  }

  return (
    <div
      className={`flex flex-row items-center ml-auto mr-2 ${
        auth.authed && "cursor-pointer"
      }`}
      onClick={() => auth.authed && toggleFavorite()}
    >
      <span className="text-lg">{favorite}&nbsp;</span>
      <i
        className={
          auth.authed && !isFavorite
            ? "fa-regular fa-heart"
            : "fa-solid fa-heart"
        }
      ></i>
    </div>
  );
};

export default FavoriteButton;
