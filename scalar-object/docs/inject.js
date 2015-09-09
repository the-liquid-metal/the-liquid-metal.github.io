$(document).ready(function(){
    var modifPage = function(response){
        var $a;
        if (response === "ajax is available" || response.responseText === "ajax is available") {
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
            if (typeof response === 'string') {
                $tr.find('.description.detailed').append(response);
            } else {
                $tr.find('.description.detailed').append(response.responseText);
            }
            $tr.data('isLoaded', true);
        };
        if ($tr.data('isLoaded') === true) return;
        var path = $tr.attr('id').replace('m_', '')+'.htm';
        $.get(path, insertDetail).fail(insertDetail);
    });

    $('.description a').each(function(){
        var $a = $(this);
        $a.attr("target", "_blank");
    });
});