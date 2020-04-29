/**
 * This class contains all methods
 * required to handle
 * date operations.
 */
class DateHelper {
  /**
 * This method formats date.
 * @param {object} date date to be formated
 * @returns {object} The limit and skip.
 */
  static formatDate(date) {
    const todayDate = new Date();
    const formattedDate = new Date(date);
    if (todayDate > formattedDate) return true;
    return false;
  }


  /**
 * This method returns date.
 * @param {object} returnDate date to be formated
 * @param {object} startDate date to be formated
 * @returns {object} The limit and skip.
 */
  static verifyStartReturnDate(returnDate, startDate) {
    const formattedReturnDate = new Date(returnDate);
    const formattedStartDate = new Date(startDate);
    let isValid = false;
    if (formattedStartDate > formattedReturnDate) isValid = true;
    return isValid;
  }
}


export default DateHelper;
