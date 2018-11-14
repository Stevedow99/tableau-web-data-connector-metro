(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "DateUpdated",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Description",
            alias: "Description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "IncidentID",
            alias: "IncidentID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "IncidentType",
            alias: "Incident Type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "RoutesAffected",
            alias: "Routes Affected",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "BusIncidents",
            alias: "WMTA Bus Incidents",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };




    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.ajax({
              "async": true,
              "crossDomain": true,
              "url": "https://api.wmata.com/Incidents.svc/json/BusIncidents",
              "method": "GET",
              "headers": {
                "api_key": "29fb2c42b2e54ffe9226628a3010b4f3"
              }
            }).done(function(response){
                jsondata = response
            console.log(response)
               var tableData = [];

          

            // Iterate over the JSON object
             for (var i = 0, len = response.BusIncidents.length; i < len; i++) 
             
             {
               tableData.push({
                    "DateUpdated": response.BusIncidents[i].DateUpdated,
                    "Description": response.BusIncidents[i].Description,
                    "IncidentID": response.BusIncidents[i].IncidentID,
                    "IncidentType": response.BusIncidents[i].IncidentType,
                    "RoutesAffected": response.BusIncidents[i].RoutesAffected
                });
            }



            table.appendRows(tableData);
            doneCallback();


        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "WMTA Bus Incidents"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau

        });
    });
})();


