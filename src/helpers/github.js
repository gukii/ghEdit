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
import base64 from 'base-64';
import formatBytes from '../../helpers/formatBytes.js';
import { hDecode, hEncode } from '../../helpers/hash'
import truncate from 'truncate-utf8-bytes'  // probably not needed anymore..
import { scaleImg } from '../showPost'
import shortid from 'shortid'

import { date2str, text_truncate, sanitizeNewLineForMD, sanitizeFrontMatterForMD, removeDangerousChars } from '../../helpers/general'

//const Item = List.Item


// need this because octokat relies on atob, which react-native seems lacking
if (!global.atob) {
  console.log('atob not found, requiring base-64 for global.atob')
  global.atob = require('base-64').decode
}



/*


Koi Farm
錦鯉養殖場
Koi Auction
錦鯉競賣會
Koi Show
錦鯉展會
Koi Champion
錦鯉品評會
Koi Judge
錦鯉評鑑
Event
相關活動

Sakai
版井養魚場
Omosako
面迫養鯉場
SingChang
欣昌錦鯉養殖場
IKI
台灣華錦
Konishi
小西養鯉場
Dainichi
大日養鯉場
Niigata
新潟錦鯉
Marujyu
丸重養鯉場

Hobby
錦鯉愛好家
(Koi) Shipping
錦鯉運輸
Biz (Business, zuo shengyi fangmian)
錦鯉商貿

Koi
錦鯉
SingChang
欣昌

*/



const findKeywordsForCategory = (contentText) => {




  const keywordArrayNew = [
  // { 'KoiFarm' : [ 'KoiFarm', '錦鯉養殖場' ] },
    'Koi Farm',
    '錦鯉養殖場',
    'Koi Auction',
    '錦鯉競賣會',
    'Koi Show',
    '錦鯉展會',
    'Koi Champion',
    '錦鯉品評會',
    'Koi Judge',
    '錦鯉評鑑',
    'Event',
    '相關活動',

    'Sakai',
    '版井養魚場',
    'Omosako',
    '面迫養鯉場',
    'SingChang',
    '欣昌錦鯉養殖場',
    'IKI',
    '台灣華錦',
    'Konishi',
    '小西養鯉場',
    'Dainichi',
    '大日養鯉場',
    'Niigata',
    '新潟錦鯉  ',
    'Marujyu',
    '丸重養鯉場',

    'Ogata',
    '尾形',

    'Hobby',
    '錦鯉愛好家',
    'Shipping',
    '錦鯉運輸',
    'Biz',
    '錦鯉商貿',

    'Koi ',
    '錦鯉',
    'SingChang',
    '欣昌',
  ]


/*
  const keywordArray = [
    'KoiFarm',
    '錦鯉養殖場',
    'Auction',
    '競賣會',
    'KoiShow',
    '錦鯉展會',
    'KoiCompetition',
    '錦鯉品評會',
    'Champion',
    '獲獎銘鯉',
    'Judge',
    '評鑑',
    'Event',
    '相關活動',

    'Sakai',
    '版井',
    'Omosako',
    '面迫',
    'SingChang',
    '欣昌',
    'IKI',
    '華錦',
    'Konishi',
    '小西',
    'Dainichi',
    '大日',
    'Niigata',
    '新潟',
    'Marujyu',
    '丸重',

    'Hobby',
    '愛好家',
    'Shipping',
    '運輸',
    'Biz',
    '商貿',

    'Koi ',
    '錦鯉',

    'Unique',
    '逸品鯉',
  ]
*/



const keywordArray = [
  'wall',
  'healing',
  'talking',
  'canvas',
  'crayon',
  'cardboard',
  'gone',
  'water',
  'sketch',
  'pencil',
  'gallery',
  'exhibition',
  'restaurant',
  'event',
  'acrylic',
  'paper',
  'wood'

]
  const lowerText = contentText.toLowerCase()
  let categories = ''

  keywordArray.forEach( keyword => {
    const count  = lowerText.indexOf(keyword.toLowerCase())
    if (count > -1) {
      categories = categories + ',' + '"' + keyword + '"'
    }
  })

  // gotta remove a , at position 0
  if (categories.length > 0) {
    return (categories.substring(1))
  }

  return categories

}


