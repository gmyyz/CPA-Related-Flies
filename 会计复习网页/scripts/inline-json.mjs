// Escape data before embedding it in HTML script text, including escaped-script states.
export function serializeInlineJson(value, space) {
  return JSON.stringify(value, null, space).replace(/</g, "\\u003c");
}
