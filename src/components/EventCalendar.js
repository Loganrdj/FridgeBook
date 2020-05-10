import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import firebase from './firebase.js';
import { eventReceive } from "@fullcalendar/core";



class EventCalendar extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      calendarItems: []
    }
  }
  /**
   * adding dragable properties to external events through javascript
   */
  

  componentDidMount() {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".savedRecipes",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id,
        };
      }
    });
    // const calendarRef = firebase.database().ref('Recipes2');
    // calendarRef.on('value', (snapshot) => {
    //   let calendarItems = snapshot.val();
    //   let calendarState = [];
    //   for (let calendarItem in calendarItems) {
    //     calendarState.push({
    //       id: calendarItem,
    //       title: calendarItems[this.eventReceive].title,
    //     });
    //   }
    //   this.setState({
    //     calendarItems: calendarState
    //   });
    // });

    const itemsRef = firebase.database().ref('savedRecipes');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
        });
      }
      this.setState({
        items: newState
      });
    });
    
    

  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/savedRecipes/${itemId}`);
    itemRef.remove();
  }

  /**
   * when we click on event we are displaying event details
   */
  eventClick = eventClick => {
    Alert.fire({
      title: eventClick.event.title,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Remove Recipe",
      cancelButtonText: "Close"
    }).then(result => {
      if (result.value) {
        eventClick.event.remove(); // It will remove event from the calendar
        Alert.fire("Deleted!", "Your Recipe has been deleted.", "success");
      }
    });
  };

  // eventReceive = eventReceive => {
  //   Alert.fire({
  //     title: eventReceive.event.title,
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Save Recipe?",
  //     cancelButtonText: "Close"
  //   }).then(result => {
  //       firebase.database().ref().child('Recipes2').push(eventReceive.event.title);
  //       console.log(eventReceive.event.title);
  //       console.log(eventReceive.event._instance.range.start);
  //   })
  //   }
      
  render() {
    return (
      <div className="animated fadeIn p-4 demo-app fade-in">
        <Row>
          <Col lg={3} sm={3} md={3}>
            <div
              id="external-events"
              style={{
                padding: "10px",
                width: "80%",
                height: "auto",
                maxHeight: "-webkit-fill-available"
              }}
            >
              <p align="center">
                <strong> Stored Recipes</strong>
              </p>
              {this.state.items.map(recipe => (
                <div
                  className="savedRecipes rounded-md bg-black-500 text-white hover:bg-gray-400 disabled:opacity-50 margin:2px border:gray"
                  title={recipe.title}
                  data={recipe.image}
                  key={recipe.id}
                >
                  {recipe.title}
                  <button className = "btn btn-secondary btn-sm active removeList left-0" onClick={() => this.removeItem(recipe.id)}>Remove</button>
    
                  <br></br>
                </div>
              ))}
            </div>
          </Col>

          <Col lg={9} sm={9} md={9}>
            <div className="demo-app-calendar" id="mycalendartest">
              <FullCalendar
                defaultView="dayGridMonth"
                header={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                rerenderDelay={10}
                eventDurationEditable={false}
                editable={true}
                droppable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={this.calendarComponentRef}
                weekends={this.state.calendarWeekends}
                events={this.state.calendarEvents}
                eventDrop={this.drop}
                // drop={this.drop}
                eventReceive={this.eventReceive}
                eventClick={this.eventClick}
                // selectable={true}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default EventCalendar;