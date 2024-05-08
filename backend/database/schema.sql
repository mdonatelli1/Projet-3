-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema le_comptoir_des_seelies
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema le_comptoir_des_seelies
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `le_comptoir_des_seelies` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `le_comptoir_des_seelies` ;

-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `prix` FLOAT NOT NULL,
  `ajout_date` DATETIME NOT NULL,
  `nb_ventes` INT NULL DEFAULT NULL,
  `vendeuse` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`utilisateurs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`utilisateurs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45),
  `prénom` VARCHAR(45),
  `date_de_naissance` DATETIME,
  `telephone` INT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `date_inscription` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `adresse1` VARCHAR(45),
  `adresse2` VARCHAR(45) NULL DEFAULT NULL,
  `CP` INT,
  `ville` VARCHAR(45),
  `pays` VARCHAR(45),
  `seelie` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`paiements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`paiements` (
  `utilisateurs_id` INT NOT NULL,
  `titulaire` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `cvv` INT NOT NULL,
  `expiration` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`utilisateurs_id`),
  CONSTRAINT `fk_table1_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `le_comptoir_des_seelies`.`utilisateurs` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`avis`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`avis` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(45) NOT NULL,
  `note` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `utilisateurs_id` INT NOT NULL,
  `articles_id` INT NOT NULL,
  PRIMARY KEY (`id`, `utilisateurs_id`, `articles_id`),
  INDEX `fk_avis_articles1_idx` (`articles_id` ASC) VISIBLE,
  CONSTRAINT `fk_avis_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `le_comptoir_des_seelies`.`utilisateurs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_avis_articles1`
    FOREIGN KEY (`articles_id`)
    REFERENCES `le_comptoir_des_seelies`.`articles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`commandes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`commandes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date_commande` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `statut` VARCHAR(45) NOT NULL,
  `utilisateurs_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_commandes_utilisateurs1_idx` (`utilisateurs_id` ASC) VISIBLE,
  CONSTRAINT `fk_commandes_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `le_comptoir_des_seelies`.`utilisateurs` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`commande_article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`commande_article` (
  `quantité` INT NOT NULL,
  `commandes_id` INT NOT NULL,
  `articles_id` INT NULL,
  INDEX `fk_commande_article_articles1_idx` (`articles_id` ASC) VISIBLE,
  CONSTRAINT `fk_commande_article_commandes1`
    FOREIGN KEY (`commandes_id`)
    REFERENCES `le_comptoir_des_seelies`.`commandes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_commande_article_articles1`
    FOREIGN KEY (`articles_id`)
    REFERENCES `le_comptoir_des_seelies`.`articles` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`couleurs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`couleurs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `couleur` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`festivals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`festivals` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `lieu` VARCHAR(45) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`panier_article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`panier_article` (
  `quantité` INT NOT NULL,
  `articles_id` INT NOT NULL,
  `utilisateurs_id` INT NOT NULL,
  PRIMARY KEY (`articles_id`, `utilisateurs_id`),
  INDEX `fk_panier_article_utilisateurs1_idx` (`utilisateurs_id` ASC) VISIBLE,
  CONSTRAINT `fk_panier_article_articles1`
    FOREIGN KEY (`articles_id`)
    REFERENCES `le_comptoir_des_seelies`.`articles` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_panier_article_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `le_comptoir_des_seelies`.`utilisateurs` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`support`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`support` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sujet` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `statut` VARCHAR(45) NOT NULL,
  `date_ouverture` DATETIME NOT NULL,
  `date_resolution` DATETIME NULL DEFAULT NULL,
  `utilisateurs_id` INT NOT NULL,
  PRIMARY KEY (`id`, `utilisateurs_id`),
  CONSTRAINT `fk_support_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `le_comptoir_des_seelies`.`utilisateurs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`thematiques`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`thematiques` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `thematique` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`types_has_articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`types_has_articles` (
  `types_id` INT NOT NULL,
  `articles_id` INT NOT NULL,
  PRIMARY KEY (`types_id`, `articles_id`),
  INDEX `fk_types_has_articles_articles1_idx` (`articles_id` ASC) VISIBLE,
  INDEX `fk_types_has_articles_types1_idx` (`types_id` ASC) VISIBLE,
  CONSTRAINT `fk_types_has_articles_types1`
    FOREIGN KEY (`types_id`)
    REFERENCES `le_comptoir_des_seelies`.`types` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_types_has_articles_articles1`
    FOREIGN KEY (`articles_id`)
    REFERENCES `le_comptoir_des_seelies`.`articles` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`couleurs_has_articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`couleurs_has_articles` (
  `couleurs_id` INT NOT NULL,
  `articles_id` INT NOT NULL,
  PRIMARY KEY (`couleurs_id`, `articles_id`),
  INDEX `fk_couleurs_has_articles_articles1_idx` (`articles_id` ASC) VISIBLE,
  INDEX `fk_couleurs_has_articles_couleurs1_idx` (`couleurs_id` ASC) VISIBLE,
  CONSTRAINT `fk_couleurs_has_articles_couleurs1`
    FOREIGN KEY (`couleurs_id`)
    REFERENCES `le_comptoir_des_seelies`.`couleurs` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_couleurs_has_articles_articles1`
    FOREIGN KEY (`articles_id`)
    REFERENCES `le_comptoir_des_seelies`.`articles` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`thematiques_has_articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`thematiques_has_articles` (
  `thematiques_id` INT NOT NULL,
  `articles_id` INT NOT NULL,
  PRIMARY KEY (`thematiques_id`, `articles_id`),
  INDEX `fk_thematiques_has_articles_articles1_idx` (`articles_id` ASC) VISIBLE,
  INDEX `fk_thematiques_has_articles_thematiques1_idx` (`thematiques_id` ASC) VISIBLE,
  CONSTRAINT `fk_thematiques_has_articles_thematiques1`
    FOREIGN KEY (`thematiques_id`)
    REFERENCES `le_comptoir_des_seelies`.`thematiques` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_thematiques_has_articles_articles1`
    FOREIGN KEY (`articles_id`)
    REFERENCES `le_comptoir_des_seelies`.`articles` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`retours`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`retours` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `commandes_id` INT NOT NULL,
  `articles_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `etat` VARCHAR(45) NOT NULL,
  `raison` VARCHAR(45) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`id`, `commandes_id`, `articles_id`),
  INDEX `fk_commandes_has_articles_articles1_idx` (`articles_id` ASC) VISIBLE,
  INDEX `fk_commandes_has_articles_commandes1_idx` (`commandes_id` ASC) VISIBLE,
  CONSTRAINT `fk_commandes_has_articles_commandes1`
    FOREIGN KEY (`commandes_id`)
    REFERENCES `le_comptoir_des_seelies`.`commandes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_commandes_has_articles_articles1`
    FOREIGN KEY (`articles_id`)
    REFERENCES `le_comptoir_des_seelies`.`articles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Table `le_comptoir_des_seelies`.`isFav`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `le_comptoir_des_seelies`.`isFav` (
  `utilisateurs_id` INT NOT NULL,
  `articles_id` INT NOT NULL,
  PRIMARY KEY (`utilisateurs_id`, `articles_id`),
  INDEX `fk_isFav_articles1_idx` (`articles_id` ASC) VISIBLE,
  CONSTRAINT `fk_isFav_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `le_comptoir_des_seelies`.`utilisateurs` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_isFav_articles1`
    FOREIGN KEY (`articles_id`)
    REFERENCES `le_comptoir_des_seelies`.`articles` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;