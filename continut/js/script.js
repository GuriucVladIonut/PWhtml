function laIncarcare() {
    getTimer();
    getURL();
    getBrawserNameAndVersion();

    drawCanvas();
}

var varTime = setInterval(getTimer, 1000);

function getTimer() {
    document.getElementById("data").innerHTML = "Timp: " + new Date();
}

function getURL() {
    document.getElementById("url").innerHTML = "Adresa URL: " + window.location;
}

var p = null;

function draw(event) {
    if (p == null) {
        p = { x:event.offsetX,
              y:event.offsetY };
    }
    else {
        let ctx = document.getElementById("drawingCanvas").getContext("2d");

        let conturColor = document.getElementById("contur");
        let umplereColor = document.getElementById("umplere");

        ctx.fillStyle = umplereColor.value;
        ctx.fillRect(Math.min(p.x, event.offsetX), Math.min(p.y, event.offsetY), Math.abs(p.x - event.offsetX), Math.abs(p.y - event.offsetY));

        ctx.strokeStyle = conturColor.value;
        ctx.strokeRect(Math.min(p.x, event.offsetX), Math.min(p.y, event.offsetY), Math.abs(p.x - event.offsetX), Math.abs(p.y - event.offsetY));
        
        p = null;
    }
}


function modifyNavBarFocus(resursa){
    document.getElementById('acasa').classList.remove("active");
    document.getElementById('inregistreaza').classList.remove("active");
    document.getElementById('video').classList.remove("active");
    document.getElementById('despre_html').classList.remove("active");
    document.getElementById('desen').classList.remove("active");
    document.getElementById('invat_js').classList.remove("active");
    document.getElementById('persoane').classList.remove("active");
    document.getElementById('verifica').classList.remove("active");
    document.getElementById('cumparaturi').classList.remove("active");
    document.getElementById(resursa).classList.add("active");
}

function verifica() {
    let http=new XMLHttpRequest();
    http.open("GET","http://localhost:5678/resurse/utilizatori.json");
    http.send();
    http.onreadystatechange=(e)=>{
      let login=document.getElementById("login").value;
      let password=document.getElementById("password").value;
      let users=JSON.parse(http.responseText);
      for(let i=0;i<users.length;++i){
        if(users[i].utilizator==login && users[i].parola==password){
          alert("Datele corespund.");
          return;
        }
      }
      alert("Datele NU corespund.")
  }
}
function schimbaContinut(resursa, jsFisier, jsFunctie) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("continut").innerHTML = this.responseText;
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function () {
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                document.head.appendChild(elementScript);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            }
            if (resursa === 'persoane') {
              loadAndDisplayData("resurse/persoane.xml");
          }
        }
    };
    xhttp.open("GET", resursa + ".html", true);
    xhttp.send();
}



