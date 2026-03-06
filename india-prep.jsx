import { useState, useRef, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const FOODS = [
  { id:1, name:"Butter Chicken", hindi:"मक्खन मुर्गा", region:"North India", diet:["meat"], spice:"Medium", emoji:"🍗",
    description:"Tender chicken in a rich, creamy tomato-butter sauce with warming aromatic spices.",
    history:"Created accidentally in the 1950s at Moti Mahal in Delhi by Kundan Lal Gujral, who tossed leftover tandoori chicken into a tomato-butter gravy. It became India's most exported dish worldwide.",
    youtubeQuery:"history+butter+chicken+murgh+makhani+india" },
  { id:2, name:"Masala Dosa", hindi:"मसाला डोसा", region:"South India", diet:["vegan","vegetarian","gluten-free","dairy-free"], spice:"Mild", emoji:"🫔",
    description:"Crispy fermented rice-and-lentil crepe filled with spiced potato, served with sambar and chutneys.",
    history:"Originating in the Udupi region of Karnataka with records dating to the 8th century, the masala variety spread across India and diaspora communities worldwide in the 20th century.",
    youtubeQuery:"history+masala+dosa+south+india+udupi" },
  { id:3, name:"Hyderabadi Biryani", hindi:"हैदराबादी बिरयानी", region:"Hyderabad", diet:["meat"], spice:"High", emoji:"🍚",
    description:"Fragrant basmati rice layered with spiced meat, saffron milk, and caramelized onions, slow-cooked in a sealed pot.",
    history:"Brought to India by the Mughal emperors via Persian cooks, Hyderabadi Biryani evolved into its own distinct style under the Nizams in the 18th century — a royal dish for centuries.",
    youtubeQuery:"history+hyderabadi+biryani+nizams+india" },
  { id:4, name:"Palak Paneer", hindi:"पालक पनीर", region:"North India", diet:["vegetarian"], spice:"Medium", emoji:"🥬",
    description:"Fresh cottage cheese cubes in a smooth, velvety spiced spinach gravy.",
    history:"A modern North Indian staple from the mid-20th century. Paneer itself has ancient Vedic roots, referenced in some of India's oldest texts as a preserved milk product.",
    youtubeQuery:"history+palak+paneer+indian+food+origins" },
  { id:5, name:"Rogan Josh", hindi:"रोगन जोश", region:"Kashmir", diet:["meat"], spice:"High", emoji:"🍖",
    description:"Slow-cooked lamb in a vivid Kashmiri chili and aromatic spice gravy, a cornerstone of Wazwan cuisine.",
    history:"Rooted in Persian culinary tradition and brought to Kashmir by the Mughals, 'Rogan Josh' means 'red oil at high heat' in Persian. A symbol of Kashmiri cultural identity for centuries.",
    youtubeQuery:"history+rogan+josh+kashmir+wazwan+mughal" },
  { id:6, name:"Goan Fish Curry", hindi:"गोअन फिश करी", region:"Goa", diet:["fish","gluten-free","dairy-free"], spice:"Medium", emoji:"🐟",
    description:"Tangy coconut milk curry with fresh fish, infused with kokum fruit and golden turmeric.",
    history:"Reflects Goa's coastal geography and 450 years of Portuguese colonial history. Kokum instead of tamarind is the Goan signature — a flavor entirely its own.",
    youtubeQuery:"history+goan+fish+curry+portuguese+influence" },
  { id:7, name:"Chole Bhature", hindi:"छोले भटूरे", region:"Punjab", diet:["vegan","vegetarian"], spice:"High", emoji:"🫘",
    description:"Bold spiced chickpea curry served with pillowy deep-fried bread — a Punjabi street food legend.",
    history:"Born in Delhi in the 1950s–60s, popularized by Punjabi refugees after Partition who brought their rich culinary traditions across the new border.",
    youtubeQuery:"history+chole+bhature+punjab+delhi+partition" },
  { id:8, name:"Dhokla", hindi:"ढोकला", region:"Gujarat", diet:["vegan","vegetarian","gluten-free","dairy-free"], spice:"Mild", emoji:"🟡",
    description:"Soft, spongy fermented chickpea flour cakes, steamed and tempered with mustard seeds and curry leaves.",
    history:"One of Gujarat's oldest foods — the Gujarati cookbook 'Varan Bhaat' from 1066 CE references it. Nearly a millennium old and still beloved across India.",
    youtubeQuery:"history+dhokla+gujarat+india+ancient" },
  { id:9, name:"Idli Sambar", hindi:"इडली सांबर", region:"South India", diet:["vegan","vegetarian","gluten-free","dairy-free"], spice:"Mild", emoji:"🫓",
    description:"Steamed fermented rice cakes paired with a tangy lentil-and-vegetable stew.",
    history:"Idli's origins trace to ancient Tamil texts, possibly influenced by Indonesian steamed cakes. The iconic pairing with sambar crystallized in the 17th century Tamil Nadu and became South India's defining breakfast.",
    youtubeQuery:"history+idli+sambar+tamil+south+india" },
  { id:10, name:"Pav Bhaji", hindi:"पाव भाजी", region:"Maharashtra", diet:["vegetarian"], spice:"Medium", emoji:"🥘",
    description:"Spiced mashed vegetable curry served sizzling with buttered soft rolls — Mumbai's greatest street food.",
    history:"Invented in the 1850s for Mumbai's textile mill workers who needed a fast, filling, cheap meal. Vendors mashed leftover vegetables with spices. It became the soul food of an entire city.",
    youtubeQuery:"history+pav+bhaji+mumbai+maharashtra+street+food" },
  { id:11, name:"Tandoori Chicken", hindi:"तंदूरी चिकन", region:"Punjab", diet:["meat","gluten-free"], spice:"Medium", emoji:"🍗",
    description:"Marinated chicken charred in a clay tandoor oven — smoky, bold, and unmistakably Punjabi.",
    history:"Popularized by Kundan Lal Gujral in Peshawar in the 1940s. After Partition he brought it to Delhi's Moti Mahal, where it became a staple. Indian restaurants abroad made it the world's introduction to Indian cuisine.",
    youtubeQuery:"history+tandoori+chicken+moti+mahal+partition" },
  { id:12, name:"Rasmalai", hindi:"रसमलाई", region:"West Bengal", diet:["vegetarian"], spice:"None", emoji:"🍮",
    description:"Pillowy cottage cheese dumplings soaked in sweetened saffron-cardamom milk — Bengal's most celebrated sweet.",
    history:"Created by K.C. Das in Kolkata in the late 19th century, evolving from the simpler rasgulla. It represents the pinnacle of Bengali misti (sweet) culture and confectionery tradition.",
    youtubeQuery:"history+rasmalai+bengal+kolkata+kc+das" },
];

const HINDI_PHRASES = [
  { phrase:"नमस्ते", romanized:"Namaste", meaning:"Hello / Greetings (respectful)", pronunciation:"nah-mah-STAY", tip:"Press palms together as you say this. Universally understood and deeply appreciated." },
  { phrase:"धन्यवाद", romanized:"Dhanyavaad", meaning:"Thank you (formal)", pronunciation:"dhun-YAH-vahd", tip:"For business settings. In casual settings 'Shukriya' also works." },
  { phrase:"माफ कीजिए", romanized:"Maaf Kijiye", meaning:"Excuse me / I'm sorry", pronunciation:"mahf kih-JEE-yeh", tip:"Essential in busy streets and formal situations alike." },
  { phrase:"आप कैसे हैं?", romanized:"Aap Kaise Hain?", meaning:"How are you? (formal)", pronunciation:"aap KAY-seh hain", tip:"Always use 'Aap' (formal you) with elders and business contacts — never 'Tum'." },
  { phrase:"बहुत अच्छा", romanized:"Bahut Accha", meaning:"Very good / Excellent", pronunciation:"buh-HOOT uh-CHAH", tip:"Instant rapport builder — use when food is great, a meeting goes well, anything positive." },
  { phrase:"कितना है?", romanized:"Kitna Hai?", meaning:"How much is it?", pronunciation:"KIT-nah hai", tip:"Markets expect bargaining — this phrase opens the negotiation." },
  { phrase:"मुझे समझ नहीं आया", romanized:"Mujhe Samajh Nahi Aaya", meaning:"I don't understand", pronunciation:"moo-JHE suh-muj nuh-HEE ah-YAH", tip:"Locals will appreciate the effort. Don't be shy about this one." },
  { phrase:"शुक्रिया", romanized:"Shukriya", meaning:"Thank you (casual/Urdu influence)", pronunciation:"shoo-KREE-yah", tip:"Warmer and more casual than Dhanyavaad — great for street vendors and casual encounters." },
];

const MODULES = [
  { id:1, icon:"💼", title:"Business Meeting Etiquette",
    scenario:"You arrive at a business meeting in Mumbai. Your counterpart arrives 20 minutes late without explanation, then opens with 15 minutes of cricket talk before any agenda items. You have back-to-back calls. What do you do?",
    choices:["Politely interrupt and redirect to the agenda","Engage with the cricket conversation and let them lead the pace","Check your watch visibly to signal urgency","Politely excuse yourself and reschedule"],
    correct:1 },
  { id:2, icon:"🍽️", title:"Dining Etiquette",
    scenario:"At a business dinner in Delhi, your host keeps loading your plate insisting you have more — despite your protests that you're full. The food is rich and you genuinely can't eat more. What's the best response?",
    choices:["Firmly decline and explain you're full","Accept graciously and eat what you comfortably can","Eat everything to show maximum respect","Suggest taking the remainder home"],
    correct:1 },
  { id:3, icon:"🙏", title:"Hierarchy & Seniority",
    scenario:"In a team meeting, a junior analyst makes a brilliant observation. You excitedly engage directly with them — questions, praise, follow-ups — while the senior manager sits quietly. How might this land?",
    choices:["Positively — you're encouraging talent","Awkwardly — it may undermine the senior manager's authority and embarrass the junior","Neutrally — Indian offices are highly egalitarian","Positively — Indians value directness and initiative"],
    correct:1 },
  { id:4, icon:"🛕", title:"Temple Visit Protocol",
    scenario:"A business contact invites you to visit a renowned Hindu temple. At the entrance you must remove shoes. You notice most visitors are also covering their heads with scarves, though there's no sign requiring it. You have nothing to cover with.",
    choices:["Enter without a head covering since it's not mandatory","Ask your host and follow their guidance — borrow a scarf if possible","Skip the temple visit to avoid any potential misstep","Remove shoes and proceed — the head covering is optional"],
    correct:1 },
  { id:5, icon:"🤝", title:"Reading Indirect Communication",
    scenario:"You're negotiating a partnership contract. The Indian team repeatedly says 'We'll try our best,' 'We'll get back to you soon,' and 'This looks promising' — but never commits. How should you read this?",
    choices:["Great sign — a deal is very close","Polite deferrals — a direct 'no' is culturally avoided; read between the lines","They need more time to evaluate","A classic negotiation tactic to extract better terms"],
    correct:1 },
];

const QUIZ = [
  { q:"In a new professional setting, you typically:", opts:["Get straight to business — time is money","Build personal rapport before discussing work","Follow the other person's lead entirely","Prefer structured, agenda-driven interactions"] },
  { q:"When plans change unexpectedly, you:", opts:["Get frustrated and push to get back on track","Adapt easily — flexibility is part of the journey","Need a moment, then adjust","Always prepare contingency plans"] },
  { q:"Regarding hierarchy in professional settings:", opts:["I treat everyone as equals regardless of title","I respect seniority but value everyone's input","Structure and hierarchy are important to me","It depends entirely on context"] },
  { q:"Your communication style is:", opts:["Very direct — I say exactly what I mean","Diplomatic — I soften messages to preserve relationships","Highly context-dependent","Reserved — I listen more than I speak"] },
  { q:"Your relationship with punctuality:", opts:["Strict — lateness signals disrespect","Flexible — a few minutes either way is fine","I adapt to the cultural norms around me","I plan buffers but don't stress about it"] },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

async function callClaude(prompt) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user",content:prompt}] })
  });
  const d = await r.json();
  const text = d.content?.find(b=>b.type==="text")?.text || "";
  return text.replace(/```json|```/g,"").trim();
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Nunito:wght@300;400;600;700&display=swap');

  :root {
    --bg: #080300;
    --surface: #120800;
    --surface2: #1e0e00;
    --border: rgba(212,175,55,0.2);
    --saffron: #F5820A;
    --gold: #D4AF37;
    --cream: #FFF4DC;
    --muted: rgba(255,244,220,0.5);
    --danger: #e05252;
    --success: #5ec47a;
  }

  * { box-sizing:border-box; margin:0; padding:0; }

  body, #root { background:var(--bg); min-height:100vh; }

  .app {
    font-family:'Nunito',sans-serif;
    background:var(--bg);
    color:var(--cream);
    min-height:100vh;
    position:relative;
    overflow-x:hidden;
  }

  .mandala-bg {
    position:fixed; inset:0; pointer-events:none; z-index:0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(245,130,10,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 80% 90%, rgba(212,175,55,0.05) 0%, transparent 60%),
      repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(212,175,55,0.015) 40px, rgba(212,175,55,0.015) 41px);
  }

  .content { position:relative; z-index:1; }

  /* WELCOME */
  .welcome {
    min-height:100vh; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    padding:40px 20px; text-align:center;
  }
  .welcome-ornament { font-size:48px; margin-bottom:16px; animation:float 3s ease-in-out infinite; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  .welcome h1 {
    font-family:'Cormorant Garamond',serif; font-size:clamp(36px,8vw,72px);
    font-weight:700; color:var(--gold); line-height:1.1; margin-bottom:8px;
  }
  .welcome-sub {
    font-family:'Cormorant Garamond',serif; font-style:italic;
    font-size:clamp(16px,3vw,22px); color:var(--muted); margin-bottom:32px;
  }
  .welcome-desc {
    max-width:520px; font-size:15px; color:var(--muted); line-height:1.7; margin-bottom:40px;
  }
  .welcome-features {
    display:flex; gap:20px; flex-wrap:wrap; justify-content:center; margin-bottom:40px;
  }
  .feature-pill {
    background:rgba(245,130,10,0.1); border:1px solid rgba(245,130,10,0.3);
    border-radius:100px; padding:8px 18px; font-size:13px; color:var(--saffron);
    display:flex; align-items:center; gap:6px;
  }

  /* BUTTONS */
  .btn-primary {
    background:linear-gradient(135deg, var(--saffron), #c96800);
    color:#fff; border:none; padding:14px 36px; border-radius:100px;
    font-family:'Nunito',sans-serif; font-size:15px; font-weight:700;
    cursor:pointer; letter-spacing:0.5px;
    box-shadow:0 4px 24px rgba(245,130,10,0.3);
    transition:transform 0.15s, box-shadow 0.15s;
  }
  .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(245,130,10,0.4); }
  .btn-primary:disabled { opacity:0.5; cursor:not-allowed; transform:none; }

  .btn-ghost {
    background:transparent; border:1px solid var(--border);
    color:var(--cream); padding:10px 24px; border-radius:100px;
    font-family:'Nunito',sans-serif; font-size:13px; cursor:pointer;
    transition:border-color 0.15s, background 0.15s;
  }
  .btn-ghost:hover { border-color:var(--gold); background:rgba(212,175,55,0.05); }

  /* QUIZ */
  .quiz-wrap { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px; }
  .quiz-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:24px; padding:40px; max-width:600px; width:100%;
  }
  .quiz-progress { display:flex; gap:6px; margin-bottom:32px; }
  .quiz-dot { height:4px; flex:1; border-radius:4px; background:var(--surface2); transition:background 0.3s; }
  .quiz-dot.active { background:var(--saffron); }
  .quiz-q { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:600; color:var(--cream); margin-bottom:24px; line-height:1.4; }
  .quiz-options { display:flex; flex-direction:column; gap:12px; }
  .quiz-opt {
    background:var(--surface2); border:1px solid var(--border);
    border-radius:12px; padding:14px 18px; cursor:pointer;
    font-size:14px; color:var(--cream); text-align:left;
    transition:border-color 0.15s, background 0.15s, transform 0.1s;
  }
  .quiz-opt:hover { border-color:var(--saffron); background:rgba(245,130,10,0.08); transform:translateX(4px); }

  /* RESULTS */
  .results-wrap { min-height:100vh; padding:40px 20px; display:flex; flex-direction:column; align-items:center; }
  .results-header { text-align:center; margin-bottom:32px; }
  .results-header h2 { font-family:'Cormorant Garamond',serif; font-size:36px; color:var(--gold); margin-bottom:8px; }
  .personality-badge {
    display:inline-block; background:linear-gradient(135deg,rgba(245,130,10,0.2),rgba(212,175,55,0.2));
    border:1px solid var(--gold); border-radius:100px; padding:8px 24px;
    font-family:'Cormorant Garamond',serif; font-size:20px; color:var(--gold); margin-bottom:16px;
  }
  .results-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; max-width:800px; width:100%; margin-bottom:20px; }
  @media(max-width:600px){ .results-grid{grid-template-columns:1fr;} }
  .result-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:16px; padding:24px;
  }
  .result-card h3 { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--saffron); margin-bottom:14px; }
  .friction-item, .solution-item { margin-bottom:14px; }
  .friction-item strong, .solution-item strong { color:var(--cream); font-size:13px; display:block; margin-bottom:3px; }
  .friction-item p, .solution-item p { color:var(--muted); font-size:13px; line-height:1.5; }
  .strength-box {
    max-width:800px; width:100%;
    background:linear-gradient(135deg,rgba(94,196,122,0.08),rgba(212,175,55,0.08));
    border:1px solid rgba(94,196,122,0.3); border-radius:16px; padding:20px 24px;
    margin-bottom:24px;
  }
  .strength-box h3 { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--success); margin-bottom:6px; }
  .strength-box p { color:var(--muted); font-size:14px; line-height:1.6; }
  .loading-state { text-align:center; padding:60px 20px; }
  .spinner {
    width:40px; height:40px; border:3px solid rgba(245,130,10,0.2);
    border-top-color:var(--saffron); border-radius:50%;
    animation:spin 0.8s linear infinite; margin:0 auto 20px;
  }
  @keyframes spin { to{transform:rotate(360deg)} }

  /* MAIN APP */
  .main-app { min-height:100vh; display:flex; flex-direction:column; }
  .top-bar {
    background:rgba(8,3,0,0.95); backdrop-filter:blur(10px);
    border-bottom:1px solid var(--border); padding:12px 24px;
    display:flex; align-items:center; justify-content:space-between;
    position:sticky; top:0; z-index:100;
  }
  .app-brand { font-family:'Cormorant Garamond',serif; font-size:20px; color:var(--gold); font-weight:700; }
  .app-brand span { color:var(--saffron); }
  .nav { display:flex; gap:4px; }
  .nav-btn {
    background:transparent; border:none; color:var(--muted); padding:8px 14px;
    border-radius:8px; cursor:pointer; font-family:'Nunito',sans-serif;
    font-size:13px; transition:color 0.15s, background 0.15s;
    display:flex; align-items:center; gap:6px;
  }
  .nav-btn.active { background:rgba(245,130,10,0.15); color:var(--saffron); }
  .nav-btn:hover:not(.active) { color:var(--cream); background:rgba(255,255,255,0.05); }
  .tab-content { flex:1; padding:32px 24px; max-width:960px; margin:0 auto; width:100%; }

  /* FOOD TAB */
  .food-controls { display:flex; flex-direction:column; gap:14px; margin-bottom:28px; }
  .search-bar {
    background:var(--surface); border:1px solid var(--border);
    border-radius:12px; padding:12px 18px; color:var(--cream);
    font-family:'Nunito',sans-serif; font-size:14px; width:100%; outline:none;
    transition:border-color 0.15s;
  }
  .search-bar::placeholder { color:var(--muted); }
  .search-bar:focus { border-color:var(--saffron); }
  .filter-row { display:flex; gap:8px; flex-wrap:wrap; }
  .filter-chip {
    background:var(--surface2); border:1px solid var(--border);
    border-radius:100px; padding:6px 14px; font-size:12px;
    color:var(--muted); cursor:pointer; transition:all 0.15s;
    white-space:nowrap;
  }
  .filter-chip.active { background:rgba(245,130,10,0.15); border-color:var(--saffron); color:var(--saffron); }
  .filter-chip:hover:not(.active) { border-color:var(--gold); color:var(--cream); }
  .filter-label { font-size:11px; color:var(--muted); text-transform:uppercase; letter-spacing:0.8px; align-self:center; margin-right:4px; }
  .food-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:16px; }
  .food-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:16px; padding:20px; cursor:pointer;
    transition:transform 0.15s, border-color 0.15s, box-shadow 0.15s;
  }
  .food-card:hover { transform:translateY(-4px); border-color:var(--saffron); box-shadow:0 8px 32px rgba(245,130,10,0.15); }
  .food-emoji { font-size:32px; margin-bottom:10px; }
  .food-name { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--cream); margin-bottom:2px; }
  .food-hindi { font-size:12px; color:var(--muted); margin-bottom:8px; }
  .food-meta { display:flex; gap:6px; flex-wrap:wrap; }
  .tag {
    background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.2);
    border-radius:100px; padding:2px 8px; font-size:10px; color:var(--gold);
  }
  .tag.region { background:rgba(245,130,10,0.1); border-color:rgba(245,130,10,0.2); color:var(--saffron); }
  .no-results { text-align:center; padding:60px 20px; color:var(--muted); font-size:15px; }

  /* FOOD MODAL */
  .modal-overlay {
    position:fixed; inset:0; background:rgba(0,0,0,0.85);
    backdrop-filter:blur(4px); z-index:200; display:flex;
    align-items:center; justify-content:center; padding:20px;
  }
  .modal {
    background:var(--surface); border:1px solid var(--border);
    border-radius:24px; padding:36px; max-width:560px; width:100%;
    max-height:85vh; overflow-y:auto;
    animation:modalIn 0.2s ease;
  }
  @keyframes modalIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
  .modal-emoji { font-size:48px; margin-bottom:12px; }
  .modal h2 { font-family:'Cormorant Garamond',serif; font-size:28px; color:var(--gold); margin-bottom:4px; }
  .modal-hindi { font-size:16px; color:var(--muted); margin-bottom:16px; }
  .modal-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
  .modal-section { margin-bottom:20px; }
  .modal-section h3 { font-family:'Cormorant Garamond',serif; font-size:16px; color:var(--saffron); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.8px; font-size:13px; }
  .modal-section p { color:var(--muted); font-size:14px; line-height:1.7; }
  .modal-footer { display:flex; gap:12px; flex-wrap:wrap; }
  .modal-close { position:absolute; top:16px; right:16px; }

  /* HINDI TAB */
  .hindi-wrap { max-width:640px; margin:0 auto; }
  .phrase-nav { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
  .phrase-counter { font-size:13px; color:var(--muted); }
  .phrase-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:24px; padding:36px; text-align:center; margin-bottom:24px;
  }
  .phrase-devanagari {
    font-size:clamp(36px,8vw,56px); color:var(--gold);
    font-family:'Cormorant Garamond',serif; margin-bottom:8px;
    line-height:1.2;
  }
  .phrase-romanized { font-size:22px; color:var(--cream); margin-bottom:6px; font-weight:600; }
  .phrase-meaning { font-size:15px; color:var(--muted); margin-bottom:12px; }
  .phrase-pronunciation {
    display:inline-block;
    background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.25);
    border-radius:100px; padding:6px 18px; font-size:13px; color:var(--gold);
    margin-bottom:16px;
  }
  .phrase-tip {
    background:rgba(245,130,10,0.06); border-left:3px solid var(--saffron);
    padding:12px 16px; border-radius:0 8px 8px 0;
    font-size:13px; color:var(--muted); text-align:left; line-height:1.6;
  }
  .record-section { text-align:center; margin-bottom:24px; }
  .record-btn {
    width:80px; height:80px; border-radius:50%; border:none;
    background:linear-gradient(135deg,var(--saffron),#c96800);
    color:#fff; font-size:28px; cursor:pointer;
    box-shadow:0 4px 24px rgba(245,130,10,0.3);
    transition:transform 0.15s, box-shadow 0.15s;
    display:inline-flex; align-items:center; justify-content:center;
  }
  .record-btn:hover { transform:scale(1.05); }
  .record-btn.recording {
    background:linear-gradient(135deg,#e05252,#b03030);
    animation:pulse 1s ease-in-out infinite;
    box-shadow:0 4px 24px rgba(224,82,82,0.4);
  }
  @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
  .record-label { font-size:13px; color:var(--muted); margin-top:12px; }
  .spoken-text {
    background:var(--surface2); border:1px solid var(--border);
    border-radius:12px; padding:14px 18px; margin-bottom:16px;
    font-size:14px; color:var(--cream); text-align:center; min-height:48px;
  }
  .grade-card {
    background:var(--surface); border-radius:16px; padding:24px;
    text-align:center; border:1px solid var(--border);
  }
  .grade-score { font-family:'Cormorant Garamond',serif; font-size:64px; color:var(--gold); line-height:1; margin-bottom:4px; }
  .grade-label { font-size:13px; color:var(--muted); margin-bottom:16px; }
  .grade-feedback { font-size:14px; color:var(--cream); line-height:1.6; margin-bottom:8px; }
  .grade-encourage { font-size:13px; color:var(--saffron); font-style:italic; }
  .chrome-note { background:rgba(212,175,55,0.06); border:1px solid rgba(212,175,55,0.2); border-radius:10px; padding:12px 16px; font-size:12px; color:var(--muted); text-align:center; margin-bottom:20px; }

  /* MODULES TAB */
  .modules-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; margin-bottom:32px; }
  .module-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:16px; padding:24px; cursor:pointer;
    transition:transform 0.15s, border-color 0.15s;
  }
  .module-card:hover { transform:translateY(-3px); border-color:var(--saffron); }
  .module-icon { font-size:32px; margin-bottom:12px; }
  .module-title { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--cream); }
  .scenario-wrap { max-width:640px; margin:0 auto; }
  .scenario-box {
    background:var(--surface); border:1px solid var(--border);
    border-radius:16px; padding:28px; margin-bottom:20px;
  }
  .scenario-box h3 { font-family:'Cormorant Garamond',serif; font-size:20px; color:var(--gold); margin-bottom:14px; }
  .scenario-box p { color:var(--muted); font-size:14px; line-height:1.7; }
  .choice-list { display:flex; flex-direction:column; gap:10px; margin-bottom:20px; }
  .choice-btn {
    background:var(--surface2); border:2px solid var(--border);
    border-radius:12px; padding:14px 18px; cursor:pointer;
    font-family:'Nunito',sans-serif; font-size:14px; color:var(--cream);
    text-align:left; transition:all 0.15s;
  }
  .choice-btn:hover:not(:disabled) { border-color:var(--saffron); background:rgba(245,130,10,0.08); }
  .choice-btn:disabled { cursor:default; }
  .choice-btn.selected-correct { border-color:var(--success); background:rgba(94,196,122,0.1); color:var(--success); }
  .choice-btn.selected-wrong { border-color:var(--danger); background:rgba(224,82,82,0.1); color:var(--danger); }
  .choice-btn.reveal-correct { border-color:var(--success); background:rgba(94,196,122,0.08); }
  .feedback-card {
    background:var(--surface); border-radius:16px; padding:24px;
    border:1px solid var(--border); animation:modalIn 0.2s ease;
  }
  .feedback-card h4 { font-family:'Cormorant Garamond',serif; font-size:20px; margin-bottom:14px; }
  .feedback-card h4.correct { color:var(--success); }
  .feedback-card h4.wrong { color:var(--danger); }
  .feedback-section { margin-bottom:14px; }
  .feedback-section label { font-size:11px; color:var(--saffron); text-transform:uppercase; letter-spacing:0.8px; display:block; margin-bottom:4px; }
  .feedback-section p { color:var(--muted); font-size:14px; line-height:1.6; }

  /* PROFILE TAB */
  .profile-wrap { max-width:700px; margin:0 auto; }
  .profile-hero {
    background:linear-gradient(135deg,rgba(245,130,10,0.1),rgba(212,175,55,0.08));
    border:1px solid var(--border); border-radius:24px; padding:36px; text-align:center; margin-bottom:24px;
  }
  .profile-hero h2 { font-family:'Cormorant Garamond',serif; font-size:28px; color:var(--gold); margin-bottom:8px; }
  .profile-hero p { color:var(--muted); font-size:15px; line-height:1.6; }
