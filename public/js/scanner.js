const html5QrCode = new Html5Qrcode('reader');
const config = { fps: 10, qrbox: 200 };

html5QrCode
  .start({ facingMode: 'environment' }, config, (decodedData) => {
    markupData(decodedData);
  })
  .catch((err) => {
    console.log(err);
  });

const markupData = (decodedData) => {
  html5QrCode
    .stop()
    .then((ignore) => {
      // QR Code scanning is stopped.
    })
    .catch((err) => {
      // Stop failed, handle it.
    });

  window.location.href = `/result/${decodedData}`;
};
