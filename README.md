# Goobi viewer Desktop Client


## Description
This is a desktop application that allows connecting to a Goobi viewer installation and integrates as a rights holder to the access restriction functionallity. It can prohibit screenshots and copying content from pages.


## Build Dependencies
* npm
* to crosscompile for Windows on Linux/Mac
  * mono-complete
  * wine


## INSTALLATION
```bash
# install dependencies, if required
sudo apt install npm

# dpkg is needed if you compile on a non debian based distro
sudo apt install dpkg

# if you want to crosscompile for Windows install wine, mono and nsis
sudo apt install wine mono-complete nsis

# clone the repository
git clone git@github.com:intranda/goobi-viewer-desktop-client.git

# navigate into the project directory
cd goobi-viewer-desktop/

# install the npm-packages of the project
npm install
```

## Run program
To execute the program locally for testing, run

```bash
npm run start
```

With the default settings, this won't show an actual Goobi viewer. For this one needs to enter a working Goobi viewer url in `src/configs/app.config.js` for the `viewerUrl` property.

## Build executables

To create a windows and linux executable, simply run the ant build-file with

```bash
ant
```
A windows installer executable and a Debian-package will be created within the folder `out`.





## Community
You can get in touch with the communiy in the forum. Currently the most is happening in German but please feel free to ask any questions there in English too:

https://community.goobi.io

You can find a list of Goobi viewer installations at the following URL:

https://goobi.io/viewer/installations


## Documentation
The documentation for the Goobi viewer can be found using the following URLs:

* [German](https://docs.intranda.com/goobi-viewer-de/)
* [English](https://docs.intranda.com/goobi-viewer-en/)


## Development
The development of the Goobi viewer in mostly happening by the software company [intranda GmbH](https://intranda.com). All current developments are centrally listed and explained inside of the monthy digests:

* [German](https://docs.intranda.com/goobi-viewer-digests-de/)
* [English](https://docs.intranda.com/goobi-viewer-digests-en/)


## Technical background
The Goobi viewer consists of multiple packages which all have to be installed and configured properly:

| Package                                                                                  | Function                                                                     |
| ------                                                                                   | ------                                                                       |
| [Goobi viewer Core](https://github.com/intranda/goobi-viewer-core)                       | Core functionality of the viewer application                                 |
| [Goobi viewer Indexer](https://github.com/intranda/goobi-viewer-indexer)                 | Indexing application to fill the Solr search index with metadata information |
| [Goobi viewer Connector](https://github.com/intranda/goobi-viewer-connector)             | Connectors for different use cases (incl. OAI-PMH, SRU)                      |
| [Goobi viewer Theme Reference](https://github.com/intranda/goobi-viewer-theme-reference) | Reference Theme for the styling of the web pages for the user interface      |


## Licence
The Goobi viewer is released under the license GPL2 or later.
Please see ``LICENSE`` for more information.

