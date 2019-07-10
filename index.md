---
title: Typed Music Theory
layout: layouts/base.njk
---

<section>

## Building a Music Theory API with Types 

</section>

<section>

## @pianomanfrazier

</section>

<section>

# My Problem

</section>

<section>

{% include "middleC.svg" %}

</section>

<section>

# Types

</section>

<section>

## Note Name

```elm
type NoteName
  = C
  | D
  | E
  | F
  | G
  | A
  | B          
```
</section>

<section>

## Accidental

```elm
type Accidental
  = DoubleSharp
  | Sharp
  | Natural
  | None
  | Flat
  | DoubleFlat
```
</section>

<section>

## Note Record

```elm
type alias Note =
  { name : NoteName
  , octave : Int
  , accidental : Accidental
  }
```
</section>

<section>

## Render Notes

```elm
renderNotes : List Note -> Clef -> Html msg
renderNotes notes clef =
  svg [...] [...]
```

```elm
renderNotes [ Note C 4 None ] Treble
```
</section>

<section>

# Random

</section>

<section>

## Random Precedence

1. Clef
2. Note from clef range
</section>

<section>

## Random Precendence
 
```elm
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    GetRandomClef ->
      ( model
      , Random.generate NewClef clefPool
      )

    NewClef clef ->
      ( { model | clef = clef }
      , Random.generate NewNote (clefNoteRange clef)
      )

    NewNote note ->
      ( { model | note = note }, Cmd.none )
```
</section>

{% from 'macros.njk' import inlineElm %}

<section>

### Note Flashcards

{{ inlineElm('notes', 'Notes') }}

</section>

<section>

### Interval Flashcards

{{ inlineElm('intervals', 'Intervals') }}

</section>

<section>

### Triad Flashcards

{{ inlineElm('triads', 'Triads') }}

</section>

<section>

### Seventh Chord Flashcards

{{ inlineElm('sevenths', 'Sevenths') }}

</section>

<section>

# Intervals

</section>

<section>

# Triads

</section>

<section>

# 7^th^ Chords

</section>

<section>

{% include "dominant.svg" %}

</section>

<section
data-background="/img/a_mess_of_cards_by_objekt_stock.jpg"
>

<h1 style="background: rgba(255,255,255,0.9); border-radius: 16px;">
Flash Cards
</h1>

</section>
<section
data-background="https://api.thecatapi.com/v1/images/search?format=src&mime_types=image/gif"
>

<h1 style="background: rgba(255,255,255,0.5); border-radius: 16px;">
Random Cat Pic
</h1>

</section>
