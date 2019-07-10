---
title: Typed Music Theory
layout: layouts/base.njk
---

<section>

## @pianomanfrazier

</section>

<section>

## Outline

- I'm a pianist, teacher, performer
- taught music theory and private lessons for years
- students failed on fundamentals

</section>

<section>

- fast forward switched careers
- I still teach and perform on the side
- I can now solve this problem

</section>

<section>
  
- release of Elm 19 I tried an experiment
- "Could I make simple flashcards in the browser"
- traditional flashcards problematic
- most apps I would find aren't rigorous enough, didn't fit my needs

</section>

<section>
  
- feeling very encouraged now wanted to do intervals
- now I needed a Theory Engine (a way to compute relationships between notes)

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

```elm/1-2
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
 
```elm/1-4/5-8
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

<section>

## Some JavaScript

```js/3/4-6
import { thingy } from "thing.js"

console.log(thingy())
console.log(`Thingy: ${thingy()}`)

let that = this
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
data-background="https://api.thecatapi.com/v1/images/search?format=src&mime_types=image/gif"
>

</section>
