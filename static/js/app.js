var app = angular.module("app", []);

app.controller("AppCtrl", function ($http, $scope) {
    var app = this;
    $scope.text = "init value";
    app.message = "Am I working?";
    $http.get("/api/desk").success(function (data) {
        app.desks = data.objects;
        console.log("/api/desk - app.desks: ", app.desks);
    })

    app.addDesk = function (deskName) {
        console.log("adding new desk: ", deskName);
        if (deskName == null)
        deskName = "new";
        var owner = app.getUserName();
        var storage = app.createStorageFor(owner, deskName);
        console.log("owner: ", owner);
        $http.post("/api/desk", {"owner": owner, "name": deskName, "storage": storage})
            .success(function (data) {
                console.log("successful push");
                app.desks.push(data);
            })
    }

    app.getUserName = function () {
      /*  change back to var ret = $http.get("/..").success(function() {...}
      var ret = $resource("/getUserName");
        console.log("ret is: ", ret)
        return ret;
        //return defer.promise; */
        return "AlexTelon"
    }

    app.deleteDesk = function (desk) {
        $http.delete("/api/desk/" + desk.id).success(function (response) {
            app.desks.splice(app.desks.indexOf(desk),1)
        })
    }

    app.updateDesk = function (desk) {
        $http.put("/api/desk/" + desk.id, desk)
    }

    app.submit = function(text) {
        console.log("here we are with text: ", text);
        console.log("oldval: ", $scope.text )
        $scope.text = text;
    }

    app.createStorageFor = function(owner, deskName) {
         return $http.get("/createStorageFor/" + owner, + "/" + deskName);
    }


})
