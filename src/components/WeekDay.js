import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import TimeSlider from "./timeSlider/TimeSlider.jsx";
import Duration from "./timeSlider/Duration.jsx";
import moment from "moment";

const DayBox = styled.div`
  margin: 1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 50px;
  grid-template-areas: "sliders weekday" "sliders duration" "sliders button";
  grid-gap: 1rem;
  /* align-items: center; */
  box-shadow: 2px 2px 4px 2px #cecece7a;
  border-radius: 10px;
  max-width: 300px;
  opacity: ${p => (p.faded ? 0.3 : 1)};
  transition: opacity 1s;
`;

class WeekDay extends Component {
  state = {
    startTime: null, // today 9am
    endTime: null, // today 4pm
    startAdjusted: false,
    endAdjusted: false,
    faded: true
  };

  changeStartTime = (e, unixTime) => {
    this.setState({ startTime: unixTime });
    if (!this.state.startAdjusted)
      this.setState({ startAdjusted: true }, this.handleNewDuration);
    if (this.state.startAdjusted) this.handleNewDuration();
  };
  changeEndTime = (e, unixTime) => {
    this.setState({ endTime: unixTime });
    if (!this.state.endAdjusted)
      this.setState({ endAdjusted: true }, this.handleNewDuration);
    if (this.state.endAdjusted) this.handleNewDuration();
  };
  handleNewDuration = () => {
    const { changeTime } = this.props;
    if (this.state.faded) this.setState({ faded: false });
    // console.log("new duration", this.getDuration());
    changeTime(this.getDuration());
  };
  getDuration = () => {
    const { startTime, endTime, startAdjusted, endAdjusted } = this.state;
    const { initialStartTime, initialEndTime, changeTime } = this.props;
    const startTimeUse = startAdjusted ? startTime : initialStartTime;
    const endTimeUse = endAdjusted ? endTime : initialEndTime;
    const duration = endTimeUse - startTimeUse;
    return duration;
  };
  turnOff = () => {
    const { changeTime } = this.props;
    this.setState({ faded: true });
    changeTime(0);
  };
  render() {
    const { faded, startTime } = this.state;
    const { initialStartTime, initialEndTime, changeTime } = this.props;

    return (
      <DayBox faded={faded}>
        <Button
          size="small"
          color="primary"
          variant={faded ? "outlined" : "contained"}
          style={{ gridArea: "button" }}
          onClick={!faded ? this.turnOff : this.handleNewDuration}
        >
          {faded ? "off" : "on"}
        </Button>
        <div style={{ gridArea: "sliders" }}>
          <TimeSlider
            initialTime={initialStartTime}
            adjustedTime={this.state.startTime}
            changeTime={this.changeStartTime}
            label="Start"
          />
          <TimeSlider
            initialTime={initialEndTime}
            adjustedTime={this.state.endTime}
            changeTime={this.changeEndTime}
            label="End"
          />
        </div>
        <div style={{ gridArea: "duration" }}>
          <Duration seconds={this.getDuration()} />
        </div>
        <div style={{ gridArea: "weekday", fontWeight: "bold" }}>
          <span>
            {moment((startTime || initialStartTime) * 1000)
              .format("ddd")
              .toUpperCase()}
          </span>
        </div>
      </DayBox>
    );
  }
}

WeekDay.propTypes = {
  initialStartTime: PropTypes.number.isRequired,
  initialEndTime: PropTypes.number.isRequired
};

export default WeekDay;
