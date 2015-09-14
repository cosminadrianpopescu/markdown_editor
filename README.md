Markdown editor
========================================

This [roundcube](https://roundcube.net/) plugin replaces the html editor with
markdown. This is done only for replying and for composing a new message, not
for forwarding messages. 

If you set the option `use_jsvi` to 1 in the `php` config file and you have
the [`jsvi_editor`](https://github.com/cosminadrianpopescu/jsvi_editor) plugin
installed, then the editor will be used when sending an e-mail. 

*Note*: this is not a markdown editor. If you use this plugin, you will be
editing in the `textarea` or in `jsvi`. When you click `Send`, the markdown
will be converted to `HTML` using [`marked`](https://github.com/chjj/marked)
and sent. 

Likewise, when you reply to a html message, the `html` content will be converted
to `markdown` using
[`to-markdown`](https://github.com/domchristie/to-markdown) and then displayed
in the `textarea`. 
