// Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Typed terminal line
  const phrases = ["building software.", "designing interfaces.", "training models.", "learning, always."];
  const typedEl = document.getElementById('typedText');
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function typeLoop(){
    const current = phrases[phraseIdx];
    if(!deleting){
      typedEl.textContent = current.slice(0, ++charIdx);
      if(charIdx === current.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if(charIdx === 0){ deleting = false; phraseIdx = (phraseIdx+1) % phrases.length; }
    }
    setTimeout(typeLoop, deleting ? 40 : 70);
  }
  typeLoop();