
import { useState } from "react";
import '../design/Appointments.css'
/*const Appointments = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    console.log("Button clicked", name, phone, date, time);

    if (!name || !phone || !date || !time) {
      setMessage("All fields are required");
      return;
    }

    const appointmentData = { name, phone, date, time };

   try {
      setLoading(true);
      const response = await fetch("http://192.168.1.239:8080/bookappointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Appointment booked successfully!");
        setName("");
        setPhone("");
        setDate("");
        setTime("");
      } else {
        setMessage(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-container">
      <h2>Book a Repair Appointment</h2>
      {message && <p className="message">{message}</p>}
      <input className="appointment-input" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="appointment-input" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <label className="Date"> Date</label>
      <input className="appointment-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <label className="time">Time</label>
      <input className="appointment-input" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      
      <button onClick={handleBooking} className="appointment-button" disabled={loading}>
        {loading ? "Booking..." : "Schedule Appointment"}
      </button>
    </div>
  );
};*/

///Test component

const Appointments = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleBooking = () => {
    if (!name || !phone || !date || !time) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }

    fetch("http://192.168.12.125:8080/bookappointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, date, time }),
    })
      .then((response) => response.json())
      .then((data) => {

        /*Handling the response for successfully creating a new appointment
        in the database.*/
        console.log(data,'the data from the obj')
        if (data.message) {
          setMessage({ text: "✅ Appointment booked successfully!", type: "success" });
          setName("");
          setPhone("");
          setDate("");
          setTime("");
        } else {
          setMessage({ text: "❌ Failed to book appointment.", type: "error" });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage({ text: "❌ Something went wrong. Try again!", type: "error" });
      });
  };

  return (
    <div className="appointment-container">
      <h2>Book a Repair Appointment</h2>
      {message.text && <div className={`message-box ${message.type}`}>{message.text}</div>}
      <input className="appointment-input" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="appointment-input" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <label className="date-label"> Date</label>
      <input className="appointment-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <label className="time-label">Time</label>
      <input className="appointment-input" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button onClick={handleBooking} className="appointment-button">Schedule Appointment</button>
    </div>
  );
};

export default Appointments;

