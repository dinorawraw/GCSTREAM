const { app, BrowserWindow } = require('electron')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      transparent: true // Habilita transparência
    },
    frame: false,
    backgroundColor: '#00000000'
  })

  mainWindow.loadURL('http://localhost:3000/embed')
  // mainWindow.webContents.openDevTools() // Descomente para debug
}

app.whenReady().then(createWindow)
