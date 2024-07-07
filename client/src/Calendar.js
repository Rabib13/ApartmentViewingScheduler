import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/slots')
      .then(response => {
        const slots = response.data.map(slot => ({
          id: slot._id,
          title: slot.booked ? `Booked by ${slot.name}` : 'Available',
          start: new Date(slot.time),
          end: new Date(new Date(slot.time).getTime() + 60 * 60 * 1000), // assuming each slot is 1 hour
          allDay: false,
          booked: slot.booked,
          name: slot.name,
          email: slot.email
        }));
        setEvents(slots);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSelectSlot = (slotInfo) => {
    if (!slotInfo.slots[0].booked) {
      setSelectedSlot(slotInfo);
    }
  };

  const handleBookSlot = () => {
    if (selectedSlot && name && email) {
      axios.put(`http://localhost:5000/slots/${selectedSlot.slots[0].id}`, { name, email })
        .then(response => {
          setEvents(events.map(event => 
            event.id === response.data._id ? { ...event, title: `Booked by ${name}`, booked: true } : event
          ));
          setSelectedSlot(null);
          setName('');
          setEmail('');
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 500 }}
      />
      {selectedSlot && !selectedSlot.slots[0].booked && (
        <div>
          <h3>Book Slot</h3>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleBookSlot}>Book Slot</button>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
