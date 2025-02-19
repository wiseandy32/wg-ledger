import { useContext } from "react";
import { createContext } from "react";

export const CoinsDataContext = createContext();
export const useCoinData = () => useContext(CoinsDataContext);
