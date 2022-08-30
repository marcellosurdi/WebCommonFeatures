# Web Common Plugins

Funzionalità di uso comune nei progetti web:
- Overlay.

## Installazione

- Assicurarsi di avere installato [Node.js](http://nodejs.org/).
- Eseguire il comando `npm install` per installare [Webpack](https://webpack.js.org/guides/installation/#root) e gli altri file necessari per l'ambiente di sviluppo indicati nel file `package.json`.

### Server di sviluppo

```
npm run dev
```

Webpack avvia il server di sviluppo su localhost:3001.

### File minificati

```
npm run build
```

Webpack minifica i file nella cartella `dist`.

### JSDoc

```
npm run jsdoc
```

Viene generata la documentazione JSDoc nella cartella `docs`.
