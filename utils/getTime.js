export const getTime = () => {
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
  const time = (new Date(Date.now() - timeZoneOffset)).toISOString().replace('T', ' ').slice(0, 16);
  return time;
};
