const electron = require("electron");
const { app, BrowserWindow } = electron;
const path = require("path");
const url = require("url");

import electronContextMenu from "electron-context-menu"; // Add default context menu to BrowserWindow

electronContextMenu();
if (process.mas) app.setName("name-here"); // For Apple app store

let mainWindow;

function makeSingleInstance() {
  if (process.mas) return false;
  return app.makeSingleInstance(function() {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });
}

function createWindow() {
  const shouldQuit = makeSingleInstance();
  if (shouldQuit) return app.quit();

  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  let startURL;
  if (process.env.NODE_ENV === "development") {
    startURL = "http://127.0.0.1:3000";
  } else {
    startURL = url.format({
      pathname: path.join(__dirname, "../../build/index.html"),
      protocol: "file:",
      slashes: true
    });
  }
  mainWindow.loadURL(startURL);
  console.log("loadURL =", startURL);
  console.log("process.env.NODE_ENV =", process.env.NODE_ENV);

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

function onReady() {
  if (process.env.NODE_ENV === "development") {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS
    } = require("electron-devtools-installer");

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log("An error occurred: ", err));
  }

  createWindow();
}

app.on("ready", onReady);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
