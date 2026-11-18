import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

// Initialize global DOM environment for testing
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window as any;
global.document = dom.window.document as any;

import { cleanAndStructureContent } from '../components/ui/RichTextEditor';

describe('RichTextEditor Paste & Formatting Tests', () => {
  it('should preserve bold job titles and structure bullets into separate lists', () => {
    const inputWithBold = `<p class="MsoNormal"><b>UI Developer Intern | Cerebronix (Neosys Ventures LLP) Mar 2025 – June 2025</b></p>
<p class="MsoNormal">• Developed responsive web interfaces using <b>Next.js</b> and <b>React.js</b>.</p>
<p class="MsoNormal">• Implemented frontend features including <b>REST API</b> integration.</p>
<p class="MsoNormal"><b>Teaching Faculty | CSC Computer Education April 2024 - Feb 2025</b></p>
<p class="MsoNormal">• Delivered theory and hands-on practical sessions.</p>`;

    const html = cleanAndStructureContent(inputWithBold);

    // Assert first job title is bold in its own paragraph
    assert.ok(
      html.includes('UI Developer Intern | Cerebronix') &&
        (html.includes('<b>UI Developer Intern') || html.includes('<strong>UI Developer Intern')),
      'First job title must remain bold in its own block'
    );

    // Assert second job title is bold in its own paragraph
    assert.ok(
      html.includes('Teaching Faculty | CSC Computer Education') &&
        (html.includes('<b>Teaching Faculty') || html.includes('<strong>Teaching Faculty')),
      'Second job title must remain bold in its own block'
    );

    // Assert inline bold marks are kept
    assert.ok(
      html.includes('<b>Next.js</b>') || html.includes('<strong>Next.js</strong>'),
      'Inline bold Next.js must be preserved'
    );
    assert.ok(
      html.includes('<b>React.js</b>') || html.includes('<strong>React.js</strong>'),
      'Inline bold React.js must be preserved'
    );

    // Assert bullets are grouped in <ul> lists
    const ulMatches = html.match(/<ul>[\s\S]*?<\/ul>/g);
    assert.equal(ulMatches?.length, 2, 'There should be 2 separate <ul> lists for the 2 jobs');
  });

  it('should convert multi-line wrapped bullet points into structured <ul><li> elements', () => {
    const userBulletText = `• Developed and maintained scalable web applications using Next.js, React.js, TypeScript, Tailwind CSS,
Redux Toolkit, Go, and REST APIs.
• Developed and enhanced Go-based backend services, implementing REST APIs, authentication-related
functionality, business logic, and API request/response structures.
• Customized the Medusa e-commerce platform through plugin development, backend enhancements, Admin UI
customization, and multi-store functionality.
• Implemented authentication and authorization using Ory Kratos and integrated Meta (Facebook) OAuth,
along with WhatsApp Template Builder, internationalization (i18n), and guided product tours.
• Developed CMS-driven pages and real-time communication features using Payload CMS and WebSockets,
integrating Chatwoot, Chatscope Chat UI Kit, and Lobehub, and developed a standalone chat application for
direct customer-client communication.
• Improved application performance through client-side caching, state management, and API optimization,
while working in Docker-based environments and collaborating through Git, Bitbucket, Jira, and Postman in an
Agile development environment.`;

    const html = cleanAndStructureContent(userBulletText);

    assert.ok(html.startsWith('<ul>'), 'Should start with <ul> tag');
    assert.ok(html.endsWith('</ul>'), 'Should end with </ul> tag');

    const liMatches = html.match(/<li>[\s\S]*?<\/li>/g);
    assert.equal(liMatches?.length, 6, 'Should contain exactly 6 bullet items');
  });

  it('should preserve italic and underline tags inside bullet items', () => {
    const inputWithFormatting = `<p class="MsoNormal">• Built microservices with <i>Node.js</i> and <u>PostgreSQL</u>.<br>Enhanced query speed by 35%.</p><p class="MsoNormal">• Led deployment of <b>Docker containers</b> on AWS ECS.</p>`;

    const html = cleanAndStructureContent(inputWithFormatting);
    assert.ok(html.includes('<ul>'));
    assert.ok(html.includes('<i>Node.js</i>') || html.includes('<em>Node.js</em>'));
    assert.ok(html.includes('<u>PostgreSQL</u>'));
    assert.ok(html.includes('<b>Docker containers</b>') || html.includes('<strong>Docker containers</strong>'));
  });

  it('should handle numbered lists properly', () => {
    const numbered = '1. Completed system migration\n2. Decreased latency by 20%';
    const html = cleanAndStructureContent(numbered);
    assert.ok(html.startsWith('<ol>'));
    assert.ok(html.includes('<li>Completed system migration</li>'));
    assert.ok(html.includes('<li>Decreased latency by 20%</li>'));
    assert.ok(html.endsWith('</ol>'));
  });

  it('should handle plain paragraphs without bullets as <p> tags', () => {
    const plain = 'Experienced full-stack developer with 5+ years building SaaS web applications.';
    const html = cleanAndStructureContent(plain);
    assert.equal(html, '<p>Experienced full-stack developer with 5+ years building SaaS web applications.</p>');
  });
});
