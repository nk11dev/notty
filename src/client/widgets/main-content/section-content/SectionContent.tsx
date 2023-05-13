import React from 'react';
import { useParams } from 'react-router-dom';

const SectionContent = () => {
  const { sectionId } = useParams();

  return (
    <h1>
      Section {sectionId}
    </h1>
  );
};

export default SectionContent;