import * as THREE from "three";
import getStarfield from "./getStarfield";

const Stars = () => {
  const stars = getStarfield({ numStars: 2000 });
  return stars;
};

export default Stars;