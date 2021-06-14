<?php


namespace App\Controller;


use App\Entity\Messages;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class MessageUnreadController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $request, Security $security)
    {
        $messages = $this->entityManager->getRepository(Messages::class)
            ->findMessagesUnreadByConversation($request->query->get('conversation'));
        foreach($messages as $message) {
            if ($message->getUsers() != $security->getUser())
                $message->setStatus(0);
        }
        $this->entityManager->flush();
        return $messages;
    }
}