/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-19 15:50:56
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-19 17:22:13
 */
// const path = '';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const pathUrl = 'node_modules/@cbim/design-system-variable';
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
const cssFile =(data) => {
    data.forEach(item => {
        console.log(path.extname(item))
        if (path.extname(item) === '.css') {
            //
        }
    })
}
walk(pathUrl, function (err, results) {
  if (err) throw err;
  cssFile(results)
});