export const getNowDate = () => {
  let time = new Date();
  time =
    time.getFullYear() +
    "/" +
    time.getMonth() +
    "/" +
    time.getDate() +
    " " +
    time.getHours() +
    ":" +
    time.getMinutes();
  console.log(time);
  return time;
};
