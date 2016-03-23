/**
 * session ȫ�ֹ���
 *
 * Created by fred
 */
define(function () {
    var utils = {};

    if(window.localStorage){
        utils = {
            put:function(name, data){
                if(name && window.JSON){
                    window.localStorage.setItem(name, window.JSON.stringify(data));
                }
            },
            get:function(name){
                if(name && window.JSON){
                    var json = window.localStorage.getItem(name);
                    if(!json||json=="undefined")
                        return null;
                    return window.JSON.parse(json);
                }else
                    return null;
            },
            remove:function(name){
                if(name && window.JSON){
                    window.localStorage.removeItem(name);
                }
            },
            clear:function(){
                window.localStorage.clear();
            }
        }
    }else {
        utils = {
            put:function(name, data, domain, expires ){
                if(name && window.JSON){
                    document.cookie = name + "=" + window.JSON.stringify(data) +
                        (( expires && (expires instanceof Date)) ? ";expires=" + expires.toUTCString() : "" ) +
                        (( domain ) ? ";domain=" + domain : "" );
                }
            },
            _get_cookie:function(check_name){
                // first we'll split this cookie up into name/value pairs
                // note: document.cookie only returns name=value, not the other components
                var a_all_cookies = document.cookie.split( ';' );
                var a_temp_cookie = '';
                var cookie_name = '';
                var cookie_value = '';
                var b_cookie_found = false; // set boolean t/f default f

                for (var i = 0; i < a_all_cookies.length; i++ ){
                    // now we'll split apart each name=value pair
                    a_temp_cookie = a_all_cookies[i].split( '=' );

                    // and trim left/right whitespace while we're at it
                    cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

                    // if the extracted name matches passed check_name
                    if (cookie_name == check_name ){
                        b_cookie_found = true;
                        // we need to handle case where cookie has no value but exists (no = sign, that is):
                        if ( a_temp_cookie.length > 1 ){
                            cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
                        }
                        // note that in cases where cookie is initialized but no value, null is returned
                        return cookie_value;
                    }
                    a_temp_cookie = null;
                    cookie_name = '';
                }
                if ( !b_cookie_found ){
                    return null;
                }
                return null;
            },
            get:function(name){
                if(name && window.JSON){
                    var json = this._get_cookie(name);
                    if(!json)
                        return null;
                    return window.JSON.parse(json);
                }else
                    return null;
            },
            remove:function(name, domain){
                if(name && this._get_cookie(name))
                    document.cookie = name + "=" + (( domain ) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
            },
            clear:function(domain){
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++)
                    document.cookie = /^[^=]+/.exec(cookies[i])[0] + "=" + (( domain ) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
            }
        }
    }

    utils.saveSession = function (data){
        this.put("userId", data.data.id||"");
        this.put("token", data.data.token||"");
        this.put("mobile", data.data.mobile||"");
        this.put("nick_name", data.data.nick_name||"");
        this.put("pic", data.data.pic||"");
        this.put("company", data.data.company||"");
        this.put("userName", data.data.userName||"");
    }

    utils.removeSession = function (data){
        this.remove("userId");
        this.put("token");
        this.put("mobile");
        this.put("nick_name");
        this.put("pic");
        this.put("company");
        this.put("userName");
    }
    return utils;
})
