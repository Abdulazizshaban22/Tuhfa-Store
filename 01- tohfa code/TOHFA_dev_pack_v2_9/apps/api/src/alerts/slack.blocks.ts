import fetch from 'node-fetch';

export interface SlackBlockParams {
  title: string;
  summary?: string;
  severity?: 'info'|'warning'|'critical';
  runbookUrl?: string;
  grafanaImageUrl?: string; // pre-rendered PNG from Grafana renderer
  context?: Record<string, any>;
}

export async function sendSlackBlocks(webhookUrl: string, p: SlackBlockParams) {
  const color = p.severity === 'critical' ? '#D32F2F' : p.severity === 'warning' ? '#F57C00' : '#1976D2';
  const blocks: any[] = [
    { type: 'header', text: { type: 'plain_text', text: p.title, emoji: true } },
  ];
  if (p.summary) {
    blocks.push({ type: 'section', text: { type: 'mrkdwn', text: p.summary }});
  }
  if (p.grafanaImageUrl) {
    blocks.push({ type: 'image', image_url: p.grafanaImageUrl, alt_text: 'Grafana snapshot' });
  }
  const fields: any[] = [];
  if (p.severity) fields.push({ type: 'mrkdwn', text: `*Severity*\n${p.severity}` });
  if (p.runbookUrl) fields.push({ type: 'mrkdwn', text: `*Runbook*\n<${p.runbookUrl}|Open>` });
  if (Object.keys(p.context||{}).length) fields.push({ type: 'mrkdwn', text: `*Context*\n\`${JSON.stringify(p.context)}\`` });
  if (fields.length) blocks.push({ type: 'section', fields });

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blocks })
  });
}
