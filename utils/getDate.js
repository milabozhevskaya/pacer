export const getDate = () => {
  const time = (new Date()).toISOString().replace('T', ' ').slice(0, 16);
  return time;
}
