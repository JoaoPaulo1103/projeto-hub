const { app, BrowserWindow, shell } = require('electron');

// Endereço da versão WEB do app (a publicada no passo 27).
// Durante o desenvolvimento, use o servidor do Expo: http://localhost:8081
const APP_URL = process.env.HUB_APP_URL || 'https://SEU-APP.vercel.app';

function criarJanela() {
  const janela = new BrowserWindow({
    width: 1100,
    height: 760,
    title: 'HUB App',
    autoHideMenuBar: true,
  });

  janela.loadURL(APP_URL);

  // Links externos abrem no navegador padrão, não dentro do app.
  janela.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  criarJanela();
  // macOS: recria a janela ao clicar no ícone do Dock.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) criarJanela();
  });
});

// Windows/Linux: fechar a última janela encerra o app.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
