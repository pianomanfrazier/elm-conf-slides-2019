---
title: Typed Music Theory
layout: layouts/base.njk
---

<section>

## Building a Music Theory API with Types

	<aside class="notes">
		Oh hey, these are some notes. They'll be hidden in your presentation, but you can see them if you open the speaker notes window (hit »S« on your keyboard).
	</aside>

</section>

<section>

## @pianomanfrazier

</section>

<section>

# My Problem

</section>

<section>

# Previous Work

</section>

<section>

## Teoria.js

```js
// Create notes:
var a4 = teoria.note('a4');       // Scientific notation
var g5 = teoria.note("g''");      // Helmholtz notation
var c3 = teoria.note.fromKey(28); // From a piano key number

// Find and create notes based on intervals
teoria.interval(a4, g5);    // Returns a Interval object representing a minor seventh
teoria.interval(a4, 'M6');  // Returns a Note representing F#5
a4.interval('m3');          // Returns a Note representing C#4
a4.interval(g5);            // Returns a Interval object representing a minor seventh
a4.interval(teoria.note('bb5')).invert(); // Returns a Interval representing a major seventh
```

<small>See https://github.com/saebekassebil/teoria</small>

</section>

<section>

## Tonal.js

```js
import { note, interval, transpose, distance } from "@tonaljs/tonal";

note("A4").midi; // => 60
note("a4").freq; // => 440
note("c#2").accidentals; // => '#'
note("x").midi; // => undefined
interval("5P").semitones; // => 7
transpose("C4", "5P"); // => "G4"
distance("C4", "G4"); // => "5P"
```
<small>See https://github.com/tonaljs/tonal</small>
<em>Version 3 in TypeScript!</em>

</section>

<section>

## Mingus (python)

```python
>>> intervals.minor_second("C")
"Db"
>>> intervals.major_sixth("C")
"A"
>>> chords.minor_triad("C")
["C", "Eb", "G"]
>>> chords.diminished_triad("C")
["C", "Eb", "Gb"]
>>> chords.major_seventh("C")
["C", "E", "G", "B"]
```
<small>See https://bspaans.github.io/python-mingus/</small>

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
 
```elm/5,10
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

# Intervals?

</section>

<section>

# What Is An Interval?

</section>

<section>

```elm
{-| Major Sixth == { number : 6, halfSteps : 9 }
-}
type alias Interval =
    { number : Int, halfSteps : Int }
```

</section>

<section>

```elm
type Quality
    = Diminished
    | Minor
    | Major
    | Augmented
    | Perfect
```

</section>

<section>

## Major = :)

## Minor = :(

</section>

<section>

```elm
{-| get the absolute step id of the note names (i.e. the white keys)
-}
noteNameToStep : NoteName -> Int
noteNameToStep note =
    case note of
        C -> 0
        D -> 1
        E -> 2
        F -> 3
        G -> 4
        ...
```

</section>

<section>

```elm
stepToNoteName : Int -> Maybe NoteName
stepToNoteName step =
    case step of
        0 -> Just C
        1 -> Just D
        2 -> Just E
        3 -> Just F
        4 -> Just G
        ...
        _ -> Nothing

```

</section>

<section>

```elm
{-| get the absolute half step id of the note names (i.e. the white keys)
-}
noteNameToHalfStep : NoteName -> Int
noteNameToHalfStep note =
    case note of
        C -> 0
        D -> 2
        E -> 4
        F -> 5
        G -> 7
        ...
```

</section>


<section>

```elm
{-| Given a NoteName and an accidental return absolute half step count
  -}
  adjustHalfStepAccidental : NoteName -> Accidental -> Int
  adjustHalfStepAccidental note accidental =
      case accidental of
          DoubleFlat -> noteNameToHalfStep note - 2

          Flat -> noteNameToHalfStep note - 1

          Natural -> noteNameToHalfStep note

          None -> noteNameToHalfStep note

          Sharp -> noteNameToHalfStep note + 1

          DoubleSharp -> noteNameToHalfStep note + 2
```

</section>

<section>

### Interval Flashcards

{{ inlineElm('intervals', 'Intervals') }}

</section>

<section>

## Notes as Primitives??? :confused:

</section>

<section>

# A {% include "sharp.svg" %} == B {% include "flat.svg" %}

</section>

<section>

```elm
compareNotes : Note -> Note -> Order
compareNotes note1 note2 =
    let
        n1 =
            noteToInt note1

        n2 =
            noteToInt note2
    in
    compare n1 n2
```
</section>

<section>

```elm
{-| equivalent to (==) note1 note2
-}
notesEQ : Note -> Note -> Bool
notesEQ note1 note2 =
    compareNotes note1 note2 == EQ


{-| equivalent to (<) note1 note2
-}
notesLT : Note -> Note -> Bool
notesLT note1 note2 =
    compareNotes note1 note2 == LT
```

</section>


<section>

# Triads

</section>

<section>

### Triad Flashcards

{{ inlineElm('triads', 'Triads') }}

</section>

<section>

# 7^th^ Chords

</section>

<section>

### Seventh Chord Flashcards

{{ inlineElm('sevenths', 'Sevenths') }}

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
