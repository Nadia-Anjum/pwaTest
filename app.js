document
  .querySelector("#btn-send-notification")
  .addEventListener("click", sendNotification); // Add an event listener to the button with the ID "btn-send-notification"
  

async function sendNotification() {
  const notificationValue = document.querySelector("#notification").value; // Get the notification message

  // Check if the Notification API is available and permission is granted or request it
  if (!("Notification" in window)) {
    alert("Notification API is not available");
    return;
  }

  // Request permission if it hasn't been granted or denied yet
  let permission = Notification.permission;
  if (permission !== "granted" && permission !== "denied") {
    permission = await Notification.requestPermission();
  }

  // Show the notification if permission is granted
  if (permission === "granted") {
    showNotification(notificationValue);
  }
}

// Simplified showNotification function
async function showNotification(body) {
  // Assuming the service worker is already registered and active
  const registration = await navigator.serviceWorker.getRegistration();
  const title = "Simple PWA"; // Notification title
  const options = { body }; // Notification options

  // Use service worker to show notification if possible, else use the Notification constructor
  if (registration && "showNotification" in registration) {
    registration.showNotification(title, options);
  } else {
    new Notification(title, options);
  }
}


document
  .querySelector("#btn-geolocation")
  .addEventListener("click", getGeolocation); // Add an event listener to the button with the ID "btn-geolocation"

async function getGeolocation() {
  const geolocation = document.querySelector("#geolocation"); // Get the geolocation element
  const map = document.querySelector("#map"); // Get the map element

  geolocation.textContent = "Loading..."; // Set the text content to "Loading..."

  // Check if geolocation is available
  if (!("geolocation" in navigator)) {
    geolocation.textContent = "Geolocation is not available"; // Set the text content to "Geolocation is not available"
    return; 
  }

  // Get the current position
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords; // Get the latitude and longitude from the position object

    geolocation.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`; // Set the text content to the latitude and longitude

    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude},${latitude}&marker=${latitude},${longitude}`; // Set the src attribute of the map to the OpenStreetMap URL
  });
}
