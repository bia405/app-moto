// --- Configurações ---
const apiKey = "bc3af38089dba095a63fdd980a9d77f0";
// Cidade padrão ao iniciar o app
const defaultCity = "São Paulo"; 

// --- Dados das Motos (Simulando um Banco de Dados) ---
const motos = [
    { 
        nome: "Kawasaki Ninja Z H2", 
        categoria: "Hypernaked • 998cc", 
        img: "https://images.unsplash.com/photo-1614115160867-0e6e729a997d?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        nome: "Honda CB 650R", 
        categoria: "Neo Sports Café • 649cc", 
        img: "https://images.unsplash.com/photo-1599813897486-455b380f9797?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        nome: "BMW R 1250 GS", 
        categoria: "Adventure • 1254cc", 
        img: "https://images.unsplash.com/photo-1591122819858-a56763567793?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        nome: "Ducati Panigale V4 S", 
        categoria: "Sportbike • 1103cc", 
        img: "https://images.unsplash.com/photo-1632761330999-5231908df9d4?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        nome: "Harley-Davidson Fat Bob", 
        categoria: "Cruiser • 1868cc", 
        img: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        nome: "Yamaha MT-09", 
        categoria: "Hyper Naked • 890cc", 
        img: "https://images.unsplash.com/photo-1610991583594-c2401664c8d5?q=80&w=800&auto=format&fit=crop" 
    }
];

// --- Elementos do DOM ---
const bikeGrid = document.getElementById('bikeGrid');
const modal = document.getElementById('modalOverlay');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

// Elementos do Widget de Clima
const wTemp = document.getElementById('wTemp');
const wCity = document.getElementById('wCity');
const wIcon = document.getElementById('wIcon');

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    renderBikes();
    updateWeather(defaultCity); // Carrega clima padrão
});

// --- Função: Renderizar Grid de Motos ---
function renderBikes() {
    bikeGrid.innerHTML = ''; // Limpa o grid

    motos.forEach(moto => {
        const cardHTML = `
            <div class="bike-card">
                <div class="bike-image">
                    <img src="${moto.img}" alt="${moto.nome}" loading="lazy">
                </div>
                <div class="bike-info">
                    <h3>${moto.nome}</h3>
                    <p>${moto.categoria}</p>
                </div>
                <div class="card-action">
                    <span class="material-symbols-rounded">arrow_forward_ios</span>
                </div>
            </div>
        `;
        bikeGrid.innerHTML += cardHTML;
    });
}

// --- Função: Buscar e Atualizar Clima da API ---
async function updateWeather(city) {
    // URL da API (Métrica = Celsius, Idioma = PT-BR)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
        // Mostra estado de carregamento
        wTemp.innerText = "--";
        wCity.innerText = "Carregando...";

        const response = await fetch(url);
        
        // Verifica se a resposta foi bem sucedida (status 200-299)
        if (!response.ok) {
            if(response.status === 404) {
                alert("Cidade não encontrada. Verifique a ortografia.");
            } else {
                throw new Error("Erro na requisição da API");
            }
            // Retorna ao padrão caso dê erro
            wTemp.innerText = "--";
            wCity.innerText = "Erro";
            return;
        }

        const data = await response.json();

        // Atualiza o DOM com os dados reais
        wTemp.innerText = `${Math.round(data.main.temp)}°C`;
        wCity.innerText = data.name;
        
        // Atualiza o ícone
        const iconCode = data.weather[0].icon;
        wIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        wIcon.alt = data.weather[0].description;

    } catch (error) {
        console.error("Erro ao buscar clima:", error);
        alert("Não foi possível conectar à API de clima.");
        wTemp.innerText = "!!";
        wCity.innerText = "Offline";
    }
}

// --- Lógica do Modal ---
function toggleModal() {
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        cityInput.focus(); // Coloca o cursor no input automaticamente
    }
}

function handleSearch() {
    const newCity = cityInput.value.trim();
    if (newCity) {
        updateWeather(newCity);
        toggleModal();
        cityInput.value = ''; // Limpa o input
    } else {
        alert("Por favor, digite o nome de uma cidade.");
    }
}

// Event Listeners
openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
searchBtn.addEventListener('click', handleSearch);

// Permitir buscar apertando "Enter" no input
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Fechar modal clicando fora dele (no overlay)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        toggleModal();
    }
});