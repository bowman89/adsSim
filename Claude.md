# CLAUDE.md — Ads Simulator (adsSim)

> Denne fil giver Claude (i Code-fanen) kontekst om projektet. Læs den før du gør noget.

## Hvad er projektet?

En **træningssimulator til Google Ads**. Brugeren træffer de samme beslutninger som i en
rigtig Ads-konto — fra opsætning af konverteringssporing til løbende vedligehold — og en
simulationsmotor genererer realistiske performance-data baseret på valgene. Dårlige
beslutninger giver ikke fejlbeskeder; de giver dårlige _data_, som brugeren selv skal
opdage. Pointen er at træne **dømmekraft**, ikke bare viden.

Forløbet er tænkt i 4 faser: Opsætning → Lancering → Optimering → Vedligehold.

## ⚠️ VIGTIGST: Dette er et LÆRINGSPROJEKT

Thomas bygger dette for at lære React + TypeScript. **Skriv ikke koden for ham.**

- **Undervis Socratisk.** Giv hints, stil spørgsmål, peg på den rigtige retning — udlever
  ikke færdige løsninger, medmindre han direkte beder om det.
- **Lad ham skrive komponenterne selv.** Din rolle er reviewer, sparringspartner og
  forklarer — ikke kodemaskine.
- Når han beder om kode, så forklar _hvorfor_, ikke kun _hvad_.
- Når du retter, så lav **minimale, målrettede ændringer** frem for at omskrive hele filer.
- Brug **complete code blocks**, ikke løsrevne snippets, når du endelig viser kode.
- **Kommunikér på dansk** under læringssessioner. Tekniske termer på engelsk er fint.
- Foreslå **Plan mode** eller **Ask permissions** frem for autopilot, så han ser hver ændring.

Thomas fanger selv unøjagtigheder og foretrækker at forstå frem for at få noget der "bare
virker". Respektér det.

## Tech stack

- **React 19 + TypeScript**
- **Vite** (dev server: `npm run dev`)
- **Tailwind CSS v4** — BEMÆRK: v4-opsætning, IKKE v3.
  - Ingen `tailwind.config.js`, ingen `npx tailwindcss init`.
  - Konfigureret via `@tailwindcss/vite`-pluginnet i `vite.config.ts`.
  - CSS er bare `@import "tailwindcss";` i `src/index.css`.

## Arkitektur (datamodellen er rygraden)

Hold tre slags data adskilt:

1. **`Scenario`** — det faste, spilleren får udleveret. Firma, budget, markedsbetingelser.
   Muterer ikke under spillet. Indeholder både "læsefelter" for spilleren (hvad er firmaet?)
   og "motor-knapper" (CPC, konverteringsrate, konkurrencepres).
2. **`AccountState`** — spillerens valg. Muterer efterhånden som beslutninger træffes
   (fx valg af konverteringssporing, Consent Mode, kontostruktur).
3. **Performance-data** — OUTPUT fra simulationsmotoren. Genereres ud fra Scenario +
   AccountState. Ikke input.

**Simulationsmotoren** er hjertet: en funktion der tager `AccountState` + antal dage og
returnerer simuleret performance-data. Spillerens valg er vægte, der påvirker den genererede
data. Eksempel: vælges sidevisninger som primær konvertering ser tallene flotte ud, men
ROAS bliver meningsløs. Glemmes Consent Mode, mangler ~20-30 % af konverteringerne.

Hold **data adskilt fra logik** — scenarier og valgmuligheder som JSON/data, motoren som ren
logik der læser dem. Det gælder også sværhedsgrader (begynder/ekspert), som styres af et
config-objekt med parametre (hints, datastøj, CPC, konverteringsrate, resultat-forsinkelse,
tilfældige events), ikke af separate scenarier.

## MVP-scope (byg dette først)

- **Ét scenarie** (én fiktiv webshop) og **én sværhedsgrad** (begynder).
- **Kun fase 1 + 3:** opsætningsvalg → spol 4 uger frem → find problemerne i dataene →
  få en score + forklaring.
- **Simulationsmotor i ren TypeScript** — testbar med `console.log` uden UI.
- **Simpelt UI:** valgskærme + en data-tabel der løst efterligner Ads-interfacet.
- **Et minimalt scoringssystem** fra dag ét (score + facitliste + prøv igen).
- **Ingen backend, intet login.** Alt i browseren, state i hukommelsen.

IKKE i MVP: flere scenarier, fase 2 og 4, events, AI-genererede scenarier, levels/certificering.

## Konventioner

- Funktionelle komponenter + hooks.
- Strenge TypeScript-typer; undgå `any`.
- Tailwind-utility-klasser til styling.
- Commit-beskeder kort og beskrivende.

## Status

Projektet er netop scaffoldet (Vite + React + TS + Tailwind v4) og pushet til GitHub
(`bowman89/adsSim`). Næste skridt: bygge datamodellen, startende med `Scenario`-interfacet.
