<?php

namespace App\Service;

use App\Entity\Invitation;

class InvitationManager
{
    /** @var Invitation[] */
    private array $invitations = [];

    public function addInvitation(Invitation $invitation): void
    {
        $this->invitations[] = $invitation;
    }

    public function displayAll(): void
    {
        echo "=== DAFTAR UNDANGAN ===\n\n";

        $index = 1;
        foreach ($this->invitations as $invitation) {
            echo $index . '. ' . $invitation . "\n";
            $index++;
        }

        echo "\n";
    }

    public function __invoke(): int
    {
        return count($this->invitations);
    }
}

