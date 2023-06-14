type SubmitScoreModalProps = {
  timeScore: number;
  displayTime: string;
  submitScore: (
    timeInMilliseconds: number,
    playerName: string,
    playerFavoritePokemon: string
  ) => boolean;
  closeModal: () => void;
};

export default SubmitScoreModalProps;
