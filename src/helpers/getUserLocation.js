export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.watchPosition se usario cuando la persona esta en movimiento
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (err) => {
        alert('No se puede obtener la Geolocalizacion');
        console.log(err);
        reject();
      }
    );
  });
};
