import './common.scss';
import styles from './Demo.module.scss';

import React, { useEffect } from 'react';

const Demo = () => {
  const description = Array(2)
    .fill('description')
    .map((t, i) => <p key={i} className={styles.description}>{i + 1} {t}</p>);

  const text = Array(40)
    .fill('text')
    .map((t, i) => <p key={i}>{i + 1} {t}</p>);

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
      <div className={styles.title}>
        Title
      </div>

      <div className={styles.content}>
        {description}

        <div className={styles.toolbar}>
          Toolbar
        </div>

        <input className={styles.input} />
        {text}
        <input className={styles.input} />
      </div>
    </main>
  </>);
}

export default Demo;