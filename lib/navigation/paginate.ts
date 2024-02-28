/**
 * Paginate an array by slicing it according to the given parameters.
 *
 * The default page size is 50 and the default page number is 1
 *
 * @param {any} array An array of whatever needs to be sliced into pages
 * @param {number} pageSize the number of items to be returned per page
 * @param {number} currentPageNumber the current page number
 * @returns {array} a string indicating the result
 */
export default (array: any[], pageSize = 50, currentPageNumber = 1) =>
  array.slice((currentPageNumber - 1) * pageSize, currentPageNumber * pageSize);

/**
 * Return the amount of pages a given array would take up according to the given parameters
 *
 * The Default page size is 50
 *
 * @param {any} array An array of whatever needs to be processed into pages
 * @param {number} pageSize the number of items to be returned per page
 * @returns {number} a number indicating the total amount of pages
 */
export const getPaginationTotalPages = (array: any[], pageSize = 50) =>
  Math.ceil(array.length / pageSize);
