import React, { Component } from "react";

export class GoogleAPI extends Component {
  async componentDidMount() {
    fetch(
      "https://www.googleapis.com/calendar/v3/calendars/it4rc4hnheh8dehno7c9dunads%40group.calendar.google.com/events?maxResults=5&key={YOUR_API_KEY}"
    )
      .then(r => r.json())
      .then(response => console.log("response", response))
      .catch(err => console.error("error:", err));
  }
  render() {
    return <div>googleAPI</div>;
  }
}

export default GoogleAPI;
