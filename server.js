// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));

  usacSearchOne();

});



function usacSearchOne() {

  // var queryURL = "https://opendata.usac.org/resource/jp7a-89nd.json?contact_state=KS&funding_year=2018";
  var queryURL = "https://opendata.usac.org/resource/jp7a-89nd.json?funding_year=2019";

  var fundingYear = "funding_year=2019";

  $.ajax({
    url: queryURL + fundingYear,
    type: "GET",
    data: {
      "$limit" : 100,
      "$$app_token" : "GTLTjpiTWvdsB8cIMPXNzlm65"
    }
  }).done(function(data) {
    alert("Retrieved " + data.length + " records from the dataset!");
    console.log(data);

    var tbody = $("tbody");
    var row = "";
    var td01 = "";
    var td02 = "";
    var td03 = "";
    var td04 = "";
    var td05 = "";
    var td06 = "";
    var td07 = "";
    var td08 = "";
    var td09 = "";
    var td10 = "";

    var states = ["AK", "AR", "AZ", "CO", "CA", "HI", "IL", "IN", "KS", "MO", "MT", "NV", "OH", "OK", "TX", "WI", "WY"];
    var remove = "";

    // for loop to append rows of data
    for (var i = 0; i < data.length; i++) {
      td01 = $("<td>").text(data[i].application_number);
      td02 = $("<td>").text(data[i].billed_entity_name);
      td03 = $("<td>").text(data[i].ben);
      td04 = $("<td>").text(data[i].applicant_type);
      td05 = $("<td>").text(data[i].billed_entity_address1);
      td06 = $("<td>").text(data[i].billed_entity_address2);
      td07 = $("<td>").text(data[i].billed_entity_city);
      td08 = $("<td>").text(data[i].billed_entity_state);
      td09 = $("<td>").text(data[i].billed_entity_zip);
      td10 = $("<td>").text(data[i].allowable_contract_date);

      row = $("<tr>");

      var applicant_type = $.trim(data[i].applicant_type);

      console.log(applicant_type);
      remove = false;

      // --------------------------------
      // for loop to filter out a row of data with a state not available
      // --------------------------------
      for (j = 0; j < states.length; j++) {
        if (data[i].billed_entity_state===states[j]){
          remove = true;
        }
      }
      // --------------------------------

      // --------------------------------
      // if statement to filter out a row of data with applicant type of "library"
      // --------------------------------
      // if (applicant_type==="Library"){
      //   remove = true;
      // }
      remove = applicant_type.startsWith("Library");
      // --------------------------------


      if (remove){
        console.log("removed row");
      } else {
        tbody.append(row);
        row.append(td01);
        row.append(td02);
        row.append(td03);
        row.append(td04);
        row.append(td05);
        row.append(td06);
        row.append(td07);
        row.append(td08);
        row.append(td09);
        row.append(td10);
      }

    }

    // usacData = data;

  });

}



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
