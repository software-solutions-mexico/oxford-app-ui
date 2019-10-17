angular.module("App", ["main"]);
angular.module("main", []);
angular.module("main").controller("mainController", function ($scope, $http) {

    $http.defaults.headers.post["Content-Type"] = "application/json";

    $scope.username = "oscar@mail.com";
    $scope.password = "";
    $scope.user_email = sessionStorage.getItem("user_email");
    $scope.token = sessionStorage.getItem("token");
    $scope.main = 'views/home.html';

    $scope.login = function (user, password) {
        $http({
            url: "https://oxford-app-api.herokuapp.com/v1/sessions",
            method: "POST",
            data: { email: user, password: password }
        })
            .then(function (response) {
                $scope.token = response.data.data.token;
                sessionStorage.setItem("token", $scope.token);

                $scope.user = response.data.data.user;
                $scope.user_email = $scope.user.email;
                sessionStorage.setItem("user_email", $scope.user.email);
            }, function (response) {
                $scope.login_error = response.data.errors;
            });
        return;
    };

    $scope.logout = function () {
        $scope.token = "";
        sessionStorage.setItem("token", "");
        console.log("FROM LOGoUT");
    };

    // $scope.login($scope.username, $scope.password);

});
