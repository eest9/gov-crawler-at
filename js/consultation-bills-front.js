function consultation_bills_front() {
  $("#consultation-bills").html("<img src='load.gif' alt='Inhalt wird geladen...' class='load'></img>");
  $.get( RIS_appiUrl + "Bundesgesetzblaetter" + "?Application=Begut&ImRisSeit=EinerWoche", function ( responstJSON ) {
    $($( "#consultation-bills" ).html( function () {
      var list1 = "";
      var data1 = [];
      var mfa = responstJSON.OgdSearchResult.OgdDocumentResults.OgdDocumentReference;
      var pdf;
      var startdate = [];

      var bill = Object.values(test);


      for (var i = 0; i < bill.length; i++) {

        //get the attached PDF Files
        pdf = "";
        if ($.isArray(bill[i].Dokumentliste.ContentReference)) {
          for (var x = 0; x < bill[i].Dokumentliste.ContentReference.length; x++) {
            if (bill[i].Dokumentliste.ContentReference[x].Urls.ContentUrl[2]) {
              document_name = bill[i].Dokumentliste.ContentReference[x].Name;
              document_name = document_name.replace( /_/g , " ");
              pdf = pdf + "<a href='" + bill[i].Dokumentliste.ContentReference[x].Urls.ContentUrl[2].Url + "'>" + document_name + " (PDF)</a><br/>";
            }
          }
        } else {
            pdf = "<a href='" + bill[i].Dokumentliste.ContentReference.Urls.ContentUrl[2].Url + "'>" + bill[i].Dokumentliste.ContentReference.Name + " (PDF)</a><br/>";
        }

        //give all the relevant data about the consultation bills back
        data1[i] = "<li class='list-group-item'>"
          + "<h2 class=list-title>" + bill[i].Metadaten.Bundesgesetzblaetter.Kurztitel + "</h2>"
          + "<p>"
          + bill[i].Metadaten.Bundesgesetzblaetter.Titel + "<br/>"
          + bill[i].Metadaten.Bundesgesetzblaetter.Begut.EinbringendeStelle + "<br/>"
          + "</p><p>"
          + "Begin: " + bill[i].Metadaten.Bundesgesetzblaetter.Begut.BeginnBegutachtungsfrist + "<br/>"
          + "Ende: " + bill[i].Metadaten.Bundesgesetzblaetter.Begut.EndeBegutachtungsfrist
          + "</p><p>"
          + pdf
          + "</p>"
          + "</li>";
        startdate[i] = bill[i].Metadaten.Bundesgesetzblaetter.Begut.BeginnBegutachtungsfrist;
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
