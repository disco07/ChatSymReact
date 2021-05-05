<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Index;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ConversationsRepository")
 * @ORM\Table(indexes={@Index(name="last_message_id_index", columns={"last_message_id"})})
 * @ApiResource(
 *     normalizationContext={"groups"={"read:conversation"}},
 *     collectionOperations={
 *          "get",
 *          "get_conversation"={
 *              "method"="get",
 *              "path"="/allconversations",
 *              "controller"=App\Controller\ConversationApi::class,
 *       },
 *          "post",
 * },
 *     itemOperations={
 *          "get"={
 *          "normalization_context"={"groups"={"read:conversation", "read:full:conversation"}}
 *       },
 * },
 * )
 */
class Conversations
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"read:message"})
     * @Groups({"read:conversation"})
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity="Participants", mappedBy="conversation")
     * @Groups({"read:conversation"})
     */
    private $participants;

    /**
     * @ORM\OneToOne(targetEntity="Messages")
     * @ORM\JoinColumn(name="last_message_id", referencedColumnName="id")
     * @Groups({"read:conversation"})
     */
    private $lastMessage;

    /**
     * @ORM\OneToMany(targetEntity="Messages", mappedBy="conversation")
     */
    private $messages;

    public function __construct()
    {
        $this->participants = new ArrayCollection();
        $this->messages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return int
     * @Groups({"read:conversation"})
     */
    public function getTotalUnread(): int
    {
        return array_reduce($this->messages->toArray(), function ($total, $message) {
            return $total + ($message->getStatus() === true ? 1 : 0);
        }, 0);
    }

    /**
     * @return Collection|Participants[]
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(Participants $participant): self
    {
        if (!$this->participants->contains($participant)) {
            $this->participants[] = $participant;
            $participant->setConversation($this);
        }

        return $this;
    }

    public function removeParticipant(Participants $participant): self
    {
        if ($this->participants->contains($participant)) {
            $this->participants->removeElement($participant);
            // set the owning side to null (unless already changed)
            if ($participant->getConversation() === $this) {
                $participant->setConversation(null);
            }
        }

        return $this;
    }

    public function getLastMessage(): ?Messages
    {
        return $this->lastMessage;
    }

    public function setLastMessage(?Messages $lastMessage): self
    {
        $this->lastMessage = $lastMessage;

        return $this;
    }

    /**
     * @return Collection|Messages[]
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Messages $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setConversation($this);
        }

        return $this;
    }

    public function removeMessage(Messages $message): self
    {
        if ($this->messages->contains($message)) {
            $this->messages->removeElement($message);
            // set the owning side to null (unless already changed)
            if ($message->getConversation() === $this) {
                $message->setConversation(null);
            }
        }

        return $this;
    }
}
