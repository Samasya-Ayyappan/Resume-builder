import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportResult {
  success: boolean;
  fileName?: string;
  totalPages?: number;
  error?: string;
}

/**
 * Exports the specified HTML resume element as a crisp, multi-page vector-quality A4 PDF.
 * Uses an offscreen clone to isolate from zoom transforms, parent flex/hidden states, and responsive media rules.
 */
export async function exportResumeToPdf(
  element: HTMLElement,
  fileName: string = 'Resume.pdf'
): Promise<PdfExportResult> {
  let offscreenContainer: HTMLDivElement | null = null;

  try {
    if (typeof window === 'undefined') {
      return { success: false, error: 'PDF export is only available in browser environments.' };
    }

    if (!element) {
      return { success: false, error: 'Resume preview document element not found.' };
    }

    // Wait for custom web fonts (Geist, serif, etc.) to complete layout rasterization
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch (fontErr) {
        console.warn('[PDF Export] Font ready promise rejected:', fontErr);
      }
    }

    // Create an isolated offscreen container with exact A4 proportions (210mm) and unscaled CSS
    offscreenContainer = document.createElement('div');
    offscreenContainer.style.position = 'fixed';
    offscreenContainer.style.left = '-10000px';
    offscreenContainer.style.top = '0';
    offscreenContainer.style.width = '210mm';
    offscreenContainer.style.backgroundColor = '#ffffff';
    offscreenContainer.style.zIndex = '-99999';
    offscreenContainer.style.overflow = 'visible';
    offscreenContainer.style.opacity = '1';
    offscreenContainer.style.pointerEvents = 'none';

    // Deep clone the resume template markup
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.transform = 'none';
    clone.style.width = '210mm';
    clone.style.minHeight = '297mm';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.border = 'none';
    clone.style.backgroundColor = '#ffffff';
    clone.style.overflow = 'visible';

    offscreenContainer.appendChild(clone);
    document.body.appendChild(offscreenContainer);

    // Allow browser one animation frame to compute clean layout
    await new Promise((resolve) => setTimeout(resolve, 50));

// -------------------------------------------------------------
// ① Clean any literal `lab(` syntax that survived into the HTML.
// This works even if the color is defined via a CSS variable
// or an inline style that the browser already computed.
// -------------------------------------------------------------
const rawHtml = clone.outerHTML;
const cleanedHtml = rawHtml.replace(/lab\([^)]*\)/gi, '');

const cleanedContainer = document.createElement('div');
cleanedContainer.innerHTML = cleanedHtml;
if (!cleanedContainer.firstElementChild) {
  throw new Error('Failed to generate a clean clone for PDF export.');
}
const cleanedClone = cleanedContainer.firstElementChild as HTMLElement;

// -------------------------------------------------------------
// ② Capture the cleaned clone with html2canvas
// -------------------------------------------------------------
const canvas = await html2canvas(cleanedClone, {
  scale: 2,
  useCORS: true,
  logging: false,
  backgroundColor: '#ffffff',
  windowWidth: cleanedClone.scrollWidth || 794,
});

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas render produced an empty image buffer.');
    }

    // A4 dimensions in mm: 210 x 297 (aspect ratio ~ 1.4142857)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate canvas height corresponding to one A4 page
    const a4Ratio = pdfHeight / pdfWidth;
    const pageCanvasHeight = Math.floor(canvas.width * a4Ratio);

    // Calculate number of pages required
    const totalPages = Math.max(1, Math.ceil(canvas.height / pageCanvasHeight));

    // Slice canvas into separate A4 page slices to prevent distortion and clipping
    for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
      if (pageIdx > 0) {
        pdf.addPage('a4', 'portrait');
      }

      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = pageCanvasHeight;

      const sliceCtx = sliceCanvas.getContext('2d');
      if (sliceCtx) {
        // Fill page background with pure white
        sliceCtx.fillStyle = '#ffffff';
        sliceCtx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);

        const sourceY = pageIdx * pageCanvasHeight;
        const sourceHeight = Math.min(pageCanvasHeight, canvas.height - sourceY);

        if (sourceHeight > 0) {
          sliceCtx.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sourceHeight,
            0,
            0,
            canvas.width,
            sourceHeight
          );
        }

        const pageImgData = sliceCanvas.toDataURL('image/png', 0.95);
        pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      }
    }

    // Construct sanitized file name
    const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;

    // Trigger download using Blob + object URL for maximum cross-browser reliability
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = cleanFileName;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 2000);

    return { success: true, fileName: cleanFileName, totalPages };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown PDF generation error';
    console.error('[Resume Studio] Error generating PDF:', error);
    return { success: false, error: errorMsg };
  } finally {
    // Always cleanup offscreen container
    if (offscreenContainer && offscreenContainer.parentNode) {
      offscreenContainer.parentNode.removeChild(offscreenContainer);
    }
  }
}

/**
 * Triggers the browser's native print dialog with print-optimized CSS
 */
export function triggerNativePrint(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}
