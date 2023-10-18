import React from 'react';
import styles from './Checkbox.module.css';

const Checkbox = ({ children, disabled, checked, onChange }) => {
    return (
        <label className={styles.container}>
            <input
                type="checkbox"
                disabled={disabled}
                checked={checked}
                onChange={({ target: { checked } }) => onChange(checked)}
            />
            {children}
        </label>
    );
};

export default Checkbox;