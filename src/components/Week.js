import React, { Component, createContext } from "react";
import WeekDay from "./WeekDay";
import moment from "moment";
import WeekChart from "./WeekChart.jsx";
import GoogleLogin from "./GoogleLogin";
export const WeekContext = createContext();

export default class Week extends Component {
  state = {
    days: [
      { day: "SUN", timeTotal: 0 },
      { day: "MON", timeTotal: 0 },
      { day: "TUES", timeTotal: 0 },
      { day: "WED", timeTotal: 0 },
      { day: "THURS", timeTotal: 0 },
      { day: "FRI", timeTotal: 0 },
      { day: "SAT", timeTotal: 0 }
    ]
  };
  changeTime = num => newTotal => {
    console.log("changing:", num, newTotal);
    const newDays = [...this.state.days];
    newDays[num].timeTotal = newTotal;
    this.setState({ days: newDays });
  };
  render() {
    const sundayMorning = moment()
      .startOf("week")
      .add(8.5, "hours");

    return (
      <WeekContext.Provider value={this.state.days}>
        <div>
          <GoogleLogin />
          <WeekChart />
          {[0, 1, 2, 3, 4, 5, 6].map(num => (
            <WeekDay
              key={num}
              initialStartTime={sundayMorning
                .clone()
                .add(num, "days")
                .unix()}
              initialEndTime={sundayMorning
                .clone()
                .add(num, "days")
                .add(8, "hours")
                .unix()}
              changeTime={this.changeTime(num)}
            />
          ))}
        </div>
      </WeekContext.Provider>
    );
  }
}
