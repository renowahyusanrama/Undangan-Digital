<?php

require_once __DIR__ . '/App/Entity/Invitation.php';
require_once __DIR__ . '/App/Entity/MinimalInvitation.php';
require_once __DIR__ . '/App/Entity/TraditionalInvitation.php';
require_once __DIR__ . '/App/Service/InvitationManager.php';

use App\Entity\MinimalInvitation;
use App\Entity\TraditionalInvitation;
use App\Service\InvitationManager;

echo "=== CODELAB OOP UNDANGAN DIGITAL ===\n\n";

echo "1. Membuat Invitation:\n";

$minimalInvitation = new MinimalInvitation(
    'Reno & Diva',
    'Senin, 2 Februari 2026',
    'Universitas Muhammadiyah Malang (UMM)',
    'Minimal Olive',
    'Budi'
);

echo '   ' . $minimalInvitation . "\n\n";

echo "2. Menggunakan Method dan Object Operator:\n";

echo '   Nama Tamu (public property): ' . $minimalInvitation->guestName . "\n";
echo '   Nama Tamu (method)        : ' . $minimalInvitation->getGuestName() . "\n";
echo '   Lokasi                    : ' . $minimalInvitation->getLocation() . "\n";
echo '   Tanggal                   : ' . $minimalInvitation->getDate() . "\n";
echo '   Tema                      : ' . $minimalInvitation->getTheme() . "\n";
echo '   Slug Tema (magic __get)   : ' . $minimalInvitation->slug . "\n\n";

$minimalInvitation->slug = 'minimal-olive-reno-diva';
echo '   Slug setelah __set        : ' . $minimalInvitation->slug . "\n\n";

echo "3. Inheritance (MinimalInvitation & TraditionalInvitation extends Invitation):\n";

echo "   Undangan Minimal:\n";
echo '   ' . $minimalInvitation->renderBody() . "\n";

$traditionalInvitation = new TraditionalInvitation(
    'Reno & Diva',
    'Senin, 2 Februari 2026',
    'Universitas Muhammadiyah Malang (UMM)',
    'Tradisional Gold',
    'Sari',
    'Batik modern'
);

echo "   Undangan Tradisional:\n";
echo '   ' . $traditionalInvitation->renderBody() . "\n";

echo "4. InvitationManager:\n";

$manager = new InvitationManager();
$manager->addInvitation($minimalInvitation);
$manager->addInvitation($traditionalInvitation);
$manager->displayAll();

echo 'Total undangan: ' . $manager() . "\n";
