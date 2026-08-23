/*
 * NØRTHBOUND — credited technical reconstruction study.
 * Original art direction and public reference: Andrei Mei.
 * This file deliberately keeps the complete edit surface in CONFIG.
 */

const CONFIG = {
  links: {
    source: "https://panda-orchid-barn.pagey.site/",
    portfolio: "https://andrey-may-pf.netlify.app/",
    telegram: "https://t.me/andreymei_web",
  },
  videos: {
    departure: {
      path: "assets/video/start_train.web.mp4",
      mediaDuration: 3.813,
      pausedFrame: 0.62,
      start: 0.62,
      doorsClosed: 1.55,
      end: 1.58,
      motionThreshold: 0.09,
      motionEnd: 0.62,
      physicalWipeAt: 0.79,
    },
    carriage: {
      path: "assets/video/carriage.web.mp4",
      mediaDuration: 6.713,
      start: 0.08,
      interiorEnd: 3.72,
      stormStart: 3.75,
      maximumStorm: 6.0,
      textAfterStorm: 6.55,
      end: 6.65,
    },
    final: {
      path: "assets/video/final.web.mp4",
      mediaDuration: 36.113,
      start: 1.72,
      tunnelLine: 6.55,
      tunnelSerif: 7.7,
      tunnelOut: 11.9,
      tunnelExit: 12.95,
      aurora: 13,
      pullback: 19.35,
      exterior: 22.55,
      iceApproach: 29.55,
      surfacePass: 30.7,
      iceEntry: 30.9,
      underwater: 31.12,
      calmDepth: 32.4,
      creditsFrame: 35.7,
      end: 35.72,
      flashes: [2.65,3.4,4.45,5.25,6.55,7.2,7.7,8.3,8.75,9.25,9.75,10.25,10.55,11.1,11.9,12.3],
      scrollMap: [
        { progress: 0, time: 1.72 }, { progress: .235, time: 11.55 },
        { progress: .265, time: 12.5 }, { progress: .285, time: 12.95 },
        { progress: .4, time: 18.9 }, { progress: .42, time: 19.35 },
        { progress: .55, time: 22.55 }, { progress: .65, time: 25.45 },
        { progress: .72, time: 27.05 }, { progress: .82, time: 29.55 },
        { progress: .865, time: 30.7 }, { progress: .895, time: 31.12 },
        { progress: .925, time: 32.4 }, { progress: .985, time: 35.5 },
        { progress: 1, time: 35.72 },
      ],
    },
  },
  sections: {
    departure: { vh: 220 }, interludeOne: { vh: 100 }, carriage: { vh: 210 },
    interludeTwo: { vh: 90 }, whiteout: { vh: 165 }, interludeThree: { vh: 95 },
    final: { vh: 580 }, credits: { vh: 175 },
  },
  transitions: { departureBlur: 9, stormBlur: 5.5, waterBlur: 4.5 },
  effects: {
    grain: .04, grainMobile: .024, vignetteBase: .22, vignettePeak: .62,
    snowParticlesDesktop: 190, snowParticlesMobile: 86,
  },
  motion: { scrollLerp: 1.7, videoLerp: 3.3, finalVideoLerp: 1.15, seekIntervalMs: 30, seekEpsilon: .008 },
  audio: { masterVolume: .26, fadeSeconds: .9, wind: .16, rail: .12, drone: .1 },
  chapters: [
    { key: "departure", label: "DEPARTURE", color: "#681c29" },
    { key: "carriage", label: "CARRIAGE", color: "#b6905f" },
    { key: "whiteout", label: "WHITEOUT", color: "#e6e8e4" },
    { key: "passage", label: "PASSAGE", color: "#777d82" },
    { key: "aurora", label: "AURORA", color: "#a8cfe0" },
    { key: "beneath", label: "BENEATH", color: "#a8c5cf" },
  ],
};

const $ = (selector) => document.querySelector(selector);
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;
const range = (value, start, end) => clamp((value - start) / (end - start));
const smooth = (value, start, end) => {
  const x = range(value, start, end);
  return x * x * (3 - 2 * x);
};
const windowOpacity = (value, inStart, inEnd, outStart, outEnd) => smooth(value, inStart, inEnd) * (1 - smooth(value, outStart, outEnd));

