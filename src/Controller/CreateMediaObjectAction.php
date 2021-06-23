<?php


namespace App\Controller;


use App\Entity\Images;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Security;

final class CreateMediaObjectAction
{
    /**
     * @var Security
     */
    private $security;

    /**
     * CreateMediaObjectAction constructor.
     * @param Security $security
     */
    public function __construct(Security $security)
    {
        $this->security = $security;
    }


    public function __invoke(Request $request): Images
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $mediaObject = new Images();
        $mediaObject->setImageFile($uploadedFile);
        return $mediaObject;
    }
}
