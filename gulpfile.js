import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import browser from "browser-sync";
import terser from "gulp-terser";
import { deleteSync as del } from "del";
import squoosh from "gulp-libsquoosh";
import htmlmin from "gulp-htmlmin";
import svgmin from "gulp-svgmin";

export const minify = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

// Styles

export const styles = () => {
  return gulp
    .src("source/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/*.html", gulp.series(minify)).on("change", browser.reload);
};

const scripts = () => {
  return gulp.src("source/js/*.js").pipe(terser()).pipe(gulp.dest("build/js"));
};

const copy = (done) => {
  gulp
    .src(["source/fonts/**/*.{woff2,woff}", "source/*.ico"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
  done();
};

export const optimizeImages = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"));
};

export const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}").pipe(gulp.dest("build/img"));
};

const svg = () => {
  return gulp
    .src(["source/img/**/*.svg", "!source/img/sprite.svg"])
    .pipe(svgmin())
    .pipe(gulp.dest("build/img"));
};

const clean = (done) => {
  del("build");
  done();
};

export const sprite = (done) => {
  gulp
    .src("source/img/sprite.svg", {
      base: "source",
    })
    .pipe(gulp.dest("build"));
  done();
};

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(styles, minify, scripts, svg)
);

export default gulp.series(
  clean,
  minify,
  scripts,
  copyImages,
  svg,
  styles,
  copy,
  sprite,
  server,
  watcher
);
