import React from "react";
import moment from "moment";
import styled from "styled-components";

const DurationDiv = styled.div`
  div {
    text-align: center;
    color: grey;
  }
`;
const Duration = ({ seconds }) => {
  return (
    <DurationDiv>
      <div>{moment.duration(seconds * 1000).hours()} hrs</div>
      <div>{moment.duration(seconds * 1000).minutes()} min</div>
    </DurationDiv>
  );
};

export default Duration;
