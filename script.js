NotesData = [
      {
        "title": "Meeting Agenda",
        "content": "Discuss quarterly goals and progress, allocate tasks, and finalize budget for the upcoming quarter."
      },
      {
        "title": "Shopping List",
        "content": "Eggs, milk, bread, apples, chicken, spinach, and dish soap."
      },
      {
        "title": "Travel Plans",
        "content": "Book flights to Paris, reserve hotel accommodation, and create itinerary for sightseeing."
      },
      {
        "title": "Birthday Party Ideas",
        "content": "Theme: '80s Retro. Arrange decorations, music playlist, and food menu."
      },
      {
        "title": "Project Milestones",
        "content": "Complete market analysis by Friday, brainstorm marketing strategies, and finalize project timeline."
      },
      {
        "title": "Fitness Goals",
        "content": "Daily workout routine: 30 minutes of cardio, 20 minutes of strength training, and yoga twice a week."
      },
      {
        "title": "Book Recommendations",
        "content": "Recent reads: 'Atomic Habits' by James Clear, 'Sapiens' by Yuval Noah Harari, and 'Educated' by Tara Westover."
      },
      {
        "title": "Recipes to Try",
        "content": "Lasagna, homemade pizza, Thai green curry, and chocolate chip cookies."
      },
      {
        "title": "Gardening Plans",
        "content": "Plant roses in the backyard, buy fertilizer, and set up a watering schedule."
      },
      {
        "title": "Study Schedule",
        "content": "Review mathematics concepts, read chapters 5-8 for literature class, and work on history essay."
      }
    ]
  

const notesContainer = document.getElementById("notesContainer");

function AddNote(id, title, content)
{
    randomColor = Math.floor(Math.random() * 4) + 1;
    const rawHTML = `<div class="col">
        <div class="card notes-card color-${randomColor}">
            <div class="card-body notes-body">
                <div class="row">
                    <div class="col-10">
                    <h2 class="notes-heading">${title}</h2>
                    </div>  

                    <div class="col-2">
                    <span id="iconContainer" onclick="deleteNote(${id})"><i class="bi bi-x"></i></span>
                    </div>

                </div>
                 
                <p class="notes-text">${content}</p>
            </div>
        </div>
        </div>`;
    notesContainer.insertAdjacentHTML('beforeend', rawHTML);
}

NotesData.forEach((note, index) => {
    AddNote(index+1, note.title, note.content);
});



deleteContainers.forEach(deleteContainer => {
    deleteContainer.addEventListener("click", () => {
        alert(deleteContainer.getAttribute("data-index"));
    });
});

function deleteNote(noteId)
{
    alert(noteId);
}

