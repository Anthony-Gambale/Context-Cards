# context-cards

SRS for learning languages. You can

- Search Tatoeba example sentence database
- Create sentence cards in one click
- Export cards to Anki in one click
- Synchronise cards between devices in real time (not complete)

![Demonstration of search and exporting to Anki](src/assets/demonstration.png)

## SRS Algorithm

We use a basic SRS algorithm involving a discrete number of piles, as shown below. The pile number indicates how well the user has memorised the cards within that pile.  
At the moment, the algorithm simply shows cards from the leftmost piles until they are emptied, in which case it moves on to show subsequent piles. In future, this should be replaced with an algorithm that interleaves visits to each pile, placing more emphasis on earlier ones.

![SRS algorithm drawin](src/assets/SRS_algorithm.svg)

