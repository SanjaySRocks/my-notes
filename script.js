
function createNote(newNote) {
    // If noteDatabase not found then create
    if (!localStorage.getItem('notesData'))
        localStorage.setItem('notesData', JSON.stringify([]));

    const notesData = JSON.parse(localStorage.getItem('notesData'));
    notesData.unshift(newNote);

    localStorage.setItem('notesData', JSON.stringify(notesData));
}


function AddDummyData()
{
    fetch('dummyNotes.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.forEach(note =>{
        createNote(note);
      });

      getAllNotes();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });  
}

function deleteAll()
{
    const result = confirm("Are you sure you want to DELETE ALL NOTES ?");

    if(result == true)
    {
        localStorage.setItem('notesData', JSON.stringify([]));
        alert("All Notes deleted successfully!")

        getAllNotes();
    }
}

function createNoteBtn() {
    const noteName = document.getElementById("note_name");
    const noteContent = document.getElementById("note_content");
    let randomId = Math.floor(Math.random() * 9999) + 1;
    let unixTime = Math.floor(Date.now() / 1000);

    const newNote = { id: randomId, title: noteName.value, content: noteContent.value, timestamp: unixTime }

    createNote(newNote);
    
    getAllNotes()
}

function getAllNotes() {
    const notesContainer = document.getElementById("notesContainer");

    notesContainer.innerHTML = "";
    const notesData = JSON.parse(localStorage.getItem('notesData'));

    notesData.forEach(note => {

        randomColor = Math.floor(Math.random() * 4) + 1;

        timestamp = getFormattedDateTime(note.timestamp)

        const rawHTML = `<div class="col">
        <div class="card notes-card color-${randomColor}">
            <div class="card-body notes-body">
                <div class="row">
                    <div class="col-10">
                    <h2 class="notes-heading">${note.title}</h2>
                    </div>  

                    <div class="col-2">
                    <span id="iconContainer" onclick="deleteNote(${note.id})"><i class="bi bi-x"></i></span>
                    </div>

                </div>
                 
                <p class="notes-text">${note.content}</p>

            </div>
            <div class="date">
            <span><i class="bi bi-calendar"></i> ${timestamp.date}</span>
            <span><i class="bi bi-clock"></i> ${timestamp.time}</span>
            <span onclick="copyTo()"><i class="bi bi-copy"></i></span>
            </div>
        </div>
        </div>`;
        notesContainer.insertAdjacentHTML('beforeend', rawHTML);

    });
}

function deleteNote(noteId) {
    const result = confirm("Are you sure you want to delete this note ?");

    if (result === true) {

        const notesData = JSON.parse(localStorage.getItem('notesData'));
        const filterData = notesData.filter(note => note.id !== noteId);

        localStorage.setItem('notesData', JSON.stringify(filterData));
        getAllNotes();
    }

}

function copyTo()
{

}

function getFormattedDateTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds

    const day = date.getDate(); // Get the day of the month (1-31)
    const month = date.toLocaleString('default', { month: 'short' }); // Get the month abbreviation (e.g., Jan)
    const year = date.getFullYear(); // Get the year (four digits)
    let hours = date.getHours(); // Get the hours (0-23)
    const minutes = ('0' + date.getMinutes()).slice(-2); // Get the minutes with leading zero if needed

    // Convert hours to 12-hour format and determine AM/PM
    const amPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours from 24-hour to 12-hour format

    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours}:${minutes} ${amPM}`;

    return {
        date: formattedDate,
        time: formattedTime
    };
}

getAllNotes();