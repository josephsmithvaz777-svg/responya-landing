import { chromium } from 'playwright';

async function captureScreenshots() {
  const browser = await chromium.launch({
    args: ['--disable-translate', '--disable-features=Translate']
  });
  
  const context = await browser.newContext({
    locale: 'es-ES',
    extraHTTPHeaders: {
      'Accept-Language': 'es-ES,es;q=0.9'
    }
  });

  // Desktop 1280px - con burbujas totalmente reveladas
  console.log('Capturing desktop 1280px...');
  const desktopPage = await context.newPage();
  await desktopPage.setViewportSize({ width: 1280, height: 1024 });
  await desktopPage.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  // Scroll a la sección CRM y esperar animaciones
  await desktopPage.evaluate(() => {
    const crmSection = document.querySelector('#crm');
    if (crmSection) {
      crmSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  await desktopPage.waitForTimeout(2500); // Esperar animaciones completas
  
  await desktopPage.screenshot({
    path: '/opt/cursor/artifacts/crm-desktop-1280px.png',
    fullPage: false
  });
  console.log('Desktop screenshot saved');

  // Tablet 768px
  console.log('Capturing tablet 768px...');
  const tabletPage = await context.newPage();
  await tabletPage.setViewportSize({ width: 768, height: 1024 });
  await tabletPage.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  await tabletPage.evaluate(() => {
    const crmSection = document.querySelector('#crm');
    if (crmSection) {
      crmSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  await tabletPage.waitForTimeout(2500);
  
  await tabletPage.screenshot({
    path: '/opt/cursor/artifacts/crm-tablet-768px.png',
    fullPage: false
  });
  console.log('Tablet screenshot saved');

  // Mobile 375px
  console.log('Capturing mobile 375px...');
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  await mobilePage.evaluate(() => {
    const crmSection = document.querySelector('#crm');
    if (crmSection) {
      crmSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  await mobilePage.waitForTimeout(3000); // Más tiempo para ver todas las burbujas
  
  await mobilePage.screenshot({
    path: '/opt/cursor/artifacts/crm-mobile-375px.png',
    fullPage: false
  });
  console.log('Mobile screenshot saved');

  // Secuencia de animación en desktop - 3 frames
  console.log('Capturing animation sequence...');
  const animPage = await context.newPage();
  await animPage.setViewportSize({ width: 1280, height: 1024 });
  await animPage.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  // Scroll justo antes de la sección
  await animPage.evaluate(() => {
    const crmSection = document.querySelector('#crm');
    if (crmSection) {
      const rect = crmSection.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + rect.top - window.innerHeight, behavior: 'smooth' });
    }
  });
  await animPage.waitForTimeout(500);
  
  // Frame 1: Inicio del scroll reveal
  await animPage.evaluate(() => {
    const crmSection = document.querySelector('#crm');
    if (crmSection) {
      crmSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  await animPage.waitForTimeout(400); // Primeras burbujas apareciendo
  await animPage.screenshot({
    path: '/opt/cursor/artifacts/crm-animation-frame-1.png',
    fullPage: false
  });
  
  // Frame 2: Mitad de la animación
  await animPage.waitForTimeout(600);
  await animPage.screenshot({
    path: '/opt/cursor/artifacts/crm-animation-frame-2.png',
    fullPage: false
  });
  
  // Frame 3: Animación completa
  await animPage.waitForTimeout(800);
  await animPage.screenshot({
    path: '/opt/cursor/artifacts/crm-animation-frame-3.png',
    fullPage: false
  });
  
  console.log('Animation frames saved');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

captureScreenshots().catch(console.error);
