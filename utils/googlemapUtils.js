export function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google) return resolve();

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export function showUserLocation(map) {
  if (!navigator.geolocation) {
    console.warn("ไม่รองรับ Geolocation");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: "ตำแหน่งของคุณ",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        },
      });

      map.setCenter({ lat: latitude, lng: longitude });
      map.setZoom(13);
    },
    (err) => console.error("ไม่สามารถดึงตำแหน่งผู้ใช้ได้", err)
  );
}
