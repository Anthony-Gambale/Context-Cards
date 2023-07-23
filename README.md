# context-cards

SRS for learning languages. You can

- Search Tatoeba example sentence database
- Create sentence cards in one click
- Export cards to Anki in one click
- Synchronise cards between devices in real time

![Demonstration of search and exporting to Anki](src/assets/demonstration.png)

The SRS uses a rudimentary algorithm involving two piles, a weak and strong pile. When reviewing, you will be shown cards from the weak pile first. Once you move all of the cards from the weak pile to the strong pile, you will be shown cards from the strong pile. As you forget cards, they will be moved back into the weak pile. Reviewing will switch from the strong pile back to the weak pile when it has grown to at least 5 cards.

![Explanation of SRS algorithm](src/assets/SRS_algorithm.svg)

