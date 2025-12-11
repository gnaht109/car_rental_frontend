import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import carService from "../../service/carService";
import rentalService from "../../service/rentalService";

function RentalFillPage() {
  const { id } = useParams(); // Lấy ID xe từ URL
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [rentalDays, setRentalDays] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Lấy thông tin xe để hiển thị
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await carService.getById(id);
        // Xử lý wrapper (result/data)
        const carData = response.result || response.data || response;
        setCar(carData);
      } catch (err) {
        console.error(err);
        setError("Could not load car details.");
      }
    };
    if (id) fetchCar();
  }, [id]);

  // 2. Tự động tính tiền khi người dùng chọn ngày
  useEffect(() => {
    if (car && formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);

      // Kiểm tra ngày hợp lệ
      if (end > start) {
        const diffTime = Math.abs(end - start);
        // Làm tròn lên (thuê 1.5 ngày tính tiền 2 ngày, hoặc tùy logic của bạn)
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setRentalDays(days);
        setTotalPrice(days * car.pricePerDay);
      } else {
        setRentalDays(0);
        setTotalPrice(0);
      }
    }
  }, [formData, car]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate cơ bản
    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      setError("End date must be after start date.");
      setLoading(false);
      return;
    }

    try {
      // Chuẩn bị dữ liệu đúng khớp với RentalCreationRequest.java
      const requestData = {
        carId: Number(id), // Đảm bảo là số (Long)
        startDate: formData.startDate, // Dạng "2024-02-15T10:30" (Khớp LocalDateTime)
        endDate: formData.endDate,
      };

      console.log("Submitting Request:", requestData);

      await rentalService.createRental(requestData);

      alert("Booking successful! Redirecting to your rentals...");
      navigate("/my-rentals"); // Chuyển về trang lịch sử
    } catch (err) {
      console.error("Booking Error:", err);
      // Hiển thị lỗi từ backend (ví dụ: Xe đã có người đặt)
      setError(err.message || "Failed to book car. Please check inputs.");
    } finally {
      setLoading(false);
    }
  };

  if (!car)
    return (
      <div className="container mt-5 text-center">Loading car info...</div>
    );

  return (
    <section className="container mt-5 mb-5">
      <h2 className="mb-4">Complete Your Booking</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {/* CỘT TRÁI: Form nhập liệu */}
        <div className="col-md-7">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3 text-primary">Select Dates</h4>
            <form onSubmit={handleSubmit}>
              {/* Start Date */}
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Pick-up Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  className="form-control"
                  required
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              {/* End Date */}
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Drop-off Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  className="form-control"
                  required
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>

              <hr />

              {/* Hiển thị tính toán tạm tính */}
              <div className="d-flex justify-content-between mb-2">
                <span>Duration:</span>
                <span className="fw-bold">{rentalDays} days</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Total Estimated Price:</span>
                <span className="h4 text-danger fw-bold">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-accent btn-block w-100 py-2" // Class này từ file CSS của bạn
                disabled={loading || totalPrice <= 0}
                style={{ backgroundColor: "#0d6efd", color: "white" }} // Style inline dự phòng
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>

        {/* CỘT PHẢI: Thông tin xe tóm tắt */}
        <div className="col-md-5">
          <div className="card shadow-sm">
            <img
              src={car.imgUrl || "/images/placeholder.jpg"}
              className="card-img-top"
              alt={car.model}
              style={{ height: "250px", objectFit: "cover" }}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400?text=Car+Image")
              }
            />
            <div className="card-body">
              <h4 className="card-title">
                {car.brand} {car.model}
              </h4>
              <p className="card-text text-muted mb-2">
                Plate: {car.plate} • {car.seat} Seats
              </p>

              <div className="alert alert-light border">
                <strong>Price per day: </strong>
                <span className="text-success fw-bold">${car.pricePerDay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RentalFillPage;
