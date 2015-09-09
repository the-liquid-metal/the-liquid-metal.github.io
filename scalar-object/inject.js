$(document).ready(function(){
    $.get("_.htm").fail(function(response){
        var $a;
        if (response.responseText === "ajax is available") {
            $a = $(".description").find("a:contains('detail')");
            $a.map(function(){
                $(this.previousSibling).remove();
            });
            $a.remove();
        }
    });

    $(".description.detailed").find("h4, div").remove();
    $('#magicMethods').on('click', 'tr', function(){
        var $tr = $(this);
        if ($tr.data('isLoaded') === true) return;
        var path = $tr.attr('id').replace('m_', '')+'.htm';
        $.get(path, function(renponse){})
            .fail(function(response){
                $tr.find('.description.detailed').append(response.responseText);
                $tr.data('isLoaded', true);
            });
    });
})