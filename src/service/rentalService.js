const API_URL = "http://localhost:8080/api/rentals";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  return {
    "Content-Type": "application/json",
  };
};

const rentalService = {
  getMyRentals: async () => {
    const response = await fetch(`${API_URL}/me`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch my rentals");
    }
    return response.json();
  },

  createRental: async (rentalRequest) => {
    // rentalRequest chính là { carId, startDate, endDate }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(rentalRequest),
    });

    if (!response.ok) {
      // Đọc thông báo lỗi từ backend (VD: "Car is not available")
      const errorText = await response.text();
      // Nếu text là JSON thì parse, không thì trả về text
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Failed to book car");
      } catch (e) {
        throw new Error(errorText || "Failed to book car");
      }
    }

    return response.json();
  },
};

export default rentalService;
