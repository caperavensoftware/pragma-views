const gulp = require("gulp");
const Publish = require("build-utilities/publish");

gulp.task("build:publish", ["build:all", "build:dist"], function() {
    const publish = new Publish();
    publish.publish([
        {
            src: ["distribute/**/components/**/*.js"],
            dest: "publish"
        },
        {
            src: ["distribute/**/custom-attributes/**/*.js"],
            dest: "publish"
        },
        {
            src: ["distribute/**/lib/**/*.js"],
            dest: "publish"
        },

        {
            src: ["test/mockups/**/*.js"],
            dest: "publish/amd/mockups"
        },
        {
            src: ["test/mockups/**/*.js"],
            dest: "publish/commonjs/mockups"
        },
        {
            src: ["test/mockups/**/*.js"],
            dest: "publish/systemjs/mockups"
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
            src: ["app/src/components/icons/*.html"],
            dest: "publish/systemjs/components/icons"
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
            src: ["app/src/components/master-detail/*.html"],
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
            src: ["app/src/components/master-list-container/*.html"],
            dest: "publish/amd/components/master-list-container"
        },
        {
            src: ["app/src/components/master-list-container/*.html"],
            dest: "publish/commonjs/components/master-list-container"
        },
        {
            src: ["app/src/components/master-list-container/*.html"],
            dest: "publish/systemjs/components/master-list-container"
        },
        {
            src: ["app/src/components/order-group/*.html"],
            dest: "publish/amd/components/order-group"
        },
        {
            src: ["app/src/components/order-group/*.html"],
            dest: "publish/commonjs/components/order-group"
        },
        {
            src: ["app/src/components/order-group/*.html"],
            dest: "publish/systemjs/components/order-group"
        },
        {
            src: ["app/src/components/percentage-chart/*.html"],
            dest: "publish/amd/components/percentage-chart"
        },
        {
            src: ["app/src/components/percentage-chart/*.html"],
            dest: "publish/commonjs/components/percentage-chart"
        },
        {
            src: ["app/src/components/percentage-chart/*.html"],
            dest: "publish/systemjs/components/percentage-chart"
        },
        {
            src: ["app/src/components/pragma-dropdown-menu/*.html"],
            dest: "publish/amd/components/pragma-dropdown-menu"
        },
        {
            src: ["app/src/components/pragma-dropdown-menu/*.html"],
            dest: "publish/commonjs/components/pragma-dropdown-menu"
        },
        {
            src: ["app/src/components/pragma-dropdown-menu/*.html"],
            dest: "publish/systemjs/components/pragma-dropdown-menu"
        },
        {
            src: ["app/src/components/pragma-messages/*.html"],
            dest: "publish/amd/components/pragma-messages"
        },
        {
            src: ["app/src/components/pragma-messages/*.html"],
            dest: "publish/commonjs/components/pragma-messages"
        },
        {
            src: ["app/src/components/pragma-messages/*.html"],
            dest: "publish/systemjs/components/pragma-messages"
        },
        {
            src: ["app/src/components/pragma-options-toolbar/*.html"],
            dest: "publish/amd/components/pragma-options-toolbar"
        },
        {
            src: ["app/src/components/pragma-options-toolbar/*.html"],
            dest: "publish/commonjs/components/pragma-options-toolbar"
        },
        {
            src: ["app/src/components/pragma-options-toolbar/*.html"],
            dest: "publish/systemjs/components/pragma-options-toolbar"
        },
        {
            src: ["app/src/components/pragma-template/*.html"],
            dest: "publish/amd/components/pragma-template"
        },
        {
            src: ["app/src/components/pragma-template/*.html"],
            dest: "publish/commonjs/components/pragma-template"
        },
        {
            src: ["app/src/components/pragma-template/*.html"],
            dest: "publish/systemjs/components/pragma-template"
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

        {
            src: ["group-worker.js"],
            dest: "publish/amd"
        },
        {
            src: ["group-worker.js"],
            dest: "publish/commonjs"
        },
        {
            src: ["group-worker.js"],
            dest: "publish/systemjs"
        },

        {
            src: ["distribute/amd/dialogs/**/*.js"],
            dest: "publish/amd/dialogs"
        },
        {
            src: ["distribute/commonjs/dialogs/**/*.js"],
            dest: "publish/commonjs/dialogs"
        },
        {
            src: ["distribute/systemjs/dialogs/**/*.js"],
            dest: "publish/systemjs/dialogs"
        },
        {
            src: ["app/src/dialogs/**/*.html"],
            dest: "publish/amd/dialogs"
        },
        {
            src: ["app/src/dialogs/**/*.html"],
            dest: "publish/commonjs/dialogs"
        },
        {
            src: ["app/src/dialogs/**/*.html"],
            dest: "publish/systemjs/dialogs"
        },

        {
            src: ["app/src/dialogs/**/*.map"],
            dest: "publish/amd/dialogs"
        },
        {
            src: ["app/src/dialogs/**/*.map"],
            dest: "publish/commonjs/dialogs"
        },
        {
            src: ["app/src/dialogs/**/*.map"],
            dest: "publish/systemjs/dialogs"
        }
    ]);

    publish.setPackage({
        src: "package.json",
        dest: "publish/"
    });
});