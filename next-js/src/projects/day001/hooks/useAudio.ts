export const useAudio = (src: string) => {
  const play = () => {
    const audio = new Audio(src);
    audio.play();
  };
  return { play };
};
