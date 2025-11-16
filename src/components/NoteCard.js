import React from 'react';
import { format } from 'date-fns';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onEdit(note)}>
      <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
      <p className="text-gray-600 mb-2">{note.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{note.category}</span>
        <span className="text-sm text-gray-500">{format(new Date(note.createdAt), 'MMM dd, yyyy')}</span>
      </div>
      <button
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default NoteCard;
