angular.module("App", ["main"]);
angular.module("main", []);
angular.module("main").controller("mainController", function ($scope, $http) {

    $http.defaults.headers.post["Content-Type"] = "application/json";

    $scope.username = "oscar@mail.com";
    $scope.password = "123456";
    $scope.main = 'views/home.html';

    $scope.login = function (user, password) {
        $http({
            url: "https://oxford-app-api.herokuapp.com/v1/sessions",
            method: "POST",
            data: { email: user, password: password }
        })
            .then(function (response) {
                $scope.token = response.data.data.token;
                $scope.user = response.data.data.user;
            }, function (response) {
                $scope.login_error = response.data.errors;
            });
        return;
    };

});
