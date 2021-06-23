<?php


namespace App\Controller;


use App\Entity\Images;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

final class CreateMediaObjectAction
{

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
