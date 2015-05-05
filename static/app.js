var app = angular.module("app", []);

app.controller("AppCtrl", function ($http, $scope) {
    var app = this;
    $scope.text = "init value";
    app.message = "Am I working?";
    $http.get("/api/desk").success(function (data) {
        app.desks = data.objects;
    })

    app.addDesk = function (deskName) {
        if (deskName == null)
        deskName = "new";
        console.log("adding new desk: ", deskName);
        var owner = app.getUserName();
        console.log("owner: ", owner);
        var storage = app.createStorageFor(owner, deskName);
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
        console.log("oldval: ", $scope.text );
        $scope.text = text;
    }

    app.createStorageFor = function(owner, deskName) {
        url = "/createStorageFor/" + owner + "/" + deskName;
        ret = null;
        $.get(url, function ( data ) {
            ret = data;
            I need to write this outside the scope and im too tired to remember tha nice syntax for that
            console.log("derpa:", data);
        });
        console.log("ret is: ", ret);
        return ret
    }


})