const els = {
  story: $("#story"), timeline: $("#timeline"), stage: $("#stage"), preloader: $("#preloader"),
  preloaderBar: $("#preloaderBar"), preloaderNumber: $("#preloaderNumber"),
  departureVideo: $("#departureVideo"), carriageVideo: $("#carriageVideo"), finalVideo: $("#finalVideo"),
  departureLayer: $("#departureLayer"), carriageLayer: $("#carriageLayer"), finalLayer: $("#finalLayer"),
  mediaFallback: $("#mediaFallback"), hero: $("#heroCopy"), scrollPrompt: $("#scrollPrompt"),
  intertitleOne: $("#intertitleOne"), intertitleTwo: $("#intertitleTwo"), intertitleThree: $("#intertitleThree"),
  tunnelCopy: $("#tunnelCopy"), carriageCaption: $("#carriageCaption"), beyondCaption: $("#beyondCaption"), credits: $("#credits"),
  trainWipe: $("#trainWipe"), lightSlit: $("#lightSlit"), weatherCanvas: $("#weatherCanvas"),
  chapterNav: $("#chapterNav"), chapterProgress: $("#chapterProgress"), mobileChapter: $("#mobileChapter"), chapterAnnouncer: $("#chapterAnnouncer"),
  soundToggle: $("#soundToggle"), soundLabel: $("#soundLabel"), returnToTop: $("#returnToTop"), grain: $("#grain"),
};

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).has("reduced-motion");
const isMobile = () => innerWidth <= 900;
const sectionKeys = Object.keys(CONFIG.sections);
const totalUnits = sectionKeys.reduce((sum, key) => sum + CONFIG.sections[key].vh, 0);
const boundaries = sectionKeys.reduce((list, key) => {
  const start = list.length ? list[list.length - 1].end : 0;
  const end = start + CONFIG.sections[key].vh;
  list.push({ key, start, end });
  return list;
}, []);

function configureTimeline() {
  document.querySelectorAll(".scroll-scene").forEach((section) => {
    const key = section.dataset.scene;
    section.style.setProperty("--scene-height", `${reducedMotion ? 100 : CONFIG.sections[key].vh}vh`);
  });
}

function sceneAt(progress) {
  const activeTotal = reducedMotion ? sectionKeys.length * 100 : totalUnits;
  const units = clamp(progress) * activeTotal;
  let cursor = 0;
  for (const key of sectionKeys) {
    const length = reducedMotion ? 100 : CONFIG.sections[key].vh;
    if (units <= cursor + length || key === sectionKeys.at(-1)) return { key, local: clamp((units - cursor) / length), units };
    cursor += length;
  }
  return { key: "credits", local: 1, units };
}

function mappedTime(progress, map) {
  const p = clamp(progress);
  for (let i = 1; i < map.length; i += 1) {
    if (p <= map[i].progress) {
      const a = map[i - 1]; const b = map[i];
      return lerp(a.time, b.time, range(p, a.progress, b.progress));
    }
  }
  return map.at(-1).time;
}

function inverseMappedProgress(time, map) {
  for (let i = 1; i < map.length; i += 1) {
    if (time <= map[i].time) {
      const a = map[i - 1]; const b = map[i];
      return lerp(a.progress, b.progress, range(time, a.time, b.time));
    }
  }
  return 1;
}

function setOpacity(element, opacity, visibleThreshold = .002) {
  const value = clamp(opacity);
  element.style.opacity = value.toFixed(4);
  element.classList.toggle("is-visible", value > visibleThreshold);
}

function setLayer(element, opacity) {
  const value = clamp(opacity);
  element.style.opacity = value.toFixed(4);
  element.classList.toggle("is-active", value > .002);
}

function setVar(name, value) { els.stage.style.setProperty(name, value); }
function setVideoStyle(layer, values) {
  Object.entries(values).forEach(([key, value]) => layer.style.setProperty(`--${key}`, String(value)));
}

