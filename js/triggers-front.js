$("body").keyup(function( key ) {
  if (key.which == 49) {
    concil_of_ministers_report_front();
  } else if (key.which == 50) {
    consultation_bills_front();
  } else if (key.which == 51) {
    national_assembly_daily_updates_front();
  }
});
