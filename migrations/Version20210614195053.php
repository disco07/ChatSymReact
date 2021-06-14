<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210614195053 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE conversations (id INT AUTO_INCREMENT NOT NULL, last_message_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_C2521BF1BA0E79C3 (last_message_id), INDEX last_message_id_index (last_message_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE images (id INT AUTO_INCREMENT NOT NULL, filename VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, image_file VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messages (id INT AUTO_INCREMENT NOT NULL, users_id INT DEFAULT NULL, conversation_id INT DEFAULT NULL, content VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, status TINYINT(1) NOT NULL, INDEX IDX_DB021E9667B3B43D (users_id), INDEX IDX_DB021E969AC0396 (conversation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE participants (id INT AUTO_INCREMENT NOT NULL, users_id INT DEFAULT NULL, conversation_id INT DEFAULT NULL, INDEX IDX_7169709267B3B43D (users_id), INDEX IDX_716970929AC0396 (conversation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, avatar VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE conversations ADD CONSTRAINT FK_C2521BF1BA0E79C3 FOREIGN KEY (last_message_id) REFERENCES messages (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E9667B3B43D FOREIGN KEY (users_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E969AC0396 FOREIGN KEY (conversation_id) REFERENCES conversations (id)');
        $this->addSql('ALTER TABLE participants ADD CONSTRAINT FK_7169709267B3B43D FOREIGN KEY (users_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE participants ADD CONSTRAINT FK_716970929AC0396 FOREIGN KEY (conversation_id) REFERENCES conversations (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E969AC0396');
        $this->addSql('ALTER TABLE participants DROP FOREIGN KEY FK_716970929AC0396');
        $this->addSql('ALTER TABLE conversations DROP FOREIGN KEY FK_C2521BF1BA0E79C3');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E9667B3B43D');
        $this->addSql('ALTER TABLE participants DROP FOREIGN KEY FK_7169709267B3B43D');
        $this->addSql('DROP TABLE conversations');
        $this->addSql('DROP TABLE images');
        $this->addSql('DROP TABLE messages');
        $this->addSql('DROP TABLE participants');
        $this->addSql('DROP TABLE `user`');
    }
}
