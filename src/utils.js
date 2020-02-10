const colors = require('colors');
module.exports = {
    log: message => console.log(colors.green(message)),
    error: message => console.log(colors.red(message)),
    isFunction: func => Object.prototype.toString.call(func) === '[object Function]',
    isObject: func => Object.prototype.toString.call(func) === '[object Object]',
    isRegExp: regExp => Object.prototype.toString.call(regExp) === '[object RegExp]'
};
