import React from 'react';

import PageContent from '@/shared/ui/page/page-content';
import StylesExample from '@/shared/examples/StylesExample';
import ImagesExample from '@/shared/examples/ImagesExample';

const ExamplePage = () => (
  <PageContent>
    <StylesExample>
      <h1>Example content</h1>
    </StylesExample>

    <ImagesExample />
  </PageContent>
);

export default ExamplePage;