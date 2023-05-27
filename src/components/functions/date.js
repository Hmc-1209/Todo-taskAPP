export const getNowDate = () => {
  let time = new Date();
  time =
    time.getFullYear() +
    "/" +
    (parseInt(time.getMonth()) + 1) +
    "/" +
    time.getDate();
  return time;
};