const videoState = new WeakMap();
function seekVideo(video, time, force = false) {
  if (!Number.isFinite(video.duration) || video.readyState < 1) return;
  const now = performance.now();
  const state = videoState.get(video) || { at: 0, target: -1 };
  if (!force && now - state.at < CONFIG.motion.seekIntervalMs && Math.abs(time - state.target) < .04) return;
  const target = clamp(time, .001, Math.max(.001, video.duration - .02));
  if (force || Math.abs(video.currentTime - target) > CONFIG.motion.seekEpsilon) {
    try { video.currentTime = target; } catch { /* metadata may still be settling */ }
  }
  videoState.set(video, { at: now, target });
}

function flashPulse(time) {
  let pulse = 0;
  for (const flash of CONFIG.videos.final.flashes) {
    const distance = Math.abs(time - flash);
    if (distance < .24) pulse = Math.max(pulse, (1 - distance / .24) ** 2);
  }
  return pulse;
}

function render(progress) {
  const scene = sceneAt(progress);
  const p = scene.local;
  const is = (key) => scene.key === key;
  const departureOpacity = is("departure") ? 1 : is("interludeOne") ? 1 - smooth(p, 0, .2) : 0;
  const carriageOpacity = is("interludeOne") ? smooth(p, .68, .985) : ["carriage","interludeTwo","whiteout","interludeThree"].includes(scene.key) ? 1 : 0;
  const finalOpacity = is("interludeThree") ? smooth(p, .82, .995) : ["final","credits"].includes(scene.key) ? 1 : 0;

  setLayer(els.departureLayer, departureOpacity);
  setLayer(els.carriageLayer, carriageOpacity);
  setLayer(els.finalLayer, finalOpacity);

  let departureTime = CONFIG.videos.departure.pausedFrame;
  if (is("departure") && p > CONFIG.videos.departure.motionThreshold) {
    departureTime = lerp(CONFIG.videos.departure.start, CONFIG.videos.departure.end, smooth(p, .09, .62));
  }
  let carriageTime = CONFIG.videos.carriage.start;
  if (is("carriage")) carriageTime = lerp(CONFIG.videos.carriage.start, CONFIG.videos.carriage.interiorEnd, p);
  if (is("interludeTwo")) carriageTime = lerp(3.2, CONFIG.videos.carriage.stormStart, p);
  if (is("whiteout")) carriageTime = lerp(CONFIG.videos.carriage.stormStart, CONFIG.videos.carriage.end, p);
  if (is("interludeThree")) carriageTime = CONFIG.videos.carriage.end;
  const finalTime = is("final") ? mappedTime(p, CONFIG.videos.final.scrollMap) : is("credits") ? lerp(35.5, 35.72, p) : CONFIG.videos.final.start;

  if (!reducedMotion) {
    seekVideo(els.departureVideo, departureTime);
    seekVideo(els.carriageVideo, carriageTime);
    seekVideo(els.finalVideo, finalTime);
  } else {
    updateReducedMotionPlayback(scene);
  }

  const depVibe = is("departure") ? Math.sin(performance.now() * .014) * smooth(p, .12, .5) * .07 : 0;
  setVideoStyle(els.departureLayer, {
    brightness: lerp(.84, .45, is("departure") ? smooth(p, .72, .96) : 1),
    contrast: lerp(1.08, .72, is("departure") ? smooth(p, .72, .96) : 1),
    saturation: lerp(.78, .38, is("departure") ? smooth(p, .72, .96) : 1),
    blur: is("departure") ? lerp(0, CONFIG.transitions.departureBlur, smooth(p, .79, .98)) : 0,
    scale: is("departure") ? lerp(1.025, 1.08, p) : 1.03,
    x: depVibe, y: 0,
  });

  const storm = is("whiteout") ? p : is("interludeThree") ? 1 : 0;
  const carriagePush = is("carriage") ? p : 1;
  setVideoStyle(els.carriageLayer, {
    brightness: lerp(.95, .59, storm), contrast: lerp(1.04, .57, storm),
    saturation: lerp(.9, .17, Math.max(storm, is("interludeTwo") ? p * .45 : 0)),
    blur: lerp(is("carriage") ? carriagePush * .65 : 0, CONFIG.transitions.stormBlur, storm),
    scale: lerp(1.02, is("whiteout") ? 1.31 : 1.095, Math.max(carriagePush, storm)), x: -storm * 2.2, y: 0,
  });

  const underwater = finalTime >= CONFIG.videos.final.iceEntry ? smooth(finalTime, 30.9, 32.4) : 0;
  setVideoStyle(els.finalLayer, {
    brightness: lerp(.9, .7, underwater), contrast: lerp(1.05, .82, underwater),
    saturation: lerp(.83, .55, underwater), blur: Math.sin(underwater * Math.PI) * CONFIG.transitions.waterBlur,
    scale: 1.03 + underwater * .045, x: 0, y: underwater * -.35,
  });

  const heroOpacity = is("departure") ? 1 - smooth(p, .1, .34) : 0;
  setOpacity(els.hero, heroOpacity);
  els.hero.style.setProperty("--hero-scale", String(is("departure") ? lerp(1, .76, smooth(p, .015, .27)) : .76));
  els.hero.style.setProperty("--hero-y", `${is("departure") ? lerp(0, -9, smooth(p, .015, .27)) : -9}svh`);
  setOpacity(els.scrollPrompt, is("departure") ? 1 - smooth(p, .025, .095) : 0);

  setOpacity(els.intertitleOne, is("interludeOne") ? windowOpacity(p, .1, .25, .74, .89) : 0);
  setOpacity(els.intertitleTwo, is("interludeTwo") ? windowOpacity(p, .1, .25, .72, .9) : 0);
  const stormCopy = is("interludeThree") && carriageTime >= CONFIG.videos.carriage.textAfterStorm - .11 ? windowOpacity(p, .14, .58, .86, .95) : 0;
  setOpacity(els.intertitleThree, stormCopy);
  [els.intertitleOne, els.intertitleTwo, els.intertitleThree].forEach((element) => {
    element.style.setProperty("--copy-y", `${lerp(2.5, 0, smooth(p, .1, .55))}rem`);
    element.style.setProperty("--copy-blur", String(lerp(7, 0, smooth(p, .1, .5))));
  });

  const pulse = flashPulse(finalTime);
  const tunnelBase = is("final") ? windowOpacity(finalTime, 6.1, 6.7, 11.75, 12.05) : 0;
  setOpacity(els.tunnelCopy, tunnelBase * (.12 + pulse * .88));
  setOpacity(els.carriageCaption, is("carriage") ? windowOpacity(p, .04, .14, .84, .95) : 0);
  setOpacity(els.beyondCaption, is("final") && finalTime >= 19.35 && finalTime < 29.2 ? windowOpacity(finalTime, 19.35, 20.2, 28.4, 29.2) : 0);

  const creditsAllowed = is("credits") && els.finalVideo.currentTime >= 35.15;
  setOpacity(els.credits, creditsAllowed ? smooth(p, .02, .2) : 0);

  const wipe = is("departure") ? smooth(p, .79, .985) : 0;
  els.trainWipe.style.opacity = String(is("departure") ? 1 : 0);
  els.trainWipe.style.transform = `translate3d(${lerp(118,-7,wipe)}%,0,0) skewX(-2deg)`;
  const slit = is("interludeOne") ? windowOpacity(p, .68, .77, .95, 1) : 0;
  els.lightSlit.style.opacity = String(slit);
  els.lightSlit.style.width = `${lerp(0,100,smooth(p,.68,.86))}vw`;
  els.lightSlit.style.height = `${lerp(2,innerHeight,smooth(p,.82,.985))}px`;
  els.carriageLayer.style.clipPath = is("interludeOne") ? `inset(${lerp(49.9,0,smooth(p,.7,.985))}% 0)` : "inset(0)";

  setVar("--vignette", String(lerp(CONFIG.effects.vignetteBase, CONFIG.effects.vignettePeak, Math.max(storm, wipe, underwater * .7))));
  setVar("--frost", String(Math.max(storm * .92, underwater * .72, is("carriage") ? carriagePush * .28 : 0)));
  setVar("--underwater", String(underwater));
  setVar("--cold", String(lerp(.16, .72, Math.max(storm, underwater))));
  setVar("--weather-opacity", String(is("whiteout") ? lerp(.24,.88,p) : is("interludeThree") ? .76 : underwater ? .45 : is("departure") ? .18 : .08));
  setVar("--frame-depth", `${lerp(7, is("final") && finalTime >= 13 && finalTime < 19.25 ? 2 : 10, Math.max(storm, underwater))}vh`);
  if (underwater > .05) {
    setVar("--bloom-color", "147 191 211"); setVar("--bloom-opacity", String(.08 + underwater * .24));
  } else if (is("final") && finalTime >= 13 && finalTime < 19.35) {
    setVar("--bloom-color", "168 207 224"); setVar("--bloom-opacity", ".18");
  } else {
    setVar("--bloom-color", "199 167 120"); setVar("--bloom-opacity", String(.12 + pulse * .26));
  }

  updateChapters(progress, finalTime, scene);
  weather.mode = underwater > .08 ? "bubbles" : "snow";
  weather.intensity = is("whiteout") ? lerp(.45,1,p) : is("interludeThree") ? .9 : is("departure") ? .28 : underwater ? .55 : .12;
}

