<?php

namespace App\Entity;

class MinimalInvitation extends Invitation
{
    public function renderBody(): string
    {
        return sprintf(
            "Undangan Minimal Olive untuk %s pada %s di %s.\nTema: %s\n",
            $this->getCoupleNames(),
            $this->getDate(),
            $this->getLocation(),
            $this->getTheme()
        );
    }

    public function getThemeName(): string
    {
        return 'Minimal Olive';
    }
}

