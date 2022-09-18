import logo from "../../assets/logo.svg";

import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CreateAdModal } from "../../components/CreateAdModal";
import { GameBanner } from "../../components/GameBanner";
import { queryClient } from "../../main";
import { GameService } from "../../services/http/GameService";

export const Home = () => {
  const [open, setOpen] = useState(false);

  const { data } = useQuery(["games"], () => GameService.list(), {
    staleTime: Infinity,
  });

  useEffect(() => {
    const container = document.querySelector(".items") as HTMLElement;

    if (container) {
      let mouseDown = false;
      let startX = 0;
      let scrollLeft = 0;

      container.addEventListener("mousedown", (e) => {
        mouseDown = true;
        container.classList.add("active");
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });
      container.addEventListener("mouseleave", () => {
        mouseDown = false;
        container.classList.remove("active");
      });
      container.addEventListener("mouseup", () => {
        mouseDown = false;
        container.classList.remove("active");
      });
      container.addEventListener("mousemove", (e) => {
        if (!mouseDown) return;
        e.preventDefault();
        const pageX = e.pageX - container.offsetLeft;
        const walk = (pageX - startX) * 1;
        container.scrollLeft = scrollLeft - walk;
      });
    }
  }, [document.querySelector(".items")]);

  return (
    <div className="max-w-[1344px] mx-auto flex  flex-col my-20 p-2">
      <div className="w-full flex items-center justify-center">
        <img src={logo} className="w-44" />
      </div>

      <div className="w-full flex items-center justify-center">
        <h1 className="text-6xl text-white font-black mt-20">
          Seu{" "}
          <span className="bg-nlw-gradient bg-clip-text text-transparent">
            duo
          </span>{" "}
          está aqui.
        </h1>
      </div>

      <div className="flex overflow-x-auto gap-6 mt-16 items cursor-grab scrollbar-hide">
        {data?.length
          ? data?.map((game, index) => (
              <div key={game?.id} className="min-w-[220px]">
                <GameBanner key={game?.id} game={game} />
              </div>
            ))
          : ""}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
          <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center  smarthphone:flex-col tablet:flex-row gap-4">
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

            <CreateAdModal
              closeModal={() => {
                setOpen(false);
                queryClient.invalidateQueries(["games"]);
              }}
              games={data || []}
            />
          </div>
        </div>
      </Dialog.Root>
    </div>
  );
};
