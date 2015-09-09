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
            var prefix = '<div class="ajax-area">';
            var sufix = '</div>';
            if (typeof response === 'string') {
                $tr.find('.description.detailed').append(prefix + response + sufix);
            } else {
                $tr.find('.description.detailed').append(prefix + response.responseText + sufix);
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

    $('#magicMethods').on('click', '.ajax-area', function(event){
        event.preventDefault();
        return false;
    });
});