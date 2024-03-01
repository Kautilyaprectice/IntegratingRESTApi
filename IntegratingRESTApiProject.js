const noteForm = document.getElementById('noteForm');
const notesList = document.getElementById('notesList');
const totalNotes = document.getElementById('totalNotes');
const searchNotes = document.getElementById('searchNotes');
const searchCount = document.getElementById('searchCount');

noteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const noteTitle = document.getElementById('noteTitle').value;
    const noteDesc = document.getElementById('noteDesc').value;
    await axios.post('https://crudcrud.com/api/dc8b6dfa6e224abdb51bde68ebb49409/notes', {
        title: noteTitle,
        description: noteDesc
    });
    getNotes();
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteDesc').value = '';
});

const getNotes = async () => {
    const response = await axios.get('https://crudcrud.com/api/dc8b6dfa6e224abdb51bde68ebb49409/notes');
    notesList.innerHTML = '';
    totalNotes.textContent = response.data.length;
    response.data.forEach(note => {
        const listItem = document.createElement('p');
        listItem.textContent = note.title;
        listItem.className = "listitem";
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
            await axios.delete(`https://crudcrud.com/api/dc8b6dfa6e224abdb51bde68ebb49409/notes/${note._id}`);
            getNotes();
        });
        listItem.appendChild(deleteButton);
        const noteDescription = document.createElement('p');
        noteDescription.textContent = note.description;
        listItem.appendChild(noteDescription);
        notesList.appendChild(listItem);
    });
};

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    const searchText = searchNotes.value;
    const filteredNotes = notesList.querySelectorAll('li');
    let count = 0;
    filteredNotes.forEach(note => {
        if (note.textContent.toLowerCase().includes(searchText.toLowerCase())) {
                note.style.display = '';
                count++;
        } else {
            note.style.display = 'none';
        }
    });
    searchCount.textContent = count;
    
})

getNotes();