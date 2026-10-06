import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Balise du titre (h2 par défaut). */
  as?: "h1" | "h2";
  plain?: boolean;
  className?: string;
};

/** En-tête de section : filet en haut, titre à gauche, texte ou lien à partir du milieu. */
export default function SectionHead({ title, children, id, as = "h2", plain, className }: Props) {
  const Title = as;
  return (
    <div className={`section-head split ${plain ? "section-head--plain" : ""} ${className ?? ""}`}>
      <Title id={id} className="t-section">
        {title}
      </Title>
      {children && <div className="col-2 t-serre c-2">{children}</div>}
    </div>
  );
}
