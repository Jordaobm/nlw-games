import { ArrowLeft, CheckCircle, GameController } from "phosphor-react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GameService } from "../../services/http/GameService";

import * as Dialog from "@radix-ui/react-dialog";

export const Game = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { data: game } = useQuery(
    [`game-${params?.id}`],
    () => GameService.findOne(params?.id || ""),
    {
      staleTime: Infinity,
      enabled: !!params?.id,
    }
  );

  return (
    <div className="max-w-[768px] mx-auto flex items-center flex-col my-20 p-2">
      <div className="w-full mb-2">
        <button onClick={() => navigate("/")}>
          <ArrowLeft size={24} className="text-white" />
        </button>
      </div>

      <div className="relative rounded-lg overflow-hidden ">
        <img
          src={game?.bannerUrl}
          className="w-[768px] h-[300px] object-cover blur-[2px]"
        />
        <div className="w-full h-full bg-banner-game-gradient absolute top-0 left-0 right-0 flex flex-col items-center justify-center p-4">
          <strong className="font-bold text-white block text-4xl">
            {game?.title}
          </strong>
          <span className="text-zinc-300 text-sm mt-1">
            {game?.ads?.length} anúncios
          </span>
        </div>
      </div>
      {game?.ads?.map((ad) => (
        <Dialog.Root key={ad?.id}>
          <div
            key={ad?.id}
            className="mt-10 w-full bg-[#2A2634] p-5 rounded-lg grid gap-4 grid-cols-3 smarthphone:grid-cols-1  tablet:grid-cols-3"
          >
            <div>
              <div className="">
                <span className="text-zinc-300 text-sm ">Nome</span>
                <p className="text-white font-bold text-sm ">{ad?.name}</p>
              </div>

              <div>
                <span className="text-zinc-300 text-sm ">Tempo de jogo</span>
                <p className="text-white font-bold text-sm ">
                  {ad?.yearsPlaying} ano(s)
                </p>
              </div>
            </div>

            <div>
              <div>
                <span className="text-zinc-300 text-sm ">Disponibilidade</span>
                <div className="text-white font-bold text-sm flex flex-row items-center gap-1">
                  <p>{ad?.weekDays?.length} dia(s) </p>
                  <div className="inline-block w-1 h-1 bg-zinc-500 rounded"></div>{" "}
                  <p>
                    {ad?.hourStart}h - {ad?.hourEnd}h
                  </p>
                </div>
              </div>

              <div>
                <span className="text-zinc-300 text-sm">Chamadas de áudio</span>
                {ad?.useVoiceChannel ? (
                  <p className="text-emerald-500 font-bold text-sm ">Sim</p>
                ) : (
                  <p className="text-red-500 font-bold text-sm ">Não</p>
                )}
              </div>
            </div>

            <div className="w-full h-full flex items-center justify-center">
              <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded flex items-center gap-3 hover:bg-violet-600">
                <GameController size={24} /> Conectar
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[320px] shadow-black/25 flex flex-col items-center">
                  <CheckCircle className="text-emerald-500" size={80} />
                  <Dialog.Title className="text-2xl font-black mt-6">
                    Vamos jogar
                  </Dialog.Title>

                  <span className="text-zinc-300 text-base">
                    Agora é só começar a jogar!
                  </span>

                  <span className="text-white text-base mt-6">
                    Adicione no Discord
                  </span>

                  <div className="mt-2 w-auto text-center">
                    <div className="bg-zinc-900 py-3 px-6 rounded text-small placeholder:text-zinc-500">
                      {ad?.discord}
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </div>
          </div>
        </Dialog.Root>
      ))}
    </div>
  );
};
