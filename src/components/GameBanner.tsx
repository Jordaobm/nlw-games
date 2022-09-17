import { Game } from "../App";

interface GameBannerProps {
  game: Game;
}

export const GameBanner = ({ game }: GameBannerProps) => {
  return (
    <a href={game?.bannerUrl} className="relative rounded-lg overflow-hidden">
      <img src={game?.bannerUrl} />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{game?.title}</strong>
        <span className="text-zinc-300 text-sm mt-1">
          {game?._count?.ads} anúncios
        </span>
      </div>
    </a>
  );
};
