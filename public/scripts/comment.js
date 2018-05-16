$('#add-comment-btn').click(function(e){
    alert("clicked");
   $.post(window.origin + '/comment/' + e.target.getAttribute('data-id'),{
       content:  $('#comment-content').val()
   }).done(r=> {
       let newComment = $("<div class='row'>" +
           "<p>"+r.content +"</p>"+
           "</div>");
       $('#comments-container').append(newComment);
   }).fail(e => {
       console.log(e);
   })

});