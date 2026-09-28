import { LogoMark, Wordmark } from "@/components/brand/Logo";

/**
 * First-visit intro loader.
 *
 * Runs entirely on CSS + a tiny inline script, so it paints with the very first
 * HTML byte — no waiting on React to hydrate. The script only toggles
 * `data-intro` on <html>; the loader node itself is never mutated, so React
 * hydration stays clean.
 *
 *   (no attr) → loader hidden (no-JS visitors, crawlers)
 *   "play"    → loader visible, page scroll locked
 *   "done"    → exit animation, then hidden
 *   "skip"    → already seen this session, never shown
 */

const MIN_MS = 1900; // long enough to enjoy the mark, short enough not to annoy
const MAX_MS = 4500; // hard cap so a slow asset never traps the visitor

// Also sets data-js, which enables the scroll-reveal styles (content stays visible without JS).
const introScript = `(function(){var d=document.documentElement,k="trioga:intro";d.dataset.js="1";
try{if(sessionStorage.getItem(k)){d.dataset.intro="skip";return}sessionStorage.setItem(k,"1")}catch(e){}
var rm=matchMedia("(prefers-reduced-motion: reduce)").matches,min=rm?500:${MIN_MS},t0=Date.now(),ended=false;
d.dataset.intro="play";
function end(){if(ended)return;ended=true;setTimeout(function(){d.dataset.intro="done"},Math.max(0,min-(Date.now()-t0)))}
if(document.readyState==="complete")end();else addEventListener("load",end,{once:true});
setTimeout(end,${MAX_MS});})();`;

/** Place inside <head> so the state is set before the first paint. */
export function IntroScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: introScript }}
    />
  );
}

export function Loader() {
  return (
    <div id="t-loader" aria-hidden="true">
      <div className="t-loader-glow" />
      <div className="t-loader-inner">
        <div className="t-loader-row">
          <div className="t-loader-mark">
            <LogoMark className="h-full w-full" />
          </div>
          <Wordmark className="t-loader-word" />
        </div>
        <div className="t-loader-bar">
          <span />
        </div>
      </div>
    </div>
  );
}