let reducedSceneKey = "";
function updateReducedMotionPlayback(scene) {
  if (reducedSceneKey === scene.key) return;
  reducedSceneKey = scene.key;
  [els.departureVideo, els.carriageVideo, els.finalVideo].forEach((video) => video.pause());
  const ranges = {
    departure: [els.departureVideo, .62, 1.58], interludeOne: [els.departureVideo, 1.58, 1.58],
    carriage: [els.carriageVideo, .08, 3.72], interludeTwo: [els.carriageVideo, 3.2, 3.75],
    whiteout: [els.carriageVideo, 3.75, 6.65], interludeThree: [els.carriageVideo, 6.55, 6.65],
    final: [els.finalVideo, 1.72, 35.5], credits: [els.finalVideo, 35.5, 35.72],
  };
  const [video, start, end] = ranges[scene.key];
  seekVideo(video, start, true);
  if (end - start > .2) video.play().catch(() => {});
  const stop = () => { if (video.currentTime >= end) { video.pause(); video.removeEventListener("timeupdate", stop); } };
  video.addEventListener("timeupdate", stop);
}

function chapterStarts() {
  const finalStart = 880;
  return [0, 320, 620, 880,
    finalStart + inverseMappedProgress(13, CONFIG.videos.final.scrollMap) * CONFIG.sections.final.vh,
    finalStart + inverseMappedProgress(30.9, CONFIG.videos.final.scrollMap) * CONFIG.sections.final.vh,
  ].map((value) => value / totalUnits);
}

