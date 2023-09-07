export const addMinutes = (date: Date, minutes: number) => {
  const dateCopy = new Date(date.getTime());

  dateCopy.setMinutes(dateCopy.getMinutes() + minutes);

  return dateCopy;
}