<?php


namespace App\Controller;


use App\Entity\Messages;
use App\Repository\ConversationsRepository;
use DateTime;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class MessageCreateApi
{

    private $security;
    private $conversationRepository;

    /**
     * MessageUserSubscriber constructor.
     * @param Security $security
     * @param ConversationsRepository $conversationRepository
     */
    public function __construct(Security $security, ConversationsRepository $conversationRepository)
    {
        $this->security = $security;
        $this->conversationRepository = $conversationRepository;
    }

    public function __invoke(Messages $data, Request $request): Messages
    {
        $conversation = $this->conversationRepository->find($request->query->get('conversation'));

        $data->setConversation($conversation);
        $data->setUsers($this->security->getUser());
        $data->setStatus(1);
        $data->setCreatedAt(new DateTime());
        $conversation->setLastMessage($data);
        return $data;
    }
}
