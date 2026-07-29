# CraftHub: the AI front desk and knowledge brain for SHK service businesses

## Beachhead: heating, sanitation and air-conditioning (SHK) service firms

CraftHub starts with German SHK businesses of roughly 15–60 employees. Their high-frequency inbound work is practical and urgent: a broken heating system, a maintenance request, or a homeowner trying to understand a replacement decision. That produces a repeatable loop: capture the request, ground the response in approved material, and turn it into a service request. The 15–60 employee range is the chosen ICP, not a cited market-size claim.

The market is both large and fragmented. ZDH reports 1,038,126 registered craft businesses, roughly 6 million people employed, and €783.2bn of 2025 revenue across German crafts. These figures support a vertical-first strategy, not a claim that every business is an immediate customer. [ZDH, Kennzahlen des Handwerks 2025](https://www.zdh.de/daten-und-fakten/kennzahlen-des-handwerks/)

## Why now and why CraftHub

Existing trade software is useful for scheduling, invoicing and accounting, but it does not make a firm’s own manuals, supplier documents, service policies and past work instantly answerable with traceable evidence. CraftHub sits before the existing system of record: it captures an enquiry, answers only from approved knowledge with a page-level citation, and produces a structured handoff.

For the demo, the knowledge pack includes public Verbraucherzentrale guidance on heating replacement and energy terminology. The assistant cites the uploaded PDF and page, rather than presenting an uncited answer as fact. The production knowledge pack would be the firm’s own approved documents; public material is only demo content.

## ICP and value hypothesis

**Ideal first customer:** owner-managed SHK service company, 15–60 staff, receiving a meaningful volume of phone/email enquiries, with one or more office staff coordinating technicians.

**Value hypothesis (assumption to validate in discovery):** if CraftHub helps the office avoid 30 minutes of repetitive clarification and manual routing on each working day, that is about 11 hours per month. At a fully loaded administrative cost assumption of €35/hour, this is approximately €385/month of recovered capacity. This is an illustrative calculation, not a market fact; the pilot baseline must be measured with the customer.

## What we build first

1. **Knowledge answer:** ingest approved PDFs; answer a staff/customer question with document, page and excerpt.
2. **Structured intake:** capture contact, address, service type, issue and preferred date; create a service request ready for the incumbent workflow.
3. **First useful output:** draft a German follow-up email with proposed slots and the captured service summary.

The live demo uses this question: *“What should a homeowner check before planning a heating replacement?”* It shows a cited answer, then creates an intake request for a heating inspection.

## First 30 days

1. Recruit 5 SHK owners for 30-minute workflow interviews; quantify enquiry volume, handoff points and time lost per request.
2. Run 2 design-partner pilots with 10–20 approved documents each; measure answer acceptance, unanswered questions and time-to-triage.
3. Integrate the winning handoff into the customer’s existing workflow (initially email/CSV or API), then charge for the operating workflow—not for a generic chatbot.

## Three hard objections and direct answers

**“We already have software.”**  Keep it. CraftHub is the intake and knowledge layer in front of it; the pilot proves whether it reduces manual clarification before any system migration.

**“AI can hallucinate and we carry the liability.”**  The assistant displays the originating file, page and excerpt. A response without support is not positioned as a technical instruction; the firm controls the approved corpus and escalates uncertain cases to a technician.

**“Our documents are messy and confidential.”**  Start with 10–20 high-value documents and a private pilot scope. Measure usefulness before a wider rollout; the customer decides what content is approved and who can access it.

## Sources used in the demo and market case

- [ZDH: Kennzahlen des Handwerks 2025](https://www.zdh.de/daten-und-fakten/kennzahlen-des-handwerks/), accessed 29 July 2026.
- [Verbraucherzentrale: When is it time for a new heating system? (PDF)](https://www.verbraucherzentrale.de/sites/default/files/2019-09/Ratgeber%20Heizung%2001_10_2019%20VZ.pdf), accessed 29 July 2026.
- [Verbraucherzentrale: Energy glossary (PDF)](https://www.verbraucherzentrale.de/sites/default/files/2024-11/worterbuch-der-energiebegriffe-digital_20241107.pdf), accessed 29 July 2026.
