import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  text: string,
  linkText: string,
  url: string,
};

const UserFormFooter = (props: Props) => (
  <div className="text-center">
    <div>
      <span className="me-2">
        {props.text}
      </span>

      <Link to={props.url}>
        {props.linkText}
      </Link>
    </div>

    {/* Temporarily link, for debugging purposes only*/}
    <div>
      <Link to="/">
        Enter
      </Link>
    </div>
  </div>
);

export default UserFormFooter;