$(document).ready(function(){
    var modifPage = function(response){
        var $a;
        if (response.responseText === "ajax is available") {
            $a = $(".description").find("a:contains('detail')");
            $a.map(function(){
                $(this.previousSibling).remove();
            });
            $a.remove();
        }
    };
    $.get("_.htm", modifPage).fail(modifPage);

    $(".description.detailed").find("h4, div").remove();

    var insertDetail = function(response){
        $tr.find('.description.detailed').append(response.responseText);
        $tr.data('isLoaded', true);
    };
    $('#magicMethods').on('click', 'tr', function(){
        var $tr = $(this);
        if ($tr.data('isLoaded') === true) return;
        var path = $tr.attr('id').replace('m_', '')+'.htm';
        $.get(path, insertDetail).fail(insertDetail);
    });
})