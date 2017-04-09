//$.get(RIS_appiUrl + 'Bundesgesetzblaetter', function ( data1 ) {
//  var link1 = $( "channel guid", data1 ).first().html();
//  $.get( doURL_YQL(link1), function( data2 ) {
//    $($( "#consultation-bills" ).html( $( "body", data2 ).html() ));
//  });
//});

$.get( RIS_appiUrl + "Bundesgesetzblaetter" + "?Application=Begut&ImRisSeit=EinerWoche", function ( data1 ) {
  $($( "#consultation-bills" ).html( "davor " + JSON.stringify(data1) + " danach" ));
});
