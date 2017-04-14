$.get( RIS_appiUrl + "Bundesgesetzblaetter" + "?Application=Begut&ImRisSeit=EinerWoche", function ( responstJSON ) {
  $($( "#consultation-bills" ).html( function () {
    var list1 = "";
    var data1 = [];
    var bill = responstJSON.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
    var pdf;
    for (var i = 0; i < bill.length; i++) {

      //get the attached PDF Files
      pdf = "";
      if ($.isArray(bill[i].Data.Dokumentliste.ContentReference)) {
        for (var x = 0; x < bill[i].Data.Dokumentliste.ContentReference.length; x++) {
          if (bill[i].Data.Dokumentliste.ContentReference[x].Urls.ContentUrl[2]) {
            document_name = bill[i].Data.Dokumentliste.ContentReference[x].Name;
            document_name = document_name.replace( /_/g , " ");
            pdf = pdf + "<a href='" + bill[i].Data.Dokumentliste.ContentReference[x].Urls.ContentUrl[2].Url + "'>" + document_name + " (PDF)</a><br/>";
          }
        }
      } else {
          pdf = "<a href='" + bill[i].Data.Dokumentliste.ContentReference.Urls.ContentUrl[2].Url + "'>" + bill[i].Data.Dokumentliste.ContentReference.Name + " (PDF)</a><br/>";
      }

      //give all the relevant data about the consultation bills back
      data1[i] = "<li class='list-group-item'>"
        + "<h2 class=list-title>" + bill[i].Data.Metadaten.Bundesgesetzblaetter.Kurztitel + "</h2>"
        + "<p>"
        + bill[i].Data.Metadaten.Bundesgesetzblaetter.Titel + "<br/>"
        + bill[i].Data.Metadaten.Bundesgesetzblaetter.Begut.EinbringendeStelle + "<br/>"
        + "</p><p>"
        + "Begin: " + bill[i].Data.Metadaten.Bundesgesetzblaetter.Begut.BeginnBegutachtungsfrist + "<br/>"
        + "Ende: " + bill[i].Data.Metadaten.Bundesgesetzblaetter.Begut.EndeBegutachtungsfrist
        + "</p><p>"
        + pdf
        + "</p>"
        + "</li>";
    }
    for (var i = 0; i < data1.length; i++) {
      list1 = list1 + data1[i];
    }
    return list1;
  }));
});
