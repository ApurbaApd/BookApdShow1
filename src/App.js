
import React, { useState, useEffect } from "react";
import TicketBooking from "./components/TicketBooking";
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.log(error));
  }, []);

  const handleShowClick = (show) => {
    console.log("handleShowClick called with show:", show);
    setSelectedShow(show);
  };

  const handleBookingClick = () => {
    setBookingFormOpen(true);
  };

  const handleBookingClose = () => {
    setBookingFormOpen(false);
    setSelectedShow(null);
  };

  const renderShows = () => {
    return (
      <div className="shows-container">
        <h2
          style={{
            textShadow:
              "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de",
            color: "#fff",
            fontSize: "40px",
          }}
        >
          Shows
        </h2>

        <div className="shows">
          {shows.map((show, index) => (
            <div key={index} className="show">
              <h3 style={{ color: "ButtonFace" }}>{show.show.name}</h3>
              {show.show.image ? (
                <img src={show.show.image.medium} alt={show.show.name} />
              ) : (
                <img
                  src="https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
                  alt="not available"
                />
              )}
              <h3 style={{ color: "Blue", fontSize: "40px" }}>
                {show.show.rating.average}
              </h3>

              <h3>{show.show.language}</h3>
              <h3>{show.show.genres[0]}</h3>
              <button onClick={() => handleShowClick(show)}>
                View Details to Book
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };


  const renderSelectedShow = () => {
    if (!selectedShow) {
      return null;
    }

    const imageUrl = selectedShow.show?.image?.medium;
    const savedImageUrl =
      "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";

    return (
      <div className="shows-container">
        <h2
          style={{
            textShadow:
              "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de",
            color: "#fff",
            fontSize: "30px",
          }}
        >
          {selectedShow.show.name}
        </h2>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={selectedShow.show.name}
            style={{
              width: "400px",
              height: "auto",
              borderRadius: "5px",
              marginRight: "2rem",
            }}
          />
        ) : (
          <img
            src={savedImageUrl}
            alt={selectedShow.show.name}
            style={{ width: "400px", height: "auto", borderRadius: "5px" }}
          />
        )}
        <div style={{ display: "flex" }}>
          <h3 style={{ display: "inline-block", marginRight: "30px" }}>
            {selectedShow.show.language}
          </h3>
          <h3 style={{ display: "inline-block" }}>
            {selectedShow.show.genres[0]}
          </h3>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid blue",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "30px",
                color: "ButtonShadow",
              }}
            >
              {selectedShow.show.rating.average}
            </div>
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                clip: "rect(0, 50px, 50px, 25px)",
                backgroundColor:
                  selectedShow.show.rating.average > 5 ? "#00ff00" : "#00BFFF",
              }}
            ></div>
          </div>
        </div>

        <div
          className="summary"
          dangerouslySetInnerHTML={{
            __html: selectedShow.show.summary
              .replace(/<p>/g, "")
              .replace(/<\/p>/g, ""),
          }}
        ></div>
        <div className="button-container">
          <a href="/" className="cancel-link round-button">
            Back
          </a>
          <button onClick={handleBookingClick}>Book Ticket</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {selectedShow ? renderSelectedShow() : renderShows()}
      {bookingFormOpen && (
        <TicketBooking
          showName={selectedShow.show.name}
          onClose={handleBookingClose}
        />
      )}
    </div>
  );
}

export default App;
