function concil_of_ministers_report_front() {
  $("#council-of-ministers-reports").html("<img src='load.gif' alt='Inhalt wird geladen...' class='load'></img>");
  var council_of_ministers_url = doURL_YQL("https://www.bka.gv.at/ministerratsprotokolle");

  $.get( council_of_ministers_url, function( data1 ) {
    var link1 = ($( "main.main .overview", data1 ).children().first()
    ).children().first().attr("href");
    $.get( doURL_YQL(link1), function( data2 ) {
      report_raw = $( ".journal-content-article", data2 ).html();
      $( ".panel.council-of-ministers-reports h1.panel-title" ).html( $( "h1", report_raw ).html() );
      $( "#council-of-ministers-reports" ).html( $( "p", report_raw).unwrap() ).append($( "ul", report_raw).unwrap());
      $("#council-of-ministers-reports p").wrap("<li class='list-group-item'></li>")

      $("#council-of-ministers-reports a").each( function(i) {
        var report_attachement_part = ($("#council-of-ministers-reports a").eq(i).text()).split("/");
        var pos = 0;
        if ( report_attachement_part.length > 1 ) {
          var report_attachement_index = ((report_attachement_part[1]).split(" "))[0];
          report_attachement_index = (report_attachement_index.split("."))[0];
          report_attachement_index = (report_attachement_index.split(","))[0];
          if ( !isNaN( Number(report_attachement_index) )) {
            pos = report_attachement_index;
          } else {
            pos = 0;
          }
        } else {
          pos = 2;
        }

        var report_topic_index;
        $("#council-of-ministers-reports p").each( function() {});
        $(this).appendTo( $("#council-of-ministers-reports li").eq( pos ) );
      });

      $("#council-of-ministers-reports a").after("<br>");
      $("#council-of-ministers-reports a").attr("target","_blank");
      $("#council-of-ministers-reports ul").remove();

    });
  });
};

concil_of_ministers_report_front();
