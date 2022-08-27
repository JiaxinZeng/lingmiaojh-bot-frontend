import Folder from './folder'
import Task from './task'
import Log from './log'
import { f7 } from 'framework7-svelte'
import Config from '@/js/api/config'

export default {
  Folder,
  Task,
  Log,
  req (reqFunc, okAlert, errAlert, progressTitle) {
    let progressDialog = null
    if (progressTitle) {
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
          if (okAlert) {
            if (typeof okAlert === 'function') {
              f7.dialog.alert(okAlert(respObj), '提示')
            } else {
              f7.dialog.alert(okAlert, '提示')
            }
          }
          resolve(respObj)
        } else {
          closeProgressDialog()
          if (errAlert) {
            if (typeof errAlert === 'function') {
              f7.dialog.alert(
                `${errAlert(respObj ?? resp)} - ${respObj?.message ?? resp}`,
                '提示')
            } else {
              f7.dialog.alert(
                `${errAlert} - ${respObj?.message ?? resp}`,
                '提示')
            }
          }
          reject(respObj ?? resp)
        }
      }).catch(err => {
        closeProgressDialog()
        if (errAlert) {
          if (typeof errAlert === 'function') {
            f7.dialog.alert(`${errAlert(err)} - ${err}`, '提示')
          } else {
            f7.dialog.alert(`${errAlert} - ${err}`, '提示')
          }
        }
        reject(err)
      })
    })
  }
}
