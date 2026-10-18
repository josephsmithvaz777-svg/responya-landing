import { chromium } from 'playwright';

async function recordVideo() {
  const browser = await chromium.launch({
    args: ['--disable-translate', '--disable-features=Translate']
  });
  
  const context = await browser.newContext({
    locale: 'es-ES',
    extraHTTPHeaders: {
      'Accept-Language': 'es-ES,es;q=0.9'
    },
    viewport: { width: 1280, height: 900 },
    recordVideo: {
      dir: '/opt/cursor/artifacts/',
      size: { width: 1280, height: 900 }
    }
  });

  console.log('Recording video...');
  const page = await context.newPage();
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  // Esperar a que cargue
  await page.waitForTimeout(1000);
  
  // Scroll suave hasta la sección de servicios
  await page.evaluate(() => {
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  await page.waitForTimeout(2000);
  
  // Scroll suave hacia la sección CRM
  await page.evaluate(() => {
    const crmSection = document.querySelector('#crm');
    if (crmSection) {
      // Primero ir un poco antes
      const rect = crmSection.getBoundingClientRect();
      window.scrollTo({ 
        top: window.scrollY + rect.top - window.innerHeight + 200, 
        behavior: 'smooth' 
      });
    }
  });
  await page.waitForTimeout(2000);
  
  // Ahora scroll lentamente a través de la sección completa
  await page.evaluate(() => {
    const crmSection = document.querySelector('#crm');
    if (crmSection) {
      crmSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  await page.waitForTimeout(3000); // Esperar animaciones completas
  
  // Pausa para mostrar el resultado final
  await page.waitForTimeout(2000);
  
  // Scroll un poco más abajo para mostrar burbujas inferiores
  await page.evaluate(() => {
    window.scrollBy({ top: 200, behavior: 'smooth' });
  });
  await page.waitForTimeout(2000);

  console.log('Video recorded, closing...');
  await context.close();
  await browser.close();
  console.log('Video saved!');
}

recordVideo().catch(console.error);
