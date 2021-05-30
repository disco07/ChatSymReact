<?php


namespace App\Controller;


use App\Entity\Conversations;
use App\Entity\Participants;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class NewConversationApi
{
    private $security;
    private $userRepository;

    /**
     * NewConversationApi constructor.
     * @param Security $security
     * @param UserRepository $userRepository
     */
    public function __construct(Security $security, UserRepository $userRepository)
    {
        $this->security = $security;
        $this->userRepository = $userRepository;
    }


    public function __invoke(Conversations $data, Request $request)
    {
        $otherUser = $this->userRepository->find($request->query->get('otherUser'));
        $participantMe = new Participants();
        $participantMe->setUsers($this->security->getUser());
    }
}