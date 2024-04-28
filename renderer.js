const { ipcRenderer } = require("electron");

const openSecondWindowButton = document.getElementById("openSecondWindow");

openSecondWindowButton.addEventListener("click", () => {
  ipcRenderer.send("open-second-window");
});
