import { IGame } from "../../types/IGame";
import { api } from "../api";

export const GameService = {
  list: async (): Promise<IGame[]> => {
    const response = await api.get<IGame[]>("games");
    return response?.data;
  },

  findOne: async (gameId: string): Promise<IGame> => {
    const response = await api.get<IGame>(`game/${gameId}`);
    return response?.data;
  },
};
