import jsPDF from 'jspdf';
import { PORTFOLIO_DATA } from '../config/portfolioData';

/**
 * Generates and downloads the official "Shubham_Sauhardra_IT_Portfolio.pdf"
 * adhering to professional A4 dimensions (210 x 297 mm), Navy blue (#0A192F)
 * and Electric blue (#0284C7) color themes, page numbering, and clickable links.
 */
export function generatePortfolioPdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const totalPages = 3;

  // Colors
  const navy = { r: 10, g: 25, b: 47 }; // #0A192F
  const electricBlue = { r: 2, g: 132, b: 199 }; // #0284C7
  const darkText = { r: 15, g: 23, b: 42 }; // #0F172A
  const mutedText = { r: 100, g: 116, b: 139 }; // #64748B
  const lightBg = { r: 248, g: 250, b: 252 }; // #F8FAFC

  const { personal, services, androidApps, crmProjects, liveWebsites, processSteps } = PORTFOLIO_DATA;

  // Helper for drawing footer on each page
  const drawFooter = (pageNum: number) => {
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(mutedText.r, mutedText.g, mutedText.b);
    doc.text(`${personal.name} — Website Developer & IT Solutions Provider`, margin, pageHeight - 7);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  };

  // Helper for drawing subheaders on continuation pages
  const drawPageHeader = (title: string) => {
    doc.setFillColor(navy.r, navy.g, navy.b);
    doc.rect(0, 0, pageWidth, 20, 'F');
    
    doc.setFillColor(electricBlue.r, electricBlue.g, electricBlue.b);
    doc.rect(0, 20, pageWidth, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(personal.name.toUpperCase(), margin, 12);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(186, 230, 253);
    doc.text(title, pageWidth - margin, 12, { align: 'right' });
  };

  /* ========================================================
     PAGE 1: Profile, About, Core Services
     ======================================================== */
  // Top Banner
  doc.setFillColor(navy.r, navy.g, navy.b);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Electric Blue accent stripe
  doc.setFillColor(electricBlue.r, electricBlue.g, electricBlue.b);
  doc.rect(0, 42, pageWidth, 2.5, 'F');

  // Monogram / Text Logo
  doc.setFillColor(15, 33, 64);
  doc.roundedRect(margin, 8, 16, 16, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(56, 189, 248);
  doc.text('SS', margin + 8, 18.5, { align: 'center' });

  // Name & Title in Banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text(personal.name, margin + 22, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(56, 189, 248);
  doc.text(personal.title, margin + 22, 23);

  // Contact Details bar inside banner or below
  doc.setFontSize(8.5);
  doc.setTextColor(226, 232, 240);
  const contactParts: string[] = [];
  if (personal.email) contactParts.push(`Email: ${personal.email}`);
  if (personal.mobileNumber) contactParts.push(`Tel: ${personal.mobileNumber}`);
  if (personal.whatsappNumber) contactParts.push(`WhatsApp: +${personal.whatsappNumber}`);
  if (personal.linkedInUrl) contactParts.push(`LinkedIn: in/shubham-sauhardra`);

  if (contactParts.length > 0) {
    doc.text(contactParts.join('  |  '), margin + 22, 31);
  } else {
    doc.setTextColor(148, 163, 184);
    doc.text('Professional IT Inquiries & Project Collaborations (Contact details supplied upon direct inquiry)', margin + 22, 31);
  }

  let y = 52;

  // Section: About Me
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navy.r, navy.g, navy.b);
  doc.text('ABOUT ME', margin, y);
  
  doc.setDrawColor(electricBlue.r, electricBlue.g, electricBlue.b);
  doc.setLineWidth(0.6);
  doc.line(margin, y + 2, margin + 24, y + 2);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(darkText.r, darkText.g, darkText.b);
  const splitBio = doc.splitTextToSize(personal.shortBio, contentWidth);
  doc.text(splitBio, margin, y);
  y += splitBio.length * 4.2 + 2;

  const splitPara = doc.splitTextToSize(personal.aboutText[0], contentWidth);
  doc.text(splitPara, margin, y);
  y += splitPara.length * 3.8 + 4;

  // Section: Services
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(navy.r, navy.g, navy.b);
  doc.text('PROFESSIONAL IT & WEB3 SERVICES', margin, y);
  
  doc.setDrawColor(electricBlue.r, electricBlue.g, electricBlue.b);
  doc.line(margin, y + 2, margin + 56, y + 2);
  y += 7;

  // 7 Services formatted in clean two-column grid + 1 hybrid consultation card
  const cardWidth = (contentWidth - 6) / 2;
  const cardHeight = 24;

  services.forEach((srv, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cardX = margin + col * (cardWidth + 6);
    const cardY = y + row * (cardHeight + 3);

    doc.setFillColor(lightBg.r, lightBg.g, lightBg.b);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 1.5, 1.5, 'FD');

    // Accent line on left of card
    doc.setFillColor(electricBlue.r, electricBlue.g, electricBlue.b);
    doc.rect(cardX, cardY, 1.2, cardHeight, 'F');

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.text(srv.title, cardX + 4, cardY + 5.5);

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(darkText.r, darkText.g, darkText.b);
    const descLines = doc.splitTextToSize(srv.description, cardWidth - 8);
    doc.text(descLines.slice(0, 2), cardX + 4, cardY + 10);

    // Features
    doc.setFontSize(6.5);
    doc.setTextColor(mutedText.r, mutedText.g, mutedText.b);
    let featY = cardY + 15.5;
    srv.features.slice(0, 2).forEach((feat) => {
      doc.text(`• ${feat}`, cardX + 4, featY);
      featY += 3.4;
    });
  });

  // Complementary 8th card to complete the 4x2 grid
  const customCardX = margin + 1 * (cardWidth + 6);
  const customCardY = y + 3 * (cardHeight + 3);
  doc.setFillColor(navy.r, navy.g, navy.b);
  doc.roundedRect(customCardX, customCardY, cardWidth, cardHeight, 1.5, 1.5, 'F');
  doc.setFillColor(electricBlue.r, electricBlue.g, electricBlue.b);
  doc.rect(customCardX, customCardY, 1.2, cardHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('Custom Hybrid & dApp Projects', customCardX + 4, customCardY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(203, 213, 225);
  doc.text('Bespoke contracts combining Web3, Mobile & CRM.', customCardX + 4, customCardY + 10);

  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('• Milestone-based delivery with clear roadmaps', customCardX + 4, customCardY + 15.5);
  doc.text('• Direct developer communication & support', customCardX + 4, customCardY + 18.9);

  // Section: Key Technical Proficiencies & Tools
  let skillY = y + 4 * (cardHeight + 3) + 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(navy.r, navy.g, navy.b);
  doc.text('TECHNICAL PROFICIENCIES & CORE TOOLS', margin, skillY);
  
  doc.setDrawColor(electricBlue.r, electricBlue.g, electricBlue.b);
  doc.line(margin, skillY + 1.5, margin + 58, skillY + 1.5);
  skillY += 5.5;

  // Display major engineering domains with progress bars
  const domainSummaries = [
    { name: 'Frontend & Web Development (HTML5, CSS3, React, Tailwind, TypeScript)', pct: 92 },
    { name: 'Cyber Security & Network Defense (OWASP Top 10, Firewalls, SSL/TLS, Encryption)', pct: 91 },
    { name: 'Web3 & Blockchain Engineering (Web3.js, Ethers.js, MetaMask, dApps, IPFS)', pct: 85 },
    { name: 'Android & Mobile Development (Android Studio, Java/Kotlin, SQLite)', pct: 88 },
    { name: 'Backend & CRM Architecture (Workflows, REST APIs, Business Logic)', pct: 86 },
    { name: 'IT Infrastructure & SEO (Diagnostics, OS Config, Schema, Local SEO)', pct: 91 },
  ];

  const barWidth = contentWidth - 25;
  domainSummaries.forEach((d) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.text(d.name, margin, skillY + 2.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(electricBlue.r, electricBlue.g, electricBlue.b);
    doc.text(`${d.pct}%`, margin + barWidth + 5, skillY + 2.5);

    // Track
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, skillY + 3.8, barWidth, 1.8, 0.4, 0.4, 'F');
    // Fill
    doc.setFillColor(electricBlue.r, electricBlue.g, electricBlue.b);
    doc.roundedRect(margin, skillY + 3.8, barWidth * (d.pct / 100), 1.8, 0.4, 0.4, 'F');

    skillY += 7;
  });

  // Tools & Ecosystem
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(mutedText.r, mutedText.g, mutedText.b);
  doc.text('Everyday Tools & Platforms: ' + PORTFOLIO_DATA.toolsAndPlatforms.slice(0, 11).join('  •  '), margin, skillY + 2);

  drawFooter(1);

  /* ========================================================
     PAGE 2: Android Applications & CRM Projects
     ======================================================== */
  doc.addPage();
  drawPageHeader('Android Applications & Software Solutions');

  y = 30;

  // Section: Android Applications
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navy.r, navy.g, navy.b);
  doc.text('MY ANDROID APPLICATIONS', margin, y);

  doc.setDrawColor(electricBlue.r, electricBlue.g, electricBlue.b);
  doc.line(margin, y + 2, margin + 48, y + 2);
  y += 7;

  androidApps.forEach((app) => {
    doc.setFillColor(lightBg.r, lightBg.g, lightBg.b);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 23, 1.5, 1.5, 'FD');

    // Title & Status
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.text(app.title, margin + 5, y + 6);

    // Status text (clean, unboxed)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(electricBlue.r, electricBlue.g, electricBlue.b);
    doc.text(`STATUS: ${app.status}`, pageWidth - margin - 5, y + 6, { align: 'right' });

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(darkText.r, darkText.g, darkText.b);
    doc.text(app.description, margin + 5, y + 11);

    // Capabilities / Details
    doc.setFontSize(7.5);
    doc.setTextColor(mutedText.r, mutedText.g, mutedText.b);
    const caps = app.keyCapabilities.slice(0, 2).join('  |  ');
    doc.text(`Key Focus: ${caps}`, margin + 5, y + 16);

    const screenshotsInfo = app.screenshots.length > 0 
      ? `Screenshots: Verified Mobile Interface Architecture Integrated (${app.screenshots.length} view${app.screenshots.length > 1 ? 's' : ''})`
      : 'Screenshots: Under development (Production captures coming soon)';
    doc.text(screenshotsInfo, margin + 5, y + 20);

    y += 26;
  });

  y += 4;

  // Section: CRM & Software Projects
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navy.r, navy.g, navy.b);
  doc.text('CRM & CUSTOM SOFTWARE PROJECTS', margin, y);

  doc.setDrawColor(electricBlue.r, electricBlue.g, electricBlue.b);
  doc.line(margin, y + 2, margin + 64, y + 2);
  y += 7;

  crmProjects.forEach((crm) => {
    doc.setFillColor(lightBg.r, lightBg.g, lightBg.b);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 23.5, 1.5, 1.5, 'FD');

    // Title & Status
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.text(crm.title, margin + 5, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(electricBlue.r, electricBlue.g, electricBlue.b);
    doc.text(`STATUS: ${crm.status}`, pageWidth - margin - 5, y + 6, { align: 'right' });

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(darkText.r, darkText.g, darkText.b);
    const desc = doc.splitTextToSize(crm.description, contentWidth - 10);
    doc.text(desc, margin + 5, y + 11);

    // Highlights
    doc.setFontSize(7.5);
    doc.setTextColor(mutedText.r, mutedText.g, mutedText.b);
    const domainText = `Target Scope: ${crm.targetDomain}  •  ${crm.scopeHighlights[0] || ''}`;
    doc.text(domainText, margin + 5, y + 16.5);

    if (crm.screenshots && crm.screenshots.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(16, 185, 129);
      doc.text('✓ Verified Enterprise Workspace Interface Integrated', margin + 5, y + 20.5);
    }

    y += 27.5;
  });

  drawFooter(2);

  /* ========================================================
     PAGE 3: Live Websites, Working Process, Contact
     ======================================================== */
  doc.addPage();
  drawPageHeader('Live Web Contributions & Working Process');

  y = 30;

  // Section: Live Website Contributions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navy.r, navy.g, navy.b);
  doc.text('LIVE WEBSITE CONTRIBUTIONS', margin, y);

  doc.setDrawColor(electricBlue.r, electricBlue.g, electricBlue.b);
  doc.line(margin, y + 2, margin + 56, y + 2);
  y += 7;

  liveWebsites.forEach((site) => {
    doc.setFillColor(lightBg.r, lightBg.g, lightBg.b);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 19, 1.5, 1.5, 'FD');

    // Title & Live Tag
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.text(site.name, margin + 4, y + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(16, 185, 129); // emerald
    doc.text(`[ ${site.status} ]`, pageWidth - margin - 4, y + 5.5, { align: 'right' });

    // Clickable link
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(electricBlue.r, electricBlue.g, electricBlue.b);
    doc.textWithLink(site.url, margin + 4, y + 10, { url: site.url });

    // Contribution text
    doc.setFontSize(7);
    doc.setTextColor(darkText.r, darkText.g, darkText.b);
    const contrib = doc.splitTextToSize(`Contribution: ${site.contribution}`, contentWidth - 8);
    doc.text(contrib.slice(0, 2), margin + 4, y + 14.5);

    y += 22;
  });

  y += 3;

  // Section: Working Process
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navy.r, navy.g, navy.b);
  doc.text('MY 5-STEP WORKING PROCESS', margin, y);

  doc.setDrawColor(electricBlue.r, electricBlue.g, electricBlue.b);
  doc.line(margin, y + 2, margin + 54, y + 2);
  y += 7;

  processSteps.forEach((step) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.text(`${step.stepNumber}. ${step.title}`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(darkText.r, darkText.g, darkText.b);
    const desc = doc.splitTextToSize(step.description, contentWidth - 45);
    doc.text(desc, margin + 45, y);

    y += 7.5;
  });

  y += 8;

  // Section: Inquiry & Contact Info
  doc.setFillColor(navy.r, navy.g, navy.b);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('START A PROJECT OR INQUIRE', margin + 6, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(186, 230, 253);
  doc.text('Ready to discuss website development, CRM software, IT support, or Android projects?', margin + 6, y + 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  
  let contactY = y + 22;
  if (personal.email) {
    doc.text(`Email: ${personal.email}`, margin + 6, contactY);
    contactY += 5;
  }
  if (personal.mobileNumber) {
    doc.text(`Phone / Mobile: ${personal.mobileNumber}`, margin + 6, contactY);
    contactY += 5;
  }
  if (personal.whatsappNumber) {
    doc.text(`WhatsApp: +${personal.whatsappNumber}`, margin + 6, contactY);
    contactY += 5;
  }
  if (personal.linkedInUrl) {
    doc.text(`LinkedIn: in/shubham-sauhardra (https://www.linkedin.com/in/shubham-sauhardra-0a20421b9)`, margin + 6, contactY);
    contactY += 5;
  }

  if (!personal.email && !personal.mobileNumber) {
    doc.setTextColor(148, 163, 184);
    doc.text('Direct contact channels and phone lines can be reached upon inquiry.', margin + 6, y + 23);
    doc.text('Visitors can submit project inquiries directly via the website contact form.', margin + 6, y + 28);
  }

  drawFooter(3);

  // Trigger download with the exact required filename
  doc.save('Shubham_Sauhardra_IT_Portfolio.pdf');
}
