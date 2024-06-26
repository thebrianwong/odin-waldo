const LoadingPokeball = () => {
  return (
    <div className="loading-pokeball-container">
      <img
        className="loading-pokeball"
        src={require("../../assets/images/misc/pokeball.png")}
        alt="A minimalist rendition of the classic Pokeball,
        with red and white semicircles separated by a line that meets in the middle to form another circle."
      />
      <h1 className="loading-pokeball-message">Loading...</h1>
    </div>
  );
};

export default LoadingPokeball;
