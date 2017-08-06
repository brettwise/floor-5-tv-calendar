import React from 'react';
import axios from 'axios';

export default class GetEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  queryEvents() {
    axios.get(this.props.SpacesCalURL)
      .then(res => {
        const events = res.data.items.map(function(event) {
          let AMPM, endHours, startHours, endAMPM, startAMPM;
          let startTime = new Date(event.start.dateTime);
          let endTime = new Date(event.end.dateTime);
          let currentTime = new Date();

          function pad(n) {
            return (n < 10) ? ("0" + n) : n;
          }

          function twentyfourtotwelve(hours) {
            if ( hours > 11 ){
              AMPM = "PM";
            } else {
              AMPM = "AM";
            }
            hours = hours === 12 ? 12 : hours % 12
            return [hours, AMPM];
          }

          [startHours, startAMPM] = twentyfourtotwelve(startTime.getHours());
          [endHours, endAMPM] = twentyfourtotwelve(endTime.getHours());

          if(startAMPM === endAMPM) {
            event.start.time = `${startHours}:${pad(startTime.getMinutes())}`;
            event.end.time = `${endHours}:${pad(endTime.getMinutes())} ${endAMPM}`;
          } else {
            event.start.time = `${startHours}:${pad(startTime.getMinutes())} ${startAMPM}`;
            event.end.time = `${endHours}:${pad(endTime.getMinutes())} ${endAMPM}`;
          }

          if (currentTime.getTime() > startTime.getTime() && currentTime.getTime() < endTime.getTime()) {
            event.class = "current";
          } else if (endTime.getTime() < currentTime.getTime()) {
            event.class = "past";
          } else {
            event.class = "future";
          }
          return event;
      }).filter( event => {
        if(event.hasOwnProperty("visibility") && event.visibility === "private") {
          return false;
        } else {
          return true;
        }
      });
        this.setState({ events });
      });
    }

  componentDidMount() {
    this.queryEvents();
    window.setInterval(function () {
      this.queryEvents();
    }.bind(this), 5 * 60 * 1000);
  }

  render() {
    if (this.state.events.length === 0) {
      return (
        <div className="past">
          <p className="event-title">No Scheduled Events Today</p>
        </div>
      )
    } else if (this.state.events.length > 4){
      return (
        <div>
          {this.state.events
            .filter(event => event.class === "current" || event.class === "future")
            .slice(0, 4)
            .map(event =>
            <div key={event.id} className={event.class}>
              <p className="event-title">{event.summary}</p>
              <p className="event-time">{event.start.time} - {event.end.time}</p>
            </div>
            )
          }
        </div>
      )
    } else {
      return (
        <div>
          {this.state.events.map(event =>
            <div key={event.id} className={event.class}>
              <p className="event-title">{event.summary}</p>
              <p className="event-time">{event.start.time} - {event.end.time}</p>
            </div>
          )}
        </div>
      )
    }
  }
}