`;

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function FoodTab() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [diet, setDiet] = useState("All");
  const [selected, setSelected] = useState(null);

  const regions = ["All", ...new Set(FOODS.map(f => f.region))];
  const diets = ["All","vegan","vegetarian","meat","fish","gluten-free","dairy-free"];

  const filtered = FOODS.filter(f => {
    const s = (f.name + f.description).toLowerCase().includes(search.toLowerCase());
    const r = region === "All" || f.region === region;
    const d = diet === "All" || f.diet.includes(diet);
    return s && r && d;
  });

  return (
    <div>
      <div className="food-controls">
        <input className="search-bar" placeholder="🔍  Search dishes, ingredients, descriptions…" value={search} onChange={e=>setSearch(e.target.value)} />
        <div className="filter-row">
          <span className="filter-label">Region</span>
          {regions.map(r => <button key={r} className={`filter-chip${region===r?" active":""}`} onClick={()=>setRegion(r)}>{r}</button>)}
        </div>
        <div className="filter-row">
          <span className="filter-label">Diet</span>
          {diets.map(d => <button key={d} className={`filter-chip${diet===d?" active":""}`} onClick={()=>setDiet(d)}>{d}</button>)}
        </div>
      </div>
      {filtered.length === 0
        ? <div className="no-results">🍃 No dishes match your filters.</div>
        : <div className="food-grid">
            {filtered.map(f => (
              <div key={f.id} className="food-card" onClick={()=>setSelected(f)}>
                <div className="food-emoji">{f.emoji}</div>
                <div className="food-name">{f.name}</div>
                <div className="food-hindi">{f.hindi}</div>
                <div className="food-meta">
                  <span className="tag region">{f.region}</span>
                  {f.diet.slice(0,2).map(d=><span key={d} className="tag">{d}</span>)}
                </div>
              </div>
            ))}
          </div>
      }
      {selected && (
        <div className="modal-overlay" onClick={()=>setSelected(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-emoji">{selected.emoji}</div>
            <h2>{selected.name}</h2>
            <div className="modal-hindi">{selected.hindi} · {selected.region} · 🌶 {selected.spice}</div>
            <div className="modal-tags">
              {selected.diet.map(d=><span key={d} className="tag">{d}</span>)}
            </div>
            <div className="modal-section">
              <h3>About</h3>
              <p>{selected.description}</p>
            </div>
            <div className="modal-section">
              <h3>History</h3>
              <p>{selected.history}</p>
            </div>
            <div className="modal-footer">
              <a href={`https://www.youtube.com/results?search_query=${selected.youtubeQuery}`} target="_blank" rel="noopener noreferrer">
                <button className="btn-primary" style={{fontSize:"13px",padding:"10px 20px"}}>▶ Watch History on YouTube</button>
              </a>
              <button className="btn-ghost" onClick={()=>setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HindiTab() {
  const [idx, setIdx] = useState(0);
  const [recording, setRecording] = useState(false);
  const [spoken, setSpoken] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const recRef = useRef(null);
  const phrase = HINDI_PHRASES[idx];

  const next = () => { setIdx((idx+1)%HINDI_PHRASES.length); setSpoken(""); setResult(null); };
  const prev = () => { setIdx((idx-1+HINDI_PHRASES.length)%HINDI_PHRASES.length); setSpoken(""); setResult(null); };

  const startRecord = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Please use Chrome for voice features."); return; }
    const r = new SR();
    r.lang = "hi-IN";
    r.interimResults = false;
    r.onresult = async (e) => {
      const t = e.results[0][0].transcript;
      setSpoken(t);
      setLoading(true);
      try {
        const raw = await callClaude(`Grade this Hindi pronunciation. Target: "${phrase.romanized}" (${phrase.phrase}). Speech recognition captured: "${t}". Respond ONLY with JSON (no markdown backticks): {"score":number_1_to_10,"grade":"A/B/C/D/F","feedback":"specific 1-2 sentence feedback","encouragement":"short motivating line"}`);
        setResult(JSON.parse(raw));
      } catch { setResult({score:5,grade:"C",feedback:"Good try! The speech recognition sometimes struggles with Hindi. Keep practicing.",encouragement:"Every attempt builds your confidence!"}); }
      setLoading(false);
    };
    r.onerror = () => { setRecording(false); setSpoken("Couldn't detect speech. Try again in a quiet space."); };
    r.onend = () => setRecording(false);
    r.start();
    recRef.current = r;
    setRecording(true);
    setSpoken(""); setResult(null);
  };

  return (
    <div className="hindi-wrap">
      <div className="chrome-note">🎙️ Voice features work best in <strong>Google Chrome</strong>. Make sure your microphone is enabled.</div>
      <div className="phrase-nav">
        <button className="btn-ghost" onClick={prev}>← Prev</button>
        <span className="phrase-counter">{idx+1} / {HINDI_PHRASES.length}</span>
        <button className="btn-ghost" onClick={next}>Next →</button>
      </div>
      <div className="phrase-card">
        <div className="phrase-devanagari">{phrase.phrase}</div>
        <div className="phrase-romanized">{phrase.romanized}</div>
        <div className="phrase-meaning">{phrase.meaning}</div>
        <div className="phrase-pronunciation">🔊 {phrase.pronunciation}</div>
        <div className="phrase-tip">💡 {phrase.tip}</div>
      </div>
      <div className="record-section">
        <button className={`record-btn${recording?" recording":""}`} onClick={startRecord} disabled={recording}>
          {recording ? "⏹" : "🎙️"}
        </button>
        <div className="record-label">{recording ? "Listening… speak now" : "Tap to record your pronunciation"}</div>
      </div>
      {spoken && <div className="spoken-text">You said: <strong>"{spoken}"</strong></div>}
      {loading && <div className="loading-state"><div className="spinner"/><p style={{color:"var(--muted)"}}>Grading pronunciation…</p></div>}
      {result && !loading && (
        <div className="grade-card">
          <div className="grade-score">{result.grade}</div>
          <div className="grade-label">Score: {result.score}/10</div>
          <div className="grade-feedback">{result.feedback}</div>
          <div className="grade-encourage">{result.encouragement}</div>
          <button className="btn-primary" style={{marginTop:"16px"}} onClick={()=>{setSpoken("");setResult(null);}}>Try Again</button>
        </div>
      )}
    </div>
  );
}

