$(document).ready(function(){
    var $shorDescription = $(".short-description");
    var $h1 = $("h1").after($shorDescription);

    var $ajaxArea = $(".ajax-area");

    $ajaxArea.find('.php-code').each(function(){
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
            .replace(/\?>/g, '?>')
            .replace(/\?-->/g, '?>');

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

    $ajaxArea.find('.output').each(function(){
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
});
