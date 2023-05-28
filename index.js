const btn = document.querySelector(".btn");
const result = document.querySelector("p");
const reload = document.querySelector(".reload");

btn.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // console.log(latitude, longitude);

        fetch(
          `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
        )
          .then((response) => {
            if (!response.ok)
              throw new Error(`Problem with Geociding ${response.status} `);

            return response.json();
          })
          .then((data) => {
            console.log(data.display_name);
            result.textContent = ` Your current location is: ${data.display_name}`;
          })
          .catch((err) => console.error(`${err.message}`));
      },
      function () {
        alert("could not get your position");
      }
    );
  }
});

reload.addEventListener("click", function () {
  result.textContent = "";
  location.reload();
});
