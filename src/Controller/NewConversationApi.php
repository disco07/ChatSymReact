<?php


namespace App\Controller;


use App\Entity\Conversations;
use App\Entity\Participants;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class NewConversationApi
{
    private $security;
    private $userRepository;
    private $entityManager;

    /**
     * NewConversationApi constructor.
     * @param Security $security
     * @param UserRepository $userRepository
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(Security $security, UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        $this->security = $security;
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
    }


    public function __invoke(Conversations $data, Request $request): Conversations
    {
        $participantMe = new Participants();
        $participantOther = new Participants();
        $participantOther->setUsers($this->userRepository->find($request->query->get('users')));
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