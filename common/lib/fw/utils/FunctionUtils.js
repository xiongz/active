/**
 * Created by xiongze on 2015/8/10.
 */
define(function () {
    var FunctionUtils = {};

    FunctionUtils.getFnName = function (callee) {
        var _callee = callee.toString().replace(/[\s\?]*/g, ""),
            comb = _callee.length >= 50 ? 50 : _callee.length;
        _callee = _callee.substring(0, comb);
        var name = _callee.match(/^function([^\(]+?)\(/);
        if (name && name[1]) {
            return name[1];
        }
        var caller = callee.caller,
            _caller = caller.toString().replace(/[\s\?]*/g, "");
        var last = _caller.indexOf(_callee),
            str = _caller.substring(last - 30, last);
        name = str.match(/var([^\=]+?)\=/);
        if (name && name[1]) {
            return name[1];
        }
        return "anonymous"
    };

    return FunctionUtils;
})