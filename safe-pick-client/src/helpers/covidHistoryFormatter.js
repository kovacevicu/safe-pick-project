function formatHistory(covidHistory) {
  const newCases = [];
  const days = [];
  let history = covidHistory.reverse();
  let newInt = 0;
  for (let i = 0; i < history.length; i++) {
    if (!history[i].cases.new) {
      newInt = 0;
    } else {
      newInt = parseInt(history[i].cases.new.split("+")[1]);
    }
    newCases.push(newInt);
    days.push(history[i].day);
  }
  return [newCases, days];
}
export default formatHistory;
