<meta charset="utf-8">

[TOC]

Club-Cockpit
-------------

Im Club-Cockit können Club-Vertreter folgende Information verarbeiten:

* Eigene Daten
* Clubdaten
* Veranstaltungen
* Abstimmungen


Veranstaltungs-Assistent
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

        Freitext, nicht leer

    * Tanzplatz

        Freitext, nicht leer

    * Postleitzahl

        Freitext, nicht leer

    * Ort

        Freitext, nicht leer

    * Adresse

        Freitext, nicht leer

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
         Mindestens ein Programm

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


Datenaustausch
---

Für den Datenaustausch gibt es definierte Datenschnittstellen.
Das Datenformat ist als [JSON-Schema](http://json-schema.org) definiert, was eine
automatische Prüfung der formellen Korrektheit der Daten ermöglicht.

Für Eventdaten, die von Clubvertretern editiert werden gilt das Schema in
_eventdata.schema_.

Für Daten der EAASDC Buchhaltung gilt das Schema in _eventinternal.schema_.

Für eine Zusammenfassende Übersicht gilt das Schema in _eventsummary.schema_.

Datenabfrage
---

Auf Serverseite gibt es mehrere URLs von denen Daten abgefragt werden können.

#### Nächste Events

Dies liefert ein Zusammenfassung der demnächst anstehenden Events.
Die Abfrage URL ist ```?nextEvents=<integer>```. Als Parameter kann eine Zahl zwischen 0 und 30 angegeben werden, welche die Anzahl der gewünschten
Events angibt. Die Antwort hat das Format, welches in _eventsummary.schema_ definiert ist.

### Events eines Clubs

Dies liefert ein Zusammenfassung der Events eines bestimmten Clubs.
Die Abfrage URL ist ```?clubEvents=<Clubnummer>```. Als Parameter wird die Clubnumer angegeben.
Die Antwort hat das Format, welches in _eventsummary.schema_ definiert ist.

### Details zu einem Event

Dies liefert alle vom Clubvertretern eigegebenen Details zu einem bestimmten Event.
Die Abfrage URL ist ```?eventInfo=<Eventnummer>```. Als Parameter wird die Nummer des Events angegeben.
Die Antwort hat das Format, welches in _eventdata.schema_ definiert ist.

