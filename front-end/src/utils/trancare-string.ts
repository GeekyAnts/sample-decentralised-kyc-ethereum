export const truncateString = (address: string) => {
  const prefix = address.substring(0, 4).concat(".....");
  const postfix = address.substring(address.length - 4);
  return prefix + postfix;
};
