import React from 'react'

const FileButton = (props) => {
   

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input type="file" value={props.selectedFile} onChange={props.onChange}/>
          <input type="submit" value="Upload File" />
        </form>
    </div>
  )
}

export default FileButton