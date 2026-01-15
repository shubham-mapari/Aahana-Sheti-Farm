import React from 'react';

const AddButton = ({ onClick, text, type = "button", disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="btn-primary"
            disabled={disabled}
            style={{ opacity: disabled ? 0.7 : 1 }}
        >
            {text}
        </button>
    );
};

export default AddButton;
