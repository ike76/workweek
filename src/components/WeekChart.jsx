import React, { Component, Fragment } from "react";
import styled from "styled-components";
import ReactTable from "react-table";
import { WeekContext } from "./Week";
import moment from "moment";
import Moment from "react-moment";
const WeekGrid = styled.div`
  width: 250px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  p {
    margin: 3px;
  }
`;

export class WeekChart extends Component {
  sumTime = daysArray => {
    const sum = daysArray.reduce((totalTime, day) => {
      return (totalTime += day.timeTotal);
    }, 0);
    return moment.duration(sum * 1000);
  };
  componentDidMount() {
    window.moment = moment;
  }
  render() {
    return (
      <WeekContext.Consumer>
        {days => (
          <WeekGrid>
            <p>total:</p>
            <p>{this.sumTime(days).asHours()} hrs</p>

            {days.map(day => (
              <Fragment key={day.day}>
                <p>{day.day}</p>
                <p>{day.timeTotal}</p>
              </Fragment>
            ))}
          </WeekGrid>
        )}
      </WeekContext.Consumer>
    );
  }
}
WeekChart.contextType = WeekContext;
export default WeekChart;
