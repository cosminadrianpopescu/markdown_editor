var init_html;
$(document).ready(function(ev){
    if (typeof(rcmail.env.compose_mode) != 'undefined' && rcmail.env.compose_mode != 'reply'){
        return ;
    }
    if ($('#composebody').length > 0 && $('input[name="_is_html"]').val() == '1'){
        rcmail.addEventListener('beforesend', function(ev){
            var md = $('#composebody').val();
            $('#composebody').val(marked(md));
            return true;
        });
        make_markdown();
    }
});

function make_markdown(){
    init_html = $('#composebody').val();
    $('#composebody').removeClass('mce_editor').addClass('no_mce').val(toMarkdown(init_html, {
        converters: [
            {
            filter: ['div', 'font', 'span', 'table', 'tr', 'td', 'style', 'tbody', 'center'],
            replacement: function(html, node){
                var name = node.nodeName.toLowerCase();
                if (name == 'style'){
                    return '';
                }
                if (name != 'table' && name != 'tr' && name != 'td'){
                    return html + (name == 'div' ? '\n' : '');
                }
                return html + (name == 'table' ? '' : (name == 'tr' ? '\n' : '\t'));
            }
        }]
    }));

    var html = md_tpl.render('back_to_html', {text: rcmail.gettext("markdown_editor.text")});
    $('#composeoptions').append(html);

    if (typeof(init_jsvi) != 'undefined' && USE_JSVI == 1){
        init_jsvi();
    }
}
