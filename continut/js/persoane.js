function incarcaPersoane() {
    let http = new XMLHttpRequest();
    let url = 'http://localhost:5678/resurse/persoane.xml';
    http.open("GET", url);
    http.send();
    http.onreadystatechange = (e) => {
        if (http.readyState == 4 && http.status == 200) {
            let xmlDoc = http.responseXML;
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');

            let headRow = document.createElement('tr');
            headRow.innerHTML = '<th>Nume</th><th>Prenume</th><th>Vârsta</th><th>Adresa</th><th>Limbi Vorbite</th>';
            thead.appendChild(headRow);
            table.appendChild(thead);

            let persoane = xmlDoc.getElementsByTagName("persoana");
            for (let i = 0; i < persoane.length; ++i) {
                let row = document.createElement('tr');
                let persoana = persoane[i];

                row.innerHTML = '<td>' + persoana.getElementsByTagName("nume")[0].textContent + '</td>' +
                                '<td>' + persoana.getElementsByTagName("prenume")[0].textContent + '</td>' +
                                '<td>' + persoana.getElementsByTagName("varsta")[0].textContent + '</td>';

                let adresa = '<td>' + 
                             persoana.getElementsByTagName("strada")[0].textContent + ', ' +
                             persoana.getElementsByTagName("numar")[0].textContent + ', ' +
                             persoana.getElementsByTagName("localitate")[0].textContent + ', ' +
                             persoana.getElementsByTagName("judet")[0].textContent + ', ' +
                             persoana.getElementsByTagName("tara")[0].textContent +
                             '</td>';
                row.innerHTML += adresa;

                let limbiVorbite = '<td>' + 
                                   'Franceză: ' + persoana.getElementsByTagName("franceza")[0].textContent + '<br>' +
                                   'Engleză: ' + persoana.getElementsByTagName("engleza")[0].textContent + '<br>' +
                                   'Rusă: ' + persoana.getElementsByTagName("rusa")[0].textContent +
                                   '</td>';
                row.innerHTML += limbiVorbite;

                tbody.appendChild(row);
            }
            table.appendChild(tbody);
            document.getElementById("continut").appendChild(table);
        }
    }
}
