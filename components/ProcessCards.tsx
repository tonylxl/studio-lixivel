import { ETAPES } from "@/data/services";
import SettleCard from "./SettleCard";
import styles from "./ProcessCards.module.css";

/** Rotations (−9° à +9°) et décalages de départ : comme des meubles posés en vrac. */
const DEPART = [
  { rotate: -9, y: 70 },
  { rotate: 6, y: 20 },
  { rotate: -4, y: 110 },
  { rotate: 9, y: 50 },
];

/** Les 4 étapes : les cartes arrivent en désordre et se rangent au fil du scroll. */
export default function ProcessCards() {
  return (
    <ol className={styles.grid}>
      {ETAPES.map((e, i) => (
        <SettleCard key={e.titre} index={i} {...DEPART[i]} className={styles.card} data-couleur={e.couleur}>
          <span className={`t-xxl ${styles.num}`}>0{i + 1}</span>
          <div className={styles.text}>
            <h3 className="t-accordeon">{e.titre}</h3>
            <p className="t-serre">{e.texte}</p>
          </div>
        </SettleCard>
      ))}
    </ol>
  );
}
