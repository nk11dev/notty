import React from 'react';

type Props = {
  text: string,
};

const UserFormHeader = (props: Props) => (
  <h2 className="mb-4 text-center">
    <b>{props.text}</b>
  </h2>
);

export default UserFormHeader;