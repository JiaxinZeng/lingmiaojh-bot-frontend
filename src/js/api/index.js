import Folder from './folder'
import Task from './task'
import { f7 } from 'framework7-svelte'

export default {
  Folder,
  Task,
  req (requestFunc, showAlert, okMsg, errorMsg, okCallback, errorCallback, showProgress, progressTitle) {
    let progressDialog = null
    if (showProgress) {
      progressDialog = f7.dialog.progress(progressTitle)
    }
    function closeProgressDialog () {
      if (progressDialog) {
        progressDialog.close()
      }
    }

    requestFunc().then(resp => {
      const respObj = JSON.parse(resp.data)
      if (respObj && respObj?.status === 0) {
        closeProgressDialog()
        okCallback && okCallback(respObj)
        if (showAlert) {
          f7.dialog.alert(okMsg, '提示')
        }
      } else {
        closeProgressDialog()
        errorCallback && errorCallback()
        if (showAlert) {
          f7.dialog.alert(`${errorMsg} - ${respObj?.message ?? resp}`, '提示')
        }
      }
    }).catch(err => {
      closeProgressDialog()
      errorCallback && errorCallback()
      if (showAlert) {
        f7.dialog.alert(`${errorMsg} - ${err}`, '提示')
      }
    })
  }
}
