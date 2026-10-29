import type { Metadata } from "next";
import Opening from "@/components/Opening";
import Footer from "@/components/Footer";
import styles from "../mentions-legales/mentions.module.css";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  robots: { index: false },
};

/** Un bloc d'article : paragraphe, liste à puces, ou intertitre (numéro + titre). */
type Bloc = string | string[] | { sous: string };

const IDENTIFICATION = [
  "STUDIO LIXIVEL – Cindy Lixivel, architecte d’intérieur",
  "Adresse : 9 rue de renard, 76000 Rouen",
  "SIRET : 912 330 453",
  "Email : assistante@studiolixivel.com",
];

const MEDIATION_INTRO =
  "Conformément aux articles L.612-1 et suivants du Code de la consommation, tout client consommateur peut recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d’un litige.";

const MEDIATEUR = "Médiateur désigné : ANM Conso, 2 rue de Colmar – 94300 Vincennes. Site : ANMconso.com";

const ARTICLES: { titre: string; blocs: Bloc[] }[] = [
  {
    titre: "Article 1 – Champ d’application et acceptation des conditions générales",
    blocs: [
      "Les présentes conditions générales de vente (ci-après « CGV ») régissent l’ensemble des prestations fournies par Cindy Lixivel, architecte d’intérieur, exerçant sous le nom commercial STUDIO LIXIVEL (ci-après « le Prestataire »), et sont applicables à tous les clients particuliers (ci-après « le Client »).",
      "Les prestations peuvent inclure, selon les termes du devis : conseil, conception (agencement, décoration, aménagement intérieur), rendus et documents, et le cas échéant une mission complète ou partielle d’architecte d’intérieur (conception et/ou direction de l’exécution des contrats de travaux), exclusivement pour l’aménagement intérieur et l’agencement des ouvrages, sans intervention sur la structure de la construction.",
      "Les présentes CGV sont systématiquement communiquées au Client préalablement à la signature du devis. En engageant les services du Prestataire, le Client reconnaît avoir pris connaissance et accepté sans réserve les présentes conditions.",
      "Aucune condition particulière ne peut, sauf acceptation formelle et écrite du Prestataire, prévaloir contre les présentes CGV.",
    ],
  },
  {
    titre: "Article 2 – Objet et contenu de la prestation",
    blocs: [
      "La prestation comprend exclusivement les services et articles explicitement listés dans le champ « Éléments » ou « Services » du devis signé. De façon corollaire, elle ne comprend pas ce qui n’y est pas expressément mentionné.",
      { sous: "2.1 – Délais d’exécution" },
      "Les délais de réalisation sont habituellement compris entre 1 et 12 mois selon la nature de la prestation.",
      "Pour les prestations incluant, lorsque cela est expressément prévu au devis, une mission de direction de l’exécution des contrats de travaux et/ou de coordination des entreprises, aucun délai ferme ne peut être garanti, la durée dépendant de la disponibilité et de l’intervention des artisans et entreprises tiers.",
      "Les délais communiqués sont donnés à titre indicatif. Toute modification demandée par le Client en cours de prestation est susceptible d’entraîner un allongement des délais initialement prévus.",
      "Le Prestataire ne saurait être tenu responsable des retards imputables à des tiers (artisans, fournisseurs, administrations) ou à des circonstances indépendantes de sa volonté. En cas de dépassement des délais, aucun remboursement ni indemnité ne pourra être réclamé au titre de ce dépassement.",
      "Il est vivement recommandé au Client de solliciter les services du Prestataire suffisamment en amont afin d’éviter toute pression temporelle excessive.",
      "Le Prestataire s’engage à mettre en œuvre tous les moyens nécessaires pour satisfaire le Client dans les meilleures conditions.",
      { sous: "2.2 – Limites de mission (structure / clos et couvert)" },
      "Les prestations du Prestataire, y compris lorsqu’elles incluent une mission complète ou partielle d’architecte d’intérieur et/ou une direction de l’exécution des contrats de travaux, sont strictement limitées aux travaux d’aménagement intérieur et d’agencement.",
      "Elles excluent toute intervention, étude, prescription ou validation portant sur la structure du bâtiment ainsi que sur le clos et couvert (fondations, murs porteurs, planchers porteurs, charpente, façade, toiture, étanchéité, etc.).",
      "Si le projet nécessite une intervention sur un élément porteur ou structurel, le Client devra missionner un professionnel compétent, notamment un bureau d’études structure. Le Prestataire n’assure ni l’étude, ni le dimensionnement, ni la validation technique de ces interventions. Les plans d’aménagement intérieur seront, le cas échéant, adaptés sur la base des études, prescriptions et validations transmises par le professionnel compétent.",
      "Toute modification du projet résultant des conclusions du bureau d’études pourra entraîner une adaptation des plans et, si elle dépasse le périmètre initialement convenu, faire l’objet d’une facturation complémentaire.",
    ],
  },
  {
    titre: "Article 3 – Devis et tarifs",
    blocs: [
      "Les tarifs applicables sont ceux figurant sur le devis signé par le Client. Ils sont exprimés en euros, toutes taxes comprises (TTC).",
      "Le Prestataire se réserve le droit de modifier ses tarifs à tout moment. Toutefois, les tarifs applicables au Client sont ceux en vigueur au jour de la signature du devis, sous réserve de modifications substantielles du projet demandées par le Client.",
      "Les prestations sont facturées conformément aux modalités définies à l’article 4.",
      { sous: "Durée de validité du devis" },
      "Le devis est valable pendant une durée de trente (30) jours à compter de sa date d’émission. À défaut d’acceptation dans ce délai, le Prestataire ne sera plus tenu de maintenir les prix, délais et conditions qui y figurent et pourra établir un nouveau devis.",
      "La signature du devis par le Client vaut acceptation de l’offre et conclusion du contrat.",
      "Lorsque le démarrage de la prestation est conditionné au versement d’un premier acompte, celui-ci devra intervenir dans un délai maximum de trente (30) jours suivant la signature du devis. À défaut, les conditions de réalisation, délais et disponibilités initialement prévus pourront être révisés et, si nécessaire, faire l’objet d’un nouveau devis ou d’un avenant.",
    ],
  },
  {
    titre: "Article 4 – Modalités et échéances de paiement",
    blocs: [
      { sous: "4.1 – Paiement échelonné (prestation standard)" },
      "Sauf mention contraire sur le devis, le paiement des prestations s’effectue selon l’échéancier suivant :",
      [
        "40 % à la signature du devis/contrat (acompte)",
        "40 % à la validation des plans d’agencement",
        "20 % à la validation des plans de décoration et avant la remise du dossier complet",
      ],
      "La poursuite de la prestation est conditionnée au versement de chaque échéance dans les délais prévus.",
      "Sauf mention contraire expresse, les sommes versées ont la nature d’acomptes (et non d’arrhes).",
      { sous: "4.2 – Paiement comptant (cas particuliers)" },
      "En cas de collaboration ponctuelle ou de prestation d’agencement uniquement, le solde total peut être exigible à la signature du devis, selon mention expresse sur celui-ci.",
      { sous: "4.3 – Moyens de paiement acceptés" },
      ["Virement bancaire", "Espèces (dans la limite légale en vigueur)", "Chèque"],
      "Aucun escompte n’est accordé en cas de paiement anticipé.",
      { sous: "4.4 – Retard de paiement" },
      "Toute somme non payée à son échéance permet au Prestataire de suspendre l’exécution des prestations jusqu’au règlement complet, sans que cela ne puisse être considéré comme une annulation imputable au Prestataire.",
      "Client consommateur / non-professionnel : en cas de retard de paiement et après mise en demeure restée infructueuse, des intérêts de retard pourront être dus au taux d’intérêt légal. Les éventuels frais de recouvrement ne pourront être réclamés au Client que dans les conditions et limites prévues par la loi.",
    ],
  },
  {
    titre: "Article 5 – Responsabilités et limitations",
    blocs: [
      { sous: "5.1 – Engagements du Prestataire" },
      "Le Prestataire s’engage à fournir ses prestations conformément aux règles de l’art et aux normes professionnelles en vigueur, ainsi qu’aux termes du devis signé.",
      "Sauf stipulation contraire expresse au devis, le Prestataire est tenu à une obligation de moyens.",
      "Les prestations sont réalisées dans le respect des DTU et des normes techniques applicables, dans la limite du périmètre de mission confié et des informations communiquées par le Client.",
      { sous: "5.2 – Limitation et périmètre de responsabilité" },
      "Sous réserve des dispositions légales d’ordre public applicables, notamment celles relatives à la protection du consommateur et, le cas échéant, à la responsabilité décennale, la responsabilité du Prestataire est limitée aux dommages directs prouvés résultant d’une faute dans l’exécution de sa mission, telle que définie au devis (conseil, conception, documents, coordination ou suivi selon la prestation souscrite).",
      "Ne sont notamment pas couverts :",
      [
        "les dommages indirects (préjudice commercial, perte d’exploitation, perte de chance, etc.) ;",
        "les retards, défauts, surcoûts ou dommages imputables à des tiers (artisans, entreprises, fournisseurs, administrations), sous réserve qu’ils ne résultent pas d’une faute imputable au Prestataire ;",
        "les conséquences liées à des décisions prises par le Client en dehors des préconisations validées, ou à des modifications du projet non formalisées par écrit (avenant ou nouveau devis).",
      ],
      "Lorsque le Prestataire intervient dans le cadre d’une mission d’accompagnement et de coordination des intervenants pendant la phase de réalisation, il n’exécute pas lui-même les travaux et n’assure pas la direction technique des entreprises. Les artisans et entreprises demeurent responsables de leurs méthodes et choix techniques d’exécution, de la conformité de leurs ouvrages, du respect des règles de l’art et des normes applicables, de leurs obligations d’assurance ainsi que des règles de sécurité relevant de leur intervention.",
      { sous: "5.3 – Prestations à distance – limites de mission et responsabilité" },
      "Dans le cadre des prestations réalisées à distance, le Prestataire élabore et présente au Client des propositions d’agencement, d’aménagement et de décoration sur la base des informations, dimensions, plans, photographies et documents communiqués par le Client. Le Prestataire n’effectuant aucune visite sur site, il ne peut vérifier sur place la faisabilité technique, structurelle, réglementaire ou matérielle des solutions proposées. Il appartient en conséquence au Client de faire vérifier, avant toute validation définitive, commande ou réalisation, la faisabilité des propositions par les professionnels compétents chargés de l’exécution des travaux ou aménagements (artisans, entreprises, bureaux d’études, etc.).",
      "La validation par le Client d’une proposition emporte acceptation du projet de conception présenté, sous réserve des vérifications techniques et des ajustements éventuellement nécessaires à sa réalisation.",
      "Les artisans, entreprises et autres professionnels intervenant dans la réalisation du projet demeurent responsables, dans le cadre de leurs propres missions, de la vérification des cotes et contraintes existantes, de la faisabilité technique des solutions retenues, du choix de leurs méthodes de mise en œuvre, du respect des règles de l’art et des normes applicables ainsi que de la bonne exécution des travaux et des adaptations techniques rendues nécessaires en cours de réalisation.",
      "Le Prestataire ne saurait être tenu responsable des erreurs, impossibilités techniques, contraintes de chantier ou difficultés d’exécution qui ne pouvaient raisonnablement être identifiées dans le cadre d’une prestation réalisée exclusivement à distance et sur la base des informations et documents communiqués par le Client, sous réserve des fautes directement imputables au Prestataire dans l’exécution de sa propre mission.",
      "Toute demande de modification du projet après validation par le Client pourra donner lieu à une facturation complémentaire, après information préalable du Client.",
      { sous: "5.4 – Assurance décennale des artisans / entreprises" },
      "En cas de travaux, il appartient au Client de vérifier que chaque artisan ou entreprise intervenante dispose d’une assurance de responsabilité civile décennale en cours de validité (et, le cas échéant, d’une RC Pro), couvrant la nature exacte des travaux réalisés.",
      "Dans le cadre des missions incluant une coordination et/ou direction de l’exécution des contrats de travaux, le Client s’engage à obtenir et vérifier les attestations d’assurance décennale de chaque entreprise avant le démarrage des travaux, et à en conserver une copie. Le Prestataire pourra demander la communication de ces attestations avant le démarrage du chantier. À défaut, le Prestataire pourra suspendre sa mission de suivi/coordination jusqu’à régularisation.",
      "Le Prestataire ne peut en aucun cas être tenu responsable des conséquences résultant de l’absence, de l’insuffisance ou de l’inadéquation de garantie de la part des artisans ou entreprises intervenus sur le chantier.",
      { sous: "5.5 – Force majeure" },
      "Le Prestataire ne saurait être tenu responsable de l’inexécution ou du retard dans l’exécution de ses obligations en cas de force majeure ou de circonstances indépendantes de sa volonté, telles que notamment : catastrophe naturelle, incendie, inondation, grève, pandémie, défaillance des réseaux de télécommunication, défaillance d’un fournisseur ou co-traitant essentiel.",
    ],
  },
  {
    titre: "Article 6 – Assurances (RC Pro / RCD / information DO)",
    blocs: [
      { sous: "6.1 – Assurance Responsabilité Civile Professionnelle (RC Pro)" },
      "Le Prestataire déclare être titulaire d’une assurance Responsabilité Civile Professionnelle couvrant les activités et missions exercées dans le cadre du présent contrat, dans les limites et conditions de la police souscrite.",
      "L’attestation d’assurance en vigueur ainsi que les références du contrat peuvent être communiquées au Client sur demande.",
      { sous: "6.2 – Assurance Responsabilité Civile Décennale (RCD) – lorsque la mission le requiert" },
      "Lorsque la mission confiée au Prestataire est susceptible d’engager sa responsabilité décennale, le Prestataire déclare être couvert par une assurance Responsabilité Civile Décennale pour les seules activités et missions déclarées et garanties par le contrat d’assurance.",
      "La portée de cette garantie dépend notamment de la nature de la mission confiée, des activités ou missions garanties, de la période de validité, du périmètre géographique ainsi que des autres conditions figurant sur l’attestation d’assurance.",
      "Lorsque la mission est soumise à l’obligation d’assurance décennale, l’attestation d’assurance en vigueur est jointe au devis et à la facture conformément aux dispositions légales applicables.",
      "Les assurances du Prestataire ne se substituent pas aux assurances propres des artisans, entreprises et autres intervenants, qui demeurent responsables des travaux qu’ils exécutent et doivent disposer des assurances requises pour leurs activités.",
      { sous: "6.3 – Assurance dommages-ouvrage (information du Client)" },
      "Lorsque les travaux envisagés sont soumis à l’obligation d’assurance dommages-ouvrage, le Client, en sa qualité de maître d’ouvrage, est informé qu’il lui appartient de souscrire cette assurance avant l’ouverture du chantier, conformément aux dispositions légales applicables.",
      { sous: "6.4 – Sous-traitance" },
      "En cas de recours à la sous-traitance, le Prestataire pourra exiger du sous-traitant les attestations d’assurance RC professionnelle et, le cas échéant, RC décennale, couvrant strictement les activités réellement sous-traitées pendant la période d’intervention. À défaut de production de ces justificatifs, le Prestataire pourra refuser le recours au sous-traitant concerné ou suspendre la mission dans l’attente de conformité.",
    ],
  },
  {
    titre: "Article 7 – Modifications et annulations",
    blocs: [
      { sous: "7.1 – Modifications du projet" },
      "Toute modification ou ajout aux prestations initialement convenues doit faire l’objet d’un accord écrit entre les parties (avenant au contrat ou nouveau devis).",
      "Des frais supplémentaires seront facturés en cas de modifications substantielles apportées au projet initial, proportionnellement au temps et aux ressources supplémentaires engagés.",
      { sous: "7.2 – Annulation par le Client (hors droit de rétractation)" },
      "En cas d’annulation de la prestation par le Client après signature du devis (et hors droit de rétractation prévu à l’article 12 lorsqu’il est applicable) :",
      [
        "les sommes déjà versées restent acquises au Prestataire à hauteur des prestations déjà réalisées et des frais engagés (déplacements, achats, réservations, temps de conception, etc.) ;",
        "si les prestations réalisées et/ou frais engagés excèdent les sommes déjà versées, le Prestataire pourra facturer le complément correspondant, sur justificatifs et/ou selon l’avancement.",
      ],
      "Les sommes déjà versées pourront être conservées par le Prestataire à due concurrence des prestations réalisées et des frais effectivement engagés.",
    ],
  },
  {
    titre: "Article 8 – Propriété intellectuelle",
    blocs: [
      { sous: "8.1 – Titularité des droits" },
      "Tous les droits de propriété intellectuelle relatifs aux prestations réalisées par le Prestataire, notamment les dessins, plans, croquis, planches tendances, documents techniques, moodboards, rendus 3D et tout autre élément créatif, demeurent la propriété exclusive du Prestataire, sauf cession expresse et écrite des droits.",
      { sous: "8.2 – Droits moraux" },
      "Conformément aux dispositions applicables du Code de la propriété intellectuelle, le droit moral attaché aux créations du Prestataire (comprenant notamment le droit au respect de l’œuvre et le droit au respect du nom de l’auteur) reste attaché au Prestataire de manière perpétuelle, inaliénable et imprescriptible.",
      { sous: "8.3 – Interdiction de reproduction" },
      "Toute représentation, reproduction, adaptation, traduction ou transformation, intégrale ou partielle, réalisée sans le consentement écrit préalable du Prestataire est illicite.",
      { sous: "8.4 – Droit de publicité et de référence" },
      "Le Prestataire se réserve le droit de mentionner la réalisation effectuée pour le Client comme référence commerciale et de diffuser des extraits textuels ou iconographiques des œuvres concernées dans le strict cadre de :",
      ["sa prospection commerciale ;", "sa communication externe (site internet, réseaux sociaux, portfolio) ;", "ses supports publicitaires."],
      "Toute réserve du Client au droit de publicité du Prestataire devra être expressément notifiée et négociée avant la signature du devis, et mentionnée sur la facture.",
      { sous: "8.5 – Responsabilité du Client quant aux contenus fournis" },
      "Le Client est responsable des contenus textuels, photographiques, graphiques ou plus généralement de tout élément qu’il fournit au Prestataire dans le cadre de la mission.",
      "Le Client déclare disposer des droits et autorisations nécessaires permettant l’utilisation de ces éléments pour les besoins du projet.",
      "Il garantit le Prestataire contre toute réclamation ou action d’un tiers fondée sur une atteinte aux droits attachés aux éléments qu’il a lui-même fournis, sous réserve qu’aucune faute ne soit imputable au Prestataire dans l’utilisation qui en est faite.",
    ],
  },
  {
    titre: "Article 9 – Confidentialité",
    blocs: [
      { sous: "9.1 – Engagement de confidentialité" },
      "Le Prestataire s’engage à respecter la confidentialité des informations et documents communiqués par le Client dans le cadre de la prestation, notamment :",
      ["les plans et caractéristiques du bien immobilier ;", "les informations personnelles et coordonnées ;", "les éléments budgétaires."],
      "Ces informations ne seront pas divulguées à des tiers sans autorisation préalable écrite du Client, sauf obligation légale ou judiciaire.",
      { sous: "9.2 – Diffusion sur les réseaux sociaux" },
      "Sauf opposition écrite du Client formulée avant la diffusion des contenus, le Prestataire se réserve le droit d’utiliser les photographies, visuels, plans, rendus 3D ou tout autre élément du projet à des fins de communication, de promotion et de valorisation de son activité.",
      "Cette utilisation sera effectuée dans le respect de la vie privée du Client. Aucune donnée personnelle permettant son identification (nom, prénom, adresse, coordonnées, informations confidentielles ou tout autre élément à caractère personnel) ne sera communiquée sans son accord exprès. Les contenus diffusés auront uniquement pour objet de présenter le savoir-faire et les réalisations professionnelles.",
    ],
  },
  {
    titre: "Article 10 – Réception, livraison et réclamations",
    blocs: [
      { sous: "10.1 – Réception" },
      "Lorsque le Prestataire assure une mission de coordination des artisans, il peut assister le Client lors des opérations de réception avec les entreprises concernées.",
      { sous: "10.2 – Vérification" },
      "Il appartient au Client de vérifier la conformité des travaux effectués et/ou des livrables dans les meilleurs délais suivant leur achèvement/réception et d’informer le Prestataire par écrit de toute non-conformité constatée.",
      { sous: "10.3 – Délai de réclamation" },
      "Toute réclamation concernant les prestations fournies par le Prestataire doit être notifiée par écrit dans un délai maximum de 30 jours à compter de la livraison du dossier et/ou de la réception des travaux lorsque le Prestataire a une mission de coordination.",
      "L’absence de réclamation dans ce délai vaut acceptation des éléments apparents et aisément décelables, sans préjudice des garanties légales, responsabilités d’ordre public ou droits dont le Client pourrait se prévaloir ultérieurement.",
    ],
  },
  {
    titre: "Article 11 – Règlement des litiges",
    blocs: [
      { sous: "11.1 – Résolution amiable" },
      "En cas de désaccord persistant, les parties s’engagent à rechercher une solution amiable avant toute action judiciaire.",
      { sous: "11.2 – Médiation conventionnelle" },
      "Les parties peuvent recourir à une médiation conventionnelle. Les frais de médiation seront partagés à parts égales entre les parties, sauf accord contraire.",
      { sous: "11.3 – Médiation de la consommation (Clients consommateurs)" },
      "Le Client consommateur (personne physique agissant à des fins non professionnelles) a la possibilité de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable du litige.",
      "Médiateur désigné : ANM conso, 2 rue de Colmar, 94300 Vincennes. Site / contact : ANMconso.com",
      { sous: "11.4 – Juridiction compétente" },
      "Pour les Clients consommateurs : à défaut de résolution amiable, les règles légales de compétence s’appliqueront.",
      "À défaut de résolution amiable, les juridictions de Rouen pourront être compétentes conformément aux règles légales de compétence territoriale, sans préjudice du droit du Client consommateur de saisir toute autre juridiction légalement compétente.",
    ],
  },
  {
    titre: "Article 12 – Droit de rétractation (Clients consommateurs)",
    blocs: [
      "Conformément aux dispositions du Code de la consommation, lorsque le contrat est conclu à distance, à la suite d’un démarchage téléphonique ou hors établissement, le Client consommateur dispose d’un délai de quatorze (14) jours à compter de la signature du devis, laquelle vaut conclusion du contrat, pour exercer son droit de rétractation, sans avoir à motiver sa décision ni à supporter d’autres coûts que ceux prévus par la loi.",
      "Le Client peut exercer son droit de rétractation avant l’expiration de ce délai par toute déclaration écrite, dénuée d’ambiguïté, exprimant sa volonté de se rétracter et adressée aux coordonnées du Prestataire figurant au contrat.",
      "Lorsque le Client souhaite que l’exécution de la prestation commence avant l’expiration du délai légal de rétractation, le Prestataire recueille sa demande expresse. Cette demande est notamment matérialisée par la mention spécifique figurant sur le devis, acceptée par le Client lors de sa signature.",
      "Si le Client exerce son droit de rétractation après le commencement de la prestation, mais avant son exécution complète, il reste redevable d’un montant correspondant au service effectivement fourni jusqu’à la communication de sa décision de se rétracter. Ce montant est proportionnel au prix total convenu au contrat. Aucune somme n’est due à ce titre si la demande expresse de commencement anticipé n’a pas été valablement recueillie ou si l’information légale correspondante n’a pas été fournie.",
      "Le Client reconnaît également que, lorsque la prestation a été pleinement exécutée avant l’expiration du délai de quatorze (14) jours, après sa demande expresse de commencement anticipé et sa reconnaissance préalable de la perte de son droit de rétractation, il ne pourra plus exercer ce droit.",
      "En cas de rétractation valablement exercée alors qu’aucune prestation n’a encore été commencée, le Prestataire rembourse au Client l’intégralité des sommes versées, dans les conditions prévues par les textes applicables.",
    ],
  },
  {
    titre: "Article 13 – Protection des données personnelles (RGPD)",
    blocs: [
      "Le Prestataire collecte et traite les données personnelles du Client pour les finalités suivantes : gestion des demandes, établissement des devis, exécution de la mission, facturation, comptabilité, communication liée au projet.",
      "Les données sont destinées uniquement au Prestataire et, le cas échéant, aux prestataires strictement nécessaires (ex. : outils de facturation, hébergeur), et/ou aux entreprises intervenant sur le projet si nécessaire à l’exécution (ex. : transmission d’un plan à un artisan), dans la limite de ce qui est utile.",
      "Le Client dispose de droits d’accès, de rectification, d’opposition, de limitation et d’effacement dans les conditions prévues par la réglementation applicable. Pour exercer ses droits : assistante@studiolixivel.com.",
    ],
  },
  {
    titre: "Article 14 – Disponibilités et modalités de contact",
    blocs: [
      { sous: "14.1 – Horaires et canaux de communication" },
      "Le Prestataire est joignable par message WhatsApp du lundi au vendredi, de 9h00 à 19h30. Aucune réponse n’est assurée après 19h30, les sollicitations étant traitées le jour ouvré suivant.",
      "Le Prestataire n’est joignable par téléphone que sur rendez-vous préalablement convenu. Les échanges téléphoniques peuvent être organisés sur rendez-vous, selon les disponibilités du Prestataire.",
      { sous: "14.2 – Échanges écrits et WhatsApp" },
      "Les échanges relatifs au projet doivent être adressés par écrit, notamment par email à l’adresse assistante@studiolixivel.com.",
      "Afin d’assurer un traitement efficace et une bonne traçabilité des échanges, le Client s’engage à privilégier les emails pour toute information importante relative au projet.",
      "WhatsApp est réservé aux échanges courants et ne doit pas être utilisé pour transmettre ou valider des éléments importants du projet, notamment les validations de plans, choix définitifs, modifications de prestation, demandes ayant une incidence sur le budget, le planning ou l’exécution des travaux. Ces éléments doivent impérativement être confirmés par email pour être pris en compte contractuellement.",
      { sous: "14.3 – Contact administratif" },
      "Pour toute demande administrative, prise d’information ou suivi de dossier, le Client peut contacter l’assistante du Prestataire : assistante@studiolixivel.com.",
      { sous: "14.4 – Délais de réponse" },
      "Le Prestataire gère simultanément plusieurs projets et ne peut être disponible à tout moment. Il s’engage à répondre dans des délais raisonnables, proportionnés à la nature de la demande, à son niveau d’urgence et à l’organisation du planning. Les urgences non prévues par la mission initiale pourront nécessiter un allongement des délais ou donner lieu à une facturation complémentaire.",
    ],
  },
  {
    titre: "Article 15 – Perception réaliste du résultat et diffusion des projets",
    blocs: [
      { sous: "15.1 – Projets présentés sur les réseaux sociaux" },
      "Le Client reconnaît que les contenus présentés par le Prestataire sur ses réseaux sociaux (Instagram, Facebook, site internet, etc.) constituent une sélection de projets valorisés, généralement réalisés avec des budgets permettant des prestations haut de gamme.",
      { sous: "15.2 – Variables influençant le résultat final" },
      "Le Prestataire attire l’attention du Client sur le fait que le rendu final dépend de multiples facteurs : budget réellement alloué, matériaux et finitions choisis, contraintes techniques du lieu (configuration, état, réglementations), limites et choix fixés par le Client.",
      { sous: "15.3 – Acceptation d’un résultat adapté" },
      "Le Client comprend et accepte que le résultat obtenu pourra être différent des projets présentés lorsque les conditions financières, techniques ou matérielles ne sont pas identiques. Le Prestataire s’engage néanmoins à fournir une prestation de qualité adaptée au budget et aux contraintes du Client.",
    ],
  },
  {
    titre: "Article 16 – Organisation de l’activité, cadre des échanges et présence de tiers",
    blocs: [
      { sous: "16.1 – Connaissance du Prestataire" },
      "Le Client reconnaît avoir pris connaissance du parcours professionnel et personnel du Prestataire, tel que présenté sur les supports de communication de Studio Lixivel (site web, réseaux sociaux notamment Instagram), y compris son engagement professionnel, sa créativité, ainsi que son identité revendiquée de cheffe d’entreprise et de maman, éléments qui participent à l’image de marque et au choix du Client de recourir à ses services.",
      { sous: "16.2 – Modalités de réalisation des échanges" },
      "Le Prestataire exerce une partie de son activité en télétravail depuis son bureau professionnel. Les rendez-vous en visioconférence, appels téléphoniques ou échanges à distance peuvent être organisés depuis ce cadre.",
      "Dans ce contexte, le Client est expressément informé et accepte que la présence occasionnelle et non intrusive d’enfants ou de tiers du foyer puisse être perceptible (bruit de fond temporaire, apparition brève à l’image), sans que cela ne constitue un manquement au professionnalisme ni un défaut d’exécution.",
      { sous: "16.3 – Visites et déplacements professionnels" },
      "Lors des déplacements ou rendez-vous en présentiel, le Prestataire s’engage à garantir un cadre strictement professionnel. La présence d’un tiers ne pourra intervenir qu’à condition qu’elle soit non intrusive et n’affecte ni la confidentialité ni la qualité de l’échange.",
      { sous: "16.4 – Maintien du professionnalisme" },
      "Cette organisation n’affecte en aucun cas la confidentialité, la qualité contractuelle ou l’exécution des prestations. Le Prestataire s’engage à assurer un cadre professionnel adapté lors de tous les échanges avec le Client.",
    ],
  },
  {
    titre: "Article 17 – Modification des CGV",
    blocs: [
      "Le Prestataire se réserve le droit de modifier les présentes CGV à tout moment.",
      "Les CGV applicables sont celles en vigueur à la date de signature du devis par le Client.",
      "Toute modification ultérieure ne s’appliquera pas aux contrats en cours d’exécution, sauf accord exprès des deux parties.",
    ],
  },
  {
    titre: "Article 18 – Droit applicable",
    blocs: ["Droit français – langue française."],
  },
  {
    titre: "Article 19 – Acceptation",
    blocs: [
      "La signature du devis par le Client vaut acceptation pleine et entière des présentes CGV, sans restriction ni réserve.",
      "Le Client reconnaît avoir reçu communication des présentes CGV préalablement à la signature du devis et avoir eu la possibilité d’en prendre connaissance.",
      "En cas de contestation, les documents contractuels (devis, CGV, avenants, échanges écrits) feront foi et prévaudront sur tout échange verbal antérieur ou postérieur.",
    ],
  },
  {
    titre: "Article 20 – Divisibilité",
    blocs: [
      "La nullité éventuelle d’une clause des présentes CGV n’affectera pas la validité des autres clauses, qui demeureront applicables.",
    ],
  },
];

