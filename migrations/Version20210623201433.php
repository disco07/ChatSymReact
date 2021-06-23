<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210623201433 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE images ADD messages_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE images ADD CONSTRAINT FK_E01FBE6AA5905F5A FOREIGN KEY (messages_id) REFERENCES messages (id)');
        $this->addSql('CREATE INDEX IDX_E01FBE6AA5905F5A ON images (messages_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE images DROP FOREIGN KEY FK_E01FBE6AA5905F5A');
        $this->addSql('DROP INDEX IDX_E01FBE6AA5905F5A ON images');
        $this->addSql('ALTER TABLE images DROP messages_id');
    }
}
