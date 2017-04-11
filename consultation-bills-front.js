$.get( RIS_appiUrl + "Bundesgesetzblaetter" + "?Application=Begut&ImRisSeit=EinerWoche", function ( responstJSON ) {
  $($( "#consultation-bills" ).html( function () {
    var list1 = "";
    var data1 = [];
    var item = responstJSON.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
    var pdf;
    for (var i = 0; i < item.length; i++) {

      //get the attached PDF Files
      pdf = "";
      if ($.isArray(item[i].Data.Dokumentliste.ContentReference)) {
        for (var x = 0; x < item[i].Data.Dokumentliste.ContentReference.length; x++) {
          if (item[i].Data.Dokumentliste.ContentReference[x].Urls.ContentUrl[2]) {
              pdf = pdf + "<a href='" + item[i].Data.Dokumentliste.ContentReference[x].Urls.ContentUrl[2].Url + "'>" + item[i].Data.Dokumentliste.ContentReference[x].Name + " [PDF]</a><br/>";
          }
        }
      } else {
          pdf = "<a href='" + item[i].Data.Dokumentliste.ContentReference.Urls.ContentUrl[2].Url + "'>" + item[i].Data.Dokumentliste.ContentReference.Name + " [PDF]</a><br/>";
      }

      //give all the relevant data about the consultation bills back
      data1[i] = "<li class='list-group-item'>"
        + "<h2 class=list-title>" + item[i].Data.Metadaten.Bundesgesetzblaetter.Kurztitel + "</h2>"
        + "<p>"
        + item[i].Data.Metadaten.Bundesgesetzblaetter.Titel + "<br/>"
        + item[i].Data.Metadaten.Bundesgesetzblaetter.Begut.EinbringendeStelle + "<br/>"
        + "</p><p>"
        + "Begin: " + item[i].Data.Metadaten.Bundesgesetzblaetter.Begut.BeginnBegutachtungsfrist + "<br/>"
        + "Ende: " + item[i].Data.Metadaten.Bundesgesetzblaetter.Begut.EndeBegutachtungsfrist
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
