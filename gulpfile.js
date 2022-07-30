var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var htmlmin = require('gulp-html-minifier-terser')
var htmlclean = require('gulp-htmlclean')
// 图片压缩，如果使用需安装 gulp-imagemin
// var imagemin = require('gulp-imagemin')
var workbox = require('workbox-build')
// babel
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
//tester
const terser = require('gulp-terser')

//pwa
const generateServiceWorker = async () => {
  return workbox.injectManifest({
    swSrc: './sw-template.js',
    swDest: './public/sw.js',
    globDirectory: './public',
    globPatterns: ['**/*.{html,css,js,json,woff2}'],
    modifyURLPrefix: {
      '': './'
    }
  })
}
// 压缩JS(babel)
const minifyJsByBabel = async () => {
  return gulp
    .src(['./public/**/*.js', '!./public/**/*.min.js'])
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(
      uglify().on('error', function (e) {
        console.log(e)
      })
    )
    .pipe(gulp.dest('./public'))
}
// 压缩JS(tester)
const minifyJsBytester = async () => {
  return gulp
    .src(['./public/**/*.js', '!./public/**/*.min.js'])
    .pipe(terser())
    .pipe(gulp.dest('./public'))
}
// 压缩CSS
const minifyCss = async () => {
  return gulp
    .src('./public/**/*.css')
    .pipe(
      cleanCSS({
        compatibility: 'ie11'
      })
    )
    .pipe(gulp.dest('./public'))
}
// 压缩HTML
const minifyHtml = async () => {
  return gulp
    .src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        removeComments: true, // 清除 HTML 注释
        collapseWhitespace: true, // 压缩 HTML
        collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, // 刪除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, // 刪除 <script> 的 type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 刪除 <style> 和 <link> 的 type="text/css"
        minifyJS: true, // 压缩页面 JS
        minifyCSS: true, // 压缩页面 CSS
        minifyURLs: true
      })
    )
    .pipe(gulp.dest('./public'))
}
// 压缩 public/uploads 目录内图片
const minifyImages = async () => {
  if (typeof imagemin === 'undefined') return
  gulp
    .src('./public/img/**/*.*')
    .pipe(
      imagemin({
        optimizationLevel: 5, //类型：Number  预设：3  取值範围：0-7（优化等级）
        progressive: true, //类型：Boolean 预设：false 无失真压缩jpg图片
        interlaced: false, //类型：Boolean 预设：false 隔行扫描gif进行渲染
        multipass: false //类型：Boolean 预设：false 多次优化svg直到完全优化
      })
    )
    .pipe(gulp.dest('./public/img'))
}
// 执行 gulp 命令时执行的任务
exports.default = gulp.series(
  // gulp.parallel(minifyJsByBabel, minifyJsBytester, minifyHtml, minifyCss)
  gulp.parallel(minifyJsBytester, minifyHtml, minifyCss, minifyImages)
)
