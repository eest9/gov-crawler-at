$.get( RIS_appiUrl + "Bundesgesetzblaetter" + "?Application=Begut&ImRisSeit=EinerWoche", function ( responstJSON ) {
  $($( "#consultation-bills" ).html( function () {
    var data1 = "";
    var item = responstJSON.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
    for (var i = 0; i < item.length; i++) {
      //for (var ii = 0; ii < item[i].Data.Dokumentliste.ContentReference.length; ii++) {
        var pdf = "<br/><a href='" + item[i].Data.Dokumentliste.ContentReference[0].Urls.ContentUrl[2].Url + "'>Hauptdokument [PDF]</a>";
      //}
      data1 = data1
        + "<li class='list-group-item'>"
        + "<h3>" + item[i].Data.Metadaten.Bundesgesetzblaetter.Kurztitel + "</h3>"
        + item[i].Data.Metadaten.Bundesgesetzblaetter.Titel
        + pdf
        + "</li>";
    }
    return data1;
  }));
});

//if ($.isArray(item.Data.Dokumentliste.ContentReference)) {
//  for (var i = 0, l = item.Data.Dokumentliste.ContentReference.length; i < l; i++) {
//    var o = item.Data.Dokumentliste.ContentReference[i];
//    if  (o.ContentType === "MainDocument") {
//          $urlHtml= o.Urls.ContentUrl[1].Url;
//          $urlPdf = o.Urls.ContentUrl[2].Url;
//          $urlDoc = o.Urls.ContentUrl[3].Url;
//          break;
//    }
//  }
//} else {
//  $urlHtml= item.Data.Dokumentliste.ContentReference.Urls.ContentUrl[1].Url;
//  $urlPdf = item.Data.Dokumentliste.ContentReference.Urls.ContentUrl[2].Url;
//  $urlDoc = item.Data.Dokumentliste.ContentReference.Urls.ContentUrl[3].Url;
//}
