import React, { useState, useRef, useEffect } from 'react';
import formStyles from './formStyles.module.css'


interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  isDesc: boolean;
}

export const EditableFieldTask: React.FC<EditableFieldProps> = ({ value, onSave, isDesc}) => {
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
          className={isDesc ? formStyles.customInputDesc: formStyles.customInput}
          
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
