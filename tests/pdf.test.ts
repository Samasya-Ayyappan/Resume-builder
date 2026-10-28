import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import jsPDF from 'jspdf';

describe('PDF Generation Engine Tests', () => {
  it('should initialize jsPDF and generate valid A4 multi-page document buffer', () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Verify A4 dimensions (210mm x 297mm)
    assert.equal(Math.round(pdfWidth), 210);
    assert.equal(Math.round(pdfHeight), 297);

    // Add page 2
    pdf.addPage('a4', 'portrait');
    assert.equal(pdf.internal.getNumberOfPages(), 2);

    const arrayBuffer = pdf.output('arraybuffer');
    assert.ok(arrayBuffer.byteLength > 500, 'PDF buffer should be non-empty');

    // Verify PDF Magic Bytes (%PDF-)
    const headerBytes = Buffer.from(arrayBuffer.slice(0, 5)).toString('utf-8');
    assert.equal(headerBytes, '%PDF-');
  });
});
