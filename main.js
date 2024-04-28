const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Permitindo o uso de require no arquivo renderer.js
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("open-second-window", () => {
  let secondWindow = new BrowserWindow({
    width: 400,
    height: 200,
    parent: mainWindow,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: true, // Permitindo o uso de require no arquivo secondWindow.js
    },
  });

  secondWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "secondWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  secondWindow.once("ready-to-show", () => {
    secondWindow.show();
  });
});
