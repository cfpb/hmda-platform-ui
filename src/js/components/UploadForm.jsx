import React, { PropTypes } from 'react'
import Progress from './Progress.jsx'

const Upload = (props) => (
  <div className="UploadForm usa-grid-full">
    <form className="usa-form" encType="multipart/form-data" onSubmit={e => props.handleSubmit(e, props.file)}>
      <input id="hmdaFile" name="hmdaFile" type="file" onChange={props.setFile}></input>
      <input className="usa-button" id="uploadButton" name="uploadButton" type="submit" value="Upload"></input>
    </form>
    {props.file
      ? <Progress progress={props.bytesUploaded} total={props.file.size} units="bytes" descriptor="uploaded"/>
      : null
    }
  </div>
)

Upload.propTypes = {
  handleSubmit: PropTypes.func,
  setFile: PropTypes.func,
  uploading: PropTypes.bool,
  bytesUploaded: PropTypes.number,
  file: PropTypes.object
}

export default Upload
