
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

export interface PdfExportResult {
  success: boolean;
  fileName?: string;
  totalPages?: number;
  error?: string;
}

export async function exportResumeToPdf(
  element: HTMLElement,
  fileName: string = 'Resume.pdf'
): Promise<PdfExportResult> {
  let offscreenContainer: HTMLDivElement | null = null;

  try {
    if (typeof window === 'undefined') {
      return {
        success: false,
        error: 'PDF export is only available in browser environments.',
      };
    }

    if (!element) {
      return {
        success: false,
        error: 'Resume preview document element not found.',
      };
    }

    // Wait for fonts before capturing.
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    // Create isolated A4 container.
    offscreenContainer = document.createElement('div');

    Object.assign(offscreenContainer.style, {
      position: 'fixed',
      left: '-10000px',
      top: '0',
      width: '210mm',
      backgroundColor: '#ffffff',
      zIndex: '-99999',
      overflow: 'visible',
      pointerEvents: 'none',
    });

    // Clone the resume.
    const clone = element.cloneNode(true) as HTMLElement;

    const templateRoot = clone.querySelector<HTMLElement>(
      '.resume-template-root'
    );

    if (templateRoot) {
      // Keep horizontal margins but remove the one-time vertical padding.
      // Vertical margins will be applied separately to every PDF page.
      templateRoot.style.padding = '0 10mm';
    }

    Object.assign(clone.style, {
      transform: 'none',
      width: '210mm',
      minHeight: '0',
      height: 'auto',
      margin: '0',
      boxShadow: 'none',
      border: 'none',
      backgroundColor: '#ffffff',
      color: '#0f172a',
      overflow: 'visible',
      boxSizing: 'border-box',
    });

    offscreenContainer.appendChild(clone);
    document.body.appendChild(offscreenContainer);

    // Allow layout to settle.
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100);
    });

    // Get actual content dimensions.
    const contentWidth = Math.ceil(
      clone.getBoundingClientRect().width
    );

    const contentHeight = Math.ceil(
      Math.max(clone.scrollHeight, clone.offsetHeight)
    );

    if (contentWidth === 0 || contentHeight === 0) {
      throw new Error('Resume content has invalid dimensions.');
    }

    // Capture actual content without forcing an extra A4 page.
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: contentWidth,
      height: contentHeight,
      windowWidth: contentWidth,
      windowHeight: contentHeight,
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas render produced an empty image.');
    }

    // Initialize A4 PDF.
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const PAGE_MARGIN_MM = 10;
    const CONTENT_HEIGHT_MM = pdfHeight - PAGE_MARGIN_MM * 2;

    const pageCanvasHeight = Math.floor(
      canvas.width * (CONTENT_HEIGHT_MM / pdfWidth)
    );

    // Calculate safe section boundaries.
    const cloneRect = clone.getBoundingClientRect();

    const scaleFactor =
      canvas.width / cloneRect.width;

    const safeBreaks = Array.from(
      clone.querySelectorAll<HTMLElement>(
        '.break-inside-avoid'
      )
    )
      .map((node) => {
        const rect = node.getBoundingClientRect();

        return Math.round(
          (rect.bottom - cloneRect.top) * scaleFactor
        );
      })
      .filter(
        (position) =>
          position > 0 && position < canvas.height
      )
      .sort((a, b) => a - b);

    // Pagination.
    let sourceY = 0;
    let totalPages = 0;

    // Ignore insignificant canvas rounding remnants.
    const pixelTolerance = 2;

    while (sourceY < canvas.height - pixelTolerance) {
      const targetY = Math.min(
        sourceY + pageCanvasHeight,
        canvas.height
      );

      let nextY = targetY;

      // Only adjust breaks when another page is needed.
      if (targetY < canvas.height - pixelTolerance) {
        const minUsefulHeight =
          pageCanvasHeight * 0.75;

        const candidates = safeBreaks.filter(
          (position) =>
            position > sourceY + minUsefulHeight &&
            position <= targetY
        );

        if (candidates.length > 0) {
          nextY = candidates[candidates.length - 1];
        }
      }

      if (nextY <= sourceY) {
        throw new Error('Invalid PDF page boundary.');
      }

      const sourceHeight = nextY - sourceY;

      // Add a new page only when actual content remains.
      if (totalPages > 0) {
        pdf.addPage('a4', 'portrait');
      }

      const sliceCanvas = document.createElement('canvas');

      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sourceHeight;

      const ctx = sliceCanvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not create canvas context.');
      }

      ctx.fillStyle = '#ffffff';

      ctx.fillRect(
        0,
        0,
        sliceCanvas.width,
        sliceCanvas.height
      );

      ctx.drawImage(
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

      const imageData = sliceCanvas.toDataURL('image/png');

      // Preserve identical width and image scale on every page.
      const renderedHeight =
        sourceHeight * (pdfWidth / canvas.width);

      pdf.addImage(
        imageData,
        'PNG',
        0,
        PAGE_MARGIN_MM,
        pdfWidth,
        Math.min(renderedHeight, CONTENT_HEIGHT_MM),
        undefined,
        'FAST'
      );

      sourceY = nextY;
      totalPages++;
    }

    if (totalPages === 0) {
      throw new Error('No PDF pages were generated.');
    }

    // Download PDF.
    const cleanFileName = fileName.endsWith('.pdf')
      ? fileName
      : `${fileName}.pdf`;

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

    return {
      success: true,
      fileName: cleanFileName,
      totalPages,
    };

  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : 'Unknown PDF generation error';

    console.error(
      '[Resume Studio] Error generating PDF:',
      error
    );

    return {
      success: false,
      error: errorMsg,
    };

  } finally {
    if (offscreenContainer?.parentNode) {
      offscreenContainer.parentNode.removeChild(
        offscreenContainer
      );
    }
  }
}

/**
 * Native browser printing.
 */
export function triggerNativePrint(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}
