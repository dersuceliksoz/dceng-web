---
title: "Discretization Pitfalls When Moving a Controller to Embedded Hardware"
category: engineering-note
date: 2026-05-10
summary: "A field guide to the discretization mistakes that quietly degrade a controller on real hardware — sample-rate choice, integrator wind-up, and delay accounting."
venue: "Engineering Note"
graphic: grid-plot
featured: false
status: placeholder
tags: ["Discretization", "Embedded Control", "Implementation"]
---

A controller that performs well in continuous-time simulation can behave poorly once
discretized and deployed. This engineering note catalogues the common culprits:
inappropriate sample-rate selection, discretization-method mismatch, integrator
wind-up, and unaccounted computational delay.

For each, it gives a quick diagnostic and a practical mitigation, aimed at engineers
moving a design from simulation to embedded hardware.

> Placeholder content — replace or expand with your own implementation notes.
