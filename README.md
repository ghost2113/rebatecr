/**编译**/
gulp default

/**构建服务器    (本地跨域代理)**/
gulp server


/**版本号  tip**/
----------------------
3.1  打开node_modules\gulp-rev\index.js
       其中的： manifest[originalFile] = revisionedFile;
       更新为： manifest[originalFile] = originalFile + '?v=' + file.revHash;

3.2  打开node_modules\rev-path\index.js
       其中的： return filename + '-' + hash + ext;
       更新为： return filename + ext;

3.3  打开node_modules\gulp-assets-rev\index.js
       其中的： var verStr = (options.verConnecter || "-") + md5;
       更新为：var verStr = (options.verConnecter || "") + md5;
       其次： src = src.replace(verStr, '').replace(/(\.[^\.]+)$/, verStr + "$1");
       更新为：src=src+"?v="+verStr;

3.4  打开node_modules\gulp-rev-collector\index.js
       其中的： if ( !_.isString(json[key]) || path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ) !==  path.basename(key) ) {
       更新为： if ( !_.isString(json[key]) || path.basename(json[key]).split('?')[0] !== path.basename(key) ) {

       其次： regexp: new RegExp( '([\/\\\\\'"])' + pattern, 'g' ),

       更改为：regexp: new RegExp( '([\/\\\\\'"])' + pattern+'(\\?v=\\w{10})?', 'g' )

3.5  如果3.4的node_modules\gulp-rev-collector\index.js中找不到相应更改位置，则：

       找到：  let cleanReplacement =  path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' );

       更改为：  let cleanReplacement =  path.basename(json[key]).split('?')[0];

       其次找到： regexp: new RegExp( prefixDelim + pattern, 'g' ),

       更改为： regexp: new RegExp( prefixDelim + pattern + '(\\?v=\\w{10})?', 'g' ),
--------------------- 