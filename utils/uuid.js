// a function that generates a 10 characters string of random numbers and upper case letters
// used to generate the invoice ref
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000000000)
    .toString(16)
    .substring(1).toUpperCase();