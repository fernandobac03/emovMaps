'use strict';

/* Services */

var emovServices = angular.module('emovServices', ['ngResource']);

//For testing purposes
//wkhomeServices.serverInstance = 'http://190.15.141.85:8080/marmottatest';
emovServices.serverInstance = 'http://190.15.132.241:80/marmotta';

//for parliament triplestore test
//wkhomeServices.serverInstance = 'http://localhost:8080/parliament';


/* Sample of a RESTful client Service */
emovServices.factory('Phone', ['$resource',
    function ($resource) {
        return $resource('phones/:phoneId.json', {}, {
            query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
        });
    }]);



/* RESTful client Service */
emovServices.factory('authorRestQuery', ['$resource', '$http', '$window',
    function ($resource, $http, $window) {
        $http.defaults.headers.common['content-type'] = 'application/x-www-form-urlencoded';
        $http.defaults.headers.common['Accept'] = 'application/ld+json';
        var transform = function (data) {
            return $.param(data);
            //return data;
        }
        var serverInstance = wkhomeServices.serverInstance ? wkhomeServices.serverInstance :
                //'http://' + $window.location.hostname + ($window.location.port ? ':8080' : '') + '/marmotta';
                'http://' + $window.location.hostname + ($window.location.port ? ':8080' : '') + '';
        return $resource(serverInstance + '/pubman/pubsearch', {}, {
            query: {method: 'POST', isArray: true, transformRequest: transform, headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        });
    }]);


emovServices.factory('sparqlQuery', ['$resource', '$http', '$window', 
    function ($resource, $http, $window) {
        $http.defaults.headers.common['content-type'] = 'application/x-www-form-urlencoded';
        $http.defaults.headers.common['Accept'] = 'application/ld+json';
        var transform = function (data) {
            return $.param(data);
        }
        var serverInstance = emovServices.serverInstance ? emovServices.serverInstance :
                //'http://' + $window.location.hostname + ($window.location.port ? ':8080' : '') + '/marmotta';
                'http://' + $window.location.hostname + ($window.location.port ? ':8080' : '') + '';
        return $resource(serverInstance + '/sparql/select', {}, {
           querySrv: {method: 'POST', isArray: true, transformRequest: transform, headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
         });
    }]);

emovServices.factory('d3JSON', ['$resource',
    function ($resource) {
        return $resource('d3/:geoId.json', {}, {
            query: {method: 'GET', params: {geoId: 'world-50m'}, isArray: true}
        });
    }]);

emovServices.factory('clustersQuery', ['$resource', '$http', '$window',
    function ($resource, $http, $window) {
        return $http.get('resources/datos_clustering.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
    }]);


   