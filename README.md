# Easy Note — React version

A Vite + React port of `../notes v1.html`. It looks and works the same as the original, uses the same storage keys (so existing notes carry over in the same browser and address), and leaves the original file untouched.

## Start

```
npm install        # first time only
npm run dev        # development, http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build, http://localhost:4173
```

## Structure

```
src/
  main.jsx                  starts React and loads the CSS
  App.jsx                   page layout; starts the notes engine once the page is on screen
  styles/app.css            the original CSS, copied unchanged
  hooks/
    useSidebar.js           side panel width and hide/show (React state, saved to localStorage)
    useOnlineStatus.js      online/offline status for the "You're offline" line
  components/
    SideResizer.jsx         drag handle and hide/show button for the side panel (fully React)
    Dock.jsx                pop-up message with Undo, and the round "New note" button
    list/                   ListPane > AppHeader, SearchBar, FolderBar
    editor/                 EditorPane > KeepHome, EmptyState, EditorBar, NoteHead,
                            NoteTools, Checklist, LockPanel, Board
    dialogs/                Dialogs.jsx plus one component per pop-up window
  engine/notesEngine.js     the original app logic, moved almost unchanged
```

## How React and the engine share the page

- **React owns:** the side panel resizing, the offline indicator and the list's scroll effect.
- **The engine owns:** everything else (notes, editor, boards, Kanban, charts, locking, reminders, saving). It finds elements by their ids, so the components keep the original ids, classes and structure.
- The engine-owned components are wrapped in `memo` and drawn once. After that, the engine updates their contents directly. To move a feature to React, take its code out of `notesEngine.js` and give its component real state and props, the way `useSidebar` replaced the original resize script.
- `startNotesEngine()` runs only once, even though React StrictMode runs effects twice in development.
