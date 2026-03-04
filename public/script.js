
document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const searchInput = document.getElementById('searchInput');
  let allTalks = [];

  const fetchSchedule = async () => {
    try {
      const response = await fetch('schedule.json');
      allTalks = await response.json();
      renderSchedule(allTalks);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      scheduleContainer.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
    }
  };

  const renderSchedule = (talksToRender) => {
    scheduleContainer.innerHTML = ''; // Clear previous schedule
    talksToRender.forEach(talk => {
      const talkElement = document.createElement('div');
      talkElement.classList.add('talk');

      if (talk.title === 'Lunch Break') {
        talkElement.classList.add('lunch');
      }

      const speakersHtml = talk.speakers.length > 0
        ? `<p class="speakers">Speaker(s): ${talk.speakers.join(', ')}</p>`
        : '';

      const categoryHtml = talk.category.length > 0
        ? `<p class="category">${talk.category.map(cat => `<span>${cat}</span>`).join('')}</p>`
        : '';

      talkElement.innerHTML = `
        <h2>${talk.title}</h2>
        <p class="time">${talk.startTime} - ${talk.endTime}</p>
        ${speakersHtml}
        <p>${talk.description}</p>
        ${categoryHtml}
      `;
      scheduleContainer.appendChild(talkElement);
    });
  };

  searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredTalks = allTalks.filter(talk =>
      talk.category.some(cat => cat.toLowerCase().includes(searchTerm)) ||
      talk.title.toLowerCase().includes(searchTerm) ||
      talk.description.toLowerCase().includes(searchTerm) ||
      talk.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm))
    );
    renderSchedule(filteredTalks);
  });

  fetchSchedule();
});
