<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MessagesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=MessagesRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"={"read:message"}},
 *     paginationItemsPerPage=10,
 *     attributes={"order"={"createdAt":"DESC"}},
 *     collectionOperations={
 *          "get",
 *          "post_message_conv"={
 *              "method"="POST",
 *              "path"="/newMessage",
 *              "controller"=App\Controller\MessageCreateApi::class
 *          },
 *          "get_message_unread"={
 *              "method"="get",
 *              "path"="/messages_unread",
 *              "controller"=App\Controller\MessageUnreadController::class,
 *          },
 *          "get", "post"
 *     },
 *     denormalizationContext={"desable_type_enforcement"=true}
 * )
 * @ApiFilter(SearchFilter::class, properties={"conversation": "exact"})
 */
class Messages
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:message"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\Length(min=1)
     * @Groups({"read:message"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank()
     * @Assert\Type(type="\DateTime")
     * @Groups({"read:message", "read:conversation"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="messages")
     * @Groups({"read:message", "read:conversation"})
     */
    private $users;

    /**
     * @ORM\ManyToOne(targetEntity=Conversations::class, inversedBy="messages")
     * @Groups({"read:message"})
     */
    private $conversation;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:message", "read:conversation"})
     */
    private $status;

    /**
     * @ORM\OneToMany(targetEntity=Images::class, mappedBy="messages")
     * @Groups({"read:message"})
     */
    private $images;

    public function __construct()
    {
        $this->images = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUsers(): ?User
    {
        return $this->users;
    }

    public function setUsers(?User $users): self
    {
        $this->users = $users;

        return $this;
    }

    public function getConversation(): ?Conversations
    {
        return $this->conversation;
    }

    public function setConversation(?Conversations $conversation): self
    {
        $this->conversation = $conversation;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection|Images[]
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Images $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setMessages($this);
        }

        return $this;
    }

    public function removeImage(Images $image): self
    {
        if ($this->images->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getMessages() === $this) {
                $image->setMessages(null);
            }
        }

        return $this;
    }
}
