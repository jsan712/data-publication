// Instrument search functionality
function searchInstrument() {
    var instrumentInput = document.getElementById("instrument-input").value;
    var searchURL = `https://musicbrainz.org/ws/2/instrument/?query=${encodeURIComponent(instrumentInput)}&fmt=json`;

    fetch (searchURL)
        .then(response => response.json())
        .then(data => displayInstrumentResults(data))
        .catch(error => console.error("Error: ", error));
}

function displayInstrumentResults(data){
    var resultsDiv = document.getElementById("instrument-results");
    resultsDiv.innerHTML = "";

    if (data.instruments && data.instruments.length > 0) {
        data.instruments.forEach(instrument => {
            var instrumentInfo = document.createElement("p");
            instrumentInfo.innerHTML = `Instrument: ${instrument.name} <br> MBID: ${instrument.id}`;
            instrumentInfo.style.cursor = "pointer";
            instrumentInfo.onclick = function() { fetchInstrumentDetails(instrument.id); };
            resultsDiv.appendChild(instrumentInfo);
        });
    }
    else {
        resultsDiv.innerHTML = "No instruments found";
    }
}

function fetchInstrumentDetails(mbid){
    var detailsUrl = `https://musicbrainz.org/ws/2/instrument/${mbid}?fmt=json`;

    fetch (detailsUrl)
        .then(response => response.json())
        .then(data => displayDetailResults(data))
        .catch(error => console.error("Error: ", error));
}

function displayDetailResults(data){
    var resultsDiv = document.getElementById("instrument-results");
    resultsDiv.innerHTML = "";

    if (data) {
        var instrumentInfo = document.createElement("p");
        instrumentInfo.innerHTML = `Instrument: ${data.name} <br> 
        MBID: ${data.id} <br>
        Description: ${data.description || "No description available"} <br>
        Disambiguation: ${data.disambiguation || "None"}`;

        resultsDiv.appendChild(instrumentInfo);
    }
    else {
        resultsDiv.innerHTML = "No instruments found";
    }
}

// Artist search functionality
async function fetchArtist() {
    var artistInput = document.getElementById("artist-input").value.trim();
    var resultsDiv = document.getElementById("artist-results");
    resultsDiv.innerHTML = "";

    if (artistInput === "") {
        resultsDiv.innerHTML = "Please enter an artist name";
    }
    else {
        try {
            const response = await fetch(`https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(artistInput)}&fmt=json`);
            const data = await response.json();
            const artists = data.artists;

            // Display results
            if (artists.length === 0) {
                resultsDiv.innerHTML = `<p>No results found for ${artistInput}.</p>`;
            }
            else {
                artists.forEach(artist => {
                    const artistInfo = document.createElement('a');
                    artistInfo.href = "#";
                    artistInfo.textContent = artist.name;
                    artistInfo.style.cursor = "pointer";
                    artistInfo.addEventListener('click', () => {
                        fetchAlbums(artist);
                    });

                    resultsDiv.appendChild(artistInfo);
                });
            }
        } 
        catch (error) {
            console.error('Error fetching artist details:', error);
        }
    }
}

async function fetchAlbums(artist) {
    var resultsDiv = document.getElementById("artist-results");
    resultsDiv.innerHTML = "";
    artistName = document.createElement("h4");
    artistName.innerHTML = artist.name;
    resultsDiv.appendChild(artistName);

    try {
        const response = await fetch(`https://musicbrainz.org/ws/2/release/?artist=${encodeURIComponent(artist.id)}&fmt=json`);
        const data = await response.json();
        const albums = data.releases;

        // Display results
        if (albums.length === 0) {
            resultsDiv.innerHTML = `<p>No results found.</p>`;
        }
        else {
            // Create the table
            const table = document.createElement("table");
            const headerRow = document.createElement("tr");
            const releaseDateHeader = document.createElement("th");
            releaseDateHeader.textContent = "Release Date";
            const albumHeader = document.createElement("th");
            albumHeader.textContent = "Album";
            headerRow.appendChild(releaseDateHeader);
            headerRow.appendChild(albumHeader);
            table.appendChild(headerRow);

            // Populate the table
            albums.forEach(album => {
                const row = document.createElement("tr");
                const releaseDate = document.createElement("td");
                releaseDate.textContent = album["date"] ? album["date"] : "N/A";
                const title = document.createElement("td");
                title.textContent = album["title"] ? album["title"] : "N/A";
                row.appendChild(releaseDate);
                row.appendChild(title);
                table.appendChild(row);
            });

            resultsDiv.appendChild(table);
        }
    }
    catch (error){
        console.error("Error fetching artist details: ", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const instrumentInput = document.getElementById('instrument-input');
    instrumentInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchInstrument();
        }
    });

    const artistInput = document.getElementById('artist-input');
    artistInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            fetchArtist();
        }
    });
})

document.getElementById("instrument-btn").addEventListener("click", searchInstrument);
document.getElementById("artist-btn").addEventListener("click", fetchArtist);