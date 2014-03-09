TumblrBlog.js
=============

何これ？
--------
Tumblr API v2を使って、ブログから記事などの情報を簡単に取得するための（？）JavaScriptライブラリです。<br>
オブジェクト指向を意識して書いたので、複数のブログから情報を取り出すときに便利かもしれません。<br>


使い方
------
内部的に jQuery.ajax と jQuery.extend を使用しているので、jQueryを読み込む必要があります。<br>
これだけのためにわざわざjQuery読みたくなければ適当に書きなおしてください。<br>
別に $(function(){ 〜 }); で括る必要はないはずですが、中でDOM弄るなら括っておいてください。<br>
jQuery.ajax をそのまま返すので、 jQuery 1.5 以上なら done を使って取得後の処理を書けます。

* JS<br>
```javascript
$(function(){

	var blog = new TumblrBlog({
		apiKey      : 'ここにAPIキーを入れる',
		baseHostname: 'ここにブログのホスト名（ドメイン）を入れる'
	});

	blog.setOption({ filter:'text' });

	blog.getPosts({
		offset: tumblrOffset,
		limit : tumblrNextLimit
	}).done(function(data){
		//取得後の処理
	});

});
```

古いjQueryしか使えない場合は、 第二引数にコールバック関数を指定できます。

```javascript
blog.getPosts({
	offset: tumblrOffset,
	limit : tumblrNextLimit
}, function(data){
	//取得後の処理
});
```


API
---
自分で使うために書いたものなので、あまり細かくメソッドを作っていません。<br>
困ったら api() を使うか、自分で拡張してください。

* jQuery.Deferred getPosts(Array option, Function callback)<br>
  ブログから記事を取得します（ http://www.tumblr.com/docs/en/api/v2#posts ）。<br>
  optionに指定された情報をそのままTumblrのAPIに渡します。<br>
  よく使うのは offset（最新何件目から取得するか） と limit（何件取得するか） じゃないかと思います。<br>
  細かいオプションはTumblrのAPI仕様を確認して下さい。<br>
  上で書いたように jQuery.ajaxの戻り値（jQuery.Deferred）をそのまま返します。<br>
  jQuery.Deferredが使えない場合は callback を指定してください。

* jQuery.Deferred getInfo()(Array option, Function callback)<br>
  ブログの名前や投稿件数など、ブログの基本情報を取得します（ http://www.tumblr.com/docs/en/api/v2#blog-info ）。

* jQuery.Deferred api()(String method, Array option, Function callback)<br>
  Tumblr APIを汎用的に呼び出せます。methodにTumblrのAPIのスラッシュ以降をそのまま指定してください。

* void setOption(Array option)<br>
  上記すべてのメソッドにおいて、デフォルトで使用されるオプションを指定できます。


ライセンス
----------
This is MIT LICENSE :)

※MIT Licenseがよくわからない人向け利用条件※<br>
商用/非商用を問わず自由に使用・改変頂いて構いませんが、ソース上部の著作権表記は消さないでください。<br>
また、このライブラリを利用して発生したいかなる問題もご自分で解決していただく必要があります。<br>
バグ報告や要望自体は受け付けていますが、必ず対応できるとは限りませんのでご了承ください。
