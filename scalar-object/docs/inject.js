$(document).ready(function(){
    var modifPage = function(response){
        var $a;
        if (response === "ajax is available" || response.responseText === "ajax is available") {
            $a = $(".description").find("a:contains('detail')");
            $a.map(function(){
                $(this.previousSibling).remove();
            });
            $a.addClass('hidden');
        }
    };
    $.get("AJAX_MARKER.htm", modifPage).fail(modifPage);

    $(".description.detailed").find("h4, div").remove();

    $('#magicMethods').on('click', 'tr', function(){
        var $tr,
            insertDetail,
            path;

        $tr = $(this);
        insertDetail = function (response) {
            var $ajaxArea;

            if (typeof response === 'string') {
                $ajaxArea = $('<div/>').html(response).find(".ajax-area");
            } else {
                $ajaxArea = $('<div/>').html(response.responseText).find(".ajax-area");
            }
            $tr.find('.description.detailed').html($ajaxArea);
            $tr.data('isLoaded', true);

            $tr.find('.php-code').each(function(){
                var $phpCode = $(this),
                    oldContent,
                    newContent,
                    indent,
                    indentRE1,
                    indentRE2,
                    text;

                oldContent = $phpCode.html();

                newContent = oldContent
                    .replace(/<!--\?/g, '&lt;?')
                    .replace(/-->/g, '>');

                indent = oldContent.match(/^\s+/);

                if (indent !== null) {
                    indent = indent[0];
                    indentRE1 = new RegExp('^'+indent, 'g');
                    indentRE2 = new RegExp('\n'+indent, 'g');

                    newContent = newContent
                        .replace(indentRE1, '')
                        .replace(indentRE2, "\n")
                        .trimRight();
                }

                $phpCode.html(newContent);

                // snippet bug!
                try {
                    $phpCode.snippet("php", {style:"vim", transparent:true, menu: false});
                }
                catch(err) {
                    text = $phpCode.closest('.snippet-container').prev().text();
                    console.log("snippet error in: " + text);
                }
            });

            $tr.find('.output').each(function(){
                var $output = $(this),
                    oldContent,
                    newContent,
                    indent,
                    indentRE1,
                    indentRE2;

                oldContent = $output.html();
                indent = oldContent.match(/^\s+/);
                if (indent !== null) {
                    indent = indent[0];
                    indentRE1 = new RegExp('^'+indent, 'g');
                    indentRE2 = new RegExp('\n'+indent, 'g');

                    newContent = oldContent
                        .replace(indentRE1, '')
                        .replace(indentRE2, "\n")
                        .trimRight();

                    $output.html(newContent);
                }
            });
        };

        $tr.find(".overview").toggle();
        if ($tr.data('isLoaded') === true) return;
        var path = $tr.find("a.desc-link").attr('href');
        $.get(path, insertDetail).fail(insertDetail);
    });

    $('#magicMethods').on('click', '.ajax-area, .ajax-area table', function(event){
        event.preventDefault();
        return false;
    });
});