import styles from './AssociatedNDCs.module.css';

export const AssociatedNDCs = ({ndcs}: {ndcs: string[]}) => {
  return (
    <div className={styles.NDCs}>
      <span className={styles.associated}>Associated NDCs</span>
      <ul>
        {ndcs.map((ndc: string) => {
          return <li key={ndc}>{ndc}</li>;
        })}
      </ul>
    </div>
  );
};
