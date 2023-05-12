
import React, { useState } from "react";


function TicketBooking(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  function handleSubmit(event) {
    event.preventDefault();

    // Validate form fields
    if (!name || !email || !phone) {
      alert("Please fill in all fields");
      return;
    }

    // Create booking object
    const booking = {
      name,
      email,
      phone,
      date: props.date,
      time: props.time,
      movie: props.movie,
      theater: props.theater,
      seats: props.selectedSeats,
    };

    // Submit booking to server (example using fetch)
    fetch("http://localhost:8000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Booking submitted:", data);
        const confirmationNumber = Math.floor(Math.random() * 100000000);
        alert("Booking successful! Your confirmation number is " + confirmationNumber);
        setName("");
        setEmail("");
        setPhone("");
      })
      .catch((error) => {
        console.error("Error submitting booking:", error);
        // TODO: Handle booking submission error
      });
  }


  return (
    <div className="book">
      <h1>Book Ticket</h1>
      <form id="form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <button type="submit">Finish Booking</button>
        <a href="/" className="cancel-link round-button">Cancel Booking</a>

      </form>
    </div>
  );
}

export default TicketBooking;