const starts = chapterStarts();
let currentChapter = -1;
function updateChapters(progress, finalTime, scene) {
  let index = 0;
  for (let i = 0; i < starts.length; i += 1) if (progress >= starts[i]) index = i;
  const chapter = CONFIG.chapters[index];
  if (index !== currentChapter) {
    currentChapter = index;
    els.mobileChapter.textContent = String(index + 1).padStart(2, "0");
    els.chapterAnnouncer.textContent = `Chapter ${index + 1}: ${chapter.label}`;
    document.querySelectorAll("[data-scroll-to]").forEach((button, buttonIndex) => {
      if (buttonIndex === index) button.setAttribute("aria-current", "step"); else button.removeAttribute("aria-current");
    });
  }
  els.stage.style.setProperty("--chapter-color", chapter.color);
  const railTravel = Math.max(0, (els.chapterNav?.clientHeight || 256) - 32);
  els.stage.style.setProperty("--chapter-y", `${progress * railTravel}px`);
  const quiet = scene.key === "final" && finalTime >= 13 && finalTime < 19.25 ? .08 : scene.key === "credits" ? .24 : 1;
  els.chapterNav.style.opacity = String(quiet);
}

function scrollToProgress(progress) {
  const max = Math.max(1, els.story.offsetHeight - innerHeight);
  scrollTo({ top: els.story.offsetTop + progress * max, behavior: reducedMotion ? "auto" : "smooth" });
}

