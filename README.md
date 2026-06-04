## 🚀 Future Roadmap & Planned Features

### 🧠 Advanced AI & Competitive Logic
- **Ability & Item Intelligence:** The AI engine will read specific Abilities (e.g., *Levitate*, *Intimidate*, *Weather Setters*) and Held Items (e.g., *Choice items*, *Focus Sash*) to dynamically adjust defensive/offensive team synergy scores.
- **Speed Tiering & Speed Control Assessment:** Implement checks for team average speed and recommend *Tailwind*, *Trick Room*, or *Icy Wind* users if the team lacks Speed Control.
- **Entry Hazard Management:** AI recommendations for *Defog / Rapid Spin* users based on the team's vulnerability to Stealth Rock.
- **Archetype Recognition:** Automatic detection of team strategies (Rain, Sun, Trick Room, Hyper Offense) to narrow down and highly target the AI's recommendations.

### ⚔️ Pro-Level Matchup Analytics
- **Meta Threat Integration:** Evaluate the current team build against the Top 10 most used Pokémon in the VGC/OU meta.
- **Precise Damage Calculations:** Upgrade the "Assassin Mode" to display exact Damage % thresholds (OHKO/2HKO chances) against selected opponent targets.


Επιθετική & Αμυντική Συνέργεια (Advanced AI Logic)
Ability Intelligence (Το ανέφερες και είναι το #1):
Αυτή τη στιγμή το AI λέει "Α, του έβαλες Ability, πάρε +40 πόντους". Το επόμενο επίπεδο είναι να καταλαβαίνει τι κάνει το Ability. Π.χ. αν ένα Pokémon έχει Levitate, το AI πρέπει να ξέρει ότι έχει ανοσία στο Ground και να το προτείνει όταν η ομάδα σου "πονάει" από Ground επιθέσεις. Ή αν δει Intimidate (π.χ. Incineroar), να ξέρει ότι η ομάδα σου μόλις έγινε πολύ πιο ανθεκτική σε Physical επιθέσεις.

Item Synergy (Held Items):
Το ίδιο με τα αντικείμενα. Αν το AI δει Choice Band, να ξέρει ότι το Pokémon χρειάζεται μόνο 4 Physical επιθέσεις. Αν δει Leftovers, να δίνει μπόνους σε Tank/Defensive Pokémon. Αν δει Focus Sash, να το προτείνει σε γρήγορα αλλά ευάλωτα (frail) Pokémon.

🟡 Έλεγχος του Field (Field Control & Hazards)
Speed Tiers & Speed Control:
Η ταχύτητα είναι το παν. Το AI θα μπορούσε να υπολογίζει τον "Μέσο Όρο Ταχύτητας" της ομάδας σου. Αν είσαι πολύ αργός, θα σου πετάει Warning: "No Speed Control!" και θα σου προτείνει Pokémon που μαθαίνουν Tailwind (διπλασιάζει την ταχύτητα) ή Trick Room (οι αργοί παίζουν πρώτοι).

Entry Hazard Management:
Στο Singles format, τα Stealth Rock και τα Spikes κρίνουν παιχνίδια. Το AI θα μπορούσε να προτείνει Pokémon με επιθέσεις όπως Rapid Spin ή Defog αν δει ότι η ομάδα σου έχει πολλά Pokémon αδύναμα στο Rock (π.χ. Charizard, Volcarona).

🔴 Meta-Game Integration
Meta-Threat Check (Έλεγχος απέναντι στους Top 10):
Αντί να ελέγχει απλά αδυναμίες σε τύπους (π.χ. "έχεις πρόβλημα με Fire"), το app θα μπορούσε να έχει hardcoded τα 10 πιο παιγμένα Pokémon του Meta (π.χ. Flutter Mane, Ogerpon, Urshifu, Raging Bolt) και να σου βγάζει ένα score: "Η ομάδα σου έχει 80% Win Rate απέναντι στο τρέχον Meta".

Team Archetypes (Αναγνώριση Στρατηγικής):
Αν βάλεις Pelipper (Drizzle), το AI να καταλαβαίνει ότι παίζεις "Rain Team" και να αρχίσει να σου προτείνει αυτόματα Pokémon με abilities όπως Swift Swim (διπλή ταχύτητα στη βροχή) ή επιθέσεις όπως Hurricane (που δεν αστοχεί ποτέ στη βροχή).

🔵 UI/UX "Pro Analytics"
Δυναμικό Damage Calculation (OHKO/2HKO):
Εκεί που προσθέσαμε το Target Mode (Αντίπαλος), αντί το AI απλά να λέει "Το Garchomp είναι Counter", θα μπορούσε μελλοντικά να κάνει τη μαθηματική πράξη και να γράφει δίπλα: [Earthquake -> Charizard: 85% - 100% OHKO Chance]. Δηλαδή να σου λέει ακριβώς πόση ζημιά θα κάνει!
