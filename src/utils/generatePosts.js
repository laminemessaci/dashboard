export const getRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9); // Generate a random alphanumeric id
};

export const getRandomPost = () => {
  const titles = [
    "infos monde",
    "Infos régions",
    "Crimes et société",
    "Economie et politiques",
    "Météo et temps",
  ];
  const contents = [
    "Alors que l'année 2023 voit les conséquences du réchauffement climatique se multiplier, plusieurs indicateurs vont dans le sens contraire de ce que la lutte contre cette crise mondiale imposerait",
    "Un incendie s'est déclaré mercredi matin dans ce lieu qui accueillait des personnes handicapées venues passer leurs vacances dans le Haut-Rhin",
    "Principale source d'émissions de CO2 dans l'atmosphère, le charbon n'a jamais été autant consommé. L'Agence internationale de l'énergie (AIE) a rapporté le 27 juillet un plus haut historique en 2022...",
    "La responsable cite deux exemples de signaux contraires à ce que la crise climatique imposerait : les centaines de nouvelles licences d'exploitation de gaz et de pétrole accordées par le Royaume-Uni fin juillet et le record mondial, en 2022,",
    "Autre énergie fossile utilisée principalement pour les transports et l'industrie de la pétrochimie, le pétrole bat lui aussi tous les records. En 2023, l'AIE prévoit une demande jamais égalée de 102,1 millions de barils en moyenne par jour, a-t-elle fait savoir le 7 juillet.",
  ];

  const randomId = generateUniqueId();
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const randomContent = contents[Math.floor(Math.random() * contents.length)];
  const randomLoveIts = Math.floor(Math.random() * 5); // Random loveIts between 0 and 100
  const randomCreatedAt = getRandomDate(new Date(2023, 0, 1), new Date()); // Random date between 2023 and now

  const post = {
    id: randomId,
    title: randomTitle,
    content: randomContent,
    loveIts: randomLoveIts,
    created_at: randomCreatedAt.toISOString(), // Convert date to ISO string
  };

  return post;
};

// Example usage:
