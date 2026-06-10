import { Player } from "textalive-app-api";

export const createPlayer = () => {
  return new Player({
    app: {
      token: import.meta.env.VITE_TEXTALIVE_TOKEN,
    },
    throttleInterval: 5000
  });
};