module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        clean: {
            build: ["prod"]
        },
        shell: {
            uglify: {
                command: "node r.js -o build.js"
            }
        },
        jshint: {
            all: ["src/core/**/*.js"],
            options: {
                ignores: ["src/main.js", "src/systems/libs/**/*.js"],
                "strict": true,
                "curly": true,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "sub": true,
                "undef": false,
                "boss": true,
                "eqnull": true,
                "browser": true,
                "unused": true,
                "proto": true,
                "globals": {
                    "jQuery": true,
                    "define": true,
                    "require": true,
                    "console": true,
                    "$": true,
                    "_": true,
                    "asyncTest": true,
                    "deepEqual": true,
                    "equal": true,
                    "expect": true,
                    "module": true,
                    "notDeepEqual": true,
                    "notEqual": true,
                    "notStrictEqual": true,
                    "ok": true,
                    "QUnit": true,
                    "raises": true,
                    "start": true,
                    "stop": true,
                    "strictEqual": true,
                    "test": true,
                    "throws": true,
                    "prompt": true,
                    "alert": true
                }
            }
        },
        jscs: {
            src: "src/core/**/*.js",
            options: {
                "requireCurlyBraces": ["if", "else", "for", "while", "do", "try", "catch"],
                "requireSpaceAfterKeywords": ["if", "else", "for", "while", "do", "switch", "return", "try", "catch"],
                "disallowLeftStickedOperators": ["?", "+", "-", "/", "*", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<="],
                "disallowRightStickedOperators": ["?", "+", "/", "*", ":", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<="],
                "requireRightStickedOperators": ["!"],
                "requireLeftStickedOperators": [","],
                "disallowImplicitTypeConversion": ["string"],
                "disallowKeywords": ["with"],
                "disallowMultipleLineBreaks": true,
                "disallowKeywordsOnNewLine": ["else"],
                //"requireLineFeedAtFileEnd": true, // requireLineFeedAtFileEnd option requires true value or should be removed
                "excludeFiles": ["src/systems/libs/**/*.js", "src/main.js"],
                "validateJSDoc": {
                    "checkParamNames": true,
                    "requireParamTypes": true
                }
            }
        },
        csslint: {
            strict: {
                src: [
                    "src/stylesheets/css/**/*.css"
                ],
                options: {
                    "ids": false,
                    "overqualified-elements": false,
                    "important": false,
                    "adjoining-classes": false,
                    "known-properties": false,
                    "box-sizing": false,
                    "box-model": false,
                    "display-property-grouping": false,
                    "bulletproof-font-face": false,
                    "compatible-vendor-prefixes": false,
                    "regex-selectors": false,
                    "errors": false,
                    "duplicate-background-images": false,
                    "duplicate-properties": false,
                    "empty-rules": false,
                    "selector-max-approaching": false,
                    "gradients": false,
                    "fallback-colors": false,
                    "font-sizes": false,
                    "font-faces": false,
                    "floats": false,
                    "star-property-hack": false,
                    "outline-none": false,
                    "import": false,
                    "underscore-property-hack": false,
                    "rules-count": false,
                    "qualified-headings": false,
                    "selector-max": false,
                    "shorthand": false,
                    "text-indent": false,
                    "unique-headings": false,
                    "universal-selector": false,
                    "unqualified-attributes": false,
                    "vendor-prefix": true,
                    "zero-units": false
                }
            }
        },
        recess: {
            options: {
                compile: true
            },
            main: {
                files: {
                    "src/stylesheets/css/common.css": [
                        "src/stylesheets/less/common.less"
                    ]
                }
            }
        },
        watch: {
            less: {
                files: ["src/stylesheets/less/**/*.less"],
                tasks: ["recess:main"],
                options: {
                    spawn: false
                }
            }
        },
        qunit: {
            options: {
                '--web-security': 'no',
                coverage: {
                    src: ['src/core/**/*.js'],
                    instrumentedFiles: 'temp/',
                    htmlReport: 'report/coverage',
                    coberturaReport: 'report/'
                }
            },
            all: ['../tests/index.html']
        },
        strip: {
            main: {
                src: "prod/src/core/**/*.js",
                options: {
                    inline: true,
                    nodes: ["console.log", "debug"]
                }
            }
        }
    });

    // Load NPM Task
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs-checker");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks("grunt-recess");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-qunit-istanbul");
    grunt.loadNpmTasks("grunt-strip");
    
    // Load Default Task.
    grunt.registerTask("default", ["clean", "jshint", "jscs", "recess", "csslint"]);

    // Load Build Task;
    grunt.registerTask("build", ["clean", "jshint", "jscs", "recess", "csslint", "shell", "qunit", "strip"]);
};