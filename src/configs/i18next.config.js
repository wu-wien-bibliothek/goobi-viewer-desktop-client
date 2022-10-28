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
This file initializes the translation bundles for the application
 **/
 
const i18n = require('i18next');
const path = require('path');
const i18nextBackend = require('i18next-node-fs-backend');
const config = require('../configs/app.config');

const i18nextOptions = {
  backend:{
    // path where resources get loaded from
    loadPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
    // path to post missing resources
    addPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.missing.json'),
    // jsonIndent to use when storing json files
    jsonIndent: 2,
  },
  interpolation: {
    escapeValue: false
  },
  saveMissing: true,
  fallbackLng: config.fallbackLng,
  whitelist: config.languages,
  react: {
    wait: false
  }
};
i18n
  .use(i18nextBackend);
// initialize if not already initialized
if (!i18n.isInitialized) {
  i18n
    .init(i18nextOptions);
}
module.exports = i18n;