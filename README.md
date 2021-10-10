# tournament-app (svelte / smui version)

Notes.

## TODO

1. add "Tournament TV" screen for large screen, full live update of all current competitions
1. dark mode theme
1. parameterise backend API URL, google map link (MenuDrawer.svelte), background image, icons and theme colors for external build
1. iframe the map within app
1. Implement "favourites" - starred teams produce notifications and permalinks to their groups
1. Add "started"/"completed" status to results to be able to show games in progress and live goal updates if ref/scorer is using the app live
1. prompt to install PWA after opening
1. io socket for news items

## FIXME

1. load partial results in a load() function per competition (as current/legacy app)
1. check the SW is not serving cached API calls when online
1. URL for invalid competition serves HTTP 500 instead of 404
1. Deal with test data (falls back to this if server unavailable before cache kicks in)
