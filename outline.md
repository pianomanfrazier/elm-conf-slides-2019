# Talk Outline

 - Statement of Problem (3 min)
   - context
   - my background as a musician
   - need for better theory tools

 - Note Flashcards (5 min)
   - note names as types (show code)
   - render note name (+ octave) as offset in context of clef (bass,treble,alto,...)
   - Show some drawn notes (C 4 i.e. middle C drawn in bass, treble, and alto clefs)
   - need random notes for drilling

 - The Elm Random API (7 min)
   - generating random notes requires precedence
   - first need random clef (Array.sample [Bass,Treble,Alto,Tenor])
   - then need random note from clef range (use Array.sample <| clefRange clef)
   - Walk through code (Random in Cmd Msg forces good structure, easy to debug)
   - Elm Random important for more complex theory generated exercises (more precedence rules)

 - What About Interval Flashcards? (3 min)
   - define the problem
   - need to define relationship between 2 notes (show examples on piano keyboard)
   - note Type needs concept of sharps, flats, double sharps, double flats
   - version 2 of Note Type and Records (Note A 4 Sharp)
   - need for theory engine

 - Building a Theory Engine (5 min)
   - Discuss other Theory APIs in python and JS
   - example: define 7th chord in 3rd inversion in different libraries
   - compare 7th chord example with my proposed Elm Theory API
   - The problems Elm solves

 - Interval,Triad, and Seventh Chord Flashcards (3 min)
   - With Theory API in place can now process:
     - intervals, triads, 7th chords
     - chords are constructed of intervals, so small step after intervals are working
     - Demo triad inversion flashcards
     - Demo 7th chord inversion flashcards

 - Conclusion (2 min)
   - Types a nice way to model problem domain
   - Elm Random encourages maintainable and debuggable code