// markdown comment [//]: #
const composeMainContent = (feedItem) => {

    const mainContent = feedItem.message? feedItem.message : feedItem.story? feedItem.story : ''


    if (feedItem.message && feedItem.story) {
      return `${sanitizeNewLineForMD(feedItem.message)}\n \n \n[//]: #story:\n${sanitizeNewLineForMD(feedItem.story)}`  // markdown does not render \n as new line, but a double space is a new line...
    }

    return sanitizeNewLineForMD(mainContent)  // markdown does not render \n as new line, but a double space is a new line...

/*

    let output = ''

    if (feedItem.message) {
      output = output + '[//]: #message:\n'+feedItem.message.replace(/\n/g, "\n")
    }
    if (feedItem.story) {
      output = output + '[//]: #story:\n'+feedItem.story.replace(/\n/g, "\n")
      //output = output + 'story: '+feedItem.story
    }

    console.log('composeMainContent:', output)

    return output
    */

}


// !!! story or message can not be too long when in frontmatter list... this creates a problem for pages that are created FROM frontmatter....
//

const composeMainContentFrontMatter = (feedItem, maxLength=50) => {


    let frontMatter = ''

    // i m leaving out the message, due to a problem with ":" inside some message texts that makes jekyll interpret variables, etc..
    // now replacing ":" with ";" to work around that problem.



    if (feedItem.story) {
      frontMatter = frontMatter + "story: '"+ text_truncate( removeDangerousChars(sanitizeFrontMatterForMD(feedItem.story)), maxLength ) + "'  "
    }

    if (feedItem.message && feedItem.story) {
      frontMatter = frontMatter + '\n'
    }

    if (feedItem.message) {
      frontMatter = frontMatter + "message: '"+ text_truncate( removeDangerousChars(sanitizeFrontMatterForMD(feedItem.message)), maxLength ) + "'  "
    }



    //console.log('frontMatter:', frontMatter)

    return frontMatter
}



/*
    // first test by creating a filenmae in Jekyll's blog post pattern:
    // posts/2017-03-03-welcome-to-jekyll.markdown
    const newFileName = 'YYYY-MM-DD-title.markdown'

    ---
    layout: post
    title:  "Welcome to Jekyll!"
    date:   2017-03-03 21:07:12 +0800
    categories: jekyll update
    ---
*/


const calcDimensionFactor = ({ w, h }) => {
  if (h > w) {
    return (h / w).toPrecision(3)
  } else {
    return (w / h).toPrecision(3)
  }
}

/*
  if (h > w) {
    return (h / max).toPrecision(3)
  } else {
    return (w / max).toPrecision(3)
  }
  */


