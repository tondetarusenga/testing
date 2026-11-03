(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var top = document.querySelector('.top');
  function onScroll(){ if(top){ top.classList.toggle('scrolled', window.scrollY > 8); } }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // Scroll reveal
  var targets = [];
  document.querySelectorAll('main section:not(.hero-dark) > .wrap > *, section:not(.hero-dark):not(.ticker) > .wrap > *').forEach(function(el){ targets.push(el); });
  document.querySelectorAll('.gates4 > div, .nums > div, .timeline > div, .svcd').forEach(function(el, i){ targets.push(el); });
  targets.forEach(function(el, i){
    if(!el.classList.contains('rv')){ el.classList.add('rv'); }
  });
  document.querySelectorAll('.gates4, .nums, .timeline, .svcs').forEach(function(group){
    Array.prototype.forEach.call(group.children, function(c, i){ c.style.transitionDelay = (i*90)+'ms'; });
  });
  if('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:0.12, rootMargin:'0px 0px -6% 0px'});
    document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function(el){ el.classList.add('in'); });
  }

  // Count-up numbers
  var counters = document.querySelectorAll('.cnt');
  function run(el){
    var to = parseInt(el.getAttribute('data-to'), 10), start = null, dur = 1400;
    function step(ts){ if(!start) start = ts; var p = Math.min((ts-start)/dur, 1); var eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(to*eased); if(p<1) requestAnimationFrame(step); }
    el.textContent = '0'; requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window && !reduce){
    var co = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ run(e.target); co.unobserve(e.target); } });
    }, {threshold:0.6});
    counters.forEach(function(c){ co.observe(c); });
  }

  // Contact form: opens the visitor's email app with the message filled in
  var form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var d = new FormData(form);
      var subject = 'Enquiry from ' + (d.get('name') || 'website');
      var body = 'Name: ' + d.get('name') + '\nCompany: ' + d.get('company') + '\nEmail: ' + d.get('email') + '\n\n' + d.get('message');
      window.location.href = 'mailto:hello@marketplaceoperators.co.za?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
