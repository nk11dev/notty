import './common.scss';
import styles from './Demo.module.scss';

import React, { useEffect } from 'react';

const Demo = () => {
  const content = Array(80)
    .fill('lorem ipsum dolor')
    .map((t, i) => <div key={i}>{t}</div>);

  useEffect(() => {
    const handleResize = () => {
      const viewport = window.visualViewport;
      const viewportHeight = viewport?.height;

      console.log('\n--- handleResize()');
      console.log('viewportHeight:', viewportHeight);

      // document.documentElement.style.height = viewportHeight + 'px';
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (<>
    <aside className={styles.aside}>
      <div className={styles.asideHeader} />
      <input className={styles.input} />
      <input className={styles.input} />
      <input className={styles.input} />
      <input className={styles.input} />
      <div className={styles.asideFooter} />
    </aside>

    <main className={styles.main}>
      <div className={styles.mainHeader}>
        Title
      </div>
      <div className={styles.content}>
        {content}
      </div>
    </main>
  </>);
}

export default Demo;