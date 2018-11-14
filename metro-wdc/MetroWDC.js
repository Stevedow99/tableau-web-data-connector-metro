(function () {
   
    $(document).ready(function () {
         var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [

         {
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
        }


        ];
    
        var tableSchema = {
            id: "BusIncidents",
            alias: "WMTA Bus Incidents",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        
        const url = 'http://localhost:8889/api.wmata.com/Incidents.svc/json/BusIncidents'
        


        $.ajax({
            async: true,
            crossDomain: true,
            dataType: "json",
            url: url,
            data: {},
            headers: {
                "api_key": "29fb2c42b2e54ffe9226628a3010b4f3",
                "Access-Control-Allow-Origin": "*"
                     },

             success: function(data) {
                const allRows = []
                const timeSeries = data['BusIncidents']
                const keys = Object.keys(timeSeries)
                for (var i = 0 ; i < keys.length ; i++) {
                    var stringRA = data.BusIncidents[i].RoutesAffected
                    var stringRA2 = stringRA.toString();
                    const key = keys[i]
                    const actual = timeSeries[key]
                    const expected = {}
                    expected.DateUpdated = actual['DateUpdated']
                    expected.Description = actual['Description']
                    expected.IncidentID = actual['IncidentID']
                    expected.IncidentType = actual['IncidentType']
                    expected.RoutesAffected = stringRA2
                    allRows.push(expected)
                    }
                    
                table.appendRows(allRows)
                doneCallback();

            }
        });
    };

    tableau.registerConnector(myConnector);

        $("#submitButton").click(function () {
    
  
            tableau.connectionName = "WMTA Bus Incidents";
            tableau.submit();
        });
    });
})();
