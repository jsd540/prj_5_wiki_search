
$(document).ready(function(){

// script for animations
var s = $('input'),
    f  = $('form'),
    a = $('.after'),
    m = $('h4');

s.focus(function(){
  if( f.hasClass('open') ) return;
  f.addClass('in');
  setTimeout(function(){
    f.addClass('open');
    f.removeClass('in');
  }, 1300);

});

a.on('click', function(e){

  e.preventDefault();
  if( !f.hasClass('open') ) return;
  s.val('');
  f.addClass('close');
  f.removeClass('open');
  setTimeout(function(){
    f.removeClass('close');
  }, 1300);

})

f.submit(function(e){

  getInfo();
  e.preventDefault();
  m.html('Searching for articles containing: ' + " " 
         + document.getElementById("words").value).addClass('show');
  f.addClass('explode');
  setTimeout(function(){
    s.val('');
    f.removeClass('explode');
    m.removeClass('show');
   
  }, 2500);

})

// get input value from wikipedia api
function getInfo(){
  var val = document.getElementById("words").value;

      var wikiURL = "https://en.wikipedia.org/w/api.php";
      wikiURL += '?' + $.param({
          'action' : 'opensearch',
          'search' : val,
          'prop'  : 'revisions',
          'rvprop' : 'content',
          'format' : 'json',
          'limit' : 10
      });

     $.ajax( {

        url: wikiURL,
        dataType: 'jsonp',
        success: function(data) {
          $( ".resDiv" ).remove();
          var size = data[1].length;
          
          for (var i =0; i < size; i++){
            var title = data[1][i];
            var descr = data[2][i];
            var url = data[3][i];
            addElement (title, descr, url);

          }
        }
      });
    }

//add div for results
function addElement (title, descr, url) {

    var results = document.getElementById("results");
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id","resDiv");
    newDiv.setAttribute("class", "resDiv");
    var t = document.createElement("h2");
    var a = document.createElement("a");
    a.setAttribute("href", url);
    t.appendChild(a);
    var d = document.createElement("p");
    a.innerHTML = title;
    d.innerHTML = descr;   
    newDiv.appendChild(t);
    newDiv.appendChild(d);
    results.appendChild(newDiv);                   
    document.body.appendChild(results);

}

}); 