function rendreBloc(bloc: Bloc, i: number) {
  if (typeof bloc === "string") return <p key={i}>{bloc}</p>;
  if (Array.isArray(bloc)) {
    return (
      <ul key={i} className="plus-list">
        {bloc.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    );
  }
  return (
    <h3 key={i} className="t-carte">
      {bloc.sous}
    </h3>
  );
}

export default function CgvPage() {
  return (
    <>
      <Opening tone="doux" title="Conditions générales de vente" surtitre="Version V2026-05 Part. · 28/09/2026" />
      <main id="contenu" className={styles.main}>
        <section className={`split ${styles.bloc}`}>
          <h2 className="t-accordeon">Identification</h2>
          <div className="col-2--wide t-article">
            {IDENTIFICATION.map((ligne) => (
              <p key={ligne}>{ligne}</p>
            ))}
          </div>
        </section>

        <section className={`split ${styles.bloc}`}>
          <h2 className="t-accordeon">Médiation de la consommation</h2>
          <div className="col-2--wide t-article">
            <p>{MEDIATION_INTRO}</p>
            <p>{MEDIATEUR}</p>
          </div>
        </section>

        {ARTICLES.map((a) => (
          <section key={a.titre} className={`split ${styles.bloc}`}>
            <h2 className="t-accordeon">{a.titre}</h2>
            <div className="col-2--wide t-article">{a.blocs.map(rendreBloc)}</div>
          </section>
        ))}
      </main>
      <Footer source="footer-cgv" />
    </>
  );
}
