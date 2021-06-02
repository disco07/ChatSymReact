<?php

namespace App\Repository;

use App\Entity\Conversations;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\QueryBuilder;

/**
 * @method Conversations|null find($id, $lockMode = null, $lockVersion = null)
 * @method Conversations|null findOneBy(array $criteria, array $orderBy = null)
 * @method Conversations[]    findAll()
 * @method Conversations[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ConversationsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Conversations::class);
    }

    public function findConversationByParticipants(int $userId)
    {
        $qb = $this->createQueryBuilder('c');
        $qb->
        select( 'c as conv','otherUser.id', 'otherUser.firstName', 'otherUser.avatar', 'otherUser.lastName', 'c.id as conversationId', 'lm.content', 'lm.createdAt')
            ->innerJoin('c.participants', 'p', Join::WITH, $qb->expr()->neq('p.users', ':user'))
            ->innerJoin('c.participants', 'me', Join::WITH, $qb->expr()->eq('me.users', ':user'))
            ->leftJoin('c.lastMessage', 'lm')
            ->innerJoin('me.users', 'meUser')
            ->innerJoin('p.users', 'otherUser')
            ->where('meUser.id = :user')
            ->setParameter('user', $userId)
            ->orderBy('lm.createdAt', 'DESC')
        ;

        return $qb->getQuery()->getResult();
    }

    public function findConversationsByUser(int $otherUserId, int $myId)
    {
        $qb = $this->createQueryBuilder('c');
        $qb
            ->select($qb->expr()->count('p.conversation'))
            ->innerJoin('c.participants', 'p')
            ->where(
                $qb->expr()->orX(
                    $qb->expr()->eq('p.users', ':me'),
                    $qb->expr()->eq('p.users', ':otherUser')
                )
            )
            ->groupBy('p.conversation')
            ->having(
                $qb->expr()->eq(
                    $qb->expr()->count('p.conversation'),
                    2
                )
            )
            ->setParameters([
                'me' => $myId,
                'otherUser' => $otherUserId
            ])
        ;

        if( count($qb->getQuery()->getResult())){
            $qb = $this->createQueryBuilder('c');
            $qb
                ->select('c.id')
                ->innerJoin('c.participants', 'p')
                ->where(
                    $qb->expr()->orX(
                        $qb->expr()->eq('p.users', ':me'),
                        $qb->expr()->eq('p.users', ':otherUser')
                    )
                )
                ->groupBy('p.conversation')
                ->having(
                    $qb->expr()->eq(
                        $qb->expr()->count('p.conversation'),
                        2
                    )
                )
                ->setParameters([
                    'me' => $myId,
                    'otherUser' => $otherUserId
                ])
            ;
            return $qb->getQuery()->getResult();
        }
        else{
            return $qb->getQuery()->getResult();
        }
    }


    public function checkIfUserisParticipant(int $conversationId, int $userId)
    {
        $qb = $this->createQueryBuilder('c');
        $qb
            ->innerJoin('c.participants', 'p')
            ->where('c.id = :conversationId')
            ->andWhere(
                $qb->expr()->eq('p.users', ':userId')
            )
            ->setParameters([
                'conversationId' => $conversationId,
                'userId' => $userId
            ])
        ;

        return $qb->getQuery()->getOneOrNullResult();
    }

    // /**
    //  * @return Conversation[] Returns an array of Conversation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Conversation
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

}
