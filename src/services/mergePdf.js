import Axios from 'axios'

export default {
  process: (files, destinationName) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file)
    })
    return Axios({
      method: 'post',
      url: '/pdf/merge',
      responseType: 'arraybuffer',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        destinationName
      }
    })
    // return Axios.post('/pdf/merge',
    //   formData,
    //   {
    //     responseType: 'arraybuffer',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       // accept: /?
    //     }
    //   })
  }
}
