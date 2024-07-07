import React, { useState } from 'react';

function Slot({ slot, bookSlot, deleteSlot }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleBook = () => {
    bookSlot(slot._id, name, email);
  };

  return (
    <div>
      <p>{slot.time} {slot.booked ? `(Booked by ${slot.name})` : ''}</p>
      {!slot.booked && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleBook}>Book Slot</button>
        </div>
      )}
      <button onClick={() => deleteSlot(slot._id)}>Delete Slot</button>
    </div>
  );
}

export default Slot;
