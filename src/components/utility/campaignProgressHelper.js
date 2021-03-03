// Helper that generates and pushes the past 7 days
export const generatePastSevenDays = () => {
  const pastSevenDaysArray = [];
  for (let i = 7; i >= 0; i -= 1) {
    // Start from today's date then progressive go backwards
    const singleDate = new Date();
    singleDate.setDate(singleDate.getDate() - i);

    // Format into DD/MM
    const options = { day: '2-digit', month: '2-digit' };
    const formattedDate = singleDate.toLocaleDateString('en-GB', options);

    // Append into an accumulative array
    pastSevenDaysArray.push(formattedDate);
  }
  return pastSevenDaysArray;
};

// Helper that gets the lowest y-value
export const getLowestYVal = (purchaseRange) => {
  let yLow = null;
  purchaseRange.forEach((day) => {
    if (day.y < yLow || yLow === null) {
      yLow = day.y;
    }
  });

  if (yLow !== null) {
    return yLow;
  }
  return 0;
};
