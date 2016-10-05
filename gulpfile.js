// Require Gulp
var gulp = require('gulp'),
    // Require Gulp-sass plugin
    sass = require('gulp-sass'),
    // Require Sassdoc
    sassdoc = require('sassdoc'),
    // Require Sourcemaps
    sourcemaps = require('gulp-sourcemaps'),
    // Require Browser Sync for livereloading
    browserSync = require('browser-sync').create(),
    // Require Del to clean dev folder
    del = require('del'),
    // Require Process HTML
    processHtml = require('gulp-processhtml'),
    // Require iconfont generator plugin
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    // Require PostCSS autoprefixer
    autoprefixer = require('gulp-autoprefixer'),
    // Kraken image optimization plugin
    kraken = require('gulp-kraken'),
    // Clean CSS
    cleanCSS = require('gulp-clean-css'),
    // ConcatJS
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    svgo = require('gulp-svgo'),

    // ZIP
    zip = require('gulp-zip'),
    Path = require('path'),
    print = require('gulp-print'),

    rename = require("gulp-rename");

// Project settings
var config = {
    // Folders for assets, development environment
    folderDev: {
        base: 'dev',
        css: 'dev/css',
        csstest: 'dev/css/test',
        fonts: 'dev/fonts'
    }, // If this path gets changed, remember to update .gitignore with the proper path to ignore images and css
    folderAssets: {
        base: 'assets',
        styles: 'assets/styles'
    },
    folderDist: {
        base: 'dist',
        styles: 'dist/css'
    },
    folderBower: {
        base: 'bower_components',
        jeet: 'bower_components/jeet.gs',
        normalize: 'bower_components/normalize-scss',
        sassyCast: 'bower_components/sassy-cast',
        jquery: 'bower_components/jquery-latest',
        fullPage: 'bower_components/fullpage.js',
        mousewheel: 'bower_components/jquery-mousewheel',
        waypoints: 'bower_components/waypoints',
        raphael: 'bower_components/raphael',
        gsap: 'bower_components/gsap',
        customScrollbar: 'bower_components/malihu-custom-scrollbar-plugin'
    },

    // Sassdoc task options
    sassDocOptions: {
        dest: 'assets/doc/',
        display: {
            watermark: false
        },
        groups: {
            'undefined': 'General'
        },
        basePath: 'assets/styles/**/*.scss',
    }
};


