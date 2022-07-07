import type { Event } from '../types/ga';

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

// PVを測定
export const pageview = (path: string) => {
  if (GA_ID === undefined) {
    return;
  }

  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

// GAイベントを発火させる
export const event = ({ action, category, label }: Event) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
  });
};
