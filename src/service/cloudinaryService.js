const uploadOneImage = async file => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "ml_default")

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dppl7ce03/image/upload",
    { method: "POST", body: formData }
  )

  const data = await res.json()
  return data.secure_url
}

const cloudinaryService = {
    uploadOneImage,
}

export default cloudinaryService;
