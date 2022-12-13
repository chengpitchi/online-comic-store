module.exports = {
    // The custom helper 'format_datetime' takes in a timestamp
    format_datetime: (date) => {
      return `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()} ${date.toLocaleTimeString()}`;
    },
  };