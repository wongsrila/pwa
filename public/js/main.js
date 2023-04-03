if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("registered"))
    .catch((err) => console.log(err));
}
