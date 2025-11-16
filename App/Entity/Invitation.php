<?php

namespace App\Entity;

abstract class Invitation
{
    protected string $coupleNames;
    protected string $date;
    protected string $location;
    protected string $theme;

    private string $slug;

    public ?string $guestName;

    public function __construct(
        string $coupleNames,
        string $date,
        string $location,
        string $theme,
        ?string $guestName = null
    ) {
        $this->coupleNames = $coupleNames;
        $this->date = $date;
        $this->location = $location;
        $this->theme = $theme;
        $this->guestName = $guestName;
        $this->slug = strtolower(str_replace(' ', '-', $theme));
    }

    public function __toString(): string
    {
        return sprintf(
            'Undangan: %s | Tema: %s | Tanggal: %s | Lokasi: %s | Tamu: %s',
            $this->coupleNames,
            $this->theme,
            $this->date,
            $this->location,
            $this->guestName ?? 'Tamu Istimewa'
        );
    }

    public function __get(string $name)
    {
        if ($name === 'slug') {
            return $this->slug;
        }

        return null;
    }

    public function __set(string $name, $value): void
    {
        if ($name === 'slug') {
            $this->slug = (string) $value;
        }
    }

    public function setGuestName(string $guestName): void
    {
        $this->guestName = $guestName;
    }

    public function getGuestName(): string
    {
        return $this->guestName ?? 'Tamu Istimewa';
    }

    public function getDate(): string
    {
        return $this->date;
    }

    public function getLocation(): string
    {
        return $this->location;
    }

    public function getTheme(): string
    {
        return $this->theme;
    }

    public function getCoupleNames(): string
    {
        return $this->coupleNames;
    }

    abstract public function renderBody(): string;
}
