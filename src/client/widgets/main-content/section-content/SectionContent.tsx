import React from 'react';
import { useParams, Outlet } from 'react-router-dom';

const SectionContent = () => {
  const { sectionId } = useParams();

  return (
    <>
      <h1>
        Section {sectionId}
      </h1>
      <Outlet />
    </>
  );
};

export default SectionContent;