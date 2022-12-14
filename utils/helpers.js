module.exports = {
  // The custom helper 'format_datetime' takes in a timestamp
  format_datetime: (date) => {
    return `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()} ${date.toLocaleTimeString()}`;
  },
  net_amount: (price) => {
    (price) ? price = price - (Math.round(price * 0.1 * 100) / 100).toFixed(2): 0; 
    return (Math.round(price * 100) / 100).toFixed(2);
  },
  gst_amount: (price) => {
    (price) ? price = price * 0.1 : 0; 
    return (Math.round(price * 100) / 100).toFixed(2);
  },
  round: (price) => {
    return (price) ? (Math.round(price * 100) / 100).toFixed(2) : 0; 
  }
};