document.addEventListener("DOMContentLoaded", function () {
  const lw1111 = document.getElementById("lw1111");
  const countdown = document.getElementById("countdown");
  const vhs = document.getElementById("vhs");
  const k7 = document.getElementById("K7");
  const myVideo = document.getElementById("myVideo");

  // Date et heure de déclenchement : 11 novembre à 11h11
  const triggerDate = new Date();
  triggerDate.setMonth(10); // Novembre (0 = janvier)
  triggerDate.setDate(11); // 11ème jour
  triggerDate.setHours(11); // 11 heures
  triggerDate.setMinutes(11); // 11 minutes
  triggerDate.setSeconds(0); // 11 secondes

  k7.addEventListener("click", () => {
    playVHS();
  });

  function playVHS() {
    myVideo.play();
    myVideo.style.display = "block";
    k7.style.display = "none";

    myVideo.addEventListener("ended", function () {
      window.close();
    });
  }

  // Fonction pour afficher ou masquer la vidéo en fonction de l'heure
  function checkTime() {
    const now = new Date();

    if (now >= triggerDate) {
      // Si l'heure est atteinte, affiche la vidéo et cache le compte à rebours
      lw1111.style.display = "none";
      vhs.style.display = "flex";
    } else {
      // Calcul du temps restant
      const timeLeft = triggerDate - now;
      const hours = String(
        Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((timeLeft / (1000 * 60)) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(
        2,
        "0"
      );

      countdown.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }

  function loadVideoForScreenSize() {
    // Vérifie si la largeur de l'écran est de 600px ou moins
    if (window.innerWidth <= 600) {
      myVideo.src = "LW1111MobileV2.webm"; // Remplace par le chemin de la version mobile
    } else {
      myVideo.src = "LW1111.mp4"; // Remplace par le chemin de la version desktop
    }
  }

  // Charger la vidéo appropriée au chargement de la page
  loadVideoForScreenSize();

  // Écouter les changements de taille d'écran et recharger la vidéo si nécessaire
  window.addEventListener("resize", loadVideoForScreenSize);

  // Vérifie le temps toutes les secondes
  checkTime();
  setInterval(checkTime, 1000);
});
