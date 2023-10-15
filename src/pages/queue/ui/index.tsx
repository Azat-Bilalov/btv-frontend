import styles from './index.module.scss';

export const Queue: React.FC = () => {
  const queue = localStorage.getItem('queue');

  if (!queue) return null;

  const address = localStorage.getItem('officeAddress');
  const qrCodeUrl = JSON.parse(queue)['qrCodeUrl'];

  if (!qrCodeUrl) return null;

  return (
    <div className={styles.queue}>
      <h2>Моя очередь</h2>
      <img src={qrCodeUrl} />
      <h3>Адрес</h3>
      <p>{address}</p>
    </div>
  );
};
