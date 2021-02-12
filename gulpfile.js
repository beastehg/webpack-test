const profectFolder = "dist";
// let profectFolder = require("path").basename(__dirname);
const sourceFolder = "src";

const path = {
	build: {
		html: `${profectFolder}/`,
		css: `${profectFolder}/css/`,
		js: `${profectFolder}/js/`,
		images: `${profectFolder}/images/`,
		fonts: `${profectFolder}/fonts/`,
	},
	src: {
		html: `${sourceFolder}/*.html`,
		css: `${sourceFolder}/scss/style.scss`,
		js: `${sourceFolder}/js/*.{js,jsx,tsx,ts}`,
		images: `${sourceFolder}/images/**/*.{jpg,png,svg,gif,ico,webp}`,
		fonts: `${sourceFolder}/fonts/**/*.{svg,ttf,woff,woff2}`,
	},
	watch: {
		html: `${sourceFolder}/**/*.html`,
		css: `${sourceFolder}/scss/**/*.scss`,
		js: `${sourceFolder}/js/**/*.{js,jsx,tsx,ts,map}`,
		images: `${sourceFolder}/images/**/*.{jpg,png,svg,gif,ico,webp}`,
		fonts: `${sourceFolder}/fonts/**/*.{svg,ttf,woff,woff2}`,
	},
	clean: `./${profectFolder}/`,
};

// Тут обьявляем переменные в конце последней всегда ;
const { src, dest } = require("gulp");
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const groupMedia = require("gulp-group-css-media-queries");
// const htmlValidator = require("gulp-w3c-html-validator");
const htmlbeautify = require("gulp-html-beautify");
const imagemin = require("gulp-imagemin");
const cssNano = require("gulp-cssnano");
const renameCss = require("gulp-rename");
const gulpWebpack = require("gulp-webpack");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");

function browserSync() {
	browsersync.init({
		server: {
			baseDir: `./${profectFolder}/`,
		},
		port: 3000,
		notify: false,
	});
}

function images() {
	return src(path.src.images)
		.pipe(imagemin())
		.pipe(dest(path.build.images))
		.pipe(browsersync.stream());
}

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
		.pipe(browsersync.stream());
}

// function js() {
// 	return src(path.src.js).pipe(dest(path.build.js)).pipe(browsersync.stream());
// }

function html() {
	return (
		src(path.src.html)
			.pipe(
				htmlbeautify({
					indent_size: 3,
					inline: [
						"abbr",
						"area",
						"b",
						"bdi",
						"bdo",
						"br",
						"cite",
						"code",
						"data",
						"datalist",
						"del",
						"dfn",
						"em",
						"embed",
						"i",
						"ins",
						"kbd",
						"keygen",
						"map",
						"mark",
						"math",
						"meter",
						"noscript",
						"object",
						"output",
						"progress",
						"q",
						"ruby",
						"s",
						"samp",
						"small",
						"strong",
						"sub",
						"sup",
						"template",
						"time",
						"u",
						"var",
						"wbr",
						"text",
						"acronym",
						"address",
						"big",
						"dt",
						"ins",
						"strike",
						"tt",
					],
				})
			)
			// .pipe(htmlValidator())
			.pipe(dest(path.build.html))
			.pipe(browsersync.stream())
	);
}

// webpack
function scripts() {
	return src(path.src.js)
		.pipe(gulpWebpack(webpackConfig, webpack))
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}


function css() {
	return src(path.src.css)
		.pipe(scss({ outputStyle: "expanded" }))
		.pipe(groupMedia())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true,
			})
		)
		.pipe(dest(path.build.css))
		.pipe(cssNano())
		.pipe(
			renameCss({
				extname: ".min.css",
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}

// Смотрим изменния в папках и тогда выполняем функции!
function watchFiles() {
	gulp.watch([path.watch.images], images);
	gulp.watch([path.watch.fonts], fonts);
	gulp.watch([path.watch.js], scripts);
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
}

// Все что в gulp.series(gulp.parallel() -- Будт выполняться паралельно !
// gulp.parallel(build, watchFiles, browserSync) -- Не трогать это слежка и обновление в браузере паралельно!
const build = gulp.series(gulp.parallel(html, css, images, fonts, scripts));
const watch = gulp.parallel(build, watchFiles, browserSync);

// Сюда пишем папка = функции -- дружим Gulp c функциями
exports.fonts = fonts;
exports.images = images;
// exports.js = js;
exports.scripts = scripts;
exports.html = html;
exports.css = css;
exports.watch = watch;
exports.default = watch;
