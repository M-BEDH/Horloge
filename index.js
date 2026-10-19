  let alarmStart = false;
  const sonnerie = new Audio("sound/bird.wav");
  sonnerie.loop = true;
  const inputAlarme = document.getElementById("alarmInput");
  const alarmStorageKey = "horloge.alarmTime";
  const savedAlarmTime = localStorage.getItem(alarmStorageKey);

  if (savedAlarmTime && /^([01]\d|2[0-3]):[0-5]\d$/.test(savedAlarmTime)) {
    inputAlarme.value = savedAlarmTime;
  }

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
  const alarmTime = inputAlarme.value;
  const currentTime = `${hrStr}:${mnStr}`;
  if (currentTime === alarmTime) {
    
    // ici in sere la sonnerie (dossier soud - fichier BeepTimer)
    
    if (!alarmStart) {
      sonnerie.play().catch(e => console.warn("Son bloqué :", e));
      alarmStart = true;
    }
  }
}

// Ajout du listener une seule fois
const btn = document.querySelector('button');
if (!btn.dataset.listenerAdded) {
  btn.addEventListener("click", () => {
    inputAlarme.value = "";
    localStorage.removeItem(alarmStorageKey);
    
    sonnerie.pause();
    sonnerie.currentTime = 0;
    alarmStart = false;
    alert('l\'alarme a été désactivée')
  });
  btn.dataset.listenerAdded = "true";
}

// Fonction pour mettre une alerte à la création de l'alarme
inputAlarme.addEventListener("input", () => {
  if (inputAlarme.value) {
    localStorage.setItem(alarmStorageKey, inputAlarme.value);
    alert("Alarme créée pour " + inputAlarme.value);
  } else {
    localStorage.removeItem(alarmStorageKey);
  }
});

// Lancer l'horloge
updateHorloge();
setInterval(updateHorloge, 1000);
