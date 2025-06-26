import React, { useState, useRef, useEffect } from 'react';


interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
}

export const EditableFieldTask: React.FC<EditableFieldProps> = ({ value, onSave}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync prop to internal state on load/update
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    onSave(currentValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSave(currentValue);
      setIsEditing(false);
    }
  };

  return (
    <div >
      {isEditing ? (
        
        <input
          ref={inputRef}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          

        >
         {currentValue || 'Click to Add'}
        </span>
      )}
    </div>
  );
};
