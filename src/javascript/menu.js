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
 Constructs the titlebar menu. The setting parameter is used to load additional resources within the menu, like images
 If the string 'file' or 'help' is passed as a second parameter, only the submenu for that menu entry is returned
 **/

const { Menu, MenuItem, dialog, BrowserWindow } = require('electron');
const i18n = require('../configs/i18next.config.js');
const config = require('../configs/app.config');

	module.exports = function initMenu(settings, name) {

		let menu = buildMenu(settings, name);

		return menu;
	}
	
	function buildMenu(settings, name) {
		const closeMenu = {
			label: i18n.t("menu__close_app"),
			role: "quit"
		}

		const infoMenu = {
			label: i18n.t("menu__about"),
			click: () => {
				let options = {
					type: "info",
					icon: settings.icons.app,
					buttons: [],
					message: i18n.t("about__title"),
					detail: i18n.t("about__text") 
				}
				dialog.showMessageBox(options);
			}
		}
		
		const printMenu = {
			label: i18n.t("menu__print"),
			click: () => {
				let win = BrowserWindow.getFocusedWindow();
				console.log("win", win);
				let view = win.getBrowserView();
				console.log("view", view);
				view.webContents.print({
					silent: false,
					header: "Printed from " + config.viewerUrl,
					footer: "Printed by Goobi viewer desktop client"
				},
				(success, error) => {
					if(success) {
						console.log("Printed webpage successfully");
					} else {
						console.error("Error printint", error);
					}
				}); 
			}
		}
		
		const devMenu = {
			label: i18n.t("menu__devtools"),
			role: "toggleDevTools"
		}

		const fileMenu = {
			label: i18n.t("menu__file"),
			submenu: [closeMenu]
		}
		const helpMenu = {
			label: i18n.t("menu__help"),
			submenu: [infoMenu]
//			submenu: [infoMenu, devMenu]
		}
		
		const menuTemplate = [fileMenu,helpMenu];
		
		//allow printing web content
		if(config.allowPrint) {
			fileMenu.submenu.push(printMenu);
		}
		
		if(name) {
			switch(name) {
				case "file":
					return Menu.buildFromTemplate(fileMenu.submenu);
				case "help":
					return Menu.buildFromTemplate(helpMenu.submenu);
			}
		}
		
		let menu = Menu.buildFromTemplate(menuTemplate);
	
		let languageMenu = config.languages.map((languageCode) => {
		      return {
		        label: i18n.t(languageCode),
		        type: 'radio',
		        checked: i18n.language === languageCode,
		        click: () => {
		          i18n.changeLanguage(languageCode);
		        }
		      }
		  });
		  menu.append(new MenuItem({
		  	type: "separator"
		  }));
		  menu.append(new MenuItem({
		    label: i18n.t('menu__language'),
		    submenu: languageMenu
		  }));
		return menu;
}