// Sass tasks are divided for performance issues regarding dependencies
// Sass Build task definition, only ran once
gulp.task('sass:build', ['webfont', 'doc:generate', 'bowercopy'], function() {
    return gulp.src(config.folderAssets.styles + '/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(config.folderDev.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});
// Sass Watch task definition
gulp.task('sass', function() {
    return gulp.src(config.folderAssets.styles + '/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(config.folderDev.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// Browser Sync task definition
gulp.task('serve', function() {
    return browserSync.init({
        server: {
            baseDir: config.folderDev.base
        },
    });
});
gulp.task('serve:sassdoc', function() {
    return browserSync.init({
        server: {
            baseDir: config.folderAssets.base + '/doc/'
        },
    });
});


// Process HTML task definition
gulp.task('processHtml', function() {
    return gulp.src(config.folderAssets.base + '/templates/*.html')
        .pipe(gulp.dest(config.folderDev.base))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('processHtml:deploy', function() {
    return gulp.src(config.folderAssets.base + '/templates/*.html')
        .pipe(processHtml())
        .pipe(gulp.dest(config.folderDist.base));
});


// PostCSS autoprefixer task definition
gulp.task('autoprefixer', function() {
    return gulp.src('dev/css/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'last 3 iOS versions', 'Firefox > 20', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest('dev/css/'));
});

gulp.task('minify-css', ['autoprefixer', 'minify-css-plugin-1', 'minify-css-plugin-2'], function() {
    return gulp.src('dev/css/styles.css')
        .pipe(cleanCSS({
            debug: true
        }, function(details) {
            console.log('File: ' + details.name + ' -- Original Size: ' + details.stats.originalSize);
            console.log('File: ' + details.name + ' -- Minified Size: ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-css-plugin-1', function() {
    return gulp.src('dev/css/jquerymbYTPlayermin.css')
        .pipe(cleanCSS({
            debug: true
        }, function(details) {
            console.log('File: ' + details.name + ' -- Original Size: ' + details.stats.originalSize);
            console.log('File: ' + details.name + ' -- Minified Size: ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-css-plugin-2', function() {
    return gulp.src('dev/css/mediaelementplayer.css')
        .pipe(cleanCSS({
            debug: true
        }, function(details) {
            console.log('File: ' + details.name + ' -- Original Size: ' + details.stats.originalSize);
            console.log('File: ' + details.name + ' -- Minified Size: ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('concatpluginsJS', function() {
    return gulp.src(['./dev/js/plugins/modernizr.min.js', './dev/js/plugins/detectizr.min.js', './dev/js/plugins/jquery.mousewheel.min.js', './dev/js/plugins/jquery.fullPage.min.js', './dev/js/plugins/mediaelement-and-player.min.js', './dev/js/plugins/raphael.min.js', './dev/js/plugins/TweenMax.min.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js/plugins/'));
});

gulp.task('concatscriptJS', function() {
    return gulp.src(['./dev/js/socialShare.js', './dev/js/script-maps.js', './dev/js/script.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('pluginsJS', ['concatpluginsJS'], function(cb) {
    pump([
            gulp.src('./dist/js/plugins/app.js'),
            uglify(),
            gulp.dest('dist/js/plugins/')
        ],
        cb
    );
});

gulp.task('scriptsJS', ['concatscriptJS'], function(cb) {
    pump([
            gulp.src('./dist/js/script.js'),
            uglify(),
            gulp.dest('dist/js/')
        ],
        cb
    );
});


// Generate webfonts
gulp.task('webfont:generate', function() {
    //var fontName = 'icon-font';
    var fontName = 'soy-fonts-icon-font';//PRODUCTION
    return gulp.src([config.folderAssets.base + '/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            //fontPath: '../fonts/',
            fontPath: '/', //PRODUCTION
            path: 'gulp-icontemplate.css',
            targetPath: '_icon-font.scss'
        }))
        .pipe(iconfont({
            fontName: fontName,
            normalize: true,
            fontHeight: 1001,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']
        }))
        .pipe(gulp.dest(config.folderDev.fonts));
});
gulp.task('webfont:copy', ['webfont:generate'], function() {
    return gulp.src([config.folderDev.fonts + '/_icon-font.scss'])
        .pipe(gulp.dest(config.folderAssets.styles + '/libs/iconfont/'));
});
gulp.task('webfont', ['webfont:copy'], function() {
    return del([config.folderDev.fonts + '/*.scss']);
});


// Sassdoc generation Task definition
// doc task generates documentation and starts a live visualization of the docs in a browser
gulp.task('doc', ['serve:sassdoc'], function() {
    return gulp.src(config.folderAssets.base + '/**/*.scss')
        .pipe(sassdoc(config.sassDocOptions))
        .pipe(browserSync.reload({
            stream: true
        }));
});
// doc:generate only generates documentation. no server, no live display of genereated docs.
gulp.task('doc:generate', function() {
    return gulp.src(config.folderAssets.base + '/**/*.scss')
        .pipe(sassdoc(config.sassDocOptions));
});


// Kraken image optimization task definition
gulp.task('kraken', ['svgo'], function() {
    gulp.src(config.folderAssets.base + '/images/**/*.jpg')
        .pipe(kraken({
            key: 'b87e244345e0334cdfdcb06151d0736e',
            secret: '7c5349c43fac3efa4256014de693b2aa7ee96885',
            lossy: true,
            concurrency: 6
        }))
        .pipe(gulp.dest('./dist/img/'));
});

// Kraken image optimization task definition
gulp.task('copy:images', function() {
    gulp.src(config.folderAssets.base + '/images/**/*.*')
        .pipe(gulp.dest(config.folderDev.base + '/img/'));
});

gulp.task('copy:images:deploy', function() {
    gulp.src(config.folderAssets.base + '/images/**/*.*')
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('svgo', function() {
    gulp.src(config.folderAssets.base + '/images/**/*.svg')
        .pipe(svgo())
        .pipe(gulp.dest('./dist/img/'));
});


gulp.task('copydeploy:data', function() {
    gulp.src(config.folderDev.base + '/data/**/*.*')
        .pipe(gulp.dest(config.folderDist.base + '/data/'));
});

gulp.task('copydeploy:cssfont', function() {
    gulp.src(config.folderDev.base + '/css/font/*.*')
        .pipe(gulp.dest(config.folderDist.base + '/css/font/'));
});

gulp.task('copydeploy:fonts', function() {
    gulp.src(config.folderDev.base + '/fonts/**/*.*')
        .pipe(gulp.dest(config.folderDist.base + '/fonts/'));
});


// Copy only the needed resources from Bower
gulp.task('bowercopy', ['bowercopy:jeet', 'bowercopy:normalize', 'bowercopy:sassy-cast', 'bowercopy:jquery', 'bowercopy:fullPage', 'bowercopy:mousewheel', 'bowercopy:waypoints', 'bowercopy:raphael', 'bowercopy:gsap', 'bowercopy:customScrollbar', 'bowercopy:customScrollbarCSS']);

gulp.task('bowercopy:jeet', function() {
    return gulp.src([config.folderBower.jeet + '/scss/jeet/*.scss'])
        .pipe(gulp.dest(config.folderAssets.styles + '/libs/jeet'));
});
gulp.task('bowercopy:normalize', function() {
    return gulp.src([config.folderBower.normalize + '/*'])
        .pipe(gulp.dest(config.folderAssets.styles + '/libs/normalize'));
});
gulp.task('bowercopy:sassy-cast', function() {
    return gulp.src([config.folderBower.sassyCast + '/dist/**/*'])
        .pipe(gulp.dest(config.folderAssets.styles + '/libs/sassy-cast'));
});
gulp.task('bowercopy:jquery', function() {
    return gulp.src([config.folderBower.jquery + '/dist/jquery.min.js'])
        .pipe(gulp.dest(config.folderDev.base + '/js/vendor'));
});
gulp.task('bowercopy:fullPage', function() {
    return gulp.src([config.folderBower.fullPage + '/jquery.fullPage.min.js'])
        .pipe(gulp.dest(config.folderDev.base + '/js/plugins'));
});
gulp.task('bowercopy:mousewheel', function() {
    return gulp.src([config.folderBower.mousewheel + '/jquery.mousewheel.min.js'])
        .pipe(gulp.dest(config.folderDev.base + '/js/plugins'));
});
gulp.task('bowercopy:waypoints', function() {
    return gulp.src([config.folderBower.waypoints + '/lib/jquery.waypoints.min.js'])
        .pipe(gulp.dest(config.folderDev.base + '/js/plugins'));
});
gulp.task('bowercopy:raphael', function() {
    return gulp.src([config.folderBower.raphael + '/raphael.min.js'])
        .pipe(gulp.dest(config.folderDev.base + '/js/plugins'));
});
gulp.task('bowercopy:gsap', function() {
    return gulp.src([config.folderBower.gsap + '/src/minified/TweenMax.min.js'])
        .pipe(gulp.dest(config.folderDev.base + '/js/plugins'));
});
gulp.task('bowercopy:customScrollbar', function() {
    return gulp.src([config.folderBower.customScrollbar + '/jquery.mCustomScrollbar.concat.min.js'])
        .pipe(gulp.dest(config.folderDev.base + '/js/plugins'));
});
gulp.task('bowercopy:customScrollbarCSS', function() {
    return gulp.src([config.folderBower.customScrollbar + '/jquery.mCustomScrollbar.min.css'])
        .pipe(gulp.dest(config.folderDev.base + '/css'));
});

gulp.task('tnc-deploy', function() {
    gulp.src("./dist/**/*.*")
        .pipe(rename({
            dirname: "",
            prefix: "soy-"
        }))
        .pipe(gulp.dest("./tnc-deploy"));
});


// Delete dev folder for cleaning
gulp.task('clean', ['clean:styles', 'clean:fonts']);

gulp.task('clean:styles', function() {
    return del.sync(config.folderDev.css);
});
gulp.task('clean:fonts', function() {
    return del.sync([config.folderDev.fonts, config.folderAssets.base + '/libs/iconfont']);
});

// ZIP Compression
gulp.task('deploy', ['deploy:files', 'copy:images:deploy'], function() {
    var aux = new Date();
    return gulp.src('./dist/**/*.*')
        .pipe(zip('TNC Deploy --' + aux.toDateString() + '.zip'))
        .pipe(gulp.dest('./'));
});


// Watch for changes
gulp.task('run', ['build', 'serve'], function() {
    gulp.watch(config.folderAssets.base + '/**/*.scss', ['sass']);
    gulp.watch(config.folderAssets.base + '/icons/*.svg', ['build']);
    gulp.watch(config.folderDev.css + '/*.css');
    gulp.watch(config.folderAssets.base + '/images/*.*', ['copy:images']);
    gulp.watch(config.folderAssets.base + '/templates/*.html', ['processHtml']);
    // Uncomment if want to watch for js changes
    // gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Define build task
gulp.task('build', ['sass:build', 'processHtml', 'copy:images']);

gulp.task('compressJS', ['pluginsJS', 'scriptsJS']);
gulp.task('compressCSS', ['minify-css']);
gulp.task('copydeploy', ['copydeploy:data', 'copydeploy:fonts', 'copydeploy:cssfont']);



gulp.task('deploy:files', ['processHtml:deploy', 'copydeploy', 'compressJS', 'compressCSS']);