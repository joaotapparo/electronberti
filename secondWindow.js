const { remote } = require("electron");

window.onload = () => {
  const currentWindow = remote.getCurrentWindow();
  currentWindow.setTitle("Segunda Janela");
};
