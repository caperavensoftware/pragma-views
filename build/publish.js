const gulp = require("gulp");
const Publish = require("build-utilities/publish");

gulp.task("build:publish", ["build:all", "build:dist"], function() {
    const publish = new Publish();
    publish.publish([
        {
            src: ["distribute/**/components/**/*.js"],
            dest: "publish",
            minify: true
        },
        {
            src: ["distribute/**/custom-attributes/**/*.js"],
            dest: "publish",
            minify: true
        },
        {
            src: ["distribute/**/lib/**/*.js"],
            dest: "publish",
            minify: true
        },
        {
            src: ["test/mockups/**/*.js"],
            dest: "publish/amd/mockups",
            minify: false
        },
        {
            src: ["test/mockups/**/*.js"],
            dest: "publish/commonjs/mockups",
            minify: false
        },
        {
            src: ["test/mockups/**/*.js"],
            dest: "publish/systemjs/mockups",
            minify: false
        },
        {
            src: ["distribute/**/components/**/*.map"],
            dest: "publish"
        },
        {
            src: ["app/src/components/icons/*.html"],
            dest: "publish/amd/components/icons"
        },
        {
            src: ["app/src/components/icons/*.html"],
            dest: "publish/commonjs/components/icons"
        },
        {
            src: ["app/src/components/master-detail/*.html"],
            dest: "publish/amd/components/master-detail"
        },
        {
            src: ["app/src/components/master-detail/*.html"],
            dest: "publish/commonjs/components/master-detail"
        },
        {
            src: ["app/src/components/assistant/*.html"],
            dest: "publish/amd/components/assistant"
        },
        {
            src: ["app/src/components/assistant/*.html"],
            dest: "publish/commonjs/components/assistant"
        },
        {
            src: ["app/src/components/assistant/*.html"],
            dest: "publish/systemjs/components/assistant"
        },
        {
            src: ["app/src/components/form-search/*.html"],
            dest: "publish/amd/components/form-search"
        },
        {
            src: ["app/src/components/form-search/*.html"],
            dest: "publish/commonjs/components/form-search"
        },
        {
            src: ["app/src/components/form-search/*.html"],
            dest: "publish/systemjs/components/form-search"
        },
        {
            src: ["app/src/components/input-composite/*.html"],
            dest: "publish/amd/components/input-composite"
        },
        {
            src: ["app/src/components/input-composite/*.html"],
            dest: "publish/commonjs/components/input-composite"
        },
        {
            src: ["app/src/components/input-composite/*.html"],
            dest: "publish/systemjs/components/input-composite"
        },
        {
            src: ["app/src/components/master-detail*.html"],
            dest: "publish/amd/components/master-detail"
        },
        {
            src: ["app/src/components/master-detail/*.html"],
            dest: "publish/commonjs/components/master-detail"
        },
        {
            src: ["app/src/components/master-detail/*.html"],
            dest: "publish/systemjs/components/master-detail"
        },
        {
            src: ["app/src/components/menu/*.html"],
            dest: "publish/amd/components/menu"
        },
        {
            src: ["app/src/components/menu/*.html"],
            dest: "publish/commonjs/components/menu"
        },
        {
            src: ["app/src/components/menu/*.html"],
            dest: "publish/systemjs/components/menu"
        },
        {
            src: ["distribute/amd/index.js"],
            dest: "publish/amd"
        },
        {
            src: ["distribute/commonjs/index.js"],
            dest: "publish/commonjs"
        },
        {
            src: ["distribute/systemjs/index.js"],
            dest: "publish/systemjs"
        },
        {
            src: ["sass/**/*.*"],
            dest: "publish/amd/scss"
        },
        {
            src: ["sass/**/*.*"],
            dest: "publish/commonjs/scss"
        },
        {
            src: ["sass/**/*.*"],
            dest: "publish/systemjs/scss"
        },
    ]);

    publish.setPackage({
        src: "package.json",
        dest: "publish/"
    });
});