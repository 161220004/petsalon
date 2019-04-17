import Link from 'umi/link';
import styles from './index.css';

export default () =>
  <div className={styles.normal}>
      <h1 className={styles.bigbold}>Welcome to Petsalon !</h1>
      <br />
    <ul className={styles.list}>
      <h3>Pages</h3>
      <li><Link to="/owners">Owners</Link></li>
      <li><Link to="/pets">Pets</Link></li>
      <li><Link to="/service">Service</Link></li>
    </ul>
  </div>
