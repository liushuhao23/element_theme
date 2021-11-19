/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-18 15:05:32
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-19 09:21:57
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  chainWebpack: (config) => {
        // config.plugins.push(
        //     new Components({
        //         resolvers: [ElementPlusResolver({
        //             importStyle: "sass",
        //         })],
        //     })
        // )
    config.resolve.alias.set('~/', `${path.resolve(__dirname, 'src')}/`);
  },
  css: {
    loaderOptions: {
        scss: {
          additionalData: `@use "~/styles/element/index.scss" as *;`,
        },
    },
  },
};
