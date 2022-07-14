import gulp from 'gulp';

// mode

global.app = {
    isBuild: process.argv.includes( '--build' ), 
    isDev: !process.argv.includes( '--build' ), 
}

// tasks

import { clean } from './gulp/task/clean.js';
import { copy } from './gulp/task/copy.js';
import { pug } from './gulp/task/pug.js';
import { scss } from './gulp/task/scss.js';

// script

const parallel = gulp.parallel( copy, scss, pug );
const dev = gulp.series( clean, parallel );

gulp.task( 'default', dev );