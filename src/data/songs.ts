export interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  chords: string[];
  progression: string;
  chordSheet?: string;
  youtubeId?: string;
}

export const SONGS: Song[] = [
  {
    id: 'riptide',
    title: 'Riptide',
    artist: 'Vance Joy',
    difficulty: 'Beginner',
    chords: ['Am', 'G', 'C'],
    progression: 'Am → G → C',
    youtubeId: 'UFBFp6do9WE',
    chordSheet: `[Intro]
Am  G  C  Am  G  C

[Verse 1]
Am              G                C
I was scared of dentists and the dark
Am              G                C
I was scared of pretty girls and starting conversations
    Am     G                   C
Oh, all my friends are turning green
           Am            G              C
You're the magician's assistant in their dreams

[Pre-Chorus]
Am   G    C
Ooh, ooh, ooh
Am   G             C
Ooh, ooh, and they come unstuck

[Chorus]
Am    G                   C
Lady, running down to the riptide, taken away
       Am         G               C
To the dark side, I wanna be your left hand man
  Am       G                        C
I love you when you're singing that song, and I got a lump
      Am             G                     C
In my throat, 'cause you're gonna sing the words wrong

[Verse 2]
Am                 G                   C
There's this movie that I think you'll like
     Am             G                C
This guy decides to quit his job and heads to New York City
     Am       G            C
This cowboy's running from himself
    Am                G              C
And she's been living on the highest shelf

[Pre-Chorus]
Am   G    C
Ooh, ooh, ooh
Am   G             C
Ooh, ooh, and they come unstuck

[Chorus]
Am    G                   C
Lady, running down to the riptide, taken away
       Am         G               C
To the dark side, I wanna be your left hand man
  Am       G                        C
I love you when you're singing that song, and I got a lump
      Am             G                     C
In my throat, 'cause you're gonna sing the words wrong`
  },
  {
    id: 'im-yours',
    title: "I'm Yours",
    artist: 'Jason Mraz',
    difficulty: 'Beginner',
    chords: ['C', 'G', 'Am', 'F'],
    progression: 'C → G → Am → F',
    youtubeId: '5l2ASKiFlF8',
    chordSheet: `[Intro]
C  G  Am  F

[Verse 1]
       C
Well, you done done me in, you bet I felt it
   G
I tried to be chill but you're so hot that I melted
   Am
I fell right through the cracks, and I'm trying to get back

[Verse 2]
       C
Before the cool done run out I'll be giving it my best test
    G
And nothing's gonna stop me but divine intervention
  Am
I reckon it's again my turn to win some or learn some

[Chorus]
    C  G
But I won't hesitate no more,
            Am  F
No more, it cannot wait I'm yours

[Interlude]
C  G  Am  F

[Verse 3]
C
Well open up your mind and see like me
G
Open up your plans and damn you're free
Am  F
Look into your heart and you'll find love love love love love

C
Listen to the music of the moment people dance and sing
G
We are just one big family
Am  F
It's your god forsaken right to be loved loved loved loved

[Chorus]
    C  G
So, I won't hesitate no more,
         Am  F
No more, it cannot wait I'm sure
C  G
There's no need to complicate our time is short
Am  F
This is our fate, I'm yours`
  },
  {
    id: 'somewhere-over-rainbow',
    title: 'Somewhere Over the Rainbow',
    artist: 'Israel Kamakawiwoʻole',
    difficulty: 'Intermediate',
    chords: ['C', 'Em', 'Am', 'F', 'G'],
    progression: 'C → Em → Am → F → G',
    youtubeId: 'O1Adut2d9Pk',
    chordSheet: `[Intro]
C  G  Am  F  x2

[Verse 1]
C         Em                F       C
Somewhere over the rainbow, way up high
F       C                        G            Am  F
And the dreams that you dream of once in a lullaby...

C         Em                F         C
Oh, somewhere over the rainbow, bluebirds fly
F       C                         G                   Am   F
And the dreams that you dream of, dreams really do come true...

[Verse 2]
C
Someday I'll wish upon a star,
G                                Am   F
Wake up where the clouds are far behind me
      C
Where trouble melts like lemon drops
G                                  Am           F
High above the chimney tops that's where you'll find me

[Verse 3]
C         Em               F           C
Oh, somewhere over the rainbow, bluebirds fly
F       C                           G               Am  F
And the dreams that you dare to, oh why, oh why can't I?...

[Coda]
C     Em    F     C
Oooo, oooo, oooo, oooo
F     E7    Am    F
Oooo, oooo, oooo, oooo`
  },
  {
    id: 'stand-by-me',
    title: 'Stand By Me',
    artist: 'Ben E. King',
    difficulty: 'Beginner',
    chords: ['C', 'Am', 'F', 'G'],
    progression: 'C → Am → F → G',
    youtubeId: 'f1Utxv8NQ4k',
    chordSheet: `[Intro]
C  Am  F  G  C

[Verse 1]
C                    Am
When the night has come and the land is dark
      F           G               C
And the moon is the only light we'll see
C
No I won't be afraid, oh I won't be afraid
      F           G               C
Just as long as you stand, stand by me

[Chorus]
       C                  Am
So darlin', darlin', stand by me, oh stand by me
       F           G               C
Oh stand, stand by me, stand by me

[Verse 2]
       C
If the sky that we look upon
       F           G
Should tumble and fall
       F                G
Or the mountains should crumble to the sea
       C
I won't cry, I won't cry, no I won't shed a tear
       F           G               C
Just as long as you stand, stand by me

[Chorus]
       C                  Am
And darlin', darlin', stand by me, oh stand by me
       F           G               C
Oh stand now, stand by me, stand by me

[Interlude]
C  Am  F  G  C
C  Am  F  G  C

[Bridge]
       C                          Am
Whenever you're in trouble just stand by me
       F        G          C
Oh stand by me, woa stand now oh stand, stand by me`
  },
  {
    id: 'count-on-me',
    title: 'Count on Me',
    artist: 'Bruno Mars',
    difficulty: 'Beginner',
    chords: ['C', 'Em', 'Am', 'F', 'G', 'Dm'],
    progression: 'C → Em → Am → F → G',
    youtubeId: '6ghUR0d0wBg',
    chordSheet: `[Intro]
C

[Verse 1]
C                                              Em
If you ever find yourself stuck in the middle of the sea,
      Am            G     F
I'll sail the world       to find you

C                                                 Em
If you ever find yourself lost in the dark and you can't see,
     Am           G      F
I'll be the light       to guide you

[Pre-Chorus]
Dm                       Em
    Find out what we're made of
F                                         G
When we are called to help our friends in need

[Chorus]
        C               Em
You can count on me like 1, 2, 3
     Am       G
I'll be there
F                                 C              Em
And I know when I need it I can count on you like 4, 3, 2
           Am       G
And you'll be there
  F                                               C
'Cause that's what friends are supposed to do, oh yeah

[Verse 2]
C                                                         Em
If you're tossin' and you're turnin' and you just can't fall asleep,
      Am          G     F
I'll sing a song        beside you

C                                         Em
And if you ever forget how much you really mean to me,
     Am      G           F
Everyday       I will remind you, oh

[Chorus]
        C               Em
You can count on me like 1, 2, 3
     Am       G
I'll be there
F                                 C              Em
And I know when I need it I can count on you like 4, 3, 2
           Am       G
And you'll be there
  F                                               C
'Cause that's what friends are supposed to do, oh yeah

[Bridge]
       C                        Am
You'll always have my shoulder when you cry
       F              G
I'll never let go, never say goodbye

[Final Chorus]
        C               Em
You can count on me like 1, 2, 3
     Am       G
I'll be there
F
'Cause that's what friends are supposed to do`
  },
  {
    id: 'hallelujah',
    title: 'Hallelujah',
    artist: 'Leonard Cohen',
    difficulty: 'Intermediate',
    chords: ['C', 'Am', 'F', 'G'],
    progression: 'C → Am → F → G',
    youtubeId: 'zsVvdEE6EOA',
    chordSheet: `[Intro]
C  Am  C  Am

[Verse 1]
       C                      Am
Well, I've heard there was a secret chord
       C                  Am
That David played, and it pleased the Lord
    F                  G            C  G
But you don't really care for music, do ya?
       C
It goes like this, the fourth, the fifth
       Am              F              G
The minor fall and the major lift
       C              Am      F      G
The baffled king composing halle-lu-jah

[Chorus]
    F                    Am
Hal-le-lu-jah, hal-le-lu-jah
    F                    C     G
Hal-le-lu-jah, hal-le-luu-jah

[Verse 2]
       C                      Am
Your faith was strong but you needed proof
       C                  Am
You saw her bathing on the roof
    F                  G            C  G
Her beauty and the moonlight overthrew ya
       C
She tied you to a kitchen chair
       Am              F              G
She broke your throne, and she cut your hair
       C              Am      F      G
And from your lips she drew the halle-lu-jah

[Chorus]
    F                    Am
Hal-le-lu-jah, hal-le-lu-jah
    F                    C     G
Hal-le-lu-jah, hal-le-luu-jah

[Verse 3]
       C                      Am
Maybe there's a God above
       C                  Am
But all I ever learned from love
    F                  G            C  G
Was how to shoot at someone who outdrew ya
       C
And it's not a cry that you hear at night
       Am              F              G
It's not some pilgrim who's seen the light
       C              Am      F      G
It's a cold and it's a very broken halle-lu-jah

[Chorus]
    F                    Am
Hal-le-lu-jah, hal-le-lu-jah
    F                    C     G
Hal-le-lu-jah, hal-le-luu-jah

[Verse 4]
       C                      Am
I did my best, it wasn't much
       C                  Am
I couldn't feel so I tried to touch
    F                  G            C  G
I've told the truth, I didn't come to fool ya
       C
And even though it all went wrong
       Am              F              G
I'll stand before the Lord of Song
       C              Am      F      G
With nothing on my tongue but halle-lu-jah

[Chorus]
    F                    Am
Hal-le-lu-jah, hal-le-lu-jah
    F                    C     G
Hal-le-lu-jah, hal-le-luu-jah
    F                    Am
Hal-le-lu-jah, hal-le-lu-jah
    F                    C     G
Hal-le-lu-jah, hal-le-luu-jah`
  },
  {
    id: 'cant-help-falling-in-love',
    title: "Can't Help Falling in Love",
    artist: 'Elvis Presley',
    difficulty: 'Advanced',
    chords: ['C', 'Em', 'Am', 'F', 'G', 'B7', 'A7', 'Dm'],
    progression: 'C → Em → Am → F → G',
    youtubeId: 'oILIeBW7RF0',
    chordSheet: `[Intro]
C  Em  Am  F  C  G

[Verse 1]
C     Em  Am           F
Wise men say, only fools rush in
    C     G
But I can't help falling in love with you

C     Em  Am           F
Shall I stay, would it be a sin?
    C     G
If I can't help falling in love with you

[Chorus]
Em              B7   Em              B7
Like a river flows surely to the sea
Em              B7
Darling so it goes
A7                   Dm   G
Some things are meant to be

[Verse 2]
C     Em  Am           F
Take my hand, take my whole life too
    C     G
For I can't help falling in love with you

[Chorus]
Em              B7   Em              B7
Like a river flows surely to the sea
Em              B7
Darling so it goes
A7                   Dm   G
Some things are meant to be

[Outro]
    C     G
For I can't help falling in love
    C     G
With you`
  },
  {
    id: 'knockin-on-heavens-door',
    title: "Knockin' on Heaven's Door",
    artist: 'Bob Dylan',
    difficulty: 'Beginner',
    chords: ['G', 'D', 'Am', 'C'],
    progression: 'G → D → Am',
    youtubeId: 'tH8pRw8m47o',
    chordSheet: `[Intro]
G  D  Am  G  D  C

[Verse 1]
G                   D        Am
Mama, take this badge off of me
G       D       C
I can't use it anymore
G                 D            Am
It's gettin' dark, too dark to see
G                 D                   C
I feel like I'm knockin' on heaven's door

[Chorus]
G                   D        Am
Knock, knock, knockin' on heaven's door
G          D       C
Knock, knock, knockin' on heaven's door
G                   D        Am
Knock, knock, knockin' on heaven's door
G             D                  C
Knock, knock, knockin' on heaven's door

[Verse 2]
G                   D        Am
Mama, put my guns in the ground
G       D       C
I can't shoot them anymore
G                 D            Am
That long black cloud is comin' down
G                 D                   C
I feel like I'm knockin' on heaven's door

[Chorus]
G                   D        Am
Knock, knock, knockin' on heaven's door
G          D       C
Knock, knock, knockin' on heaven's door
G                   D        Am
Knock, knock, knockin' on heaven's door
G             D                  C
Knock, knock, knockin' on heaven's door`
  },
  {
    id: 'let-her-go',
    title: 'Let Her Go',
    artist: 'Passenger',
    difficulty: 'Advanced',
    chords: ['C', 'G', 'Am', 'F', 'Em', 'D', 'Bm'],
    progression: 'C → G → Am → F',
    youtubeId: 'iyVjRMOY2HI',
    chordSheet: `[Intro]
C  G  Am  F  x2

[Chorus]
                       C                       G
Well, you only need the light when it's burning low
              D                     Em
Only miss the sun when it starts to snow
               C                         G   D
Only know you love her when you let her go

                       C                       G
Only know you've been high when you're feeling low
              D                     Em
Only hate the road when you're missin' home
               C                         G   D
Only know you love her when you let her go

And you let her go

[Verse 1]
Em                           C
Staring at the bottom of your glass
       D                            Bm
Hoping one day you'll make a dream last
                 Em               C       D
But dreams come slow and they go so fast

     Em                         C
You see her when you close your eyes
      D                          Bm
Maybe one day you'll understand why
                Em           C     D
Everything you touch, it dies

[Chorus]
                       C                       G
But you only need the light when it's burning low
              D                     Em
Only miss the sun when it starts to snow
               C                         G   D
Only know you love her when you let her go

[Bridge]
And you let her go
Em  C  D
Ooh, ooh, ooh
And you let her go
Em  C  D
Ooh, ooh, ooh`
  },
  {
    id: 'happy',
    title: 'Happy',
    artist: 'Pharrell Williams',
    difficulty: 'Beginner',
    chords: ['F', 'G', 'Am'],
    progression: 'F → G → Am',
    youtubeId: 'pPUKsvEp_hs',
    chordSheet: `[Intro]
F  G  Am  F

[Verse 1]
F
It might seem crazy what I'm 'bout to say
F
Sunshine she's here, you can take a break
F
I'm a hot air balloon that could go to space
F
With the air, like I don't care, baby, by the way

[Chorus]
                G
Because I'm happy
                        Am
Clap along if you feel like
          F
A room without a roof
                G
Because I'm happy
                        Am
Clap along if you feel like
          F
Happiness is the truth
                G
Because I'm happy
                        Am
Clap along if you know what
          F
Happiness is to you
                G
Because I'm happy
                        Am
Clap along if you feel like
          F
That's what you wanna do

[Verse 2]
F
Here come bad news talking this and that
F
Well, give me all you got, and don't hold it back
F
Well, I should probably warn you I'll be just fine
F
No offense to you, don't waste your time
Here's why

[Chorus]
                G
Because I'm happy
                        Am
Clap along if you feel like
          F
A room without a roof
                G
Because I'm happy
                        Am
Clap along if you feel like
          F
Happiness is the truth
                G
Because I'm happy
                        Am
Clap along if you know what
          F
Happiness is to you
                G
Because I'm happy
                        Am
Clap along if you feel like
          F
That's what you wanna do`
  }
];

export function getSongById(id: string): Song | undefined {
  return SONGS.find(song => song.id === id);
}