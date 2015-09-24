<?php
/**
 * Markdown editor for roundcube
 *
 * Replaces the text editor with a markdown editor
 *
 * @version 1.4 - 07.07.2010
 * @author Cosmin Popescu (cosmin at popescu dot eu dot com)
 * @licence GNU GPL
 *
 **/
/** *
 **/

class markdown_editor extends rcube_plugin
{
    public $task = 'mail|compose';

    /**
     * Added html content
     * @var boolean
     * @access public
     */
    public static $html_added = false;
    

    function init()
    {
        $rcmail = rcmail::get_instance();
        $this->require_plugin('jqueryui');

        if($_SESSION['username'] && empty($_SESSION['plugin.newuserdialog'])){
            $this->include_script('js/plugin.js');
            $this->include_script('js/to-markdown.js');
            $this->include_script('js/marked.js');
            $this->include_script('js/template.js');

            $this->add_hook('template_container', array($this, 'html_output'));

            $this->add_texts('localization', true);
            $this->load_config();
            if ($rcmail->config->get("use_jsvieditor", 0)){
                $this->include_script('js/jsvi.js');
            }
        }
    }

    function html_output($p){
        if (!self::$html_added){
            self:$html_added = true;
            $content = file_get_contents(__DIR__ . '/html/markdown_editor.html');
            $p['content'] .= $content;
        }
        return $p;
    }
}
