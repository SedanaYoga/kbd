import React, { useState } from 'react'
import { storage } from '../../firebase/firebase.init'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { uploadFiles } from '../../firebase/firebase.utils'

const FileUploadComp = () => {
  const [imageUpload, setImageUpload] = useState(null)
  const uploadImage = async () => {
    const downloadUrl = await uploadFiles(imageUpload, 'image')
    console.log(downloadUrl)
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
