angular.module("App", ["main"]);
angular.module("main", []);
angular.module("main").controller("mainController", function ($scope, $http) {

    $http.defaults.headers.post["Content-Type"] = "application/json";

    $scope.username = "oscar@mail.com";
    $scope.password = "";
    $scope.user_email = sessionStorage.getItem("user_email");
    $scope.token = sessionStorage.getItem("token");
    $scope.main = 'views/home.html';
    $scope.upload_state = "";

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
        $scope.upload_state = "";
    };


    // dev url: http://localhost:3000/v1/notifications/create_notifications_from_excel
    $scope.uploadFile = function(files) {
        var fd = new FormData();
        var files = document.getElementById('file').files[0];
        fd.append('file',files);

        $http({
            url: "https://oxford-app-api.herokuapp.com/v1/notifications/create_notifications_from_excel",
            method: "POST",
            data: fd,
            headers: {
                'Content-Type': undefined,
                'Authorization': $scope.token
            },
        })
            .then(function (response) {
                console.log("SUCCESS UPLOAD")
                if (response.data.errors) {
                    $scope.upload_state = "Usuarios no encontrados para entregar notificaciones"
                }
                else {
                    $scope.upload_state = "Notificaciones creadas exitosamente";
                }

            }, function (response) {
                console.log("ERROR")
                $scope.upload_state = "Error en la subida de archivo"
            });
        return;
    };


});