// media .. can be in media.data... depending where it comes from.. in between versions. here...
const composeFileContent = ({ feedItem, tagSettings, media }) => {



    const maxFrontMatterStringLength = 70
    const maxImgDescLength = 50
    const maxGhImgSize = 300  // max size of image displayed inside github

    console.log('composeMainContent:', feedItem, ' tagSettings:', tagSettings,' media:', media)

    const mainContent = composeMainContent( feedItem )
    const contentFrontMatter = composeMainContentFrontMatter(feedItem, maxFrontMatterStringLength)



    const fileNameTitle = composeFileNameTitle( mainContent )

    //const jekyllCategories = tagSettings.jekyllCategories.join(',')  // split array in space-seperated string
    const jekyllCategories = findKeywordsForCategory( mainContent )


    console.log('composeFileContent before media.map..')
    const jekyllImages = media.map(pic => {
        //console.log('composeFileContent inside media.map:', pic.data)
        const item = pic.data
        const { height, width } = scaleImg(item.height, item.width, maxGhImgSize)

        //return '<a href="'+item.link+'"><img src="'+item.link+'" height="'+height+'" width="'+width+'" /></a> \r\n'

        const hrefLink = '<a href="'+item.link+'"><img class="postImage" src="https://i.imgur.com/'+item.id+'h.jpg" />  \r\n'
        const hrefDesc = item.description ? text_truncate(item.description, maxImgDescLength) + '  \r\n ' : ''

        return hrefLink + hrefDesc + '</a>  '


        // <img class="postImage" src="https://i.imgur.com/{{item['id']}}h.jpg" />  // this is from working jekyll

        //return '<a href="https://i.imgur.com/'+item.id+'h.jpg"><img src="'+item.link+'" height="'+height+'" width="'+width+'" /></a> \r\n'

        //return '<a href="'+item.src+'"><img src="'+item.src+'" height='+height+' width='+width+' /></a> \r\n'
        //return '!['+item.title+']('+item.src+'){:height="'+height+'px" width="'+width+'px"} \r\n'
    })



    const mediaFrontMatterSrc = media.map(pic => {
        const item = pic.data
        const { height, width } = scaleImg(item.height, item.width, maxGhImgSize)
        const descriptionSemicol = item.description? item.description.replace(/\：|\:/g, ";") : ''   // turn colon into semicolon, otherwise markdown rendering would break in frontmatter

        const description = text_truncate( removeDangerousChars(sanitizeFrontMatterForMD(item.description)), maxImgDescLength )

        //return '"'+item.id+'"'


        //return '\r\n  - id: '+item.id+'\r\n    name: '+item.name+'\r\n    description: '+item.description+'\r\n    height: '+item.height+'\r\n    width: '+item.width+'\r\n    type: '+item.type+'\r\n    link: '+item.link
        return `
  - id: ${item.id}
    name: ${item.name}
    description: '${description}'
    height: ${item.height}
    width: ${item.width}
    type: ${item.type}
    link: ${item.link}
    prevLoc: ${item.prevLoc}
    parentId: ${item.parentId}
    postId: ${item.postId}
    factor: ${calcDimensionFactor({h:item.height, w:item.width})}
    portrait: ${item.height > item.width? 1 : 0 }
    mInfo: ${item.deletehash}`
        //return `\r\n  - id: ${item.id}\n    name: ${item.name}\n    description: ${item.description}\n    height: ${item.height}\n    width: ${item.width}\n    type: ${item.type}\n    link: ${item.link}\n    prevLoc: ${item.prevLoc}\n    parentId: ${item.parentId}\n    postId: ${item.postId}\n    mInfo: ${item.deletehash}`
        //return '!['+item.title+']('+item.src+'){:height="'+height+'px" width="'+width+'px"} \r\n'
    })




    const hashesFrontMatterSrc = media.map(item => {
        return '"'+hEncode(item.data.deletehash)+'"'
        //return '!['+item.title+']('+item.src+'){:height="'+height+'px" width="'+width+'px"} \r\n'
    })


    // ![test image size](/img/post-bg-2015.jpg){:height="700px" width="400px"}

    let mediaContent = ''
    if (jekyllImages && jekyllImages.length > 0) {

      mediaContent = '[//]: #media:  \n' + jekyllImages.join('  \n\n\n')  // turn array into CR newline sepperated string
    }


    //const mediaContent = jekyllImages.join('\r\n \r\n')  // turn array into CR newline sepperated string
    const mediaFrontMatter = mediaFrontMatterSrc ? mediaFrontMatterSrc.join('') : ' []'
    const hashesFrontMatter = hashesFrontMatterSrc.join(', ')


    const fileContents =
`---
layout: post
title: '${fileNameTitle}'
date: ${feedItem.created_time}
categories: [${jekyllCategories}]
media:${mediaFrontMatter}
${contentFrontMatter}
---

${mainContent}


${mediaContent}
`

    return fileContents
}




  // currently not used.. difficulty encoding and comparing utf8 chin. char
  const composeFileNameTitle = ( mainContent ) => {

        const fileNameMaxLength = 18

        // problem with this kind of chars: 恭喜🎉🎉🎉<br/> 謝謝客戶的信任與支持*\(^o^)/*

        const temp0 = mainContent.replace(/[\n\r\\\\//\*\(\)\{\}\[\]\&\^\#]+/g, '')  // remove carrigeReturn and lineBreak (and slash and backslash)
        const temp = [...temp0] // doing this to take care of utf8 and special multibyte characters..
        const temp2 = temp.slice(0,9)
        const temp3 = temp2.join('')
        const fileNameTitle = temp3


        //const fileNameTitle = text_truncate(mainContent, fileNameMaxLength, '')  // don t want to have '..' at the end of the filename, therefore ''

        // need to use this imported truncate function to cut utf8 strings, especially chinese character ones.
        //const fileNameTitle = truncate(mainContent, fileNameMaxLength)

        // shortid is a unique id, which means i can't regenerate the same id with input data
        // => can t check if a post was already uploaded to github by just looking at the filename
        // const fileNameTitle = shortid.generate()
        //const fileNameTitle = shortid.generate()

        return fileNameTitle
  }


// could use a unique short id:  "dBvJIh-H"
// https://www.npmjs.com/package/shortid
// but not very read-able when browsing github..


  const composeFileName = ({ feedItem }) => {


      const mainContent = composeMainContent( feedItem )

      const fileNameTitle = composeFileNameTitle( mainContent )
      //const fileNameTitle = hEncode(feedItem.id)


      const newNameWithoutSpace = fileNameTitle.replace(/\s+/g, '-')

      // need to use the date of the FB post. within the redux 'feed' this is called: created_time
      const fileNamePrefix = date2str(new Date(feedItem.created_time), 'yyyy-MM-dd')

      console.log('github index.js:', fileNameTitle, newNameWithoutSpace, newNameWithoutSpace, fileNamePrefix)

      //(use title's first 10 characters. convert space to hyphen)
      // 'YYYY-MM-DD-title.markdown'
      const newFileName = fileNamePrefix + "-" + newNameWithoutSpace + '.markdown'

      return newFileName

  }


/*
  // write / update files at github  (not really used...)
   async function apiWriteGhFile({ octo, home, repo, filePath, config }) {
      try {
          const res = await octo.repos(hDecode(home), hDecode(repo)).contents(filePath).add(config)

          return { sha: res.commit.sha, ok: true }  // not res.content.sha
      }
      catch(err) {

          console.error(err)
          return { err: err, ok: false }
      }
  }
*/


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



  // newFile is getting modified to create the github jekyll / data files

  //redux: feed 1x * (created_time, message, id, story? )
  //redux: download_links nx * (postId, description?, title?, src, height, width )

  //redux: tag_settings (tag, searchTerm, tagColor, destFolder, destNamePattern, destTemplate, automated)


  // bring in via props, redux or not:
  // - tagSettings [{}]
  // - credentials {1}
  // - feed {1}
  // - imgur.uploaded [{}]


  //async renderGithubJekyllFile({ fileTitle, fileContents, created_time }) {  // images?


  // requires the media files to be already uploaded to imgur
  // tag filter to already have filtered this item


  export default async function renderGithubJekyllFile({ feedItem, media, credentials, tagSettings }) {

    //console.log('inside renderGithubJekyllFile: ', feedItem, media, credentials, tagSettings);
    //const ghHome = credentials.ghUser


    console.log('renderGithubJekyllFile media:', media)


    const fileContents = composeFileContent({ feedItem, tagSettings, media })
    //console.log('fileContents:', fileContents)

    const ghFileName = composeFileName({ feedItem })
    //console.log('ghFileName:', ghFileName)


    console.log('renderGithubJekyllFile feedItem:', feedItem, ' media:', media)


    const res = writeGhFile({
      ghRepo: hDecode(credentials.ghRepo),
      ghFolder: hDecode(credentials.ghFolder),
      ghUser: hDecode(credentials.ghUser),
      ghPass: hDecode(credentials.ghPass),
      ghFileName,
      fileContents
    })

    return res

}  // function new file




/* simplest:

1 tag = ALL
1 destination = one folder on github, with file-naming convention
all data goes there

*/


/*

filter = ''
ghDestination = '/farmersDelight/'
namingPrefix = 'YYYYMMDDHHSS-'
ghNaming = namingPrefix + title (min Chars 10)
writeTemplate = ''


writeTemplate = `
frontmatter:
media: $([mediaNames])
---------
$(story)


## e.g. sing chang:
file: /_koi-health/koi-health.md
---
layout: collection-item
title: The importance of water quality
ref: water-quality
lang: en
image-path: /images/galleries/gallery1-200/Fish-Tanks-At-Tokyo-Koi-Show-2017.JPG
published: yes
---

==> only "layout" and "----" stays fixed. the rest is generated dynamically
how to do that in the app? use "variable denominators"?
$title,
$ref,
$lang,
$image-path
...




## e.g. posts:
file: /_posts/2017-03-03-welcome-to-jekyll.markdown
---
layout: post
title:  "Welcome to Jekyll!"
date:   2017-03-03 21:07:12 +0800
categories: jekyll update
---


#process of uploading a post:

- choose post
- interactive / auto-upload mode (auto-upload grabs all photos n does all this in the background?)
- (I) choose which photos of post get uploaded
- (I) choose destination (maybe with tag - need a place/page to setup auto-rules for tags & auto post processing)
- (B) tag & destination need to be linked up in some kind of settings section.
- (I) allow for additional post processing (e.g. translation, convert to simplified chars)
- (I) allow for additional editing of post
- make sure post destination template is ready (to post in post values)

- upload selected images to imgur
- remember new imgur file names (maybe have one location with all filenames/delete hashes for all uploads
-
- process post (translate)
- add new imgur file names to new post with destination template
- save filled-in template to github


when uploading pictures to imgur.
need to wait for upload to finish, to get image file name


## implementation:

just need to modify redux state
create one store for github
octo .. store connection (not sure if that s a good idea)
files .. store files of folder / repo? result of firt api call, determining what s in the repo


- i could use a textbox with theh template in it.
- use lower/upercase letters to indicate date/time in filename
- also have to set frontmatter variables inside the template


*/
