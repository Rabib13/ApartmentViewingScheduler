import React, { useState } from 'react';

function SlotForm({ addSlot }) {
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addSlot(time);
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Slot Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Add Slot</button>
    </form>
  );
}

export default SlotForm;
