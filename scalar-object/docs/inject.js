$(document).ready(function(){
    const modifPage = function (response) {
        let $a;
        if (response === "ajax is available" || response.responseText === "ajax is available") {
            $a = $(".description").find("a:contains('detail')");
            $a.map(function () {
                $(this.previousSibling).remove();
            });
            $a.addClass('hidden');
        }
    };
    $.get("AJAX_MARKER.htm", modifPage).fail(modifPage);

    $(".description.detailed").find("h4, div").remove();

    const $magicMethods = $("#magicMethods");
    const prefix = $magicMethods.attr("data-object");
    $magicMethods.on('click', 'tr', function(){
        let $tr;
        let insertDetail;

        $tr = $(this);
        insertDetail = function (response) {
            let $ajaxArea;

            if (typeof response === 'string') {
                $ajaxArea = $('<div/>').html(response).find(".ajax-area");
            } else {
                $ajaxArea = $('<div/>').html(response.responseText).find(".ajax-area");
            }
            $tr.find('.description.detailed').html($ajaxArea);
            $tr.data('isLoaded', true);

            $tr.find('.php-code').each(function(){
                const $phpCode = $(this);
                let oldContent;
                let newContent;
                let indent;
                let indentRE1;
                let indentRE2;
                let text;

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
                const $output = $(this);
                let oldContent;
                let newContent;
                let indent;
                let indentRE1;
                let indentRE2;

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
        const path = prefix +"."+ $tr.data("order") + ".htm";
        $.get(path, insertDetail).fail(insertDetail);
    });

    $magicMethods.on('click', '.ajax-area, .ajax-area table', function(event){
        event.preventDefault();
        return false;
    });
});
