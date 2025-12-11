import React, { useState } from "react"
import cloudinaryService from "../service/cloudinaryService"
import carService from "../service/carService"

function PostCarPage() {
  const [model, setModel] = useState("")
  const [brand, setBrand] = useState("")
  const [plate, setPlate] = useState("")
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let imageUrl = ""
    if (file) {
      const uploaded = await cloudinaryService.uploadOneImage(file)
      imageUrl = uploaded
    }

    const carData = {
      model,
      brand,
      plate,
      imageUrl
    }

    const created = await carService.post(carData)

    alert("Car created!")
    console.log(created)
  }

  return (
    <div>
      <h2>Add Car</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Plate"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button type="submit">Create Car</button>
      </form>
    </div>
  )
}

export default PostCarPage
