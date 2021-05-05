<?php


namespace App\Controller;


use App\Repository\ConversationsRepository;
use Symfony\Component\Security\Core\Security;

class ConversationApi
{
    private $conversationRepository;
    private $security;

    /**
     * ConversationApi constructor.
     * @param ConversationsRepository $conversationRepository
     * @param Security $security
     */
    public function __construct(ConversationsRepository $conversationRepository, Security $security)
    {
        $this->conversationRepository = $conversationRepository;
        $this->security = $security;
    }


    public function __invoke()
    {
        return $this->conversationRepository->findConversationByParticipants($this->security->getUser()->getId());
    }

}
