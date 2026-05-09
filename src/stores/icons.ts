export type IconElement =
  | { tag: 'path'; d: string }
  | { tag: 'line'; x1: string; y1: string; x2: string; y2: string }
  | { tag: 'circle'; cx: string; cy: string; r: string }
  | { tag: 'polyline'; points: string }
  | { tag: 'polygon'; points: string }
  | { tag: 'rect'; x: string; y: string; width: string; height: string; rx?: string; ry?: string }

export interface IconInterface {
  viewBox: string
  fill?: string
  stroke?: string
  strokeWidth?: string
  elements: IconElement[]
}

export default {
  // --- Sidebar layout ---
  openedSidebar: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M6 21a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zM18 5h-8v14h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1' },
    ],
  },
  closedSidebar: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5-2v16' },
    ],
  },

  // --- Chat actions ---
  dotsHorizontal: {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none',
    elements: [
      { tag: 'circle', cx: '5', cy: '12', r: '2' },
      { tag: 'circle', cx: '12', cy: '12', r: '2' },
      { tag: 'circle', cx: '19', cy: '12', r: '2' },
    ],
  },

  // --- Menu icons ---
  pin: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'line', x1: '12', y1: '17', x2: '12', y2: '22' },
      { tag: 'path', d: 'M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z' },
    ],
  },
  pinFilled: {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none',
    elements: [
      { tag: 'path', d: 'M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z' },
      { tag: 'line', x1: '12', y1: '17', x2: '12', y2: '22' },
    ],
  },
  rename: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' },
      { tag: 'path', d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z' },
    ],
  },
  folderPlus: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' },
      { tag: 'line', x1: '12', y1: '11', x2: '12', y2: '17' },
      { tag: 'line', x1: '9', y1: '14', x2: '15', y2: '14' },
    ],
  },
  trash: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'polyline', points: '3 6 5 6 21 6' },
      { tag: 'path', d: 'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6' },
      { tag: 'path', d: 'M10 11v6M14 11v6' },
      { tag: 'path', d: 'M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' },
    ],
  },

  // --- Sidebar controls ---
  plus: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'line', x1: '12', y1: '5', x2: '12', y2: '19' },
      { tag: 'line', x1: '5', y1: '12', x2: '19', y2: '12' },
    ],
  },
  search: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'circle', cx: '11', cy: '11', r: '8' },
      { tag: 'line', x1: '21', y1: '21', x2: '16.65', y2: '16.65' },
    ],
  },

  // --- Theme toggle ---
  sun: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'circle', cx: '12', cy: '12', r: '5' },
      { tag: 'line', x1: '12', y1: '1', x2: '12', y2: '3' },
      { tag: 'line', x1: '12', y1: '21', x2: '12', y2: '23' },
      { tag: 'line', x1: '4.22', y1: '4.22', x2: '5.64', y2: '5.64' },
      { tag: 'line', x1: '18.36', y1: '18.36', x2: '19.78', y2: '19.78' },
      { tag: 'line', x1: '1', y1: '12', x2: '3', y2: '12' },
      { tag: 'line', x1: '21', y1: '12', x2: '23', y2: '12' },
      { tag: 'line', x1: '4.22', y1: '19.78', x2: '5.64', y2: '18.36' },
      { tag: 'line', x1: '18.36', y1: '5.64', x2: '19.78', y2: '4.22' },
    ],
  },
  moon: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' },
    ],
  },

  // --- TopBar ---
  share: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'circle', cx: '18', cy: '5', r: '3' },
      { tag: 'circle', cx: '6', cy: '12', r: '3' },
      { tag: 'circle', cx: '18', cy: '19', r: '3' },
      { tag: 'line', x1: '8.59', y1: '13.51', x2: '15.42', y2: '17.49' },
      { tag: 'line', x1: '15.41', y1: '6.51', x2: '8.59', y2: '10.49' },
    ],
  },

  // --- Input area ---
  stop: {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none',
    elements: [
      { tag: 'rect', x: '4', y: '4', width: '16', height: '16', rx: '3', ry: '3' },
    ],
  },
  attach: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48' },
    ],
  },
  send: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'line', x1: '22', y1: '2', x2: '11', y2: '13' },
      { tag: 'polygon', points: '22 2 15 22 11 13 2 9 22 2' },
    ],
  },
  modelIcon: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'circle', cx: '12', cy: '12', r: '3' },
      { tag: 'path', d: 'M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83' },
    ],
  },
  chevronDown: {
    viewBox: '0 0 24 24',
    strokeWidth: '2.5',
    elements: [
      { tag: 'polyline', points: '6 9 12 15 18 9' },
    ],
  },

  close: {
    viewBox: '0 0 24 24',
    strokeWidth: '2.5',
    elements: [
      { tag: 'line', x1: '18', y1: '6', x2: '6', y2: '18' },
      { tag: 'line', x1: '6', y1: '6', x2: '18', y2: '18' },
    ],
  },
  logOut: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' },
      { tag: 'polyline', points: '16 17 21 12 16 7' },
      { tag: 'line', x1: '21', y1: '12', x2: '9', y2: '12' },
    ],
  },
  logIn: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' },
      { tag: 'polyline', points: '10 17 15 12 10 7' },
      { tag: 'line', x1: '15', y1: '12', x2: '3', y2: '12' },
    ],
  },
  globe: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'circle', cx: '12', cy: '12', r: '10' },
      { tag: 'line', x1: '2', y1: '12', x2: '22', y2: '12' },
      { tag: 'path', d: 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' },
    ],
  },
  sliders: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'line', x1: '4', y1: '21', x2: '4', y2: '14' },
      { tag: 'line', x1: '4', y1: '10', x2: '4', y2: '3' },
      { tag: 'line', x1: '12', y1: '21', x2: '12', y2: '12' },
      { tag: 'line', x1: '12', y1: '8', x2: '12', y2: '3' },
      { tag: 'line', x1: '20', y1: '21', x2: '20', y2: '16' },
      { tag: 'line', x1: '20', y1: '12', x2: '20', y2: '3' },
      { tag: 'line', x1: '1', y1: '14', x2: '7', y2: '14' },
      { tag: 'line', x1: '9', y1: '8', x2: '15', y2: '8' },
      { tag: 'line', x1: '17', y1: '16', x2: '23', y2: '16' },
    ],
  },
  chevronUp: {
    viewBox: '0 0 24 24',
    strokeWidth: '2.5',
    elements: [
      { tag: 'polyline', points: '18 15 12 9 6 15' },
    ],
  },
  settings: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'circle', cx: '12', cy: '12', r: '3' },
      { tag: 'path', d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' },
    ],
  },
  user: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' },
      { tag: 'circle', cx: '12', cy: '7', r: '4' },
    ],
  },
  arrowRight: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'line', x1: '5', y1: '12', x2: '19', y2: '12' },
      { tag: 'polyline', points: '12 5 19 12 12 19' },
    ],
  },
  camera: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z' },
      { tag: 'circle', cx: '12', cy: '13', r: '4' },
    ],
  },
  // --- Message reactions ---
  thumbUp: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z' },
      { tag: 'path', d: 'M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3' },
    ],
  },
  thumbDown: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z' },
      { tag: 'path', d: 'M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17' },
    ],
  },
  copy: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'rect', x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' },
      { tag: 'path', d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' },
    ],
  },
  check: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'polyline', points: '20 6 9 17 4 12' },
    ],
  },
  newChat: {
    viewBox: '0 0 24 24',
    elements: [
      { tag: 'path', d: 'M20 12c0-3.771 0-5.657-1.172-6.828S15.771 4 12 4S6.343 4 5.172 5.172S4 8.229 4 12v6c0 .943 0 1.414.293 1.707S5.057 20 6 20h6c3.771 0 5.657 0 6.828-1.172S20 15.771 20 12Z' },
      { tag: 'line', x1: '9', y1: '12', x2: '15', y2: '12' },
      { tag: 'line', x1: '12', y1: '9', x2: '12', y2: '15' },
    ],
  },
} as Record<string, IconInterface>
