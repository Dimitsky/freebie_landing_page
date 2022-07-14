import * as nodePath from 'path';

const rootFolder = nodePath.basename( nodePath.resolve() ),
      destFolder = './dest',
      srcFolder = './src';

export const path = {
    dest: {
        assets: `${destFolder}/assets/`, 
        css: `${destFolder}/assets/css/`, 
        html: `${destFolder}/`
    },
    src: {
        assets: `${srcFolder}/assets/**/*.*`, 
        scss: `${srcFolder}/components/style/style.scss`, 
        pug: `${srcFolder}/components/pug/pages/*.pug`, 
    },
    clean: destFolder, 
    destFolder: destFolder, 
    rootFolder: rootFolder,
    srcFolder: srcFolder,
}