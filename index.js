/*!
 * Load Dependancies
 */
var fs        = require('fs'),
    ejs      = require('ejs'),
    template  = fs.readFileSync(require('path').join(module.filename, '../template.html')).toString(),
    highlight = function (source){
        //don't replace based on a special character, do replace based on <code> tags.
        return require("highlight").Highlight(source, false, true);
    }

/**
 * # Example Usage
 *     npm install dox-basic -g
 *     dox-basic -t "Library Name"<index.js>readme.html
 */

/**
 * Parser name
 */
exports.name = 'dox-basic';

/**
 * Parser version
 */
exports.version = '0.0.1';

/**
 * Parse source code to produce documentation
 * 
 * @param  {string} source          JavaScript source code with comments
 * @param  {object} [options] 
 * @param  {string} [options.title] The title of the javascript library
 * @return {string}                 An html representation of the documentation
 */
exports.parse = function(source, options){
    options = options || {};
    var title = options.title || 'Documentation';
    var dox = require('dox');
    var obj = dox.parseComments(source);

    return highlight(ejs.render(template, {title: title, comments:obj}));
}

/**
 * Parse source code to produce documentation without the surrounding html page
 * 
 * @param  {string} source          JavaScript source code with comments
 * @param  {object} [options]
 * @return {object}                 {html:"HTML representation of docs", css:"link to a css style sheet to include"}
 */
exports.parseInner = function(source, options){

}