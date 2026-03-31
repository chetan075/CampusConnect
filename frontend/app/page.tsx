import Link from "next/link";
import Script from 'next/script';

const css = `/*! tailwindcss v4.1.14 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-space-y-reverse:0;--tw-divide-y-reverse:0;--tw-border-style:solid;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-font-weight:initial;--tw-tracking:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-outline-style:solid}}}@layer theme{:root,:host{--font-sans:InterVariable,system-ui,sans-serif;--font-sans--font-feature-settings:"cv02","cv03","cv04","cv11"}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--font-sans--font-feature-settings);font-variation-settings:initial;-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-feature-settings:initial;font-variation-settings:initial;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.akgx{pointer-events:none}.akgy{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.akgz{position:absolute}.akha{position:fixed}.akhb{position:relative}.akhc{inset:0}.akhd{inset-inline:0}.akhe{inset-block:0}.akhf{top:0}.akhg{right:0}.akhh{left:50%}.akhi{isolation:isolate}.akhj{z-index:calc(10*-1)}.akhk{z-index:50}.akhl{margin:-.375rem}.akhm{margin:-.625rem}.akhn{margin-inline:-.75rem}.akho{margin-inline:auto}.akhp{margin-block:-1.5rem}.akhq{margin-top:1.5rem}.akhr{margin-top:2rem}.akhs{margin-top:2.5rem}.akht{margin-top:3.5rem}.akhu{margin-right:auto}.akhv{margin-left:-6rem}.akhw{margin-left:auto}.akhx{display:block}.akhy{display:flex}.akhz{display:flow-root}.akia{display:none}.akib{display:inline-flex}.akic{aspect-ratio:2/3}.akid{aspect-ratio:801/1036}.akie{width:1.5rem;height:1.5rem}.akif{height:2rem}.akig{height:64rem}.akih{width:11rem}.akii{width:50.0625rem}.akij{width:auto}.akik{width:100%}.akil{max-width:42rem}.akim{max-width:80rem}.akin{flex:none}.akio{transform:translateZ(0)var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.akip{align-items:center}.akiq{justify-content:space-between}.akir{justify-content:center}.akis{justify-content:flex-end}.akit{gap:2rem}:where(.akiu>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(.25rem*2)*var(--tw-space-y-reverse));margin-block-end:calc(calc(.25rem*2)*calc(1 - var(--tw-space-y-reverse)))}:where(.akiv>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(.25rem*8)*var(--tw-space-y-reverse));margin-block-end:calc(calc(.25rem*8)*calc(1 - var(--tw-space-y-reverse)))}.akiw{column-gap:1.5rem}.akix{column-gap:3.5rem}:where(.akiy>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px*var(--tw-divide-y-reverse));border-bottom-width:calc(1px*calc(1 - var(--tw-divide-y-reverse)))}:where(.akiz>:not(:last-child)){border-color:oklab(55.1% -.00265162 -.0268695/.1)}:where(.akja>:not(:last-child)){border-color:oklab(100% 0 5.96046e-8/.1)}.akjb{overflow:hidden}.akjc{overflow:visible}.akjd{overflow-y:auto}.akje{border-radius:.5rem}.akjf{border-radius:.375rem}.akjg{border-radius:.75rem}.akjh{background-color:oklab(37.3% -.00605999 -.0334556/.05)}.akji{background-color:oklch(21% .034 264.665)}.akjj{background-color:oklch(51.1% .262 276.966)}.akjk{background-color:oklch(58.5% .233 277.117)}.akjl{background-color:oklch(51.1% .262 276.966)}.akjm{background-color:#fff}.akjn{--tw-gradient-position:to top right}@supports (background-image:linear-gradient(in lab, red, red)){.akjn{--tw-gradient-position:to top right in oklab}}.akjn{background-image:linear-gradient(var(--tw-gradient-stops))}.akjo{--tw-gradient-from:#ff80b5;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.akjp{--tw-gradient-to:#9089fc;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.akjq{-webkit-mask-image:radial-gradient(32rem 32rem,#fff,#0000);mask-image:radial-gradient(32rem 32rem,#fff,#0000)}.akjr{fill:oklch(98.5% .002 247.839)}.akjs{fill:oklch(27.8% .033 256.848)}.akjt{stroke:oklch(92.8% .006 264.531)}.akju{stroke:oklab(100% 0 5.96046e-8/.1)}.akjv{object-fit:cover}.akjw{padding:.375rem}.akjx{padding:.625rem}.akjy{padding:1.5rem}.akjz{padding-inline:.75rem}.akka{padding-inline:.875rem}.akkb{padding-inline:1.5rem}.akkc{padding-block:.5rem}.akkd{padding-block:.625rem}.akke{padding-block:1.5rem}.akkf{padding-top:8rem}.akkg{padding-top:9rem}.akkh{padding-bottom:8rem}.akki{font-size:3rem;line-height:var(--tw-leading,1)}.akkj{font-size:1rem;line-height:1.75rem}.akkk{font-size:1.125rem;line-height:var(--tw-leading,calc(1.75/1.125))}.akkl{font-size:.875rem;line-height:var(--tw-leading,calc(1.25/.875))}.akkm{font-size:.875rem;line-height:1.5rem}.akkn{--tw-font-weight:500;font-weight:500}.akko{--tw-font-weight:600;font-weight:600}.akkp{--tw-tracking:-.025em;letter-spacing:-.025em}.akkq{text-wrap:pretty}.akkr{color:oklch(92.8% .006 264.531)}.akks{color:oklch(70.7% .022 261.325)}.akkt{color:oklch(55.1% .027 264.364)}.akku{color:oklch(37.3% .034 259.733)}.akkv{color:oklch(21% .034 264.665)}.akkw{color:#fff}.akkx{opacity:.3}.akky{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.akkz{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.akla{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.aklb{--tw-ring-color:oklab(21% -.00316127 -.0338527/.1)}.aklc{--tw-ring-color:oklab(100% 0 5.96046e-8/.1)}.akld{--tw-blur:blur(64px);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.akle{--tw-ring-inset:inset}@media not all and (prefers-color-scheme:dark){.aklf{display:none}}.aklg::backdrop{background-color:#0000}@media (hover:hover){.aklh:hover{background-color:oklch(98.5% .002 247.839)}.akli:hover{background-color:oklch(67.3% .182 276.935)}.aklj:hover{background-color:oklch(58.5% .233 277.117)}.aklk:hover{background-color:oklab(100% 0 5.96046e-8/.05)}}.akll:focus{--tw-outline-style:none;outline-style:none}.aklm:focus-visible{outline-style:var(--tw-outline-style);outline-width:2px}.akln:focus-visible{outline-offset:2px}.aklo:focus-visible{outline-color:oklch(58.5% .233 277.117)}.aklp:focus-visible{outline-color:oklch(51.1% .262 276.966)}@media (min-width:40rem){.aklq{margin-top:-11rem}.aklr{margin-right:0}.akls{margin-left:0}.aklt{max-width:28rem}.aklu{max-width:24rem}.aklv{justify-content:flex-start}.aklw{padding-top:0}.aklx{padding-top:13rem}.akly{padding-top:15rem}.aklz{padding-top:20rem}.akma{padding-left:5rem}.akmb{font-size:4.5rem;line-height:var(--tw-leading,1)}.akmc{font-size:1.25rem;line-height:2rem}.akmd{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.akme{--tw-ring-color:oklab(96.7% -.000285348 -.0029864/.1)}.akmf{--tw-ring-color:oklab(21% -.00316127 -.0338527/.1)}}@media (min-width:64rem){.akmg{order:9999}.akmh{margin-inline:0}.akmi{margin-top:0}.akmj{margin-left:6rem}.akmk{display:flex}.akml{display:none}.akmm{max-width:none}.akmn{max-width:36rem}.akmo{flex:1}.akmp{flex-shrink:0}.akmq{align-items:center}.akmr{justify-content:flex-end}.akms{column-gap:3rem}.akmt{padding-inline:2rem}.akmu{padding-top:8rem}.akmv{padding-top:9rem}.akmw{padding-left:0}}@media (min-width:80rem){.akmx{order:0}.akmy{margin-left:12rem}.akmz{max-width:42rem}.akna{padding-top:20rem}}@media (prefers-color-scheme:dark){.aknb{display:none}:where(.aknc>:not(:last-child)){border-color:oklab(100% 0 5.96046e-8/.1)}.aknd{background-color:oklab(37.3% -.00605999 -.0334556/.05)}.akne{background-color:oklch(21% .034 264.665)}.aknf{background-color:oklch(58.5% .233 277.117)}.akng{fill:oklch(27.8% .033 256.848)}.aknh{stroke:oklab(100% 0 5.96046e-8/.1)}.akni{color:oklch(92.8% .006 264.531)}.aknj{color:oklch(70.7% .022 261.325)}.aknk{color:#fff}.aknl{--tw-ring-color:oklab(100% 0 5.96046e-8/.1)}@media (hover:hover){.aknm:hover{background-color:oklch(67.3% .182 276.935)}.aknn:hover{background-color:oklab(100% 0 5.96046e-8/.05)}}.akno:focus-visible{outline-color:oklch(58.5% .233 277.117)}@media (min-width:40rem){.aknp{--tw-ring-color:oklab(96.7% -.000285348 -.0029864/.1)}}}}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}`;

