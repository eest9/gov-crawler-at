var concil_of_ministers_url = doURL("https://www.bka.gv.at/ministerratsprotokolle");

$.get( concil_of_ministers_url, function( data1 ) {
 var link1 = ($( "main.main .overview", data1 ).children().first()
  ).children().first().attr("href");

 $.get( doURL(link1), function( data2 ) {
  $( "#council-of-ministers-reports" ).html($( ".journal-content-article", data2 ).html());
 });
});

function doURL(link){
  var link1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'";
  var link2 = "'&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'";
  return link1 + encodeURIComponent(link) + link2;
}
