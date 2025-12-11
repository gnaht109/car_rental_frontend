import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import carService from "../../service/carService";

function CarDetailPage() {
  const { id } = useParams(); // Get the 'id' from the URL (e.g., /cars/1)
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await carService.getById(id);
        const carData = response.result || response.data;
        setCar(carData); //Lưu dữ liệu vào state
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!car) {
    return (
      <section>
        <div className="container">
          <h1 className="page-title">Car Not Found</h1>
          <p className="page-subtitle">
            Sorry, the car you are looking for does not exist.
          </p>
          <div style={{ textAlign: "center" }}>
            <Link to="/cars" className="btn btn-primary">
              Back to Collection
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    // <section className="car-detail-page">
    //   <div className="container">
    //     <h1>{car.name}</h1>
    //     <div className="detail-content-layout">
    //       <div className="image-gallery">
    //         <img src={car.detailImage || car.image} alt={car.name} />
    //       </div>
    //       <aside className="info-and-booking">
    //         <h2>Description</h2>
    //         <p>{car.description}</p>
    //         <h2>Specifications</h2>
    //         <ul className="specs-list">
    //           {Object.entries(car.specs).map(([key, value]) => (
    //             <li key={key}>
    //               <strong>
    //                 {key.replaceAll(/([A-Z])/g, " $1").toUpperCase()}:
    //               </strong>{" "}
    //               {value}
    //             </li>
    //           ))}
    //         </ul>
    //         <div className="booking-box">
    //           <div className="price-display">
    //             <span>From</span>
    //             <span className="price-amount">${car.price}</span>
    //             <span>/ day</span>
    //           </div>
    //           <Link to="/checkout" className="btn btn-accent btn-block">
    //             Book Now
    //           </Link>
    //         </div>
    //       </aside>
    //     </div>
    //   </div>
    // </section>

    <section className="car-detail-page">
      <div className="container">
        {/* 2. Sửa các trường dữ liệu cho khớp với API */}
        <h1>
          {car.brand} {car.model}
        </h1>{" "}
        {/* API trả về brand và model, không phải name */}
        <div className="detail-content-layout">
          <div className="image-gallery">
            {/* API trả về imgUrl */}
            <img src={car.imgUrl} alt="car" />
          </div>

          <aside className="info-and-booking">
            <h2>Details</h2>
            <p>
              <strong>Plate:</strong> {car.plate}
            </p>
            <p>
              <strong>Seats:</strong> {car.seat}
            </p>

            {/* Vì API hiện tại chưa có description hay specs, tạm ẩn hoặc hardcode */}
            {/* <p><strong>Description:</strong> {car.description}</p>
          <p><strong>Specs:</strong> {car.specs}</p> */}

            <div className="booking-box">
              <div className="price-display">
                <span>From</span>
                {/* API trả về pricePerDay */}
                <span className="price-amount">${car.pricePerDay}</span>
                <span>/ day</span>
              </div>
              <Link
                to={`/checkout/${car.id}`}
                className="btn btn-accent btn-block"
              >
                Book Now
              </Link>

              {/* Tạm thời ẩn button Book Now */}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CarDetailPage;
