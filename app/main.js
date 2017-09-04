const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const dialog = require('electron').dialog;

function getWebsiteData()
{
    dialog.showMessageBox({message: 'Gathering informations from server. Please wait...'});
}

function contactSupport()
{
    //app.remote.
    //window.location.href = "mailto:info@absolute-fx.com;info@proglab.com"
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 1200, height: 800, resizable: false, icon: "icon.ico"})

    const template = [
        {
            label: 'Serveur',
            submenu: [
                {
                    label: 'Tester la connexion serveur'
                },
                {
                    label: 'Charger le contenu actuel du site',
                    click: () => {
                    getWebsiteData()
                }
            }
        ]
    },
    {
        label: 'Edition',
            submenu: [
            {
                label: 'Annuler',
                role: 'undo'
            },
            {
                label: 'Refaire',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: 'Couper',
                role: 'cut'
            },
            {
                label: 'Copier',
                role: 'copy'
            },
            {
                label: 'Coller',
                role: 'paste'
            },
            {
                label: 'Supprimer',
                role: 'delete'
            },
            {
                label: 'Tout sélectionner',
                role: 'selectall'
            }
        ]
    },
    {
        label: 'Quitter',
        role: 'quit'
    },
    {
        label: '?',
            submenu: [
                {
                    label: "Version 1.0",
                    enable: false
                },
                {
                    label: "Contacter le support",
                    click: () => {
                    contactSupport()
                }
            }
        ]
    }
]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    win.$ = win.jQuery = require('jquery');

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
    app.quit()
}
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
    createWindow()
}
})
