export interface AllMusicInformations {
  title: string;
  album: string;
  artist: string;
  imgUrl: string;
}

export type MusicInformations = Partial<AllMusicInformations>;
