// const { testNum, total, hasAnswered, page, wrongCnt } = require("./answer_question");
// const electron = require("electron");
// const Menu = require("electron");
// import { Menu } from 'electron';
// import { electron } from "electron";
// import { testNum, total, hasAnswered, page, wrongCnt } from "./answer_question.js";
// import { app, BrowserWindow, dialog } from "electron";
// const { app, BrowserWindow, dialog } = require('electron').remote;
// import { app, BrowserWindow, dialog } from '';
const { Menu, app, BrowserWindow, dialog, path } = require('electron');
const { electron } = require('process');
// const electronCompile = require('electron-compile');
// 
// import { process } from 'process';
// const { electron } = process;
// import { Menu, app, BrowserWindow, dialog, path } from 'electron';
// import module from './answer_question.js';
const N = 10;
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
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
    win.webContents.openDevTools();
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
                message:'请确定是否退出练习',
                // detail:'details',
                buttons:['确定','取消'],
            }).then((res) => {
                if (res.response === 0) {
                    win = null;
                    app.exit();
                } else e.preventDefault();
            });
        }
        // dialog.showMessageBox(win,{
        //     type:'warning',
        //     title:'电工理论练习盘',
        //     message:'请确定是否退出练习',
        //     // detail:'details',
        //     buttons:['确定','取消'],
        // }).then((res) => {
            // if (res.response === 0) {
            //     e.preventDefault();
            //     let currentWin = BrowserWindow.getFocusedWindow();
            //     let url = currentWin.webContents.getURL().split('/').slice(-1)[0].split('?')[0];
            //     // console.log(url);
            //     if (url === "answer_question.html") {
            //         dialog.showMessageBox(win, {
            //             type:'warning',
            //             title:'电工理论练习盘',
            //             message:'请再次确定是否退出练习',
            //             // detail:'details',
            //             buttons:['确定','取消'],
            //         }).then((res) => {
            //             if(res.response === 0) {
                            // const remote = require('electron').remote;
                            // const module = require('./answer_question.js');
                            // let score = module.hasAnswered - module.wrongCnt;
                            // let data = {
                            //     "total": module.total,
                            //     "score": score,
                            //     "test": module.testNum,
                            //     "page": module.page
                            // };
                            // let queryString = '?data=' + encodeURIComponent(JSON.stringify(data));
                            // win.loadURL("./end_answer.html");


                            // win.loadFile("./end_answer.html");
                            // console.log("_-----------");
                            // win = null;
                            // app.exit();
            //             }
            //         });
            //     } else {
            //         win = null;
            //         app.exit();
            //     }
            // } else e.preventDefault();
        
    });
}

app.on("ready", createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
});
// 当全部窗口关闭时退出。
// app.on("window-all-closed", () => {
//     // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
//     // 否则绝大部分应用及其菜单栏会保持激活。
//     if (process.platform !== "darwin") {
//         app.quit();
//     }
// });
// app.on("activate", () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
//     if (win === null) {
//         createWindow();
//     }
// });

// app.on('before-quit', () => {
//     willQuitApp = true;
// });

