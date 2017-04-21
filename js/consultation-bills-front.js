function consultation_bills_front() {
  $("#consultation-bills").html("<img src='load.gif' alt='Inhalt wird geladen...' class='load'></img>");

  var day = new Date();
  day = day.toISOString();
  day = day.split("T");

  $.get( RIS_appiUrl + "Bundesgesetzblaetter" + "?Application=Begut&InBegutachtungAm=" + day[0], function ( responstJSON ) {
    $($( "#consultation-bills" ).html( function () {
      var list1 = "";
      var data1 = [];
      var pdf;
      var startdate = [];

      //get the bills
      var bill = responstJSON.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;

      //bugfix if there is only one bill
      if ( typeof(bill[0]) == 'undefined' ) {
        bill[0].Data = Object.values(bill);
      }

      for (var i = 0; i < bill.length; i++) {

        //get the attached PDF Files
        pdf = "";
        if ($.isArray(bill[i].Data.Dokumentliste.ContentReference)) {
          for (var x = 0; x < bill[i].Data.Dokumentliste.ContentReference.length; x++) {
            if (bill[i].Data.Dokumentliste.ContentReference[x].Urls.ContentUrl[2]) {
              document_name = bill[i].Data.Dokumentliste.ContentReference[x].Name;
              document_name = document_name.replace( /_/g , " ");
              pdf = pdf + "<a href='" + bill[i].Data.Dokumentliste.ContentReference[x].Urls.ContentUrl[2].Url + "' target='_blank'>" + document_name + " (PDF)</a><br/>";
            }
          }
        } else {
            pdf = "<a href='" + bill[i].Data.Dokumentliste.ContentReference.Urls.ContentUrl[2].Url + "' target='_blank'>" + bill[i].Dokumentliste.ContentReference.Name + " (PDF)</a><br/>";
        }

        //give all the relevant data about the consultation bills back
        data1[i] = "<li class='list-group-item'>"
          + "<h2 class=list-title>" + bill[i].Data.Metadaten.Bundesgesetzblaetter.Kurztitel + "</h2>"
          + "<p><a href='" + bill[i].Data.Metadaten.Allgemein.DokumentUrl + "' target='_blank'>Im RIS abrufen &#x1f517;</a></p>"
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
        startdate[i] = bill[i].Data.Metadaten.Bundesgesetzblaetter.Begut.BeginnBegutachtungsfrist;
      }

      //sort the bills
      var temp_list = [];
      for (var j = 0; j < startdate.length; j++)
        temp_list.push({'date': startdate[j], 'value': data1[j]});
      temp_list.sort(function(a, b) {
        return ((a.date > b.date) ? -1 : ((a.date == b.date) ? 0 : 1));
      });
      for (var k = 0; k < temp_list.length; k++) {
        startdate[k] = temp_list[k].date;
        data1[k] = temp_list[k].value;
      }

      list1 = (data1.toString()).replace( />,</g , "><");

      return list1;
    }));
  });
};

consultation_bills_front();
