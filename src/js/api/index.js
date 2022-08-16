import Folder from './folder'
import Task from './task'
import Log from './log'
import { f7 } from 'framework7-svelte'
import Config from '@/js/api/config'

export default {
  Folder,
  Task,
  Log,
  req (reqFunc, showAlert, okAlert, errAlert, showProgress, progressTitle) {
    let progressDialog = null
    if (showProgress) {
      progressDialog = f7.dialog.progress(progressTitle)
    }
    function closeProgressDialog () {
      if (progressDialog) {
        progressDialog.close()
      }
    }

    return new Promise((resolve, reject) => {
      reqFunc().then(resp => {
        const respObj = JSON.parse(resp.data)
        if (respObj && respObj?.status === Config.statusOk) {
          closeProgressDialog()
          if (showAlert) {
            f7.dialog.alert(okAlert, '提示')
          }
          resolve(respObj)
        } else {
          closeProgressDialog()
          if (showAlert) {
            f7.dialog.alert(`${errAlert} - ${respObj?.message ?? resp}`, '提示')
          }
          reject(respObj ?? resp)
        }
      }).catch(err => {
        closeProgressDialog()
        if (showAlert) {
          f7.dialog.alert(`${errAlert} - ${err}`, '提示')
        }
        reject(err)
      })
    })
  }
}
