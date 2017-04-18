function national_assembly_daily_updates_front() {
  $("#national-assembly-daily-updates").html("<img src='load.gif' alt='Inhalt wird geladen...' class='load'></img>");
  var national_assembly_daily_updates_url = doURL_YQL("https://www.parlament.gv.at/PAKT/AKT/NRMAIL/filter.psp?view=RSS&jsMode=RSS&xdocumentUri=%2FPAKT%2FAKT%2FNRMAIL%2Findex.shtml&ITYP=NRMAIL&R_30JA=30&anwenden=Anwenden&listeId=114&FBEZ=FP_014");

  $.get(national_assembly_daily_updates_url, function ( data1 ) {
    var link1 = $( "channel guid", data1 ).first().html();
    $.get( doURL_YQL(link1), function( data2 ) {
      $($( ".panel.national-assembly-daily-updates h1.panel-title" ).html( $( "body #content h1#inhalt", data2 ).html() ));
      $("img.icon", data2).remove();
      $("table", data2).removeClass( "tabelle" ).addClass( "table" );
      $("td.mail_betreff.mail_datum", data2).removeClass( "mail_betreff mail_datum" ).addClass( "mail_topic info" );
      $("td.mail_datum", data2).remove();
      $($( "#national-assembly-daily-updates" ).html( $( "body #content", data2 ).html() ));
      $("#national-assembly-daily-updates .h_1").remove();
      $("#national-assembly-daily-updates .clearFix").remove();
      $("#national-assembly-daily-updates div.contentBlock").wrap("<li class='list-group-item'></li>");
      $("#national-assembly-daily-updates h2").unwrap();
      $("#national-assembly-daily-updates h2").addClass( "list-title" );

      $("#national-assembly-daily-updates a").each( function(i) {
        $(this).attr("href", function(i, val) {
          var proof = val.split(":");
          if ( !(proof[0] == "https") )
            val = "https://parlament.gv.at" + val;
          return val;
        });
      });
    });
  });
};
