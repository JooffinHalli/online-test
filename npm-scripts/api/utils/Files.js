const fs = require('node:fs');
const Process = require("./Process");

const options = { recursive: true, force: true };
const voidFn = () => {};

/** Утилиты для работы с файловой системой */
class Files {

  /** безопасно удалить папку */
  static removeFolderSafe = (dir) => {
    try {
      if (!fs.existsSync(dir)) return;
      fs.rmSync(dir, options);
    }
    catch (e) {
      Process.end(e.message);
    }
  }

  /** создать папку */
  static create = (path) => {
    fs.mkdir(path, null, voidFn);
  }

  /** записать в файл */
  static write = (path, content) => {
    fs.writeFile(path, content, null, voidFn);
  }

}

module.exports = Files;