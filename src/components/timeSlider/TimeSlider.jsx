import React, { Fragment, Component } from "react";
import Slider from "@material-ui/lab/Slider";
import Moment from "react-moment";
class TimeSlider extends Component {
  state = {
    min: null,
    max: null
  };
  componentDidMount() {
    this.setState({
      min: this.props.initialTime - 60 * 60 * 2,
      max: this.props.initialTime + 60 * 60 * 2
    });
  }
  checkAndChange = () => {
    const { adjustedTime } = this.props;
    const atEarliest = adjustedTime === this.state.min;
    if (atEarliest) this.allowEarlier();
    const atLatest = adjustedTime === this.state.max;
    if (atLatest) this.allowLater();
  };
  allowEarlier = () => {
    const twoHours = 60 * 60 * 2;
    this.setState({
      min: this.state.min - twoHours,
      max: this.state.max - twoHours
    });
  };
  allowLater = () => {
    const twoHours = 60 * 60 * 2;
    this.setState({
      max: this.state.max + twoHours,
      min: this.state.min + twoHours
    });
  };
  render() {
    const { adjustedTime, initialTime, changeTime, label } = this.props;

    return (
      <Fragment>
        {label} •{" "}
        <Moment unix date={adjustedTime || initialTime} format="ddd" />
        {" • "}
        <b>
          <Moment unix date={adjustedTime || initialTime} format="h:mm a" />
        </b>
        <Slider
          value={adjustedTime || initialTime}
          min={this.state.min}
          max={this.state.max}
          step={60 * 15}
          onChange={changeTime}
          onDragEnd={this.checkAndChange}
        />
      </Fragment>
    );
  }
}

export default TimeSlider;
