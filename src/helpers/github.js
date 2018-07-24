import React, { Component } from "react";
//import { View, Text } from "react-native";
//import Settings from '../utils/settings';

import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'

//import { List, ActivityIndicator, Icon, Toast, Modal, Button, SwipeAction } from 'antd-mobile';

/*
import SwipeAction from 'antd-mobile/lib/swipe-action'
import Modal from 'antd-mobile/lib/modal'
import Button from 'antd-mobile/lib/button'
import Toast from 'antd-mobile/lib/toast'
import Icon from 'antd-mobile/lib/icon'
import ActivityIndicator from 'antd-mobile/lib/activity-indicator'
import List from 'antd-mobile/lib/list'
*/

import Octokat from 'octokat';
//import base64 from 'base-64';

import formatBytes from '../../helpers/formatBytes.js';
import { hDecode, hEncode } from '../../helpers/hash'
//import truncate from 'truncate-utf8-bytes'  // probably not needed anymore..
//import { scaleImg } from '../showPost'
//import shortid from 'shortid'

import { date2str, text_truncate, sanitizeNewLineForMD, sanitizeFrontMatterForMD, removeDangerousChars } from '../../helpers/general'

//const Item = List.Item


// need this because octokat relies on atob, which react-native seems lacking
if (!global.atob) {
  console.log('atob not found, requiring base-64 for global.atob')
  //global.atob = require('base-64').decode
}



  // update is called by writeGhFile, if writeGhFile runs into a problem (e.g. file already existing)
  async function updateGhFile({ octo, home, repo, filePath, folder='', config, updateMsg }) {

      console.log('inside updateGhFile..')

      let newConfig = config

      try {

          // get list of files on github
          const ghFiles = folder.length > 0 ?
            await octo.repos(home, repo).contents(folder).fetchAll() :
            await octo.repos(home, repo).contents.fetchAll()


          // find first occurrance of file with this name/path
          const fileExists = ghFiles.find(item => {

            if (item.path === filePath) return true

            //if (item.path.includes(filePath)) return true
            //item.path.trim() === filePath.trim()
          })

          console.log('fileExists:', fileExists, ghFiles, filePath)

          if (fileExists === undefined) {
            // file does not exist
            console.log('file does not yet exist..:', filePath)

          } else {
            // grab the sha and overwrite it..

            console.log('file already exists.. updating..', filePath)
            // ghFiles looks like this: [{ name, filePath, contents, sha }]


            newConfig.sha = fileExists.sha
            newConfig.message = updateMsg

            //newConfig = { ...newConfig,
            //              message: 'Updated by FarmersDelight',
            //              sha: fileExists.sha,
            //              content: newConfig.content }

            //const resp = await octo3.repos(hDecode(ghHome), hDecode(ghRepo)).contents(completeNewName).add(newConfig)

          }

          //console.log('updateGhFile about to call ghApi for update/write..', newConfig)
          // perform write / update  (could use writeGhFile function above.. but testing for now.. )
          // will only update if contents has changed.
          const res = await octo.repos(home, repo).contents(filePath).add(newConfig)

          console.log('updateGhFile res:', res, ' returning resolved promise..')


          return Promise.resolve({ sha: res.commit.sha, success: true })  // not res.content.sha
      }
      catch(err) {

          console.error(err)
          return Promise.reject({ err: err, success: false })
      }
  }


  // writes a file to github. first tries to create (most files here are new creations), if that doesn t work, it
  // tries to update.
  //
  // ghFolder has no trailing /
  // fileContents can be chinese characters.....: unescape( encodeURIComponent) are applied before btoa.

  export async function writeGhFile({ ghRepo, ghUser, ghPass, ghFolder, ghFileName='', fileContents='', createGhMsg='Created by farmersDelight', updateGhMsg='Updated by farmersDelight' }) {

    //const { ghUser, ghPass, ghRepo, ghFolder } = ghCredentials  // folder will likely depend on the tag/filter used in later versions
    const ghHome = ghUser

    const ghFilePath = ghFolder && ghFolder.length > 0 ? ghFolder + '/' + ghFileName : ghFileName;

    var newConfig = {
      message: createGhMsg,
      content: btoa( unescape( encodeURIComponent(fileContents))) // necessary because of chinese characters in utf8, otherwise btoa would have a problem
      // branch: 'gh-pages'
    }


    console.log('before new Octokat..')

    var octo3 = new Octokat({
      username: ghUser,
      password: ghPass,
    })


    try {

      console.log('about to call github api..')

      const resp = await octo3.repos(ghHome, ghRepo).contents(ghFilePath).add(newConfig)


      console.log('response from create operation:', resp);
      console.log('File Created. commit sha is', resp.commit.sha);
      console.log('File Created. content sha is', resp.content.sha);

      //this.setStateAsync({ creating: false });


      return Promise.resolve({ sha: resp.commit.sha, success: true })  // not res.content.sha


    } catch (err) {
      console.error(err)

      console.log('file creation raised a predictable error, trying to call update function "updateGhFile"')
      // try again, this time updating the file.. most of the times new file creation is the norm, not many updates
      const res = updateGhFile({  octo: octo3,
                                  home: ghHome,
                                  repo: ghRepo,
                                  filePath: ghFilePath,
                                  config: newConfig,
                                  folder: ghFolder.length > 0? ghFolder : '',
                                  updateMsg: updateGhMsg
                               })
      console.log('renderGithubJekyllFile (updateGhFile): ', res)
      return(res)
      //return Promise.resolve(res)

    }


  }  // writeGhFile
