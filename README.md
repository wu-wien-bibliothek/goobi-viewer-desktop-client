# Goobi viewer Desktop Client


## Description
This is a desktop application that allows connecting to a Goobi viewer installation and integrates as a rights holder to the access restriction functionallity. It can prohibit screenshots and copying content from pages.


## Build Dependencies
* npm
* to crosscompile for Windows on Linux/Mac
  * mono-complete
  * wine


## Manual Compilation
```bash
# install dependencies, if required
sudo apt install npm

# dpkg is needed if you compile on a non debian based distro
sudo apt install dpkg

# if you want to crosscompile for Windows install wine and mono
sudo apt install wine mono-complete

# clone the repository
git clone git@github.com:intranda/goobi-viewer-desktop-client.git

# navigate into the project directory
cd goobi-viewer-desktop/

# install the npm-packages of the project
npm install

# build the electron app
npm run make

# build the Windows binary (you need wine and mono)
npx electron-forge make --platform=win32

```
Running `npm run make` will create the folders `goobi-viewer-desktop-linux-x64` and `make/deb/x64` in the `out`-folder in the project-root. In the first folder you will find the unpackaged electron app and in the second folder you will find a debian-package.

Running `npx electron-forge make --platform=win32` will create the folders `goobi-viewer-desktop-win32-x64` and `make/squirrel.windows/x64` in the `out`-folder in the project-root. In the first folder you will find the unpackaged electron app for Windows and in the second folder you will find a Windows installer executeable.


## Manual Compilation on Windows
Install nodejs and npm if required:
* download [nodejs/npm -Installer](https://nodejs.org/en/download/)


```bash
# clone the repository
git clone git@github.com:intranda/goobi-viewer-desktop-client.git

# navigate into the project directory
cd goobi-viewer-desktop/

# install the npm-packages of the project
npm install

# build the electron app
npm run make
```
Running `npm run make` will create the folders `goobi-viewer-desktop-win32-x64` and `make/squirrel.windows/x64` in the `out`-folder in the project-root. In the first folder you will find the unpackaged electron app for Windows and in the second folder you will find a Windows installer executeable.


## Running the Application
If you are still in the project folder run following command to test the app:
```bash
# linux
./out/goobi-viewer-desktop-linux-x64/goobi-viewer-desktop

# windows
out\goobi-viewer-desktop-windows-win32-x64\goobi-viewer-desktop.exe

# if you just want to test recent changes without creating packages or installers
npm run start
```
