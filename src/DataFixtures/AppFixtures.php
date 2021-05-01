<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $encoder;

    /**
     * AppFixtures constructor.
     * @param UserPasswordEncoderInterface $encoder
     */
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }


    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('_fr_FR');

        for ($u = 0; $u < 15; $u++) {
            $user = new User();

            $hash = $this->encoder->encodePassword($user, 'password');

            $user->setEmail($faker->email)
            ->setLastName($faker->lastName)
            ->setFirstName($faker->firstName)
            ->setPassword($hash);

            $manager->persist($user);
        }

        $manager->flush();
    }
}
