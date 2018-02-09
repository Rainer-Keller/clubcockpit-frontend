<meta charset="utf-8">

[TOC]

Club-Cockpit
-------------

Im Club-Cockit können Club-Vertreter folgende Information verarbeiten:

* Eigene Daten
* Clubdaten
* Veranstaltungen
* Abstimmungen


Veranstaltungen eingeben
------------------------

Die Anmeldung eines Events erfolgt schrittweise.

### Schritt 1: Auswahl der Eventart

* Anzeige

    immer

* Eingabefelder

    * Eventart

          Optionen:

          * Special (S)
          * Special Club Night (SCN)
          * Besonderer/verschobener Clubabend (CCN)
          * Workshop (WS)
          * Class (C)

### Schritt 2: Allgemeine Angaben

* Anzeige

    immer

* Eingabefelder

    * Name der Veranstaltung (nicht bei Classes)

        Freitext

    * Tanzplatz

        Freitext

    * Postleitzahl

        Freitext

    * Ort

        Freitext

    * Adresse

        Freitext

    * Land

        Optionen:

        * AT
        * BE
        * CH
        * DE
        * FR
        * LI
        * NL
        * RU
        * SK

### Schritt 3: Veranstaltungsdatum

* Anzeige

    immer

* Eingabefelder

    * Bei S

        ein Datum oder ein von-bis-Datum

    * Bei SCN und CCN

        ein Datum

    * Bei WS

        ein oder mehrere Einzel- oder von-bis-Datumsangaben

    * Bei C

        ein von-bis-Datum

### Schritt 4: Tanzprogramm

* Anzeige

    immer

* Eingabefelder

    * Tanzprogramme

         Freitext mit Auswahlhilfe
         Bei WS, C: nur ein Programm

    * Leader
          Freitext mit Auswahlhilfe

### Schritt 5a: Classangaben

* Anzeige

    bei Class

* Eingabefelder

    * Art der Class

        Optionen

        * Fortgeschrittene Class
        * Beginner Class


    * Open House Termine

        0-4 Open House Termine

    * Wochentag

        Optionen

        * Mo
        * Di
        * Mi
        * Do
        * Fr
        * Sa
        * So
        * an wechselnden Tagen

    * Zeit

        Uhrzeit

    * Class während Clubabend

        Boolean

    * Class endet mit/ohne Graduation

        Boolean

    * Anzahl der Students

        Ganzzahl

### Schritt 5b: CCN

* Anzeige

    bei CCN

* Eingabefelder

    * Datum des Clubabends, der verschoben wird, kann auch leer sein

### Schritt 5c: Workshopangaben

* Anzeige

    bei Workshop

* Eingabefelder

    *  Workshopgröße

        Optionen

          * Workshop Mini
          * Workshop Midi
          * Workshop Maxi
          * Workshop Super

    * Art des Workshops

        Optionen

          * WS für Tänzer
          * WS für Leader
          * Freizeitwochenende

    * Anzahl der Teilnehmer

        Ganzzahl größer als 0.

    * Einnahmen

        Fließkommazahl größer als 0.
        Suffix ist €.

### Schritt 5d: Hallenangaben (bei S)

* Anzeige

    bei Special

* Eingabefelder

    * Angabe einer Hallenanzahl pro Veranstaltungstag, Prüfung auf Ganzzahl zw. 0 und 10

### Schritt 6: GEMA

* Anzeige

    bei S, SCN, CCN, WS

* Eingabefelder

    * GEMA-Deckung anderweitig

        Boolean

* Funktionen

    * Anzeige der errechneten GEMA-Umlage

### Schritt 7: Kontaktdaten

* Anzeige

    immer

* Eingabefelder

    * Ansprechpartner

        Freitext, darf nicht leer sein

    * Email

        Freitext, darf nicht leer sein

    * Telefon

        Freitext, darf nicht leer sein

### Schritt 8: Verföffentlichungen

* Anzeige

    immer

* Eingabefelder

    * Flyer/URL

        _optional_

    * Veröffentlichung im Kalender

        Boolean

### Schritt 9: Zusammenfassung

* Anzeige

    immer

* Eingabefelder

    keine

* Funktionen

    * Anzeige der eingegebenen Daten zur Kontrolle


Datenstruktur
---

Die Übertragung eines Datensatzes in JavaScript oder JSON hat folgende Struktur:

<pre>
```
{
    version: integer, Version der Datensatzstruktur
    type: string, [ "S", "SCN", "CCN", "WS", "C"]
    title: string
    location: {
                  name: string
                  address: string
                  postcode: string
                  city: string
                  country: string, [ "AT", "BE", "CH", "DE", "FR", "LI", "NL", "RU", "SK" ]
    }
    dates: [
             [ date, endDate] // endDate is optional
    ]
    leader: [ string ]
    dancelevels: [ string ]
    class : { // optional
        type: string
        openHouseDates: [ date as string ]
        weekday: string, [ "mo","tu","we","th","fr","sa","su",xx"]
        time: string
        duringClubnight: bool
        endsWithGraduation: bool
        studentCount: integer
    }
    ccn: { // optional
          dateMoved: date as string
    }
    workshop: { // optional
          size: string ["mini", "midi", "maxi", "super]
          type: string ["weekend", "dancer", "leader"]
          participants: integer
          revenue: integer
    }
    special: { // optional
          halls: [ integer ]
    }
    gemaBackingOtherwise: bool
    contact: {
        person: string
        email: string
        phone: string
    }
    publish: {
        url: string
        calendar: bool
    }
}
```
</pre>
