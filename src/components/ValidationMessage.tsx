import React from 'react';

interface ValidationMessageProps {
  id?: string;
  message?: string;
  type?: 'error' | 'info';
  testId?: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  id,
  message,
  type = 'error',
  testId
}) => {
  if (!message) return null;

  return (
    <div
      id={id}
      className={`validation-message validation-${type}`}
      role="alert"
      aria-live="assertive"
      data-testid={testId}
    >
      <span className="validation-bullet" aria-hidden="true">!</span>
      <span className="validation-text">{message}</span>
    </div>
  );
};
