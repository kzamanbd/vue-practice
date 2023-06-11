<script setup>
    import locations from '@/static/location.json';
    import { Loader } from '@googlemaps/js-api-loader';

    const googleMap = new Loader({
        apiKey: 'AIzaSyC_z0CzH6dY9xTCO3JXOYshQ6ge9nw0AqM',
        version: 'weekly',
    });

    const initialPosition = {
        lat: 34.38478004572077,
        lng: 21.1997531486372,
    };

    googleMap.load().then(google => {
        console.log('google', google);
        const map = new google.maps.Map(document.getElementById('map'), {
            center: initialPosition,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true,
        });

        // pin locations
        new google.maps.Marker({
            position: initialPosition,
            label: 'ME',
            map: map,
        });

        const infoWindow = new google.maps.InfoWindow();
        const flightPlanCoordinates = [];
        const bounds = new google.maps.LatLngBounds();
        locations.forEach((item, index) => {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.lat, item.lng),
                map: map,
            });

            item.pathTo.forEach(function (path) {
                flightPlanCoordinates.push(new google.maps.LatLng(path[0], path[1]));
            });

            flightPlanCoordinates.push(marker.getPosition());
            bounds.extend(marker.position);
            google.maps.event.addListener(
                marker,
                'click',
                (function (marker) {
                    return function () {
                        infoWindow.setContent(item.name);
                        infoWindow.open(map, marker);
                    };
                })(marker, index),
            );
        });
        map.fitBounds(bounds);

        new google.maps.Polyline({
            map: map,
            path: flightPlanCoordinates,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
    });
</script>

<template>
    <div id="map"></div>
</template>
<style>
    #map {
        min-height: 100vh;
        width: 100%;
        height: 100%;
    }
    a[href^="http://maps.google.com/maps"]
    {
        display: none !important;
    }
    a[href^="https://maps.google.com/maps"]
    {
        display: none !important;
    }
    .gmnoprint a,
    .gmnoprint span,
    .gm-style-cc {
        display: none;
    }
</style>
