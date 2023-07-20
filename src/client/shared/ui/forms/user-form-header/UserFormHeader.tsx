import React from 'react';

type Props = {
  text: string,
};

const UserFormHeader = (props: Props) => (
  <div className="text-center">
    <h2 className="text-center">
      <b>Welcome to Notty</b>
    </h2>
    <p>{props.text}</p>
  </div>
);

export default UserFormHeader;