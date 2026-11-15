/**
 * Start a looping clip. If the browser cannot play it, the element is
 * marked `data-failed` so CSS can hide it and show the still image instead
 * of a broken player.
 */
export async function playLoop(video: HTMLVideoElement): Promise<boolean> {
  if (video.dataset.failed === "true") return false;
  try {
    await video.play();
    return true;
  } catch (error) {
    // AbortError only means pause() arrived first (the pointer left).
    if ((error as DOMException)?.name !== "AbortError") {
      video.dataset.failed = "true";
    }
    return false;
  }
}
