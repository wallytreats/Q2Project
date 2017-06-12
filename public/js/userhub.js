$( document ).ready(function() {

  function makeCard(title, img, id){
    let $col = $("<div class=' col-xs-6'></div>");
    let $panel = $("<div class='panel panel-default'></div>");
    let $panelHead = $("<div class='panel-heading'>");
    let $panelBody = $("<div class='panel-body'>");
    let $panelRow = $('#panelRow');
    let $panelImg = $("<img class = 'img-responsive center-block'>");
    let $hidden = $("<div class='urlContainer'></div");

    $hidden.text(id);
    $panel.append($panelHead);
    $panel.data('id',id);
    $panelHead.text(title);
    $panelBody.append($panelImg);
    $panelBody.append($hidden);
    $panel.append($panelBody);
    $panelImg.attr("src", img);
    $col.append($panel);
    $panelRow.append($col);
  }

  $('form').submit(function(event){
  var $target = $(event.target);
  event.preventDefault();
  //get inner text of search bar
  var text = $('#search').val().replace(' ', "+");
  console.log(text)
  //just implemented
  if(text.length > 0){
    var $xhr = $.getJSON('https://www.googleapis.com/youtube/v3/search/?part=snippet&q='+text+'&maxResults=10&key=AIzaSyC0b4jxH6E1DbtJm3S_ZOZx5ahcOmthPDk');
    $xhr.done(function(data) {
      var vids = data.items
      console.log(vids);
      if ($xhr.status !== 200) {
          return;
      }

      else {
        var resultbox = $('#results');
        for (var i = 0; i < vids.length; i++) {
          var title = vids[i].snippet.title;
          var img = vids[i].snippet.thumbnails.medium.url;
          var id = vids[i].id.videoId;
          var description = vids[i].snippet.description;
          makeCard(title, img, id);

        }
      }

    });//end outer done
    $xhr.fail(function(err) {
        console.log(err);
    });//fail
  }

});//end submit

$('#panelRow').click(function(e){
  var id = $(e.target).closest('.panel').data('id');

  const options = {
    contentType: 'application/json',
    data: JSON.stringify({video_url: id}),
    dataType: 'json',
    type: 'POST',
    url: '/videos'
  }
  $.ajax(options)
    .done((data) => {
      window.location.href = '/login?id='+id;
    })
    .fail(($xhr) => {
      console.log('fail');
  });



})//end panelRow Click


});
