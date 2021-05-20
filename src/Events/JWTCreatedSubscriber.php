<?php


namespace App\Events;


use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $event) {
        $user = $event->getUser();
        $data = $event->getData();
        $data["id"] = $user->getId();
        $data["firstName"] = $user->getFirstName();
        $data["lastName"] = $user->getLastName();
        $data["avatar"] = $user->getAvatar();

        $event->setData($data);
    }
}
