import React from 'react';

type Props = {
  error: {
    name: string,
    message: string
  }
};

const ErrorMsg = (props: Props) => {
  const { error } = props;

  return (
    <p>
      {`Error. Name: "${error.name}", Message: "${error.message}"`}
    </p>
  );
}

export default ErrorMsg;