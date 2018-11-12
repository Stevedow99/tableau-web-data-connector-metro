(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "IncidentID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Description",
            alias: "Incident Description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "LinesAffected",
            alias: "LinesAffected",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "StartLocationFullName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "EndLocationFullName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "PassengerDelay",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DelaySeverity",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "IncidentType",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "EmergencyText",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "LinesAffected",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DateUpdated",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "MWTADataFeed",
            alias: "WMTA Rail Incidents",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };


            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://api.wmata.com/Incidents.svc/json/Incidents",
              "method": "GET",
              "headers": {
                "api_key": "29fb2c42b2e54ffe9226628a3010b4f3",
                "cache-control": "no-cache",
                "Postman-Token": "6844e148-70e6-480d-a35d-a7a13cea42a4"
              }
            }

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.ajax(settings).done(function(resp) {
               var tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                tableData.push({
                    "IncidentID": resp[i].IncidentID,
                    "Description": resp[i].Description,
                    "StartLocationFullName": resp[i].StartLocationFullName,
                    "EndLocationFullName": resp[i].EndLocationFullName,
                    "PassengerDelay": resp[i].PassengerDelay,
                    "DelaySeverity": resp[i].DelaySeverity,
                    "IncidentType": resp[i].IncidentType,
                    "EmergencyText": resp[i].EmergencyText,
                    "LinesAffected": resp[i].LinesAffected,
                    "DateUpdated": resp[i].DateUpdated
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
            tableau.connectionName = "WMTA Rail Incidents"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
