document.getElementById("process").addEventListener("click", function() {
    const data1 = document.getElementById("data1").value.trim().split("\n").map(row => row.trim()).filter(row => row);
    const data2 = document.getElementById("data2").value.trim().split("\n").map(row => row.trim()).filter(row => row);

    // Validasi input
    if (data1.length === 0 || data2.length === 0) {
        alert("Mohon masukkan kedua data untuk dibandingkan!");
        return;
    }

    document.getElementById("loadingSpinner").classList.remove("hidden");

    setTimeout(() => {
        const identicalRows = [];
        const differentRows = [];
        const nonExistentRows = [];

        // Proses data 1
        data1.forEach((row1, index) => {
            if (index < data2.length) {
                const row2 = data2[index];
                if (row1 === row2) {
                    identicalRows.push(index + 1);
                } else {
                    differentRows.push({
                        row: index + 1,
                        data1: row1,
                        data2: row2,
                        source: 'Data 1 dan Data 2' // Menambahkan sumber untuk data yang berbeda
                    });
                }
            } else {
                nonExistentRows.push({
                    row: index + 1,
                    data1: row1,
                    source: 'Data 1'
                });
            }
        });

        // Proses data 2 jika lebih panjang
        for (let index = data1.length; index < data2.length; index++) {
            nonExistentRows.push({
                row: index + 1,
                data2: data2[index],
                source: 'Data 2'
            });
        }

        // Panggil displayResults dengan panjang data1 dan data2
        displayResults(data1.length, data2.length, identicalRows, differentRows, nonExistentRows);
        document.getElementById("loadingSpinner").classList.add("hidden");
    }, 1000);
});

document.getElementById("clearButton").addEventListener("click", function() {
    document.getElementById("data1").value = "";
    document.getElementById("data2").value = "";
    document.getElementById("summary").innerHTML = "";
    document.getElementById("differences").innerHTML = "";
});

function displayResults(lengthData1, lengthData2, identicalRows, differentRows, nonExistentRows) {
    const summaryDiv = document.getElementById("summary");
    const differencesDiv = document.getElementById("differences");

    summaryDiv.innerHTML = `
    <h3>Ringkasan Hasil</h3>
    <p>Jumlah Data 1: ${lengthData1}</p>
    <p>Jumlah Data 2: ${lengthData2}</p>
    <p>Jumlah Data Sama: ${identicalRows.length}</p>
    <p>Data Berbeda: ${differentRows.length}</p>
    <p>Data Tidak Ada: ${nonExistentRows.length}</p>
  `;

    differencesDiv.innerHTML = "<h3>Data Berbeda dan Sumber</h3>";

    differentRows.forEach(diff => {
        differencesDiv.innerHTML += `
      <div class="difference-item">
        Baris: ${diff.row},<p>Data 1: <strong>${diff.data1}</strong></p>Data 2: <strong>${diff.data2}</strong><p>Sumber: ${diff.source}</P>
      </div>
    `;
    });

    differencesDiv.innerHTML += "<h3>Data Tidak Ada</h3>";

    nonExistentRows.forEach(nonExist => {
        const dataDisplay = nonExist.data1 ? `Data: <strong>${nonExist.data1}</strong>` : `Data: <strong>${nonExist.data2}</strong>`;
        differencesDiv.innerHTML += `
      <div class="difference-item ${nonExist.source === 'Data 1' ? 'data1' : 'data2'}">
        Baris: ${nonExist.row}<p>${dataDisplay}</p>Sumber: ${nonExist.source}
      </div>
    `;
    });
}