export default function Home() {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@insiders" strategy="beforeInteractive" />
      <style dangerouslySetInnerHTML={{__html: css}} />
      <div className="akjb">
        <div className="akji">
          <header className="akgz akhd akhf akhk">
            <nav aria-label="Global" className="akho akhy akim akip akiq akjy akmt">
              <div className="akhy akmo">
                <Link href="#" className="akhl akjw">
                  <span className="akgy">Campus Connect</span>
                  <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&amp;shade=500" alt="" className="akif akij" />
                </Link>
              </div>
              <div className="akhy akml">
                <button type="button" command="show-modal" commandfor="mobile-menu" className="akhm akib akip akir akjf akjx akkr">
                  <span className="akgy">Open main menu</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="akie">
                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="akia akmk akms">
                <Link href="/posts" className="akkm akko akkw">Posts</Link>
                <Link href="/events" className="akkm akko akkw">Events</Link>
                <Link href="/chat" className="akkm akko akkw">Chat</Link>
                <Link href="/profile" className="akkm akko akkw">Profile</Link>
              </div>
              <div className="akia akmk akmo akmr">
                <Link href="/login" className="akkm akko akkw">Log in <span aria-hidden="true">&rarr;</span></Link>
              </div>
            </nav>
            {/* @ts-ignore */}
            <el-dialog>
              <dialog id="mobile-menu" className="aklg akml">
                <div className="akha akhc akll">
                  <div className="akha akhe akhg akhk akik akjd akji akjy aklu akmd akme">
                    <div className="akhy akip akiq">
                      <Link href="#" className="akhl akjw">
                        <span className="akgy">Campus Connect</span>
                        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&amp;shade=500" alt="" className="akif akij" />
                      </Link>
                      <button type="button" command="close" commandfor="mobile-menu" className="akhm akjf akjx akkr">
                        <span className="akgy">Close menu</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="akie">
                          <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <div className="akhq akhz">
                      <div className="akhp akiy akja">
                        <div className="akiu akke">
                          <Link href="/posts" className="akhn akhx akje akjz akkc akkj akko akkw aklk">Posts</Link>
                          <Link href="/events" className="akhn akhx akje akjz akkc akkj akko akkw aklk">Events</Link>
                          <Link href="/chat" className="akhn akhx akje akjz akkc akkj akko akkw aklk">Chat</Link>
                          <Link href="/profile" className="akhn akhx akje akjz akkc akkj akko akkw aklk">Profile</Link>
                        </div>
                        <div className="akke">
                          <Link href="/login" className="akhn akhx akje akjz akkd akkj akko akkw aklk">Log in</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
            </el-dialog>
          </header>
          <main>
            <div className="akhb akhi">
              <svg aria-hidden="true" className="akgz akhd akhf akhj akig akik akjq akju">
                <defs>
                  <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y="-1" className="akjc akjs">
                  <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" strokeWidth="0" />
                </svg>
                <rect width="100%" height="100%" fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" strokeWidth="0" />
              </svg>
              <div aria-hidden="true" className="akgz akhf akhg akhh akhj akhv akio akjb akld akmj akmy">
                <div style={{clipPath: "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)"}} className="akid akii akjn akjo akjp akkx"></div>
              </div>
              <div className="akjb">
                <div className="akho akim akkb akkg akkh akly akmt akmu">
                  <div className="akho akil akix akmh akmk akmm akmq">
                    <div className="akhb akik akmn akmp akmz">
                      <h1 className="akki akko akkp akkq akkw akmb">Campus Connect</h1>
                      <p className="akhr akkk akkn akkq akks aklt akmc akmm">A lightweight community for students to share posts, create and RSVP to events, and chat in real time. Built with an Express + MongoDB backend and a Next.js frontend.</p>
                      <div className="akhs akhy akip akiw">
                        <Link href="/register" className="akjf akjk akka akkd akkl akko akkw akkz akli aklm akln aklo">Get started</Link>
                        <Link href="/dashboard" className="akkm akko akkw">Live demo <span aria-hidden="true">→</span></Link>
                      </div>
                    </div>
                    <div className="akht akhy akis akit aklq aklv akma akmi akmw">
                      <div className="akhw akih akin akiv akkf akls aklz akmg akmv akmx akna">
                        <div className="akhb">
                          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;h=528&amp;q=80" alt="" className="akic akik akjg akjh akjv akky" />
                          <div className="akgx akgz akhc akjg akla aklc akle"></div>
                        </div>
                      </div>
                      <div className="akhu akih akin akiv aklr aklx akmv">
                        <div className="akhb">
                          <img src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;h=528&amp;q=80" alt="" className="akic akik akjg akjh akjv akky" />
                          <div className="akgx akgz akhc akjg akla aklc akle"></div>
                        </div>
                        <div className="akhb">
                          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=.4&amp;w=396&amp;h=528&amp;q=80" alt="" className="akic akik akjg akjh akjv akky" />
                          <div className="akgx akgz akhc akjg akla aklc akle"></div>
                        </div>
                      </div>
                      <div className="akih akin akiv akkf aklw">
                        <div className="akhb">
                          <img src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;crop=left&amp;w=400&amp;h=528&amp;q=80" alt="" className="akic akik akjg akjh akjv akky" />
                          <div className="akgx akgz akhc akjg akla aklc akle"></div>
                        </div>
                        <div className="akhb">
                          <img src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;h=528&amp;q=80" alt="" className="akic akik akjg akjh akjv akky" />
                          <div className="akgx akgz akhc akjg akla aklc akle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
