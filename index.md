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

# Why It Matters

</section>


<section>

# Types

</section>

<section>

## Note Name

```elm
type NoteName
  = A
  | B          
  | C
  | D
  | E
  | F
  | G
```
</section>

<section>

## Accidental

```elm
type Accidental
  = Sharp
  | None
  | Flat
  ...
```
</section>

<section>

## Note Record

```elm
{-| Middle C == Note C 4 None
-}
type alias Note =
  { name : NoteName
  , accidental : Accidental
  , octave : Int
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

{% include 'middleC.svg' %}

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
      , Random.generate NewClef <| Random.Array.sample <| Array.fromList clefPool
      )

    NewClef clef ->
      ( { model | clef = clef }
      , Random.generate NewNote <| Random.Array.sample <| Array.fromList (clefNoteRange clef)
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
    = Minor
    | Major
    ...
```

</section>

<section>

```elm
{-| IntervalName Major 6
-}
type alias IntervalName =
    { quality : Quality, interval : Int 
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
        A -> 5
        B -> 6
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
        A -> 9
        B -> 11
```

</section>


<section>

```elm
{-| Given a NoteName and an accidental return absolute half step count
  -}
  adjustHalfStepAccidental : NoteName -> Accidental -> Int
  adjustHalfStepAccidental note accidental =
      case accidental of
          Sharp -> noteNameToHalfStep note + 1

          None -> noteNameToHalfStep note

          Flat -> noteNameToHalfStep note - 1

          ...
```

</section>

<section>

### Interval Flashcards

{{ inlineElm('intervals', 'Intervals') }}

</section>

<section>

# Triads

</section>

<section>

```elm
{-|
getTriad (Note C 1 None) Major ==
  [ Note C 1 None, Note E 1 None, Note G 1 None ] 
-}
getTriad : Note -> Quality -> List Note
getTriad root quality =
    case quality of
        Diminished -> [ root, getNote Min 3, getNote Dim 5 ]

        Minor -> [ root, getNote Min 3, getNote Perfect 5 ]

        Major -> [ root, getNote Maj 3, getNote Perfect 5 ]

        Augmented -> [ root, getNote Maj 3, getNote Aug 5 ]

        Perfect -> []
```

</section>

<section>

### Triad Flashcards

{{ inlineElm('triads', 'Triads') }}

</section>

<section>

# 7^th^ Chords

</section>

<section>

```elm
type Quality7
    = FullDim
    | HalfDim
    | Dominant
    | MinMaj
    | MajMaj
    | MinMin
```

</section>

<section>

```elm
getSeventhChord : Note -> Quality7 -> List Note
getSeventhChord root quality =
    case quality of
        FullDim -> getTriad root Dim ++ [ getNote Dim 7 ]

        HalfDim -> getTriad root Dim ++ [ getNote Min 7 ]

        MinMin -> getTriad root Min ++ [ getNote Min 7 ]

        MinMaj -> getTriad root Min ++ [ getNote Maj 7 ]

        MajMaj -> getTriad root Maj ++ [ getNote Maj 7 ]

        Dominant -> getTriad root Maj ++ [ getNote Min 7 ]
```

</section>

<section>

### Seventh Chord Flashcards

{{ inlineElm('sevenths', 'Sevenths') }}

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
