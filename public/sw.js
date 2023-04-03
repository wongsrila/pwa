self.addEventListener("install", (evt) => {
  console.log("installed", evt);
});

self.addEventListener("activate", (evt) => {
  console.log("activated");
});

self.addEventListener("fetch", (evt) => {
  console.log(evt);
});
