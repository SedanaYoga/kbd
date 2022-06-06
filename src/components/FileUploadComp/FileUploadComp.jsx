import React, { useState } from 'react'
import { storage } from '../../firebase/firebase.init'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

const FileUploadComp = () => {
  const [imageUpload, setImageUpload] = useState(null)
  const uploadImage = async () => {
    if (imageUpload === null) return
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    const uploadedImage = await uploadBytes(imageRef, imageUpload)
    console.log('Image Uploaded!', { uploadedImage })
  }
  return (
    <div>
      <section>
        <input
          type='file'
          onChange={(event) => setImageUpload(event.target.files[0])}
        />
        <button onClick={uploadImage}>Upload Image</button>
      </section>
    </div>
  )
}

export default FileUploadComp
