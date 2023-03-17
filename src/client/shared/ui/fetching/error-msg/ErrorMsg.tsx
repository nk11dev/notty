import React from 'react';

type ErrorType = {
  error: {
    status?: string,
    statusText?: string,
    message?: string
  }
};

type Props = ErrorType;

const ErrorMsg = (props: Props) => {
  const { status, statusText, message } = props.error;

  return (
    <div className='error-message'>
      <div>
        {`Error: ${status}, ${statusText}`}
      </div>
      <div>
        {`Message: ${message}`}
      </div>
    </div>
  );
}

export default ErrorMsg;