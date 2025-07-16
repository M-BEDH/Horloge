  let alarmeDéjàDéclenchée = false;
  const sonnerie = new Audio("sound/bird.wav");
  sonnerie.loop = true;

function updateHorloge() {
  const date = new Date();
  const hr = date.getHours();
  const mn = date.getMinutes();
  const sec = date.getSeconds();
    
  // Formatage à deux chiffres
  const hrStr = hr < 10 ? "0" + hr : hr;
  const mnStr = mn < 10 ? "0" + mn : mn;
  const secStr = sec < 10 ? "0" + sec : sec;
  
  // Mise à jour horloge numérique
  document.getElementById('hrs').innerText = hrStr;
  document.getElementById('mns').innerText = mnStr;
  document.getElementById('secs').innerText = secStr;
  
  // Mise à jour horloge analogique (aiguilles)
  const hrRotation = 30 * hr + mn / 2;
  const minRotation = 6 * mn;
  const secRotation = 6 * sec;
  
  document.getElementById('hr').style.transform = `rotate(${hrRotation}deg)`;
  document.getElementById('mn').style.transform = `rotate(${minRotation}deg)`;
  document.getElementById('sc').style.transform = `rotate(${secRotation}deg)`;
  
  // Vérifie l'heure d'alarme
  const alarmTime = document.querySelector('input').value;
  const currentTime = `${hrStr}:${mnStr}`;
  if (currentTime === alarmTime) {
    
    // ici in sere la sonnerie (dossier soud - fichier BeepTimer)
    
    if (!alarmeDéjàDéclenchée) {
      sonnerie.play().catch(e => console.warn("Son bloqué :", e));
      alarmeDéjàDéclenchée = true;
    }
  }
}

// Ajout du listener une seule fois
const btn = document.querySelector('button');
if (!btn.dataset.listenerAdded) {
  btn.addEventListener("click", () => {
    document.querySelector('input').value = "";
    
    sonnerie.pause();
    sonnerie.currentTime = 0;
    alarmeDéjàDéclenchée = false;
    alert('l\'alarme à été désactivée')
  });
  btn.dataset.listenerAdded = "true";
}

// Fonction pour mettre une alerte à la création de l'alarme
const inputAlarme = document.getElementById("alarmInput");

inputAlarme.addEventListener("input", () => {
  if (inputAlarme.value) {
    alert("Alarme créée pour " + inputAlarme.value);
  }
});

// Lancer l'horloge
updateHorloge();
setInterval(updateHorloge, 1000);
