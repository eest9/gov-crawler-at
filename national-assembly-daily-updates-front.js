var national_assembly_daily_updates_url = doURL_YQL("https://www.parlament.gv.at/PAKT/AKT/NRMAIL/filter.psp?view=RSS&jsMode=RSS&xdocumentUri=%2FPAKT%2FAKT%2FNRMAIL%2Findex.shtml&ITYP=NRMAIL&R_30JA=30&anwenden=Anwenden&listeId=114&FBEZ=FP_014");

$.get(national_assembly_daily_updates_url, function ( data1 ) {
  var link1 = $( "channel guid", data1 ).first().html();
  $.get( doURL_YQL(link1), function( data2 ) {
    $($( ".panel.national-assembly-daily-updates h1.panel-title" ).html( $( "body #content h1#inhalt", data2 ).html() ));
    $($( "#national-assembly-daily-updates" ).html( $( "body #content", data2 ).html() ));
  });
});
