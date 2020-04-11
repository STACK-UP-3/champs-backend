export const dateValidator = (d) => {
  const date = new Date();
  const mydate = new Date(d);
  if (date > mydate) return true;
  return false;
};

export const returnDate = ({ dateR, dateS }) => {
  const Rdate = new Date(dateR);
  const Sdate = new Date(dateS);
  let isvalid = false;
  if (Rdate !== undefined) {
    isvalid = false;
  }
  if (Sdate > Rdate) isvalid = true;
  return isvalid;
};
