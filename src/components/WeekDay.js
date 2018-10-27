import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";
import Moment from "react-moment";
const styles = {
  card: {
    minWidth: 275,
    maxWidth: 300
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class WeekDay extends Component {
  state = {
    startRange: {
      min: 1533564000 - 60 * 60 * 2,
      max: 1533564000 + 60 * 60 * 7
    },
    startTime: 1533564000, // today 9am
    endTime: 1533571200 // today 4pm
  };

  setStartTime = (e, unixTime) => {
    this.setState({ startTime: unixTime });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            <Moment unix date={this.state.startTime} format="MM/DD/YY h:mm a" />
          </Typography>
          <Slider
            value={this.state.startTime}
            min={this.state.startRange.min}
            max={this.state.startRange.max}
            step={60 * 15}
            onChange={this.setStartTime}
          />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(WeekDay);
