INSERT INTO utilisateurs (
  nom,  prénom, date_de_naissance, telephone, email, password, adresse1, CP, ville, pays, seelie
) VALUES (
  "Lysander", "Aria", "1990-02-25", 0634567890, "aria.lysander@songsofthewind.com", "Arc-en-ciel789!", "7 Chemin de la Brume", 12345, "Clairdelune", "Féerieland", 0
), (
  "Sylvain", "Orion", "1985-07-15", 0734567891, "orion.sylvain@stargazersrealm.net", "ÉtoileFilante42@", "12 Rue des Éclats", 54321, "Astrebourg", "Célestia", 0
), (
  "Lumière", "Seraphina", "1995-11-03", 0645678910, "seraphina.lumiere@sparklingfae.org", "LueurMagique123#", "9 Avenue des Arcanes", 98765, "Éclatdesétoiles", "Féerieverse", 0
), (
  "Roseliane", "Thalia", "1988-05-10", 0745678901, "thalia.roseliane@enchantedgarden.com", "RoséeMatinale567*", "4 Sentier des Roses", 87654, "Jardinmagique", "Arcadia", 0
), (
  "Sylvestre", "Oberon", "1980-04-20", 0657891011, "oberon.sylvestre@realmofthewoods.org", "SagesseFeuillue99!", "15 Allée des Fougères", 23456, "Sylvainbourg", "Sylvanor", 0
), (
  "admin", "seelie", "2000-06-19", 0607593244, "admin@gmail.com", "$2b$10$qjVeymvkdHT9NWcxGsLSGujegcHnWWv/GFEcWhQMYiS9JqT6hohYa", "6 rue de la Moutarde", 67000, "Strasbourg", "France", 1 
);


INSERT INTO articles (
  nom, image, prix, ajout_date, nb_ventes, vendeuse
) VALUES (
  "BOUCLE D OREILLES FEUILLES LOTUS", "/static/boucles_oreilles.png", 25.00, NOW(), 10, "Elya"
) , (
  "ILLUSTRATION SIRENE", "/static/illustration_sirene.png", 49.99, NOW(), 1, "Achlys"
) , (
  "PELUCHE CHAMPIGNON", "/static/peluche_champignon.png", 19.49, NOW(), 6, "Doireann"
) , (
  "COLLIER FLECHE", "/static/Collier_Flèche.jpg", 12.00, NOW(), 8, "Elya"
) , (
  "COLLIER PAPILLON PAILLETE", "/static/Collier_Papillon_Pailleté.jpg", 20.00, NOW(), 2, "Elya"
  ) , (
  "COLLIER PAPILLON POINTILLE", "/static/Collier_Papillon_Pointillé.jpg", 49.99, NOW(), 1, "Elya"
) , (
  "COLLIER PAPILLON", "/static/Collier_Papillon.jpg", 19.49, NOW(), 6, "Elya"
) , (
  "BAGUE COEUR", "/static/Bague_Coeur.jpg", 12.00, NOW(), 8, "Elya"
) , (
  "BAGUE COURONNE", "/static/Bague_Couronne.jpg", 20.00, NOW(), 2, "Elya"
) , (
  "BAGUE FLEUR", "/static/Bague_Fleur.jpg", 23.00, NOW(), 20, "Elya"
) , (
  "BAGUE ROSE", "/static/Bague_Rose.jpg", 25.99, NOW(), 2, "Elya"
), (
  "COURONNE FLORALE", "/static/Couronne_Florale.jpg", 23.00, NOW(), 20, "Elya"
) , (
  "COURONNE REINE", "/static/Couronne_Reine.jpg", 25.99, NOW(), 2, "Elya"
), (
  "ILLUSTRATION FEE BLONDE", "/static/illustration_Fee_Blonde.jpg", 25.99, NOW(), 1, "Achlys"
), (
  "ILLUSTRATION FEE BRUNE", "/static/illustration_Fee_Brune.jpg", 27.00, NOW(), 3, "Achlys"
), (
  "ILLUSTRATION SIRENE BLEU", "/static/illustration_Sirene_Bleu.jpg", 19.49, NOW(), 5, "Achlys"
), (
  "ILLUSTRATION TETE SIRENE", "/static/illustration_Tete_Sirene.jpg", 14.00, NOW(), 11, "Achlys"
), (
  "CACTUS", "/static/Cactus_Tricot.jpg", 15.49, NOW(), 15, "Doireann"
), (
  "FLEUR", "/static/Fleur_Tricot.jpg", 19.00, NOW(), 6, "Doireann"
), (
  "GILET", "/static/Gilet_Tricot.jpg", 59.99, NOW(), 23, "Doireann"
), (
  "Plante", "/static/Plante_Tricot.jpg", 12.00, NOW(), 2, "Doireann"
), (
  "Poncho", "/static/Poncho_Tricot.jpg", 49.99, NOW(), 45, "Doireann"
), (
  "CHAMPIGNONS", "/static/champignons.png", 15.49, NOW(), 15, "Dahlia"
), (
  "HIBOUX", "/static/Hiboux_Bois.jpg", 19.00, NOW(), 6, "Dahlia"
), (
  "HIBOUX WELCOME", "/static/Hiboux_Welcome_Bois.jpg", 59.99, NOW(), 23, "Dahlia"
), (
  "ILLUSTRATION DEMOISELLE", "/static/SteamPunk_Demoiselle.jpg", 12.00, NOW(), 2, "Achlys"
), (
  "ILLUSTRATION HORLOGERE", "/static/SteamPunk_Horlogère.jpg", 49.99, NOW(), 45, "Achlys"
);

