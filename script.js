const characters = {
    "Albedo": {
        image: "https://uploadstatic-sea.mihoyo.com/contentweb/20201204/2020120419111276595.png",
        video: "https://www.youtube.com/embed/Jy3Y3Rpml3A" // URL d'intégration YouTube
    },
    "Amber": {
        image: "https://uploadstatic-sea.mihoyo.com/contentweb/20200928/2020092819462155694.png",
        video: "https://www.youtube.com/embed/S2KeVTg91RE"
    }
    // Ajoutez ici d'autres personnages selon vos préférences
};

function selectRandomCharacter() {
    // Récupérer les personnages sélectionnés
    const selectedCharacters = Array.from(document.querySelectorAll('input[name="character"]:checked')).map(input => input.value);

    if (selectedCharacters.length === 0) {
        alert("Veuillez sélectionner au moins un personnage.");
        return;
    }

    // Sélectionner un personnage aléatoirement
    const randomCharacter = selectedCharacters[Math.floor(Math.random() * selectedCharacters.length)];
    
    // Afficher le résultat
    const resultContainer = document.getElementById('result-container');
    const characterImage = document.getElementById('character-image');
    const characterVideo = document.getElementById('character-video');
    
    characterImage.src = characters[randomCharacter].image;
    characterVideo.src = characters[randomCharacter].video;
    
    resultContainer.style.display = "block";
}