function ModulesTab() {
  const [active, setActive] = useState(null);
  const [choice, setChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const open = (m) => { setActive(m); setChoice(null); setFeedback(null); };
  const back = () => { setActive(null); setChoice(null); setFeedback(null); };

  const submit = async (ci) => {
    setChoice(ci);
    setLoading(true);
    try {
      const raw = await callClaude(`You are an expert in Indian business culture. Scenario: "${active.scenario}" The student chose: "${active.choices[ci]}". Best answer: "${active.choices[active.correct]}". Correct: ${ci===active.correct}. Give warm, educational feedback. Respond ONLY with JSON (no markdown): {"correct":${ci===active.correct},"explanation":"2-3 sentences on why the best answer works in Indian culture","culturalInsight":"a deeper cultural insight","tip":"one practical tip"}`);
      setFeedback(JSON.parse(raw));
    } catch { setFeedback({correct:ci===active.correct,explanation:"In Indian business culture, relationship-building and indirect communication are central.",culturalInsight:"India scores high on collectivism and power distance in Hofstede's cultural dimensions framework.",tip:"When uncertain, follow your host's lead."}); }
    setLoading(false);
  };

  if (!active) return (
    <div>
      <p style={{color:"var(--muted)",marginBottom:"24px",fontSize:"14px"}}>Choose a scenario to explore. AI will analyze your response and give cultural feedback.</p>
      <div className="modules-grid">
        {MODULES.map(m => (
          <div key={m.id} className="module-card" onClick={()=>open(m)}>
            <div className="module-icon">{m.icon}</div>
            <div className="module-title">{m.title}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="scenario-wrap">
      <button className="btn-ghost" style={{marginBottom:"20px"}} onClick={back}>← Back to Modules</button>
      <div className="scenario-box">
        <h3>{active.icon} {active.title}</h3>
        <p>{active.scenario}</p>
      </div>
      <div className="choice-list">
        {active.choices.map((c,i) => {
          let cls = "choice-btn";
          if (choice !== null) {
            if (i === choice && i === active.correct) cls += " selected-correct";
            else if (i === choice && i !== active.correct) cls += " selected-wrong";
            else if (i === active.correct) cls += " reveal-correct";
          }
          return <button key={i} className={cls} disabled={choice!==null} onClick={()=>submit(i)}>{String.fromCharCode(65+i)}. {c}</button>;
        })}
      </div>
      {loading && <div className="loading-state"><div className="spinner"/><p style={{color:"var(--muted)"}}>Getting cultural insight…</p></div>}
      {feedback && !loading && (
        <div className="feedback-card">
          <h4 className={feedback.correct?"correct":"wrong"}>{feedback.correct?"✓ Well done!":"✗ Not quite"}</h4>
          <div className="feedback-section"><label>Why this works</label><p>{feedback.explanation}</p></div>
          <div className="feedback-section"><label>Cultural Insight</label><p>{feedback.culturalInsight}</p></div>
          <div className="feedback-section"><label>Remember this</label><p>{feedback.tip}</p></div>
          <button className="btn-primary" style={{marginTop:"8px"}} onClick={back}>Try Another Scenario</button>
        </div>
      )}
    </div>
  );
}

function ProfileTab({ result }) {
  if (!result) return <div style={{textAlign:"center",padding:"60px 20px",color:"var(--muted)"}}>Complete the personality assessment to see your profile.</div>;
  return (
    <div className="profile-wrap">
      <div className="profile-hero">
        <div style={{fontSize:"48px",marginBottom:"12px"}}>🪷</div>
        <h2>{result.personalityType}</h2>
        <p>{result.summary}</p>
      </div>
      <div style={{marginBottom:"16px"}}>
        <div className="strength-box">
          <h3>✨ Your Strength in India</h3>
          <p>{result.strengthToLeverage}</p>
        </div>
      </div>
      <div className="results-grid">
        <div className="result-card">
          <h3>⚡ Potential Friction Points</h3>
          {result.frictionPoints?.map((f,i)=>(
            <div key={i} className="friction-item">
              <strong>{f.point}</strong>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
        <div className="result-card">
          <h3>🗝️ Solutions & Adaptations</h3>
          {result.solutions?.map((s,i)=>(
            <div key={i} className="solution-item">
              <strong>{s.solution}</strong>
              <p>{s.action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [stage, setStage] = useState("welcome");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [personality, setPersonality] = useState(null);
  const [loadingP, setLoadingP] = useState(false);
  const [tab, setTab] = useState("food");

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const handleAnswer = async (opt) => {
    const all = [...answers, { q: QUIZ[qIdx].q, a: opt }];
    setAnswers(all);
    if (qIdx < QUIZ.length - 1) {
      setQIdx(qIdx + 1);
    } else {
      setStage("loading");
      setLoadingP(true);
      try {
        const raw = await callClaude(`You are an expert in Indian business and cross-cultural communication. A student preparing for "Doing Business in India" completed a personality assessment. Analyze their responses and identify cultural friction points for India specifically.

Responses:
${all.map((a,i)=>`Q${i+1}: ${a.q}\nAnswer: ${a.a}`).join("\n\n")}

Respond ONLY with JSON (no markdown, no backticks):
{"personalityType":"2-3 word type label","summary":"2 sentence description of their communication and professional style","frictionPoints":[{"point":"title","description":"why this creates friction in Indian business culture"},{"point":"title","description":"..."},{"point":"title","description":"..."}],"solutions":[{"solution":"title","action":"specific actionable advice for India"},{"solution":"title","action":"..."},{"solution":"title","action":"..."}],"strengthToLeverage":"one genuine strength that will help them in India"}`);
        setPersonality(JSON.parse(raw));
      } catch { setPersonality({ personalityType:"Analytical Leader", summary:"You bring structure and directness to every room.", frictionPoints:[{point:"Direct Communication",description:"India favors indirect communication — bluntness can damage rapport."},{point:"Rigid Scheduling",description:"IST (India Standard Time) is real — meetings run late and plans shift."},{point:"Hierarchy Navigation",description:"Flat-structure instincts can accidentally bypass important senior figures."}], solutions:[{solution:"Soften Your Delivery",action:"Frame direct points with context and relationship-building first."},{solution:"Build in Buffer Time",action:"Add 30–45 minutes to every scheduled interaction."},{solution:"Honor Seniority",action:"Always address the most senior person first in meetings."}], strengthToLeverage:"Your analytical mindset will shine in data-driven negotiations and structured presentations — Indians respect preparation." }); }
      setLoadingP(false);
      setStage("results");
    }
  };

  // WELCOME
  if (stage === "welcome") return (
    <div className="app">
      <div className="mandala-bg"/>
      <div className="content welcome">
        <div className="welcome-ornament">🪷</div>
        <h1>India Prep</h1>
        <div className="welcome-sub">Your cultural intelligence toolkit for India</div>
        <p className="welcome-desc">
          Built for "Doing Business in India" — this app equips you with cultural fluency, food knowledge, Hindi pronunciation practice, and real scenario training before you land.
        </p>
        <div className="welcome-features">
          {["🧠 Personality Assessment","🍛 Food Explorer","🗣️ Hindi Practice","🏛️ Cultural Modules"].map(f=>(
            <div key={f} className="feature-pill">{f}</div>
          ))}
        </div>
        <button className="btn-primary" onClick={()=>setStage("quiz")}>Begin Assessment →</button>
        <button className="btn-ghost" style={{marginTop:"12px"}} onClick={()=>{setPersonality(null);setStage("main");}}>Skip to App</button>
      </div>
    </div>
  );

  // QUIZ
  if (stage === "quiz") return (
    <div className="app">
      <div className="mandala-bg"/>
      <div className="content quiz-wrap">
        <div className="quiz-card">
          <div className="quiz-progress">
            {QUIZ.map((_,i)=><div key={i} className={`quiz-dot${i<=qIdx?" active":""}`}/>)}
          </div>
          <div className="quiz-q">{QUIZ[qIdx].q}</div>
          <div className="quiz-options">
            {QUIZ[qIdx].opts.map((o,i)=>(
              <button key={i} className="quiz-opt" onClick={()=>handleAnswer(o)}>{o}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // LOADING
  if (stage === "loading") return (
    <div className="app">
      <div className="mandala-bg"/>
      <div className="content loading-state" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{fontSize:"48px",marginBottom:"20px"}}>🪷</div>
        <div className="spinner"/>
        <p style={{color:"var(--muted)",fontSize:"16px"}}>Analyzing your cultural profile…</p>
      </div>
    </div>
  );

  // RESULTS
  if (stage === "results") return (
    <div className="app">
      <div className="mandala-bg"/>
      <div className="content results-wrap">
        <div className="results-header">
          <div style={{fontSize:"40px",marginBottom:"12px"}}>🪷</div>
          <h2>Your Cultural Profile</h2>
          {personality && <div className="personality-badge">{personality.personalityType}</div>}
          {personality && <p style={{color:"var(--muted)",maxWidth:"500px",margin:"0 auto",fontSize:"14px",lineHeight:"1.6"}}>{personality.summary}</p>}
        </div>
        {!personality
          ? <div className="loading-state"><div className="spinner"/></div>
          : <>
              <div className="strength-box">
                <h3>✨ Your Strength to Leverage</h3>
                <p>{personality.strengthToLeverage}</p>
              </div>
              <div className="results-grid">
                <div className="result-card">
                  <h3>⚡ Friction Points</h3>
                  {personality.frictionPoints?.map((f,i)=>(
                    <div key={i} className="friction-item">
                      <strong>{f.point}</strong><p>{f.description}</p>
                    </div>
                  ))}
                </div>
                <div className="result-card">
                  <h3>🗝️ Solutions</h3>
                  {personality.solutions?.map((s,i)=>(
                    <div key={i} className="solution-item">
                      <strong>{s.solution}</strong><p>{s.action}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn-primary" onClick={()=>setStage("main")}>Enter the App →</button>
            </>
        }
      </div>
    </div>
  );

  // MAIN APP
  const TABS = [{id:"food",label:"🍛 Food"},{id:"hindi",label:"🗣️ Hindi"},{id:"modules",label:"🏛️ Modules"},{id:"profile",label:"👤 Profile"}];
  return (
    <div className="app">
      <div className="mandala-bg"/>
      <div className="content main-app">
        <div className="top-bar">
          <div className="app-brand">India<span>Prep</span> 🪷</div>
          <nav className="nav">
            {TABS.map(t=>(
              <button key={t.id} className={`nav-btn${tab===t.id?" active":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>
            ))}
          </nav>
        </div>
        <div className="tab-content">
          {tab === "food"    && <FoodTab/>}
          {tab === "hindi"   && <HindiTab/>}
          {tab === "modules" && <ModulesTab/>}
          {tab === "profile" && <ProfileTab result={personality}/>}
        </div>
      </div>
    </div>
  );
}
