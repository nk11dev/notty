import React from 'react';

type Props = {
  error: {
    status?: string,
    statusText?: string,
    message?: string
  }
};

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