import { API } from "constants/api";
import useAuth from "hooks/useAuth";
import React, { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface FavoritesProps {}

const Favorites: FC<FavoritesProps> = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {}, []);

  async function getFavorites() {
    const response = await (
      await fetch(`${process.env.REACT_APP_DOMAIN}${API.USER_FAVORITE}`, {
        headers: auth.headers(),
      })
    ).json();
  }

  return <div className="Favorites">Favorites Component</div>;
};

export default Favorites;
