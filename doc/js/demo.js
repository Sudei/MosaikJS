// Shorthand for $( document ).ready()
$(function() {
    $('#mosaic').mosaikJS({
        breakpoints:[
            {size: '768', elementWidth: '50%', elementHeight: "180px" },
        ]
    });

    // Events Explorer
    var container = document.querySelector('#mosaic');
    var events = ['enter', 'leave'];
    $.each( events, function(index, value){
        container.addEventListener(value, function (e) {
            console.log(e);
            $('#events #'+value).removeClass('inactive').addClass('active');
            setTimeout(function() {
                $('#events #'+value).removeClass('active').addClass('inactive');
            }, 600);
        }, false);
    });

});
