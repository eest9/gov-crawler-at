var RIS_appiUrl = '//data.bka.gv.at/ris/api/V2.5/';

function doURL_YQL(link){
  var link1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'";
  var link2 = "'&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'";
  return link1 + encodeURIComponent(link) + link2;
}
