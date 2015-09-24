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
        var val = $('#composebody').val();
        $('#composebody').removeClass('mce_editor').addClass('no_mce').val(toMarkdown(val, {
            converters: [
                {
                filter: ['div', 'font', 'span', 'table', 'tr', 'td', 'style'],
                replacement: function(html, node){
                    var name = node.nodeName.toLowerCase();
                    if (name != 'table' && name != 'tr' && name != 'td'){
                        return html + (name == 'div' ? '\n' : '');
                    }
                    return html + (name == 'table' ? '' : (name == 'tr' ? '\n' : '\t'));
                }
            }]
        }));
        if (typeof(init_jsvi) != 'undefined' && USE_JSVI == 1){
            init_jsvi();
        }
    }
})
