import gulp from 'gulp';
import del from 'del';
import { path } from '../config/path.js';

export const clean = () => {
    if ( app.isBuild ) {
        return del( path.clean );
    } else {
        return gulp.src( '.', { allowEmpty: true } );
    }
}