# Sådan sætter jeg min Code-session op (adsSim)

Reference til at starte en god Code-session på dette projekt. Ligger i repoet, så jeg ikke
skal skifte tilbage til Chat.

## Engangs-forudsætninger (kun første gang)

- **Git for Windows** skal være installeret — ellers starter Code-fanen ikke lokale sessioner
  på Windows. (Jeg har den allerede, siden jeg bruger `git` i terminalen.) Hvis Code klager
  over Git: installér fra git-scm.com/downloads/win og genstart appen.
- **CLAUDE.md** skal ligge i projektroden (`E:/Development/adsSim/CLAUDE.md`, samme niveau
  som `package.json`). Den giver sessionen al projektkontekst automatisk.

## Start en session (hver gang)

1. Klik **Code**-fanen → **+ New session**.
2. Før jeg skriver noget, sætter jeg de fire ting i prompt-feltet:
   - **Environment:** `Local` (kører på min egen maskine, direkte adgang til filerne).
   - **Project folder:** vælg `adsSim`.
   - **Model:** vælg fra dropdownen ved send-knappen (kan skiftes midt i sessionen).
   - **Permission mode:** se næste afsnit — vigtigt for et læringsprojekt.
3. Skriv opgaven, tryk Enter.

## Permission mode — vælg bevidst

Dette er et **læringsprojekt**, så jeg vil se hver ændring, ikke have koden skrevet for mig.

- **Ask permissions** (anbefalet til at starte): Claude spørger før den redigerer filer eller
  kører kommandoer, og jeg ser en diff jeg kan acceptere eller afvise.
- **Plan mode**: Claude læser filer og udforsker, og foreslår en plan UDEN at redigere kode.
  God når jeg vil forstå tilgangen først.
- **Auto accept edits / Auto / Bypass**: hurtigere, men skriver/ændrer selv. **Undgå disse på
  dette projekt** — de modarbejder hele læringsformålet. (Fint til SkanCode-produktivitet.)

Jeg kan skifte mode midt i en session via mode-selektoren ved send-knappen.

## Tjek at sessionen kender projektet

Første prompt i en ny session — bare for at bekræfte at `CLAUDE.md` blev læst:

> "Hvad er det her for et projekt, og hvordan skal du arbejde med mig på det?"

Den skal svare med simulator-visionen OG at det er et læringsprojekt hvor jeg selv skriver
koden. Gør den ikke det, ligger `CLAUDE.md` måske ikke i roden — tjek placeringen.

## Sådan vil jeg arbejde (læringsmodus)

- Jeg skriver komponenterne **selv**. Claude er reviewer og sparringspartner.
- Beder jeg om hjælp, vil jeg have **hints og spørgsmål**, ikke en færdig løsning.
- Når jeg beder om kode: **complete code blocks** og en forklaring af _hvorfor_.
- Rettelser: **minimale, målrettede ændringer** frem for omskrivninger.
- Dialog på **dansk**, tekniske termer på engelsk.

## Nyttige prompts til denne arbejdsform

- "Review mit `Scenario`-interface — giver felterne mening? Stil mig spørgsmål, giv ikke svaret."
- "Forklar hvorfor denne type-fejl opstår, men lad mig selv rette den."
- "Jeg er i tvivl om hvordan jeg strukturerer motoren. Stil mig 2-3 spørgsmål der hjælper mig videre."
- "Lav en plan for fase 1-UI'et uden at skrive kode endnu." (kombinér med Plan mode)

## Smådetaljer

- **Integreret terminal:** Ctrl + `— åbner i sessionens mappe, deler miljø med Claude, så`npm run dev`og`git status` ser de samme filer.
- **Preview:** Claude kan starte dev-serveren og vise appen i en indbygget browser.
- **Diff-gennemgang:** klik på `+x -y`-indikatoren for at se ændringer fil for fil; klik på en
  linje for at kommentere.
- **@mention filer:** skriv `@filnavn` for at give Claude en bestemt fil som kontekst.
- **Update-appen:** Help → Check for Updates (pane-layout m.m. kræver nyere versioner).

## Hvis noget driller

- **403 / auth-fejl:** log ud og ind igen i app-menuen (den hyppigste fix).
- **Finder ikke `npm`/`node`:** tjek at de virker i en normal terminal, genstart appen så den
  genindlæser PATH.
- **"Failed to load session":** den valgte mappe findes måske ikke længere — vælg mappen igen
  eller genstart appen.
