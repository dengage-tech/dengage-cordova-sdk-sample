// Geofence Screen
function requestLocationPermissions() {
    DengageCR.requestLocationPermissions(
        function() {
            alert('Location permission requested');
        },
        function(error) {
            console.error('Error requesting location permissions:', error);
            alert('Error requesting location permissions');
        }
    );
}

