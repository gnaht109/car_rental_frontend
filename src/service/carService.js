const API = "http://localhost:8080/api/cars"

const getAuthHeader = () => {
  const token = localStorage.getItem("token")
  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }
  return { "Content-Type": "application/json" }
}

const post = async (car) => {
  const res = await fetch(API, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(car),
  })

  if (!res.ok) throw new Error("Failed to create car")

  return res.json()
}

const carService = {
    post,
}

export default carService;