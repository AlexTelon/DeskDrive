var app = angular.module("app", ['ui.bootstrap', 'ngRoute']);

app.controller("AppCtrl", function ($http, $scope, $route) {
    var app = this;
    $scope.desk = "default";
    $scope.submit = function (desk) {
        console.log("Submit was called: ", desk);
        $scope.desk = desk;
        app.addDesk(desk);
    };
    app.message = "Am I working?";
    $scope.loadData = function() {
        $http.get("/api/desk").success(function (data) {
            app.desks = data.objects;

        });
    };
    // initial load
    $scope.loadData();

    app.addDesk = function (deskName) {
        if (deskName == null) {
            deskName = "default";
        }
        //console.log("SHOULD WE INPUT THIS: ", $scope.desk)
        //console.log("adding new desk: ", deskName);
        var owner = app.getUserName();
        //console.log("owner: ", owner);
        var storage = "desks/" + owner + "/" + deskName;
        var url = "/createStorageFor/" + owner + "/" + deskName;
        var storage = app.createStorageFor(owner, deskName); //fix this later, right now its VERY unsafe
        $scope.desk = deskName;
    }

    app.updateCurrentDesk = function (desk) {
        $scope.desk = desk;
        console.log("updateCurrentDesk: ", $scope.desk);
    }

    app.getUserName = function () {
        // use .then function - see: http://stackoverflow.com/questions/11850025/recommended-way-of-getting-data-from-the-server?rq=1
        /*  change back to var ret = $http.get("/..").success(function() {...}
         var ret = $resource("/getUserName");
         console.log("ret is: ", ret)
         return ret;
         //return defer.promise; */
        return "AlexTelon"
    }

    app.deleteDesk = function (desk) {
        $http.delete("/api/desk/" + desk.id).success(function (response) {
            app.desks.splice(app.desks.indexOf(desk), 1)
        })
    }

    app.updateDesk = function (desk) {
        $http.put("/api/desk/" + desk.id, desk)
    }

    app.saveDesk = function (context) {
        console.log("saveDesk, context: ", context);

    }


    app.createStorageFor = function (owner, deskName) {
        url = "/createStorageFor/" + owner + "/" + deskName;
        ret = null;
        //var val = $.Deffered();
        //console.log("this: ", this);
        val = $.when($.get(url).done(function (data) {
            var storage = data;
            $http.post("/api/desk", {"owner": owner, "name": deskName, "storage": storage})
                .success(function (data) {
                    console.log("successful push");
                    app.desks.push(data);
                    $scope.loadData();
                   // console.log("app.desks is now: ", app.desks);
                })
            return data;
        }));
        ret = val;
        //console.log("return is:", ret);
        return ret;
        /*

         , function (data) {
         ret = data;
         console.log("this: ", this);
         //I need to write this outside the scope and im too tired to remember tha nice syntax for that
         console.log("derpa:", data);
         return data;
         });
         */
        //console.log("----------- return iwill be:")
        //console.log("ret is: ", ret.responseText);
        //return ret.responseText
    }

});

app.controller('AlertDemoCtrl', function ($scope) {
    $scope.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function() {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});
