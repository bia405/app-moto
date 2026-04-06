const apiKey = "bc3af38089dba095a63fdd980a9d77f0";

// 1. Função do Clima
async function getWeather() {
    const city = document.getElementById('cityInput').value || "São Paulo";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById('cityName').innerText = data.name;
            document.getElementById('wIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        }
    } catch (error) {
        console.error("Erro ao buscar clima");
    }
}

// 2. Banco de Dados de Motos
const motos = [
    {
        nome: "Ducati Panigale V4",
        perfil: "VELOCIDADE PURA",
        desc: "Se você gosta de velocidade e adrenalina nas pistas, a Panigale é sua escolha ideal com 214cv.",
        img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=600"
    },
    {
        nome: "BMW R 1250 GS",
        perfil: "AVENTURA SEM LIMITES",
        desc: "Se você busca desbravar novos horizontes e enfrentar qualquer terreno com conforto e torque.",
        img: "https://images.unsplash.com/photo-1591122819858-a56763567793?q=80&w=600"
    },
    {
        nome: "Harley-Davidson Fat Bob",
        perfil: "ESTILO & PRESENÇA",
        desc: "Para quem prefere o asfalto da cidade com um ronco agressivo e um visual que impõe respeito.",
        img: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?q=80&w=600"
    },
    {
        nome: "Honda CB 650R",
        perfil: "AGILIDADE URBANA",
        desc: "O equilíbrio perfeito entre o retrô e o moderno para o seu dia a dia com quatro cilindros.",
        img: "https://images.unsplash.com/photo-1599813897486-455b380f9797?q=80&w=600"
    }
];

// 3. Renderizar Motos
const grid = document.getElementById('motoGrid');

motos.forEach(m => {
    grid.innerHTML += `
        <div class="moto-card">
            <img src="${m.img}" class="moto-img">
            <div class="moto-content">
                <span class="badge">${m.perfil}</span>
                <h3>${m.nome}</h3>
                <p>${m.desc}</p>
            </div>
        </div>
    `;
});

// Iniciar com clima de SP
getWeather();