document.querySelectorAll("[data-scroll-to]").forEach((button, index) => button.addEventListener("click", () => scrollToProgress(starts[index])));
function resetToDeparture() {
  scrollTo({ top: els.story.offsetTop, behavior: "auto" });
  targetProgress = 0;
  renderedProgress = 0;
  seekVideo(els.departureVideo, CONFIG.videos.departure.pausedFrame, true);
  render(0);
  window.ScrollTrigger?.update();
}

els.returnToTop.addEventListener("click", resetToDeparture);
document.querySelector(".topbar__identity")?.addEventListener("click", (event) => {
  event.preventDefault();
  resetToDeparture();
});

const weather = { particles: [], width: 0, height: 0, intensity: .2, mode: "snow", last: 0 };
function resizeCanvas() {
  if (reducedMotion) return;
  const canvas = els.weatherCanvas; const dpr = Math.min(devicePixelRatio || 1, isMobile() ? 1.1 : 1.25);
  const scale = isMobile() ? .72 : innerWidth >= 3000 ? .62 : .8;
  weather.width = Math.ceil(innerWidth * dpr * scale); weather.height = Math.ceil(innerHeight * dpr * scale);
  canvas.width = weather.width; canvas.height = weather.height;
  const count = isMobile() ? CONFIG.effects.snowParticlesMobile : CONFIG.effects.snowParticlesDesktop;
  weather.particles = Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random(), z: .2 + Math.random() * .8, phase: Math.random() * Math.PI * 2 }));
}

function renderWeather(time) {
  if (reducedMotion || !weather.width) return;
  const ctx = els.weatherCanvas.getContext("2d"); const dt = Math.min(.04, (time - (weather.last || time)) / 1000); weather.last = time;
  ctx.clearRect(0,0,weather.width,weather.height); ctx.globalCompositeOperation = "screen";
  for (const particle of weather.particles) {
    if (weather.mode === "bubbles") {
      particle.y -= dt * (.025 + particle.z * .05) * weather.intensity;
      particle.x += Math.sin(time * .001 + particle.phase) * dt * .008;
      if (particle.y < -.03) { particle.y = 1.03; particle.x = Math.random(); }
      const radius = .6 + particle.z * 2.2;
      ctx.strokeStyle = `rgba(185,225,238,${.08 + particle.z * .22})`; ctx.lineWidth = .5 + particle.z * .6;
      ctx.beginPath(); ctx.arc(particle.x*weather.width,particle.y*weather.height,radius,0,Math.PI*2); ctx.stroke();
    } else {
      particle.y += dt * (.035 + particle.z * .18) * weather.intensity;
      particle.x -= dt * (.02 + particle.z * .2) * weather.intensity;
      if (particle.y > 1.05) particle.y = -.05;
      if (particle.x < -.05) particle.x = 1.05;
      const length = 1 + particle.z * 16 * weather.intensity;
      ctx.strokeStyle = `rgba(230,240,244,${.06 + particle.z * .42 * weather.intensity})`; ctx.lineWidth = .35 + particle.z * .75;
      ctx.beginPath(); ctx.moveTo(particle.x*weather.width,particle.y*weather.height); ctx.lineTo(particle.x*weather.width-length,particle.y*weather.height+length*.62); ctx.stroke();
    }
  }
}

function createNoise() {
  const canvas = document.createElement("canvas"); canvas.width = 96; canvas.height = 96;
  const ctx = canvas.getContext("2d"); const image = ctx.createImageData(96,96);
  for (let i=0;i<image.data.length;i+=4) { const gray = Math.random()*255; image.data[i]=gray; image.data[i+1]=gray; image.data[i+2]=gray; image.data[i+3]=42; }
  ctx.putImageData(image,0,0); els.grain.style.backgroundImage = `url(${canvas.toDataURL()})`;
}

let audio = null;
function createAudio() {
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return null;
  const context = new Context(); const master = context.createGain(); const filter = context.createBiquadFilter();
  master.gain.value = 0; filter.type = "lowpass"; filter.frequency.value = 1250; filter.connect(master).connect(context.destination);
  const droneA = context.createOscillator(); const droneB = context.createOscillator(); const rail = context.createOscillator();
  const droneGain = context.createGain(); const railGain = context.createGain();
  droneA.frequency.value = 43.65; droneB.frequency.value = 65.41; rail.frequency.value = 54;
  droneA.type = "sine"; droneB.type = "sine"; rail.type = "triangle";
  droneGain.gain.value = CONFIG.audio.drone; railGain.gain.value = CONFIG.audio.rail;
  droneA.connect(droneGain); droneB.connect(droneGain); droneGain.connect(filter); rail.connect(railGain).connect(filter);
  droneA.start(); droneB.start(); rail.start();
  return { context, master, filter, railGain, enabled: false };
}

