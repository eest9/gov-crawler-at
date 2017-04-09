$.get( RIS_appiUrl + "Bundesgesetzblaetter" + "?Application=Begut&ImRisSeit=EinerWoche", function ( responstJSON ) {
  $($( "#consultation-bills" ).html( function () {
    var data1 = "";
    var item = responstJSON.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
    var pdf;
    for (var i = 0; i < item.length; i++) {
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
      data1 = data1
        + "<li class='list-group-item'>"
        + "<h1 class=panel>" + item[i].Data.Metadaten.Bundesgesetzblaetter.Kurztitel + "</h1>"
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
    return data1;
  }));
});
