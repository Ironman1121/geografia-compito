import React, { useRef } from 'react';
import ItineraryDay from './ItineraryDay';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ────────────────────────────────────────────────────────
   7 giorni molto dettagliati, ciascuno con elementi unici
   ──────────────────────────────────────────────────────── */
const itineraryData = [
  {
    dayNum: 1,
    city: "ROMA",
    title: "Roma — La Città Eterna",
    accentColor: "#b5191e",       // Roma Red
    emoji: "🏟️",
    tagline: "Due millenni di storia sotto i tuoi piedi",
    description:
      "Roma non si visita, si vive. Fondata — secondo la leggenda — da Romolo nel 753 a.C., custodisce oltre 2.000 anni di arte, potere e religione in ogni vicolo del suo centro storico.",
    image: "./images/roma.jpg",
    morningActivities: [
      "Ore 8:00 — Visita guidata al Colosseo (evita le code con biglietto prioritario € 16)",
      "Ore 10:00 — Fori Imperiali e Campidoglio: percorso tra via Sacra e l'arco di Tito",
      "Ore 11:30 — Salita al Palatino, la collina dei Cesari con vista panoramica su Roma antica",
    ],
    afternoonActivities: [
      "Ore 13:00 — Pranzo al Campo de' Fiori con supplì di riso fritto al pomodoro",
      "Ore 14:30 — Pantheon (entrata gratuita), il tempio perfetto del 125 d.C.",
      "Ore 16:00 — Fontana di Trevi: lancia la moneta e assaggia un gelato artigianale da Giolitti",
      "Ore 17:30 — Passeggiata lungo via Condotti & Villa Borghese al tramonto",
    ],
    eveningActivities: [
      "Ore 19:30 — Aperitivo nel quartiere Prati con prosecco e bruschette",
      "Ore 21:00 — Cena a Trastevere: Carbonara autentica (guanciale, pecorino, tuorlo, pepe nero)",
    ],
    uniqueElement: {
      label: "✦ Esperienza Unica",
      text: "Tour serale \"Roma sotto le Stelle\" nei Fori: i monumenti illuminati creano un'atmosfera mozzafiato che di giorno è impossibile da vivere."
    },
    facts: ["Roma ha 2,8 milioni di abitanti", "Contiene circa 900 chiese", "Il Colosseo ospitava 50.000 spettatori"],
  },

  {
    dayNum: 2,
    city: "FIRENZE",
    title: "Firenze — Culla del Rinascimento",
    accentColor: "#c8860a",       // Tuscan Gold
    emoji: "🎨",
    tagline: "Dove nasce la bellezza che il mondo conosce come Arte",
    description:
      "Firenze è la città di Dante, di Leonardo e di Michelangelo. Capoluogo della Toscana, è circondata da colline ricoperte di vigneti e olivi. Il centro storico è Patrimonio UNESCO dal 1982.",
    image: "./images/firenze.jpg",
    morningActivities: [
      "Ore 8:30 — Galleria degli Uffizi: ammira La Nascita di Venere di Botticelli (€ 20, prenotare online)",
      "Ore 11:00 — Tour del Corridoio Vasariano (su prenotazione, visita esclusiva)",
      "Ore 12:00 — Visita alla Galleria dell'Accademia: il David di Michelangelo in tutto il suo splendore",
    ],
    afternoonActivities: [
      "Ore 13:30 — Trattoria dei Fagioli: ribollita toscana e bistecca alla fiorentina (600 g, T-bone di Chianina)",
      "Ore 15:00 — Santa Croce: le tombe di Michelangelo, Galileo e Machiavelli",
      "Ore 16:30 — Passeggiata sul Ponte Vecchio con i gioiellieri tradizionali orafi",
      "Ore 17:30 — Piazzale Michelangelo: tramonto con vista a 360° sulla cityline fiorentina",
    ],
    eveningActivities: [
      "Ore 20:00 — Cena nell'Oltrarno (quartiere bohémien) con pappardelle al cinghiale e Chianti Classico",
      "Ore 22:00 — Passeggiata notturna illuminata lungo il lungarno Corsini",
    ],
    uniqueElement: {
      label: "✦ Esperienza Unica",
      text: "Workshop privato di pittura a tempera con un maestro artigiano — impara la tecnica del Rinascimento usata da Botticelli stesso, in un atelier del '400."
    },
    facts: ["Il centro storico è UNESCO dal 1982", "Gli Uffizi hanno oltre 2 milioni di visitatori/anno", "Il David misura 5,17 metri"],
  },

  {
    dayNum: 3,
    city: "VENEZIA",
    title: "Venezia — La Serenissima",
    accentColor: "#1c6f9b",       // Mediterranean Blue
    emoji: "🚣",
    tagline: "Una città sull'acqua che sfida le leggi della natura da mille anni",
    description:
      "Venezia è costruita su 118 isole collegate da 439 ponti, senza una sola automobile. Fu la potenza marittima e commerciale più potente del Medioevo. Il suo Carnevale è famoso nel mondo intero.",
    image: "./images/venezia.jpg",
    morningActivities: [
      "Ore 7:30 — Alzati presto e goditi San Marco PRIMA dei turisti: la Basilica è spettacolare nel silenzio",
      "Ore 9:00 — Palazzo Ducale: le prigioni, la Sala del Maggior Consiglio, il Ponte dei Sospiri",
      "Ore 11:00 — Visita all'isola di Murano: assisti alla soffiatura del vetro artigianale da maestri centenari",
    ],
    afternoonActivities: [
      "Ore 13:00 — Cicchetti e prosecco in un'osteria di Cannaregio (rione autentico, senza turisti)",
      "Ore 14:30 — Giro in gondola con serenata: percorso dei canali secondari (€ 80/30 min)",
      "Ore 16:00 — Isola di Burano: case dai colori accesi, merletti tradizionali e risotto de gò",
      "Ore 18:00 — Ritorno in vaporetto al tramonto: il Canal Grande si tinge d'arancione",
    ],
    eveningActivities: [
      "Ore 19:30 — Aperitivo al Rialto con Spritz veneziano (Aperol/Campari + Prosecco + soda)",
      "Ore 21:00 — Concerto di musica barocca in una chiesa veneziana del '700",
    ],
    uniqueElement: {
      label: "✦ Esperienza Unica",
      text: "Tour in kayak notturno attraverso i canali silenziosi — quando le gondole dormono, Venezia rivela una magia impossibile da vivere di giorno: calma assoluta, riflessi spettacolari, l'Italia nascosta."
    },
    facts: ["119 isolette collegate da 439 ponti", "Il sottosuolo è fatto di 10 milioni di pali di quercia", "5 km per attraversarla a piedi"],
  },

  {
    dayNum: 4,
    city: "MILANO",
    title: "Milano — Il Cuore del Futuro",
    accentColor: "#7c5cbf",       // Milanese Purple
    emoji: "🏙️",
    tagline: "Dove il design italiano incontra la finanza globale",
    description:
      "Milano è la capitale economica e della moda italiana. Fondata dai Celti come Mediolanum, fu capitale dell'Impero Romano d'Occidente. Oggi ospita la Borsa italiana, il distretto della moda e le sedi di Ferrari, Armani e Prada.",
    image: "./images/milano.jpg",
    morningActivities: [
      "Ore 8:00 — Duomo: 135 guglie, 3.400 statue, ascesa alle terrazze con vista sulle Alpi (€ 5)",
      "Ore 10:30 — Pinacoteca di Brera: Caravaggio, Raffaello e Tiepolo in una delle migliori gallerie d'Italia",
      "Ore 12:00 — Galleria Vittorio Emanuele II: acquisti simbolici nel salotto buono di Milano 1877",
    ],
    afternoonActivities: [
      "Ore 13:00 — Risotto alla milanese (con zafferano DOC) e ossobuco nel ristorante storico Savini (1867)",
      "Ore 15:00 — Santa Maria delle Grazie: prenotazione obbligatoria per ammirare l'Ultima Cena di Leonardo (€ 15)",
      "Ore 17:00 — Distretto Brera: bar vintage, antiquariato, artisti di strada e aperitivo early",
      "Ore 18:30 — Quartiere Isola + Bosco Verticale di Boeri: architettura contemporanea tra 900 alberi",
    ],
    eveningActivities: [
      "Ore 20:00 — Aperitivo sui Navigli: i canali illuminati con vista sui palazzi storici, antipasti gratis al bar",
      "Ore 21:30 — Serata al Teatro alla Scala (controlla il programma) o cena fusion in un bistrot del Naviglio Grande",
    ],
    uniqueElement: {
      label: "✦ Esperienza Unica",
      text: "Tour privato esclusivo alla Brera Fashion Week o visita allo showroom segreto di un atelier artigiano: scopri come nasce un abito haute couture, dalla materia prima al filo finale."
    },
    facts: ["1,4 milioni di abitanti, 4 mln nella metropolitana", "La Scala: inaugurata nel 1778", "La Borsa italiana è nata a Milano nel 1808"],
  },

  {
    dayNum: 5,
    city: "COSTIERA AMALFITANA",
    title: "Costiera Amalfitana — Il Profumo del Mediterraneo",
    accentColor: "#1e8c5f",       // Sea Green
    emoji: "🍋",
    tagline: "Scogliere a picco sul mare, limoni giganti e un orizzonte infinito",
    description:
      "Dichiarata Patrimonio UNESCO nel 1997, la Costiera si estende per 50 km tra Positano e Salerno. I limoni di Amalfi (IGP) sono i più grandi d'Italia — grandi come pompelmi — e crescono sulle ripide terrazze scavate nella roccia.",
    image: "./images/amalfi.jpg",
    morningActivities: [
      "Ore 7:00 — Sentiero degli Dei: trekking da Bomerano a Positano (4 ore, 1.443 m di quota, vista mozzafiato)",
      "Ore 10:00 — Positano: scendi le scalinate colorate fino alla spiaggia Grande, nuota nel Tirreno cristallino",
      "Ore 11:30 — Visita al Duomo di Amalfi e alla cripta di Sant'Andrea (926 d.C.)",
    ],
    afternoonActivities: [
      "Ore 13:00 — Pranzo con spaghetti alle vongole e frittura mista di paranza sotto una pergola vista-mare",
      "Ore 14:30 — Giro in barca a motore privata: grotte marine, spiagge segrete, snorkeling in acque cristalline",
      "Ore 17:00 — Ravello: villa Rufolo e i Giardini di Villa Cimbrone con il terrazzo dell'Infinito (540 m slm)",
      "Ore 18:30 — Degustazione di Limoncello artigianale direttamente dal produttore locale",
    ],
    eveningActivities: [
      "Ore 20:00 — Cena romantica con vista-costa a lume di candela: scialatielli ai frutti di mare",
      "Ore 22:00 — Passeggiata sul lungomare di Amalfi nella notte tiepida del Tirreno",
    ],
    uniqueElement: {
      label: "✦ Esperienza Unica",
      text: "Lezione di cucina con una nonna amalfitana nella sua casa sul mare: impara la pasta fresca, la parmigiana, i deliziosi tortini al limone. Un segreto di famiglia geloso da generazioni."
    },
    facts: ["UNESCO World Heritage dal 1997", "I limoni sfusato amalfitano pesano fino a 2 kg", "La strada costiera ha 44 curve panoramiche"],
  },

  {
    dayNum: 6,
    city: "MATERA",
    title: "Matera — L'Alba della Civiltà",
    accentColor: "#a08040",       // Stone Gold
    emoji: "🪨",
    tagline: "Una delle città più antiche del mondo: abitate da 9.000 anni senza interruzione",
    description:
      "Matera è un'anomalia del mondo moderno: le sue case-grotta (Sassi) sono state abitate ininterrottamente dal Paleolitico. Dichiarata patrimonio UNESCO nel 1993, è stata Capitale Europea della Cultura 2019. Mel Gibson scelse Matera come location di Gerusalemme nel suo \"Passione di Cristo\".",
    image: "./images/matera.jpg",
    morningActivities: [
      "Ore 8:00 — Sasso Caveoso al mattino: i vicoli sonnolenti e la luce radente svelano la trama di pietra calcarea",
      "Ore 9:30 — Tour guidato di 5 chiese rupestri: affreschi del XI sec. perfettamente conservati nel buio delle grotte",
      "Ore 11:00 — Casa grotta di Vico Solitario: museo vivente, abitata ancora nel 1957 — 6 persone + animali da stalla",
    ],
    afternoonActivities: [
      "Ore 13:00 — Pranzo con pane di Matera IGP (a lievitazione naturale, 3 giorni di preparazione) e crapiata lucana",
      "Ore 14:30 — Museo Nazionale di Matera: dai neolitici a oggi, oggetti trovati proprio nelle grotte sotto i tuoi piedi",
      "Ore 16:00 — Belvedere di Murgia Timone: panorama frontale sui Sassi — la cartolina più bella d'Italia",
      "Ore 17:30 — Laboratorio di ceramica rupestre: crea un oggetto con argilla locale guidato da un artigiano",
    ],
    eveningActivities: [
      "Ore 20:00 — Cena gourmet in un albergo diffuso nelle grotte: pezzente della Montagna con peperone crusco e canestrato",
      "Ore 22:30 — Notte nei Sassi: l'illuminazione delle grotte di notte è uno spettacolo unico al mondo",
    ],
    uniqueElement: {
      label: "✦ Esperienza Unica",
      text: "Pernottamento in un'autentica grotta-hotel ricavata da un Sasso del XIII secolo: letti incassati nella roccia calcarea, bianchi intonaci, cisterne antiche riconvertite in jacuzzi."
    },
    facts: ["Nominata Capitale Europea della Cultura 2019", "Insediamento umano continuo da 9.000 anni", "UNESCO dal 1993: prima in Sud Italia"],
  },

  {
    dayNum: 7,
    city: "TAORMINA · SICILIA",
    title: "Taormina — Il Gioiello di Sicilia",
    accentColor: "#c04020",       // Etna Red
    emoji: "🌋",
    tagline: "Tra il fuoco dell'Etna, il mare Jonio e le rovine greche del III sec. a.C.",
    description:
      "Fondata dai Greci nel 304 a.C., Taormina è soprannominata la \"Perla dello Ionio\". Il Teatro Antico domina il golfo di Naxos e ha l'Etna come fondale naturale. Goethe la definì \"un pezzetto di paradiso\".",
    image: "./images/sicilia.jpg",
    morningActivities: [
      "Ore 8:00 — Teatro Antico di Taormina (III sec. a.C.): veduta sull'Etna fumante e sul Mar Jonio (€ 10)",
      "Ore 10:00 — Passeggiata sul Corso Umberto I: bar storici, ceramiche di Caltagirone, cannoli freschi",
      "Ore 11:30 — Giardini Pubblici Villa Comunale: botanica esotica, panorama a 270° tra mare e vulcano",
    ],
    afternoonActivities: [
      "Ore 13:00 — Pranzo tipico: arancine (rigoroso femminile in Sicilia), pasta alla Norma (melanzane, ricotta salata)",
      "Ore 14:30 — Escursione sull'Etna: funivia fino a 2.500 m sul vulcano attivo, camminata sulla lava nera",
      "Ore 17:00 — Isola Bella: la piccola isola-gioiello collegata da un istmo di sabbia bianca, snorkeling finale",
      "Ore 18:30 — Spiaggia maragiù: cocktail di arrivederci con spritz al mandarino siciliano",
    ],
    eveningActivities: [
      "Ore 20:30 — Gran Cena di commiato: spaghetti ai ricci di mare, tonno in crosta di pistacchio di Bronte, cannolo ripieno sul momento",
      "Ore 22:30 — Vista notturna dell'Etna con la sua colata luminosa: addio all'Italia nel silenzio della notte siciliana",
    ],
    uniqueElement: {
      label: "✦ Esperienza Unica",
      text: "Degustazione di vini vulcanici DOC Etna: i vitigni crescono sulla lava nera a 700 m di altitudine. Il Nerello Mascalese è il Pinot Noir italiano — raffinato, complesso, irripetibile come questo viaggio."
    },
    facts: ["Fondata dai Greci nel 304 a.C.", "L'Etna è il vulcano attivo più alto d'Europa (3.357 m)", "Il pistacchio di Bronte è il più pregiato al mondo"],
  },
];

const Itinerary = () => {
  const containerRef = useRef(null);

  return (
    <section id="itinerary" ref={containerRef} style={{ padding: '8rem 0 4rem 0', position: 'relative' }}>

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '7rem', position: 'relative', zIndex: 1, padding: '0 2rem' }}>
        <p style={{ color: 'var(--color-accent-gold)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem' }}>
          La Tua Avventura di 7 Giorni
        </p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', margin: '0 0 1.5rem 0', lineHeight: 1.15 }}>
          Il Percorso Attraverso<br />
          <span className="text-gradient" style={{ fontStyle: 'italic' }}>Cuore e Anima dell'Italia</span>
        </h2>
        <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
          Da Roma a Taormina, ogni giornata è pensata per essere unica, con esperienze autentiche impossibili da replicare altrove.
        </p>
        <div style={{
          width: '80px', height: '3px',
          background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-gold))',
          margin: '2rem auto 0 auto', borderRadius: '2px'
        }} />
      </div>

      {/* Day Cards */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {itineraryData.map((day, i) => (
          <ItineraryDay
            key={day.dayNum}
            data={day}
            alignRight={i % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
};

export default Itinerary;
