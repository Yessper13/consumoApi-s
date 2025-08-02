let div = document.createElement('datos');
let imgCiudad =document.querySelector('.imgCiudad');
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let ciudad = document.getElementById("search").value.trim();
    if(ciudad !== ""){
        consultaClima(ciudad);
        verCiudad(ciudad);
    }
});

consultaClima("Medellin");
verCiudad("Medellin")

async function consultaClima(ciudad) {
    const KEY = "cf60dad5ca7729fc15374dc55a85990a";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${KEY}&units=metric&lang=es`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        let html = `
            <h2>Clima actual en ${data.name}, ${data.sys.country}</h2>
            <table>
                <tr>
                    <td>Temperatura:</td>
                    <td>${data.main.temp} °C</td>
                    <td rowspan="5"><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icono clima"></td>
                    
                </tr>
                <tr>
                    <td>Temp. mínima:</td>
                    <td>${data.main.temp_min} °C</td>
                </tr>
                <tr>
                    <td>Temp. máxima:</td>
                    <td>${data.main.temp_max} °C</td>
                </tr>
                <tr>
                    <td>Presión:</td>
                    <td>${data.main.pressure} hPa</td>
                </tr>
                <tr>
                    <td>Humedad:</td>
                    <td>${data.main.humidity} %</td>
                </tr>  
                <tr>
                    <td>Viento:</td>
                    <td>${data.wind.speed} m/s</td>
                    <td>${data.weather[0].description}</td>
                </tr>   
            </table>`;

        document.getElementById("resultadoClima").innerHTML = html;

    } catch (error) {

    }
}

async function verCiudad(ciudad) {
    const ACCESS_KEY = "0oifK9PycEFUrsOCum-3ZQpM6uqRJB4Y3deo0zqSm7k";
    const query = `cityscape ${ciudad}`;
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${ACCESS_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const galeria = data.results;
        let html = "";

        if (galeria.length > 0) {
            galeria.forEach((imagen) => {
                html += `<img src="${imagen.urls.regular}" alt="Imagen de ciudad">`;
            });
        }

        imgCiudad.innerHTML = html;
        console.log(galeria);
    } catch (err) {
        console.error("Error al consultar la API de Unsplash:", err);
    }
}


