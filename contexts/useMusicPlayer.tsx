import { createContext, ReactChild, useContext, useState, createRef, useEffect, useRef, RefObject } from "react";
export type MusicPlayerContextValue = {
  playerRef: any;
  hidden: any;
  setHidden: any;
  onPlay: () => void;
  onPause: () => void;
  onClickNext: () => void;
  onClickPrevious: () => void;
  onEnded: () => void;
  indexSongPlaylist: any;
  play: () => void;
  pause: () => void;
  isPlay: any;
  listSongMusicPlayer: any;
  setListSongMusicPlayer: any;
  setListMusicPlayer: any;
};
export const MusicPlayer = createContext<MusicPlayerContextValue>({} as MusicPlayerContextValue);

type Props = {
  children: ReactChild;
};

const fakeSongs = [
  {
    path: "http://127.0.0.1:8000/media/test1.mp3",
    name: "Anh sai roi 1",
  },
  {
    path: "http://127.0.0.1:8000/media/test2.mp3",
    name: "Anh sai roi 2",
  },
];
const MusicPlayerContextProvider = ({ children }: Props) => {
  const [hidden, setHidden] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [indexSongPlaylist, setIndexSongPlaylist] = useState(0);
  const [listSongMusicPlayer, setListSongMusicPlayer] = useState([]);
  const playerRef: any = useRef();
  const onPlay = () => {
    // console.log("onPlay");
    setIsPlay(true);
  };
  const onPause = () => {
    // console.log("onPause");
    setIsPlay(false);
  };
  const onEnded = () => {
    // console.log("onEnded");
    onClickNext();
    console.log(listSongMusicPlayer);
  };
  const setListMusicPlayer = (listSongMusicPlayer_: any) => {
    if (listSongMusicPlayer_.length <= 0) return;
    console.log(listSongMusicPlayer_);
    setListSongMusicPlayer(listSongMusicPlayer_);
    setIndexSongPlaylist(0);
  };

  const onClickNext = () => {
    // console.log("onClickNext");
    let indexSongPlaylist_ = indexSongPlaylist + 1;
    if (indexSongPlaylist_ > listSongMusicPlayer.length - 1) {
      indexSongPlaylist_ = 0;
    }
    // console.log("onClickNext : ", indexSongPlaylist_, listSongMusicPlayer);
    setIndexSongPlaylist(indexSongPlaylist_);
  };
  const onClickPrevious = () => {
    // console.log("onClickPrevious");
    let indexSongPlaylist_ = indexSongPlaylist - 1;
    if (indexSongPlaylist_ < 0) {
      indexSongPlaylist_ = 0;
    }
    // console.log("onClickPrevious : ", indexSongPlaylist_, listSongMusicPlayer);
    setIndexSongPlaylist(indexSongPlaylist_);
  };

  const play = () => {
    if (listSongMusicPlayer.length === 0) return;
    if (playerRef && "current" in playerRef && playerRef.current) {
      playerRef?.current?.play();
    }
  };
  const pause = () => {
    if (listSongMusicPlayer.length === 0) return;
    if (playerRef && "current" in playerRef && playerRef.current) {
      playerRef?.current?.pause();
    }
  };
  useEffect(() => {
    if (listSongMusicPlayer.length <= 0) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [listSongMusicPlayer]);
  useEffect(() => {
    // console.log("listSongMusicPlayer : ", listSongMusicPlayer, indexSongPlaylist);
    if (indexSongPlaylist > 0) {
      play();
    }
  }, [indexSongPlaylist]);

  return (
    <MusicPlayer.Provider
      value={{
        playerRef,
        hidden,
        setHidden,
        onPlay,
        onEnded,
        onClickNext,
        onClickPrevious,
        onPause,
        play,
        pause,
        isPlay,
        indexSongPlaylist,
        setListSongMusicPlayer,
        listSongMusicPlayer,
        setListMusicPlayer,
      }}
    >
      {children}
    </MusicPlayer.Provider>
  );
};

export default MusicPlayerContextProvider;
export const useMusicPlayer = () => useContext(MusicPlayer);