INSERT INTO couleurs (
  couleur
) VALUES (
  "vert"
),
(
  "noir"
),
(
  "marron"
),
(
  "jaune"
),
(
  "orange"
),
(
  "rouge"
),
(
  "bleu"
),
(
  "rose"
),
(
  "violet"
);

INSERT INTO couleurs_has_articles (
  couleurs_id, articles_id
) VALUES (
  1, 1
), (
  5, 2
), (
  6, 3
), (
  4, 4
),(
  2, 5
), (
  2, 6
), (
  2, 7
), (
  2, 8
), (
  2, 9
), (
  8, 10
), (
  6, 11
), (
  2, 12
), (
  2, 13
), (
  1, 14
), (
  6, 15
), (
  7, 16
), (
  7, 17
), (
  1, 18
), (
  7, 19
), (
  1, 20
), (
  1, 21
), (
  2, 22
), (
  3, 23
), (
  3, 24
), (
  3, 25
), (
  3, 26
), (
  3, 27
);

INSERT INTO thematiques (
  thematique
) VALUES 
(
  "STEAMPUNK"
),
(
  "FANTASY"
),
(
  "MEDIEVAL"
),
(
  "MAGIE"
),
(
  "FEERIE"
),
(
  "COTTAGE CORE"
);

INSERT INTO thematiques_has_articles (
  thematiques_id, articles_id
) VALUES (
  6, 1
), (
  2, 2
), (
  5, 3
), (
  3, 4
), (
  5, 5
), (
  4, 6
), (
  1, 7
), (
  1, 8
), (
  3, 9
), (
  5, 10
), (
  2, 11
), (
  5, 12
), (
  3, 13
), (
  5, 14
), (
  5, 15
), (
  5, 16
), (
  5, 17
), (
  5, 18
), (
  6, 19
), (
  5, 20
), (
  6, 21
), (
  3, 22
), (
  6, 23
), (
  4, 24
), (
  6, 25
), (
  1, 26
), (
  1, 27
);

INSERT INTO types (
  type
) VALUES 
(
  "BIJOUX"
),
(
  "DECORATION"
),
(
  "ILLUSTRATION"
),
(
  "VETEMENT"
),
(
  "ACCESSOIRE"
);

INSERT INTO types_has_articles (
  types_id, articles_id
) VALUES (
  1, 1
), (
  3, 2
), (
  2, 3
), (
  1, 4
), (
  1, 5
), (
  1, 6
), (
  1, 7
), (
  1, 8
), (
  1, 9
), (
  1, 10
), (
  1, 11
), (
  1, 12
), (
  1, 13
), (
  3, 14
), (
  3, 15
), (
  3, 16
), (
  3, 17
), (
  2, 18
), (
  2, 19
), (
  4, 20
), (
  2, 21
), (
  4, 22
), (
  2, 23
), (
  2, 24
), (
  2, 25
), (
  3, 26
), (
  3, 27
);

INSERT INTO commandes (statut, utilisateurs_id)
VALUES
('annulée', 1),
('livrée', 2),
('en préparation', 4);
-- Articles pour la commande 1
INSERT INTO commande_article (quantité, commandes_id, articles_id)
VALUES
(2, 1, 1), -- 2x BOUCLE D'OREILLES FEUILLES LOTUS
(1, 1, 3); -- 1x PELUCHE CHAMPIGNON

-- Articles pour la commande 2
INSERT INTO commande_article (quantité, commandes_id, articles_id)
VALUES
(1, 2, 2), -- 1x ILLUSTRATION SIRENE
(3, 2, 5); -- 3x PELUCHE CHAMPIGNON

-- Articles pour la commande 3
INSERT INTO commande_article (quantité, commandes_id, articles_id)
VALUES
(1, 3, 4), -- 1x ILLUSTRATION SIRENE
(2, 3, 2); -- 2x PELUCHE CHAMPIGNON

-- Festivals

INSERT INTO festivals (nom, lieu, date) 
VALUES ('Médiéval de Mecquignies', 'Impasse du Culot, MECQUIGNIES 59570', '2024-06-12 00:00:00'), 
       ('LudiGeek Festival', '11 Rue Jacquard, 59250 Halluin', '2024-11-16 00:00:00');
