document
  .querySelector("#btn-send-notification")
  .addEventListener("click", sendNotification); // Add an event listener to the button with the ID "btn-send-notification"


// ========== Show Notification ========== //

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