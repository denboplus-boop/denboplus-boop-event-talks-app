
const fs = require('fs');
const path = require('path');

const talks = [
  {
    title: 'The Future of JavaScript Frameworks',
    speakers: ['Jane Doe'],
    category: ['JavaScript', 'Web Development'],
    duration: 60,
    description: 'A deep dive into the trends and future of popular JavaScript frameworks like React, Vue, and Svelte.'
  },
  {
    title: 'Building Scalable APIs with Node.js',
    speakers: ['John Smith'],
    category: ['Node.js', 'API', 'Backend'],
    duration: 60,
    description: 'Learn how to design and build APIs that handle high traffic and scale effectively.'
  },
  {
    title: 'AI and Machine Learning in the Browser',
    speakers: ['Emily Jones', 'David Lee'],
    category: ['AI', 'Machine Learning', 'Web Assembly'],
    duration: 60,
    description: 'Discover how to leverage the power of AI and Machine Learning directly in the web browser using technologies like TensorFlow.js.'
  },
  {
    title: 'The Art of UI/UX Design',
    speakers: ['Maria Garcia'],
    category: ['UI', 'UX', 'Design'],
    duration: 60,
    description: 'A session on creating intuitive and beautiful user interfaces that provide a great user experience.'
  },
  {
    title: 'Cybersecurity in a Modern Web',
    speakers: ['Michael Brown'],
    category: ['Cybersecurity', 'Web Security'],
    duration: 60,
    description: 'An overview of common web vulnerabilities and how to protect your applications from them.'
  },
  {
    title: 'DevOps and CI/CD for Web Developers',
    speakers: ['Chris Wilson', 'Sarah Davis'],
    category: ['DevOps', 'CI/CD'],
    duration: 60,
    description: 'Learn how to automate your development workflow and deploy your applications with confidence using CI/CD pipelines.'
  }
];

const schedule = [];
let currentTime = new Date('2026-10-26T10:00:00');

for (let i = 0; i < talks.length; i++) {
  const talk = talks[i];
  const startTime = new Date(currentTime);
  const endTime = new Date(startTime.getTime() + talk.duration * 60000);

  schedule.push({
    ...talk,
    startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  currentTime = new Date(endTime.getTime() + 10 * 60000); // 10 minute break

  if (i === 2) { // Lunch break after the 3rd talk
    const lunchStartTime = new Date(currentTime);
    const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60000);
    schedule.push({
        title: 'Lunch Break',
        speakers: [],
        category: [],
        duration: 60,
        description: 'Time to recharge and network with other attendees.',
        startTime: lunchStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: lunchEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    currentTime = new Date(lunchEndTime.getTime() + 10 * 60000); // 10 minute break after lunch
  }
}

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'schedule.json'), JSON.stringify(schedule, null, 2));

console.log('schedule.json generated successfully!');
