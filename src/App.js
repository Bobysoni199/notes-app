import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';
import DeleteConfirmation from './components/DeleteConfirmation';
import initialNotes from './notes.json';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Notes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      setNotes(initialNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const categories = ['All Notes', 'Work', 'Personal', 'Ideas'];

  const filteredNotes = selectedCategory === 'All Notes'
    ? notes
    : notes.filter(note => note.category === selectedCategory);

  const handleSaveNote = (noteData) => {
    let title = noteData.title;
    const categoryNotes = notes.filter(note => note.category === noteData.category && note.id !== editingNote?.id);
    const duplicateTitles = categoryNotes.filter(note => note.title === title);

    if (duplicateTitles.length > 0) {
      title = `${title} (${duplicateTitles.length + 1})`;
    }

    if (editingNote) {
      setNotes(notes.map(note =>
        note.id === editingNote.id
          ? { ...note, ...noteData, title }
          : note
      ));
    } else {
      const newNote = {
        ...noteData,
        title,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setNotes([...notes, newNote]);
    }
    setEditingNote(null);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (id) => {
    setDeleteNoteId(id);
  };

  const confirmDelete = () => {
    setNotes(notes.filter(note => note.id !== deleteNoteId));
    setDeleteNoteId(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <div className="flex-1 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-0">Notes</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Add Note
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      </div>
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        note={editingNote}
      />
      <DeleteConfirmation
        isOpen={!!deleteNoteId}
        onClose={() => setDeleteNoteId(null)}
        onConfirm={confirmDelete}
        noteTitle={notes.find(note => note.id === deleteNoteId)?.title}
      />
    </div>
  );
}

export default App;
