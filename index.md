---
title: Typed Music Theory
layout: layouts/base.njk
---

<section>

## Building a Music Theory API with Types

</section>

<!-- <section>

## @pianomanfrazier

</section> -->

<section data-background-image="/img/ryan-piano.jpg"></section>

<section data-background-image="/img/piano-flashcards.jpg"></section>

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

<section data-background-image="/img/daumier-chess.jpg"></section>

<!-- <section>

## Recall memory for visually presented chess positions

<small>Frey, P.W. & Adesman, P. Memory & Cognition (1976) 4: 541. https://doi.org/10.3758/BF03213216</small>

</section> -->

<section>

<img src="/img/immortal_game.png" alt="The Immortal Game" width="60%">

</section>

<section>

<img src="/img/blank-chess.png" alt="Blank Chess Board" width="60%">

</section>

<section>

<img src="/img/chess.svg" alt="Chess Figure 1" height="60%">

<small>Frey, P.W. & Adesman, P. Memory & Cognition (1976) 4: 541. https://doi.org/10.3758/BF03213216</small>

</section>

<section data-background-image="/img/frank-violin-sonata.png"></section>

<section data-background-image="/img/frank-violin-sonata-analysis.png"></section>

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

```elm/1,6,7/0,4,5
computeDistance : NoteName -> NoteName -> Int
computeDistance : Note -> Note -> Int
computeDistance note1 note2 =
    let
        n1 = noteNameToInt note1
        n2 = noteNameToInt note2
        n1 = noteNameToInt note1.name + (note1.octave * 7)
        n2 = noteNameToInt note2.name + (note2.octave * 7)
    in
    abs <| n1 - n2
```

</section>

<section>

## Generate an interval

```elm
getBasicInterval : Note -> Int -> Note
getBasicInterval note interval =
    ...
```

</section>

<section>

```elm
middleC =
    { name : C
    , octave : 1
    }
interval = 3
getBasicInterval middleC interval == Note E 4
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

{% include 'fsharp.svg' %}

</section>

<section>

## Major and minor

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
accidentalToHalfStep : Accidental -> Int
accidentalToHalfStep accidental =
    case accidental of
        Sharp -> 1

        None -> 0

        Flat -> -1

        ...
```

</section>


<section>

```elm
noteToHalfStep : Note -> Int
noteToHalfStep note =
    noteNameToHalfStep note.name +
    accidentalToHalfStep note.accidental +
    note.octave * 12
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
computeInterval : Note -> Note -> (Quality, Int)
computeInterval note1 note2 =
    let
        halfSteps =
            abs <| noteToHalfStep note1 - noteToHalfStep note2
        
        letterDistance = 
            computeDistance note1 note2
    in
```

</section>

<section>

```elm
    case letterDistance + 1 of
        3 ->
            case halfSteps of
                3 -> (Minor, letterDistance + 1)
                4 -> (Major, letterDistance + 1)
        ...
```

</section>

<section>

## What about a 10^th^?

</section>

<section>

## Mod Arithmetic 

```elm/1,5/0,4
    case letterDistance + 1 of
    case (modBy 7 letterDistance) + 1 of
        3 ->
            case halfSteps of
            case modBy 12 halfSteps of
                3 -> (Minor, letterDistance + 1)
                4 -> (Major, letterDistance + 1)
```

</section>

<section>

## Generate Full Interval

```elm
getInterval : Note -> (Quality, Int) -> Note
getInterval note (quality, interval) =
    ...
```

</section>

<section>

```elm
middleC =
    { name : C
    , accidental : None
    , octave : 4
    }
interval = (Minor, 3)
getInterval middleC interval == Note E Flat 4
```

</section>

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

## What's next?

<ul>
    <li class="fragment">Harmonic Analysis (music)</li>
    <li class="fragment">Music Generation</li>
    <li class="fragment">Typed Theory Backend (Rust or Haskell)</li>
    <!-- <li class="fragment">LilyPond parser & type setting</li> -->
</ul>

</section>

<section>

### <a href="https://app.knowyourtheory.com" target="_blank">app.knowyourtheory.com</a>

### @pianomanfrazier

</section>
