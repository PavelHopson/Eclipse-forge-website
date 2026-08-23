# NØRTHBOUND — Scroll Cinema Study

Атрибутированная техническая реконструкция публичного проекта
[NØRTHBOUND — The Last Train North](https://panda-orchid-barn.pagey.site/) Андрея Мея.

## Что находится в папке

- `index.html` — семантическая структура фильма;
- `styles.css` — типографика, responsive layout, optical layers и reduced motion;
- `script.js` — единый `CONFIG`, inertial progress, video seeking, chapters, canvas и sound;
- `assets/video/` — три предоставленных пользователем локальных MP4;
- `assets/posters/` — локальные poster frames;
- `assets/fonts/` — Manrope и Instrument Serif;
- `vendor/` — локальные pinned GSAP и ScrollTrigger.

## Локальный запуск

Запускайте из корня `EclipseForgeLanding`:

```powershell
npm run dev
```

Затем откройте `/cases/northbound-study/index.html`. Для video range seeking не используйте
`file://`; нужен обычный HTTP static server.

## Attribution

Original concept, AI / code / direction: **Andrei Mei**. Eclipse Forge показывает эту страницу
как `attributed technical reconstruction`, не как оригинальную арт-дирекцию студии.

## Privacy

В локальной версии нет Pagey banner, Umami analytics, cookies и внешнего media hotlinking.
