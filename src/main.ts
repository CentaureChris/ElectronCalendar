const { app, BrowserWindow, ipcMain } = require('electron')

let eventEnCour:any = null
let mainWindow:typeof BrowserWindow | null = null
let modal:typeof BrowserWindow | null = null

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('./dist/index.html')
    
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

ipcMain.handle('open-modal', (e: any,data:any) => {
    eventEnCour = data 
    modal = new BrowserWindow({
        width: 800,
        height: 600,
        parent: mainWindow,
        closable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    modal.loadFile('./dist/modal.html')
    
    
})

ipcMain.handle('test', () => {
    let ret = eventEnCour
    // eventEnCour = null
    return ret
})

ipcMain.handle('addForm', () => {
    modal.loadFile('./dist/addEventModal.html')
})

ipcMain.handle('reload',() => {
    mainWindow.reload()
})


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.