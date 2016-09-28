import React from 'react';
import axios from 'axios';

export default class GetEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    axios.get(this.props.SpacesCalURL)
      .then(res => {
        const events = res.data.items.map(function(event) {
          let startTime = new Date(event.start.dateTime);
          let endTime = new Date(event.end.dateTime);

          function pad(n) {
            return (n < 10) ? ("0" + n) : n;
          }

          if ( endTime.getHours() > 12 ){
            var endHours = endTime.getHours() % 12;
            var endAMPM = "PM";
          } else {
            endHours = pad(endTime.getHours());
            endAMPM = "AM";
          }
          if ( startTime.getHours() > 12 ){
            var startHours = startTime.getHours() % 12;
            var startAMPM = "PM";
          } else {
            startHours = pad(startTime.getHours());
            startAMPM = "AM";
          }

          if(startAMPM === endAMPM) {
            event.start.time = `${startHours}:${pad(startTime.getMinutes())}`;
            event.end.time = `${endHours}:${pad(endTime.getMinutes())} ${endAMPM}`;
          } else {
            event.start.time = `${startHours}:${pad(startTime.getMinutes())} ${startAMPM}`;
            event.end.time = `${endHours}:${pad(endTime.getMinutes())} ${endAMPM}`;
          }
          return event;
        });
        this.setState({ events });
      });
  }

  render() {
    return (
      <div>
        {this.state.events.map(event =>
          <div key={event.id}>
            <p className="event-title">{event.summary}</p>
            <p className="event-time">{event.start.time} - {event.end.time}</p>
          </div>
        )}
      </div>
    )
  }
}
