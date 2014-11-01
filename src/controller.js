angular.module('nHue.controllers', [])
.controller('OptionsController', HueBRController);

HueBRController.$inject = ['$scope', "$timeout"];
function HueBRController($scope, $timeout)
{

    $scope.DefaultImages = [
             "http://oquemevem.files.wordpress.com/2014/07/6096234_700b.jpg"
            ,"http://img.ibxk.com.br/2013/8/materias/1649968641515049.jpg"
            ,"http://fc02.deviantart.net/fs70/f/2013/217/1/6/street_figher_blanka_huehuehue_br_br__normal_by_matbox99-d6gr48j.gif"
            ,"https://lh4.googleusercontent.com/-5P5N2lEKtQ4/AAAAAAAAAAI/AAAAAAAAABU/uyfFISfeEQc/photo.jpg"
            ,"https://gardenalbr.files.wordpress.com/2013/06/huehue.jpg"
    ];

    $scope.urls = [];
    $scope.alert = "alert-off";
    chrome.storage.sync.get('DataUrls', function(result) {
        $scope.$apply(function(){
            $scope.urls = result.DataUrls.Urls || [];
            $scope.customImages = result.DataUrls.Type || "Default";
        });
    });

    $scope.addUrl = function(url) {
        if(url != "") {
            if(new RegExp("^(http|https)(:\/\/.*)(.jpg|.jpeg|.gif|.png)$").test(url)) {
                $scope.url = "";
                $scope.urls.push(url);
                $scope.ShowAlert("alert-success", "New image added");
            }else{
                $scope.ShowAlert("alert-warning", "URL Invalid");
            }
        }
    };

    $scope.ShowAlert = function(alertType, alertMessage) {
        $scope.alert = alertType;
        $scope.alertMessage = alertMessage;
        $timeout(function(){
            $scope.alert = "alert-off";
            $scope.alertMessage = "";
        },5000);
    };

    $scope.SaveDefaultImages = function() {
        $scope.customImages = 'Default';
        $scope.SaveStorage();
    };

    $scope.SaveCustomImages = function() {
        $scope.customImages = 'Custom';
        $scope.SaveStorage();
    };

    $scope.removeImage = function(id) {
        var index = $scope.urls.indexOf(id);
        $scope.urls.splice(index,1);
    };

    $scope.SaveStorage = function() {
        var data = { "Urls": $scope.urls, "Type": $scope.customImages };
        chrome.storage.sync.set({'DataUrls': data }, function(){
            $scope.$apply(function(){
                $scope.ShowAlert("alert-success", 'Save Successfully');
            });
        });
    };
}
