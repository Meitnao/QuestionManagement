const { Menu, app, BrowserWindow, dialog, path } = require('electron');
const { electron } = require('process');

const N = 10;

let win;
let willQuitApp = false;

function createWindow() {
    // 创建浏览器窗口。
    // Menu.setApplicationMenu(null);
    // const { Menu } = require('electron');
    Menu.setApplicationMenu(null);
    win = new BrowserWindow({
        minWidth: 500,
        minHeight: 800,
        width: 500,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            // contextIsolation: false,
            // enableRemoteModule: true,
        },
    });
    win.maximize();
    // win[0].maximize();
    // 加载index.html文件
    win.loadFile("index.html");
    // 打开开发者工具
    // win.webContents.openDevTools();
    // 当 window 被关闭，这个事件会被触发。
    win.on('close', (e) => {
        e.preventDefault();
        let currentWin = BrowserWindow.getFocusedWindow();
        let url = currentWin.webContents.getURL().split('/').slice(-1)[0].split('?')[0];
        if (url === "answer_question.html") {
            win.webContents.executeJavaScript(`
                const button = document.querySelector('#submit');
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                button.dispatchEvent(event);
            `); 
        } else {
            dialog.showMessageBox(win,{
                type:'warning',
                title:'电工理论练习盘',
                message:'请您确定是否退出练习盘',
                // detail:'details',
                buttons:['确定','取消'],
            }).then((res) => {
                if (res.response === 0) {
                    win = null;
                    app.exit();
                } else e.preventDefault();
            });
        }
    });
}

app.on("ready", createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
});
