$(document).ready(function(){
    var modifPage = function(response){
        console.log(response);
        var $a;
        if (response.responseText === "ajax is available") {
            $a = $(".description").find("a:contains('detail')");
            $a.map(function(){
                $(this.previousSibling).remove();
            });
            $a.remove();
        }
    };
    $.get("AJAX_MARKER.htm", modifPage).fail(modifPage);

    $(".description.detailed").find("h4, div").remove();

    $('#magicMethods').on('click', 'tr', function(){
        var $tr = $(this);
        var insertDetail = function(response){
            $tr.find('.description.detailed').append(response.responseText);
            $tr.data('isLoaded', true);
        };
        if ($tr.data('isLoaded') === true) return;
        var path = $tr.attr('id').replace('m_', '')+'.htm';
        $.get(path, insertDetail).fail(insertDetail);
    });

    var protocol = document.URL.replace(/:.+/, ':');
    if (protocol !== 'file:') {
        $('.description a').each(function(){
            var $a = $(this);
            var href = $a.attr("href");
            $a.attr("href", href.replace('file:', ''));
        });
    }
});