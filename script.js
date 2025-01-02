// URL de l'API Genshin Dev
const apiUrl = "https://api.genshin.dev/characters";
let charactersData = {}; // Stockera les données des personnages
let selectedCharacters = []; // Liste des personnages sélectionnés

// Fonction pour récupérer les personnages depuis l'API
async function fetchCharacters() {
    try {
        const response = await fetch(apiUrl);
        const characters = await response.json();
        charactersData = characters.reduce((acc, character) => {
            acc[character] = {
                image: `https://api.genshin.dev/characters/${character}/portrait`,
                video: null // Ajoutez une source vidéo si disponible
            };
            return acc;
        }, {});
        displayCharacters(characters);
    } catch (error) {
        console.error("Erreur lors de la récupération des personnages :", error);
    }
}

// Fonction pour afficher les personnages dans la grille
function displayCharacters(characters) {
    const grid = document.getElementById("portrait-grid");
    grid.innerHTML = ""; // Nettoyer le contenu actuel

    characters.forEach(character => {
        const card = document.createElement("div");
        card.className = "portrait";
        card.setAttribute("data-character", character);
        card.onclick = () => toggleCharacterSelection(character);

        const img = document.createElement("img");
        img.src = `https://api.genshin.dev/characters/${character}/portrait`;
        img.alt = character;

        const name = document.createElement("p");
        name.textContent = character;

        card.appendChild(img);
        card.appendChild(name);
        grid.appendChild(card);
    });
}

// Fonction pour sélectionner ou désélectionner un personnage
function toggleCharacterSelection(characterName) {
    const portraitElement = document.querySelector(`[data-character="${characterName}"]`);
    const index = selectedCharacters.indexOf(characterName);

    if (index === -1) {
        // Sélectionner le personnage
        selectedCharacters.push(characterName);
        portraitElement.classList.add('selected');
    } else {
        // Désélectionner le personnage
        selectedCharacters.splice(index, 1);
        portraitElement.classList.remove('selected');
    }
}

// Fonction pour sélectionner un personnage aléatoire
function selectRandomCharacter() {
    if (selectedCharacters.length === 0) {
        alert("Veuillez sélectionner au moins un personnage.");
        return;
    }

    const randomCharacter = selectedCharacters[Math.floor(Math.random() * selectedCharacters.length)];
    const resultContainer = document.getElementById('result-container');
    const characterImage = document.getElementById('character-image');
    const characterVideo = document.getElementById('character-video');

    characterImage.src = charactersData[randomCharacter].image;

    // Configurer la vidéo si disponible
    const videoId = charactersData[randomCharacter].video;
    if (videoId) {
        const startTime = Math.floor(Math.random() * 60); // Exemple : début aléatoire dans les 60 premières secondes
        characterVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&start=${startTime}`;
        characterVideo.style.display = 'block';

        // Arrêter la vidéo après 10 secondes
        setTimeout(() => {
            characterVideo.src = "";
            characterVideo.style.display = 'none';
        }, 10000);
    }

    resultContainer.style.display = "block";
}

// Charger les personnages au démarrage
fetchCharacters();
