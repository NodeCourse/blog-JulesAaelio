$('.vote-down').click(function(e){
   $.post(window.origin + '/vote/down/' + e.target.getAttribute('data-id')).done((r) => {
       console.log(r);
       $('#vote-count-'+r.id).text(r.voteupcount - r.votedowncount);
   });
});

$('.vote-up').click(function(e){
    $.post(window.origin + '/vote/up/' + e.target.getAttribute('data-id')).done((r) => {
        console.log(r.voteupcount - r.votedowncount);
        $('#vote-count-'+r.id).text(r.voteupcount - r.votedowncount);
    });
});