window.addEventListener('load', (event) => {
  setTimeout(function () {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }, 500);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => console.log('registered'))
    .catch((err) => console.log(err));
}
