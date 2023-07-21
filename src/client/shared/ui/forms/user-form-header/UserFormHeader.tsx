import React from 'react';

type Props = {
  heading: string,
  text?: string,
};

const UserFormHeader = (props: Props) => (
  <div className="text-center">
    <h1 className="text-center">
      <b>{props.heading}</b>
    </h1>
    {props.text && (
      <p>{props.text}</p>
    )}
  </div>
);

export default UserFormHeader;