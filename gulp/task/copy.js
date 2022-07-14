import gulp from 'gulp';
import gulpChanged from 'gulp-changed';
import{ path } from '../config/path.js';

export const copy = () => {
    return (
        gulp.src( path.src.assets )
        .pipe( gulpChanged( path.dest.assets ) )
        .pipe( gulp.dest( path.dest.assets ) )
    )
}