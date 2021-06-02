<?php


namespace App\Controller;


use App\Entity\Conversations;
use App\Entity\Participants;
use App\Repository\ConversationsRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class NewConversationApi
{
    private $security;
    private $userRepository;
    private $entityManager;
    private $conversationRepository;

    /**
     * NewConversationApi constructor.
     * @param Security $security
     * @param UserRepository $userRepository
     * @param EntityManagerInterface $entityManager
     * @param ConversationsRepository $conversationRepository
     */
    public function __construct(Security $security, UserRepository $userRepository, EntityManagerInterface $entityManager, ConversationsRepository $conversationRepository)
    {
        $this->security = $security;
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->conversationRepository = $conversationRepository;
    }


    /**
     * @throws Exception
     */
    public function __invoke(Conversations $data, Request $request): ?Conversations
    {
        $otherUser = $this->userRepository->find($request->query->get('users'));
        if (is_null($otherUser)) {
            throw new Exception("The user was not found");
        }

        if ($otherUser->getId() === $this->security->getUser()->getId()) {
            throw new Exception("That's deep but you cannot create a conversation with yourself");
        }

        $conversation = $this->conversationRepository->findConversationsByUser(
            $otherUser->getId(),
            $this->security->getUser()->getId()
        );

        if (count($conversation)) {
            return $this->conversationRepository->find($conversation[0]['conversationId']);
        }

        $participantMe = new Participants();
        $participantOther = new Participants();
        $participantOther->setUsers($otherUser);
        $participantMe->setUsers($this->security->getUser());
        $participantOther->setConversation($data);
        $participantMe->setConversation($data);

        $this->entityManager->getConnection()->beginTransaction();
        $this->entityManager->persist($data);
        $this->entityManager->persist($participantMe);
        $this->entityManager->persist($participantOther);
        $this->entityManager->commit();

        $this->entityManager->flush();
        return $data;
    }
}