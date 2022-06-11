import { uploadFiles } from '../../firebase/firebase.utils'
import { useState } from 'react'
import ReactPlayer from 'react-player'

const VideoComp = () => {
  const [videoUpload, setVideoUpload] = useState(null)
  const [videoToPlay, setVideoToPlay] = useState(null)
  const uploadVideo = async () => {
    const downloadUrl = await uploadFiles(videoUpload, 'video', videoUpload.name)
    console.log(downloadUrl)
    setVideoToPlay(downloadUrl)
  }
  const handleChange = async (event) => {
    setVideoUpload(event.target.files[0])
    await uploadVideo()
  }
  return (
    <div>
      <section>
        <input
          type='file'
          onChange={handleChange}
        />
      </section>

      {videoToPlay &&
        <ReactPlayer url={videoToPlay.downloadUrl} playing={true} controls={true} height='500px' width='280px' />
      }
    </div>
  );
}

export default VideoComp
