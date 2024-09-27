import * as THREE from "three";
import getStarfield from "../utils/getStarfield.js";

const Stars = () => {
  const stars = getStarfield({ numStars: 2000 });
  return stars;
};

export default Stars;
