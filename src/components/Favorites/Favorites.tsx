import React, { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface FavoritesProps {}

const Favorites: FC<FavoritesProps> = () => {
  const navigate = useNavigate();

  return <div className="Favorites">Favorites Component</div>;
};

export default Favorites;
