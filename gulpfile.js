'use strict';

var gulp = require("gulp"),
    autoPrefix = require("gulp-autoprefixer"),
    cssComb = require("gulp-csscomb"),
    image = require("gulp-image"),
    compileSass = require("gulp-sass"),
    rigger = require("gulp-rigger"),
    rimraf = require("rimraf");

var path = {
    
    src: {
        html: [
            'src/*.html',
            'src/*.php',
            'src/!*/*.html'
        ],
        css: 'src/styles/*.scss',
        php: 'src/scripts/php/*.php',
        img: 'src/img/*.png',
        svg: 'src/svg/*.svg',
        font: 'src/fonts/*.ttf',
        js: 'src/scripts/js/*.js',
        jq: [
            'src/jquery/*',
            'src/jquery/**/*',
            'src/jquery/**/**/*'
        ]
    },
    
    build: {
        html: 'build/',
        css: 'build/styles/',
        php: 'build/scripts/php/',
        img: 'build/img/',
        svg: 'build/svg/',
        font: 'build/fonts/',
        js: 'build/scripts/js/',
        jq: 'build/jquery/'
    },
    
    watch: {
        pages: [
            'src/*.html',
            'src/!*/*.html',
            'src/*.php',
            'src/!*/*.php',
            'src/fonts/*.ttf'
        ],
        scripts: [
            'src/scripts/php/*.php',
            'src/scripts/js/*.js'
        ],
        styles: [
            'src/styles/*.scss',
            'src/styles/templates/*.scss'
        ],
        images: [
            'src/images/*.png',
            'src/svg/*.svg'
        ]
    },
    
    clean: 'build*'
};

//Збірка html
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

//Збірка php
gulp.task('php:build', function () {
    gulp.src(path.src.php)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.php));
});

//Збірка JS
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js));
});

//Збірка JQuery
gulp.task('jq:build', function () {
    gulp.src(path.src.jq)
        .pipe(gulp.dest(path.build.jq));
});

//Збірка СSS
gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(compileSass().on('error', compileSass.logError))
        .pipe(cssComb())
        .pipe(autoPrefix())
        .pipe(gulp.dest(path.build.css));
});

//Збірка картинок
gulp.task('img:build', function () {
    gulp.src(path.src.img)
        .pipe(image())
        .pipe(gulp.dest(path.build.img));
});

gulp.task('svg:build', function () {
    gulp.src(path.src.svg)
        .pipe(gulp.dest(path.build.svg));
});

//Збірка шрифтів
gulp.task('fonts:build', function () {
    gulp.src(path.src.font)
        .pipe(gulp.dest(path.build.font));
});

//Загальна збірка
gulp.task('project:build', [
    'html:build',
    'js:build',
    'jq:build',
    'css:build',
    'img:build',
    'svg:build',
    'php:build',
    'fonts:build'
]);

gulp.task('watch', function () {
    gulp.watch(path.watch.pages, [
        'html:build',
        'fonts:build'
    ]);
    gulp.watch(path.watch.styles, ['css:build']);
    gulp.watch(path.watch.scripts, [
        'js:build',
        'php:build'
    ]);
    gulp.watch(path.watch.images, [
        'img:build',
        'svg:build'
    ]);
});

//Очистка
gulp.task('clean', function (callback) {
    rimraf(path.clean, callback);
});

//Запуск роботи з проектом
gulp.task('default', ['project:build', 'watch']);