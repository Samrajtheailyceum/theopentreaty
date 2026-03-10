// Scale button interaction
document.querySelectorAll('.scale-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const group = this.closest('.q-scale').querySelectorAll('.scale-btn');
    group.forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');
    document.getElementById('transparencyValue').value = this.dataset.value;
  });
});

// Scroll progress
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const scrolled = (doc.scrollTop || document.body.scrollTop);
  const total = doc.scrollHeight - doc.clientHeight;
  const pct = Math.round((scrolled / total) * 100);
  const progressBar = document.getElementById('progress');
  if (progressBar) {
    progressBar.style.width = pct + '%';
  }
});

// Form submission
document.getElementById('treatyForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = document.querySelector('.submit-btn');
  const feedback = document.getElementById('submitFeedback');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  data.timestamp = new Date().toISOString();
  data.id = Date.now().toString();

  try {
    // Get existing responses from localStorage
    const responses = JSON.parse(localStorage.getItem('treatyResponses') || '[]');
    responses.push(data);
    localStorage.setItem('treatyResponses', JSON.stringify(responses));

    // Success
    feedback.className = 'submit-feedback success';
    feedback.textContent = '✓ Thank you. Your voice has been recorded and will be published in the open record.';

    setTimeout(() => {
      window.location.href = '../pages/responses.html';
    }, 2000);

  } catch (error) {
    feedback.className = 'submit-feedback error';
    feedback.textContent = 'An error occurred. Please try again.';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign the Treaty';
  }
});

// Stats counter animation (for landing page)
function animateStats() {
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.dataset.target || '0');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      stat.textContent = Math.floor(current);
    }, 16);
  });
}

// Run stats animation if on landing page
if (document.querySelector('.hero-stats')) {
  setTimeout(animateStats, 500);
}
