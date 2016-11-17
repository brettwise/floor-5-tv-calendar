import React from 'react';

export default class CurrentTime extends React.Component {

  setTime() {

    let currentDate = new Date();
    let hours = 0;
    if( currentDate.dst() ) {
      hours = currentDate.getUTCHours() + parseInt(this.props.UTCOffset, 10);
    } else {
      hours = currentDate.getUTCHours() + (parseInt(this.props.UTCOffset, 10) - 1);
    }
    let minutes = currentDate.getUTCMinutes();
    let seconds = currentDate.getUTCSeconds();

    if( hours >= 24 ){ hours -= 24; }
    if( hours < 0   ){ hours += 12; }

    if ( hours > 12 ){ hours %= 12; }

    minutes += "";
    if( minutes.length === 1 ){ minutes = "0" + minutes; }

    seconds += "";
    if( seconds.length === 1){ seconds = "0" + seconds; }

    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  componentWillMount() {
    this.setTime();
  }

  componentDidMount() {
    window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);
  }

  render() {
    return(
      <span className="time uppercase">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</span>
    )
  }
}
Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}
