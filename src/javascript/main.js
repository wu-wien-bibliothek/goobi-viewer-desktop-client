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
 Starting js module for the application. Generates the fingerprint hash and starts the application window
 **/
 
  
const { app, BrowserWindow } = require('electron')
const getFingerprintHash = require('./drm')
const path = require('path');
const createWindow = require('./window')
const config = require('../configs/app.config');

//don't start the app right after squirrel installation
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

//start here
app.whenReady()
.then( () => getFingerprintHash())
.then( hash => maybePrintHashAndClose(hash))
.then( hash => createWindow(hash))
.catch(e => {
	if(e.action == "printHash") {
			process.stdout.write(e.hash);
			app.quit();
		} else {
			console.log(e.action);
			app.quit();
		}
});

//quit
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
	BrowserWindow.getAllWindows().forEach(win => {
		win.close();
	})
});

//startin point when app is brought to the foreground again in maxOS
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    getFingerprintHash()
	.then( hash => maybePrintHashAndClose(hash))
	.then( hash => createWindow(hash))
	.catch(e => {
		if(e == "_quit") {
			app.quit();
		} else {
			console.log(e);
		}
	});
  }
})

//if the first command line argument is 'myid', just print the fingerprint hash and close the app
function maybePrintHashAndClose(hash) {
	var arguments = process.argv.slice(1);
	if(arguments.length > 0 && arguments[0].toLowerCase() == "myid") {
		throw({action: "printHash", hash:hash});
	}
	return hash;
}

