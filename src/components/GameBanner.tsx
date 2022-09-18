import { useNavigate } from "react-router-dom";
import { IGame } from "../types/IGame";

interface GameBannerProps {
  game: IGame;
}

export const GameBanner = ({ game }: GameBannerProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-lg overflow-hidden ">
      <img src={game?.bannerUrl} />
      <div className="w-full pt-16 pb-4 px-4 bg-games-gradient absolute bottom-0 left-0 right-0">
        <strong
          className="font-bold text-white block cursor-pointer"
          onClick={() => navigate(`/game/${game?.id}`)}
        >
          {game?.title}
        </strong>
        <span className="text-zinc-300 text-sm mt-1">
          {game?._count?.ads} anúncios
        </span>
      </div>
    </div>
  );
};
