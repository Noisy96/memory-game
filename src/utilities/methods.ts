const secondsToTime = (secondsCount: number): string => {
  let minutes = (secondsCount / 60).toFixed();
  let seconds = secondsCount % 60;
  // string to number conversion using unsary operator (+)
  return `${+minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

export { secondsToTime };