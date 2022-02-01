const gulp = require("gulp");
const less = require("gulp-less");
const esbuild = require("esbuild");
const esbuildSvelte = require("esbuild-svelte");
const fs = require("fs");
const path = require("path");
const through2 = require("through2");
const gyaml = require("gulp-yaml");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const mergeStream = require("merge-stream");

/* ----------------------------------------- */
/*  Compile LESS
/* ----------------------------------------- */

const QUEST_LESS = ["styles/*.less"];
function compileLESS() {
    return gulp
        .src("styles/simple.less")
        .pipe(less())
        .pipe(gulp.dest("./styles/"));
}
const css = gulp.series(compileLESS);

//Compile JS
async function buildCode() {
    return esbuild.build({
        entryPoints: ["./module/quest.js"],
        bundle: true,
        outfile: `./dist/quest.js`,
        sourcemap: true,
        minify: false,
        format: "esm",
        platform: "browser",
        plugins: [esbuildSvelte()],
        external: ["../assets/*"]
    });
}

const build = gulp.series(buildCode);
exports.build = build;

async function buildCodeMin() {
    return esbuild.build({
        entryPoints: ["./module/quest.js"],
        bundle: true,
        outfile: `./dist/quest.js`,
        sourcemap: true,
        minify: true,
        format: "esm",
        platform: "browser",
        plugins: [esbuildSvelte()],
        external: ["../assets/*"]
    });
}

const buildMin = gulp.series(buildCodeMin);
exports.buildMin = buildMin;

function buildPack() {
    var packFolders = fs.readdirSync("src/packs/").filter(function (file) {
        return fs.statSync(path.join("src/packs", file)).isDirectory();
    });
    function makeId(length) {
        var result = "";
        var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }
    var packs = packFolders.map(function (folder) {
        return gulp
            .src(path.join("src/packs/", folder, "/**/*.yml"))
            .pipe(
                through2.obj(function (file, enc, cb) {
                    file.contents = Buffer.concat([
                        Buffer.from("_id: " + makeId(16) + "\n"),
                        file.contents
                    ]);
                    cb(null, file);
                })
            )
            .pipe(gyaml({ space: 0, safe: true, json: true }))
            .pipe(concat(folder + ".json"))
            .pipe(rename(folder + ".db"))
            .pipe(gulp.dest("packs"));
    });
    return mergeStream.call(null, packs);
}

const buildPacks = gulp.series(buildPack);
exports.buildPacks = buildPacks;

const STSTEM_JS = ["module/**/*.js", "module/*.js", "module/**/*.svelte"];

/* ----------------------------------------- */
/*  Watch Updates
/* ----------------------------------------- */

function watchUpdates() {
    gulp.watch(STSTEM_JS, build);
}

/* ----------------------------------------- */
/*  Export Tasks
/* ----------------------------------------- */

exports.default = gulp.series(watchUpdates, buildCode);
exports.css = css;
