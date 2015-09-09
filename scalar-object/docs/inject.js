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
            var $ajaxArea = $('<div class="ajax-area"/>');
            if (typeof response === 'string') {
                $ajaxArea.append(response);
            } else {
                $ajaxArea.append(response.responseText);
            }
            $ajaxArea.find("code").each(function(){
                var $code = $(this);
                var $parent = $code.parent();
                console.log($parent.prop('tagName'));
                if ($parent.prop('tagName') === 'DIV') {
                    $parent.addClass('code');
                }
            });
            $tr.find('.description.detailed').append($ajaxArea);
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