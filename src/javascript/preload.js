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
 Javascript running in the main window after the content is initially loaded.
 The main window contains the menu bar with the application menu and loading-animation. 
 This is running in the frontend-thread. Communication with background main thread is done via ipcRenderer events
 **/

const { ipcRenderer } = require("electron");

//after html is loaded
window.addEventListener('DOMContentLoaded', () => {
	translateMenuItems();
	ipcRenderer.on('change-language', () => translateMenuItems());
	handleMenuItemClicks();
	initLoaderEvents();
});

//show/hide loader when 'update-loader' is sent from backend 
function initLoaderEvents() {
	let loader = window.document.querySelector(".titlebar__loader .loader");
	ipcRenderer.on('update-loader', (event, state) => {
		switch(state) {
			case 'show': 
				loader.classList.add("-active");
				break;
			case 'hide':
				loader.classList.remove("-active");
				break;
		}
	
	});
}

//Open dropdown menues when a menu-item within the menu bar is clicked
 function handleMenuItemClicks() {
    let items = window.document.querySelectorAll(".titlebar__menu__item");
	items.forEach(item => {
		translate(item);
		item.onclick = e => {
		    items.forEach(i => i?.classList?.remove("-active"));
		    item.classList?.add("-active");
		    let x = Math.round(item.getBoundingClientRect().left);
		    let y = Math.round(item.getBoundingClientRect().bottom);
		    let menu = item.dataset.menu
			ipcRenderer.invoke('get-menu', x, y, menu);
		}
	});
 }

//translate all menu items in menu bar
 function translateMenuItems() {
	let items = window.document.querySelectorAll(".-translated");
	items.forEach(item => translate(item));
}

//translate a single html element by requesting the translation from the backend thread
async function translate(item) {
	let text = item.dataset.translationKey;
	if(text) {
		let match = text.match(/^\{msg\.(\w+)\}$/);
		if(match && match.length > 1) {
			let msg = match[1];
			let translation = await ipcRenderer.invoke("translate", msg);
			item.innerText = translation;
		}
	}
}
