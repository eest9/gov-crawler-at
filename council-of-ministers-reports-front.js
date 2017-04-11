var concil_of_ministers_url = doURL_YQL("https://www.bka.gv.at/ministerratsprotokolle");

$.get( concil_of_ministers_url, function( data1 ) {
 var link1 = ($( "main.main .overview", data1 ).children().first()
  ).children().first().attr("href");
 $.get( doURL_YQL(link1), function( data2 ) {
   report_raw = $( ".journal-content-article", data2 ).html();
   $( ".panel.council-of-ministers-reports h1.panel-title" ).html( $( "h1", report_raw ).html() );
   $( "#council-of-ministers-reports" ).html( $( "p", report_raw).unwrap() ).append($( "ul", report_raw).unwrap());
 });
});
