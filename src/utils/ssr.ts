// https://github.com/JedWatson/exenv/blob/5171d645e2d9592c64fb2d8e0916a372f20848e2/index.js#L11
export const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement)
