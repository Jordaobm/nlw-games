import logo from "./assets/logo.svg";
import "./styles/main.css";

import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";
import { useEffect, useState } from "react";
import { CreateAdModal } from "./components/CreateAdModal";
import { GameBanner } from "./components/GameBanner";
import { api } from "./services/api";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    api.get<Game[]>("games").then((res) => {
      setGames(res?.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logo} />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games?.map((game) => (
          <GameBanner key={game?.id} game={game} />
        ))}
      </div>

      <Dialog.Root>
        <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
          <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
            <div>
              <strong className="text-2xl text-white font-black block">
                Não encontrou seu duo?
              </strong>
              <span className="text-zinc-400">
                Publique um anúncio para encontrar novos players!
              </span>
            </div>

            <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded flex items-center gap-3 hover:bg-violet-600">
              <MagnifyingGlassPlus size={24} />
              Publicar anúncio
            </Dialog.Trigger>

            <CreateAdModal games={games} />
          </div>
        </div>
      </Dialog.Root>
    </div>
  );
}

export default App;
