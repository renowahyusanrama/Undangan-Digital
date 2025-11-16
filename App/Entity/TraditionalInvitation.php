<?php

namespace App\Entity;

class TraditionalInvitation extends Invitation
{
    private string $dressCode;

    public function __construct(
        string $coupleNames,
        string $date,
        string $location,
        string $theme,
        ?string $guestName = null,
        string $dressCode = 'Batik / Formal'
    ) {
        parent::__construct($coupleNames, $date, $location, $theme, $guestName);
        $this->dressCode = $dressCode;
    }

    public function renderBody(): string
    {
        return sprintf(
            "Undangan Tradisional Gold untuk %s pada %s di %s.\nTema: %s | Dress code: %s\n",
            $this->getCoupleNames(),
            $this->getDate(),
            $this->getLocation(),
            $this->getTheme(),
            $this->dressCode
        );
    }

    public function getDressCode(): string
    {
        return $this->dressCode;
    }
}

