/*
 * This file is part of the Goobi viewer - a content presentation and management
 * application for digitized objects.
 *
 * Visit these websites for more information.
 *          - http://www.intranda.com
 *          - http://digiverso.com
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */
 /**
 Creates a hardware- and system dependend unique identifier for the computer runnung the application
 **/
 
const { crypto } = require('electron')
const nodeCrypto = require('crypto')
const si  = require('systeminformation')
const fnv = require('fnv-plus')

module.exports = async function getFingerprintHash(){
  const systemInformation =[];

  //throw system data into Array
  systemInformation.push( await getDiskId());
  systemInformation.push( await getOsUuId());
  systemInformation.push( await getMac());

  //console.log(systemInformation.join('-'))
  //sort array like Oliver  
  systemInformation.sort((a, b) => a.localeCompare(b))

  return fnv.fast1a64(systemInformation.join(''))
}


 function getDiskId(){
  return  si.diskLayout().then( data => {
    return data[0].serialNum}).catch(error =>console.log("Error retrieving serialnumber of Disk 0"))
}

function getOsUuId(){
  return  si.uuid().then( data => {
    return data.os}).catch(error =>console.log("Error retrieving OS Id"))
}
//
function getMac(){
  return  si.uuid().then( data => {
    return data.macs[0]}).catch(error =>console.log("Error retrieving MAC"))
}