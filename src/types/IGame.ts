export interface IAd {
  id: string;
  name: string;
  discord: string;
  gameId: string;
  yearsPlaying: number;
  weekDays: number[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  createdAt: string;
}

export interface IGame {
  id: string;
  title: string;
  bannerUrl: string;
  _count?: {
    ads: number;
  };
  ads: IAd[];
}
