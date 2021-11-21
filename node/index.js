/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-19 15:50:56
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-21 23:16:27
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
var cssscss = require('css-scss');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const notes ='/************************************* THE EXTENSIONS OF COLOR SYSTEM [色彩体系] *************************************/';
const pathUrl = 'node_modules/@cbim/design-system-variable';

// 遍历获取文件下所有文件
let walk = async function (dir, done) {
  var results = [];
  await fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};
// 创建文件
const cssFile = (data) => {
  const flag = fs.existsSync('css');
  if (flag) {
    fs.rmdirSync('css', { recursive: true }); // 递归删除文件目录
    copyFile(data);
  } else {
    copyFile(data);
  }
};
// 找出所有的css 文件后复制到新建的文件夹下
const copyFile = (data) => {
  fs.mkdirSync('css');
  data.forEach((item, index) => {
    if (path.extname(item) === '.css') {
      fs.copyFile(item, `css/${index}.css`, (err) => {
        if (err) throw err
      });
    }
  });
  walk('css', async (err, results) => {
    if (err) throw err;
    await createIndexCss();
    appendFile(results)
  });
};
// 新建index.css
const createIndexCss = () => {
  const flag = fs.existsSync('css/elementIndex.css');
  if (flag) {
    fs.unlinkSync('css/elementIndex.css');
  }
  fs.writeFile('css/elementIndex.css', notes, (err) => {
    if (err) throw err;
    console.log('创建elementIndex.css 成功');
  });
};
// 向新建的elementIndex.css 下追加内容
const appendFile = (data) => {
  let fileData = ''
  data.forEach(item => {
    fileData = fs.readFileSync(item, 'utf-8') + '\n'
    fs.appendFile('css/elementIndex.css', fileData, (err) => {
      if(err) throw err
      replaceFileContent()
    })
  });
  fileData = ''
  
}
// 替换文件中的所有@import
const replaceFileContent = () => {
  fs.readFile('css/elementIndex.css', 'utf-8', (err, data) => {
    if (err) throw err
    let searchString = '@import'
    let re = new RegExp('^.*' + searchString + '.*$', 'gm');
    let formatted = data.replace(re, '');
    fs.writeFile('css/elementIndex.css', formatted, 'utf-8', (err) => {
      if (err) throw err;
      const src = fs.readFileSync('css/elementIndex.css', 'utf8');
      const scss = cssscss(src);
      console.log(scss, 'css-scss');
      fs.writeFileSync('./theme/elementIndex.scss', scss);
    })

  })
}
walk(pathUrl, (err, results) => {
  if (err) throw err;
  cssFile(results);
});
