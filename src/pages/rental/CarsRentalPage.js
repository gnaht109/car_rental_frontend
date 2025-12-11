import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rentalService from "../../service/rentalService";

function CarsRentalPage() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Fetch user's rentals
  const fetchMyRentals = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await rentalService.getMyRentals();
      // Handle different response formats
      if (Array.isArray(response)) {
        setRentals(response);
      } else if (response.data && Array.isArray(response.data)) {
        // Truong hop API tra ve dang { data: [...] }
        setRentals(response.data);
      } else if (response.code === 1000 && Array.isArray(response.data)) {
        // Truong hop API tra ve dang { code: 1000, data: [...] }
        setRentals(response.data);
      } else {
        console.error("Unexpected response format:", response);
        setRentals([]);
      }
    } catch (error) {
      console.error("Error fetching my rentals:", error);
      setError("Failed to load your rentals. Please try again.");
      setRentals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRentals();
  }, []);

  // Filter rentals based on search term
  const filteredRentals = Array.isArray(rentals)
    ? rentals.filter((rental) => {
        const car = rental.car || {};
        const searchLower = searchTerm.toLowerCase();
        return (
          // car.brand?.toLowerCase().includes(searchLower) ||
          // car.model?.toLowerCase().includes(searchLower) ||
          // car.plate?.toLowerCase().includes(searchLower) ||
          // rental.id?.toString().includes(searchTerm) ||
          // rental.status?.toLowerCase().includes(searchLower)

          (rental.carModel &&
            rental.carModel.toLowerCase().includes(searchLower)) ||
          (rental.status &&
            rental.status.toLowerCase().includes(searchLower)) ||
          (rental.rentalId && rental.rentalId.toString().includes(searchTerm))
        );
      })
    : [];

  // Format price in VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    const statusUpper = status?.toUpperCase() || "";
    if (statusUpper === "ACTIVE") {
      return {
        backgroundColor: "rgba(62, 207, 142, 0.2)",
        color: "#3ecf8e",
        padding: "0.25rem 0.75rem",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: "600",
        display: "inline-block",
      };
    } else if (statusUpper === "COMPLETED") {
      return {
        backgroundColor: "rgba(139, 147, 167, 0.2)",
        color: "#8b93a7",
        padding: "0.25rem 0.75rem",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: "600",
        display: "inline-block",
      };
    } else if (statusUpper === "PENDING") {
      return {
        backgroundColor: "rgba(245, 197, 24, 0.2)",
        color: "#f5c518",
        padding: "0.25rem 0.75rem",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: "600",
        display: "inline-block",
      };
    } else if (statusUpper === "CANCELLED") {
      return {
        backgroundColor: "rgba(255, 100, 100, 0.2)",
        color: "#ff6464",
        padding: "0.25rem 0.75rem",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: "600",
        display: "inline-block",
      };
    }
    return {
      backgroundColor: "rgba(139, 147, 167, 0.2)",
      color: "#8b93a7",
      padding: "0.25rem 0.75rem",
      borderRadius: "12px",
      fontSize: "0.85rem",
      fontWeight: "600",
      display: "inline-block",
    };
  };

  return (
    <section className="car-listing-page">
      <div className="container">
        <h1 className="page-title">My Rentals</h1>
        <p className="page-subtitle">
          View all the cars you have rented or are currently renting.
        </p>

        {error && (
          <div
            className="error-message"
            style={{
              color: "red",
              marginBottom: "1rem",
              padding: "0.75rem",
              backgroundColor: "#fee",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        {/* Search */}
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="text"
            placeholder="Search by car brand, model, plate, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "0.75rem",
              fontSize: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="loading">Loading your rentals...</div>
        ) : (
          <>
            {/* Empty State */}
            {filteredRentals.length === 0 && !loading ? (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                  {rentals.length === 0
                    ? "You haven't rented any cars yet."
                    : "No rentals match your search."}
                </p>
                {rentals.length === 0 && (
                  <Link to="/cars" className="btn btn-primary">
                    Browse Available Cars
                  </Link>
                )}
              </div>
            ) : (
              /* Rentals Grid */
              <div className="car-grid">
                {filteredRentals.map((rental) => {
                  const car = rental.car || {};
                  return (
                    <div key={rental.id} className="car-card">
                      <img
                        src={car.imgUrl || "/images/placeholder.jpg"}
                        alt={`${car.brand} ${car.model}`}
                        onError={(e) => {
                          e.target.src = "/images/placeholder.jpg";
                        }}
                      />
                      <div className="car-card-content">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <h3>
                            {rental.brand} {rental.model}
                          </h3>
                          <span style={getStatusBadge(rental.status)}>
                            {rental.status || "UNKNOWN"}
                          </span>
                        </div>
                        <p style={{ margin: "0.5rem 0" }}>
                          <strong>Plate:</strong> {car.plate || "N/A"}
                        </p>
                        <p style={{ margin: "0.5rem 0" }}>
                          <strong>Rental Period:</strong>{" "}
                          {formatDate(rental.startDate)} -{" "}
                          {formatDate(rental.endDate)}
                        </p>
                        {rental.totalPrice && (
                          <p className="price" style={{ margin: "0.5rem 0" }}>
                            <strong>Total:</strong>{" "}
                            {formatPrice(rental.totalPrice)}
                          </p>
                        )}
                        <div style={{ marginTop: "1rem" }}>
                          <Link
                            to={`/cars/${car.id}`}
                            className="btn btn-primary"
                            style={{ width: "100%" }}
                          >
                            View Car Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default CarsRentalPage;
