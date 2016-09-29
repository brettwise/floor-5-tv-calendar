import React, { Component } from 'react';
import GetEvents from './getEvents';
import TitleAndTime from './titleAndTime';

function getBOD() {
  let start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);
  start.setMilliseconds(0);
  return start.toISOString();
}

function getEOD() {
  let end = new Date();
  end.setHours(23);
  end.setMinutes(59);
  end.setSeconds(59);
  end.setMilliseconds(999);
  return end.toISOString();
}


function makeGoogleCalendarURL(calID) {
  return `https://www.googleapis.com/calendar/v3/calendars/${calID}/events?singleEvents=true&orderBy=startTime&timeMin=${getBOD()}&timeMax=${getEOD()}&key=AIzaSyB58sYwucI7ZGG2_nVhqadyRk0_kEjw04E`
}

const floorSpaces = {
  community:       makeGoogleCalendarURL("theedney.com_lsgotg320507m2s8tnchqsd1v0@group.calendar.google.com")
, f5accelerator:   makeGoogleCalendarURL("theedney.com_acrpuqqea0sus4irgf8m52466c@group.calendar.google.com")
, largeconference: makeGoogleCalendarURL("theedney.com_ebmlbbh0qcu7u6dgdc98ti58k4@group.calendar.google.com")
, smallconference: makeGoogleCalendarURL("theedney.com_3s22k2kouob2co8kdt6gqkg14g@group.calendar.google.com")
};

class App extends Component {
  render() {
    return (
      <div>
        <TitleAndTime/>
        <div className="side-padding">
          <div className="grid">
            <div className="la">
              <h2 className="event-space"><div className="left-arrow">➤</div>Accelerator Space</h2>
              <GetEvents SpacesCalURL={floorSpaces.f5accelerator}/>
            </div>
            <div className="ra">
              <h2 className="event-space neg-right-margin">Community Space  ➤</h2>
              <GetEvents SpacesCalURL={floorSpaces.community}/>
            </div>
          </div>
          <div className="grid">
            <div className="la">
              <h2 className="event-space"><div className="left-arrow">➤</div>Small Conference Room</h2>
              <GetEvents SpacesCalURL={floorSpaces.smallconference}/>
            </div>
            <div className="ra">
              <h2 className="event-space neg-right-margin">Large Conference Room  ➤</h2>
              <GetEvents SpacesCalURL={floorSpaces.largeconference}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
