---
title: Typed Music Theory
layout: layouts/base.njk
---

<section>

## Building a Music Theory API with Types

</section>

<section>

## @pianomanfrazier

<aside class="notes">

- who I am
- Twitter, Github, blog at pianomanfrazier.com

</aside>

</section>

<section>

# My Problem

</section>

<section>

# Note Flashcards

</section>

<section>

## Note Type

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

## Render Notes

```elm
renderNotes : List NoteName -> Html msg
renderNotes notes =
    svg [...] [...]
```

</section>

{% from 'macros.njk' import inlineElm %}

<section>

### Note Flashcards

{{ inlineElm('notes', 'Notes') }}

</section>

<section>

# Intervals

</section>

<section>

```elm
noteNameToInt : NoteName -> Int
noteNameToInt note =
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

## Compute Distance

```elm
computeDistance : NoteName -> NoteName -> Int
computeDistance note1 note2 =
    let
        n1 = noteNameToInt note1
        n2 = noteNameToInt note2
    in
    abs <| n1 - n2
```
</section>

<section>

## What about the octave?

</section>

<section>

## Note Record 

```elm
type alias Note =
    { name : NoteName
    , octave : Int
    }
```
</section>

<section>

## New Distance Function

```elm/1,5,7/0,4,6
computeDistance : NoteName -> NoteName -> Int
computeDistance : Note -> Note -> Int
computeDistance note1 note2 =
    let
        n1 = noteNameToInt note1
        n1 = noteNameToInt note1.name + note1.octave * 7
        n2 = noteNameToInt note2
        n2 = noteNameToInt note2.name + note2.octave * 7
    in
    abs <| n1 - n2
```

</section>

<section>

### Interval Flashcards

{{ inlineElm('basicintervals', 'IntervalBasics') }}

</section>

<section>

# Black keys?

</section>

<section>

## New Note Record

```elm/2/
type alias Note =
    { name : NoteName
    , accidental : Accidental
    , octave : Int
    }
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

{% include 'fsharp.svg' %}

</section>

<section>

## Major and minor intervals

</section>

<section>

```elm
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

```elm
type Quality
    = Minor
    | Major
    ...
```

</section>

<section>

## TODO: show math to compute quality

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
getTriad : Note -> Quality -> List Note
getTriad root quality =
    case quality of
        Major ->
            [ root
            , getInterval root Major 3
            , getInterval root Perfect 5
            ]
        ...
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
    = Dominant
    ...
```

</section>

<section>

```elm
getSeventhChord : Note -> Quality7 -> List Note
getSeventhChord root quality =
    case quality of
        Dominant ->
            getTriad root Maj ++ [ getInterval root Min 7 ]
        ...
```

</section>

<section>

### Seventh Chord Flashcards

{{ inlineElm('sevenths', 'Sevenths') }}

</section>

<section>

## What's next?

<ul>
    <li class="fragment">Harmonic Analysis</li>
    <li class="fragment">Music Generation</li>
    <li class="fragment">LilyPond parser & type setting</li>
    <li class="fragment">Typed Theory Backend (Rust or Haskell)</li>
</ul>

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
