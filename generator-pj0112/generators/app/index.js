var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // This makes `appname` a required argument.
        this.argument("appname", {type: String, required: false});

        // And you can then access it later; e.g.
        this.log(this.options.appname);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }


    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            },
            {
                type: "confirm",
                name: "cool",
                message: "Would you like to enable the Cool feature?"
            }
        ]);
    }

    writing() {
        this.log("app name", this.answers.name);
        this.log("cool feature", this.answers.cool);

        const pkgJson = {
                "scripts": {
                    "start": "webpack-dev-server --open --mode development",
                    "build": "webpack --mode production"
                },
                "devDependencies": {
                    "@babel/core": "^7.8.4",
                    "@babel/preset-env": "^7.8.4",
                    "@babel/preset-react": "^7.8.3",
                    "babel-loader": "^8.0.6",
                    "eslint": "^3.15.0",
                    "html-loader": "^0.5.5",
                    "html-webpack-plugin": "^3.2.0",
                    "webpack": "^4.41.5",
                    "webpack-cli": "^3.3.10",
                    "webpack-dev-server": "^3.10.3"
                },
                "dependencies": {
                    "react": "^16.12.0",
                    "react-dom": "^16.12.0"
                }
            };

        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

        this.fs.copyTpl(
            this.templatePath('src/index.html'),
            this.destinationPath('src/index.html'),
            {title: 'Templating with Yeoman' + this.answers.name}
        );
        this.fs.copyTpl(
            this.templatePath('src/index.js'),
            this.destinationPath('src/index.js')
        );
        this.fs.copyTpl(
            this.templatePath('src/components/MyButton.js'),
            this.destinationPath('src/components/MyButton.js')
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('./webpack.config.js')
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('./.babelrc')
        );
    }

    installingLodash() {
    }

    paths() {
        // this.destinationRoot();
        // // returns '~/projects'
        //
        // this.destinationPath('index.js');
        // // returns '~/projects/index.js'
        //
        // this.sourceRoot();
        // // returns './templates'
        //
        // this.templatePath('index.js');
        // // returns './templates/index.js'


    }


    install() {
        this.npmInstall();
    }

};
