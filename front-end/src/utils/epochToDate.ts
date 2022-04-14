// var myDate = new Date(1647860874*1000);
// console.log(myDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',month:"long",day:"numeric", hour12: true }))

export const epochToDate = (epoc: number) => {
  const myDate = new Date(epoc * 1000);
  const [date, time] = myDate
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
    })
    .split(",");

  return { date, time };
};

export const getCurrentEpoch = () => {
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  return secondsSinceEpoch;
};

export const getCustomDateEpoch = (date: string) => {
  var someDate = new Date(date);

  return someDate.getTime();
};