els.soundToggle.addEventListener("click", async () => {
  if (!audio) audio = createAudio(); if (!audio) return;
  await audio.context.resume(); audio.enabled = !audio.enabled;
  audio.master.gain.setTargetAtTime(audio.enabled ? CONFIG.audio.masterVolume : 0, audio.context.currentTime, CONFIG.audio.fadeSeconds / 3);
  els.soundToggle.setAttribute("aria-pressed", String(audio.enabled));
  els.soundToggle.setAttribute("aria-label", audio.enabled ? "Turn sound off" : "Turn sound on");
  els.soundLabel.textContent = audio.enabled ? "SOUND ON" : "SOUND OFF";
});

let targetProgress = 0; let renderedProgress = 0; let lastFrame = performance.now();
function frame(time) {
  const dt = Math.min(.05, (time - lastFrame) / 1000); lastFrame = time;
  if (reducedMotion) renderedProgress = targetProgress;
  else renderedProgress += (targetProgress - renderedProgress) * (1 - Math.exp(-CONFIG.motion.scrollLerp * dt));
  render(renderedProgress); renderWeather(time); requestAnimationFrame(frame);
}

function setupProgress() {
  const updateFromScroll = () => {
    const max = Math.max(1, els.story.offsetHeight - innerHeight);
    targetProgress = clamp((scrollY - els.story.offsetTop) / max);
  };
  addEventListener("scroll", updateFromScroll, { passive: true });
  updateFromScroll();
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: els.story,
      start: "top top",
      end: () => `+=${Math.max(1, els.story.offsetHeight - innerHeight)}`,
      onUpdate: (self) => { targetProgress = self.progress; },
    });
  }
}

function readyVideo(video) {
  return new Promise((resolve) => {
    if (video.readyState >= 1) return resolve(true);
    const done = () => resolve(true); video.addEventListener("loadedmetadata", done, { once: true }); video.addEventListener("error", () => resolve(false), { once: true });
  });
}

async function preload() {
  document.body.classList.add("is-loading");
  const started = performance.now(); let displayed = 0; let complete = false;
  const progressLoop = () => {
    const goal = complete ? 100 : 88; displayed += (goal - displayed) * (complete ? .13 : .018);
    if (complete && displayed > 99.7) displayed = 100;
    els.preloaderBar.style.width = `${displayed}%`; els.preloaderNumber.textContent = String(Math.floor(displayed)).padStart(2,"0");
    if (displayed < 100) requestAnimationFrame(progressLoop);
  };
  requestAnimationFrame(progressLoop);
  const timeout = new Promise((resolve) => setTimeout(() => resolve([false,false,false]), 12000));
  const results = await Promise.race([Promise.all([readyVideo(els.departureVideo),readyVideo(els.carriageVideo),readyVideo(els.finalVideo)]), timeout]);
  if (results[0]) seekVideo(els.departureVideo, CONFIG.videos.departure.pausedFrame, true);
  if (!results.some(Boolean)) els.mediaFallback.classList.add("is-active");
  const wait = Math.max(0, 850 - (performance.now() - started)); await new Promise((resolve) => setTimeout(resolve, wait));
  complete = true; await new Promise((resolve) => setTimeout(resolve, 360));
  els.preloader.classList.add("is-hidden"); document.body.classList.remove("is-loading");
}

document.addEventListener("visibilitychange", () => { if (document.hidden) [els.departureVideo,els.carriageVideo,els.finalVideo].forEach((video) => video.pause()); });
addEventListener("resize", () => { resizeCanvas(); window.ScrollTrigger?.refresh(); }, { passive: true });

configureTimeline(); createNoise(); resizeCanvas(); setupProgress(); render(0); requestAnimationFrame(frame); preload();
