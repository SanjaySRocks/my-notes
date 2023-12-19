const notesContainer = document.getElementById("notesContainer");

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
    randomId = Math.floor(Math.random() * 9999) + 1;

    const newNote = { id: randomId, title: noteName.value, content: noteContent.value }

    createNote(newNote);
    
    getAllNotes()
}

function getAllNotes() {
    notesContainer.innerHTML = "";
    const notesData = JSON.parse(localStorage.getItem('notesData'));

    notesData.forEach(note => {

        randomColor = Math.floor(Math.random() * 4) + 1;
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


getAllNotes();