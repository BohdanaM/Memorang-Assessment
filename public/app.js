// Fixed local data keeps the demo deterministic and independent of external services.
const questions = [
  {
    id: 'cell-energy',
    prompt: 'Which organelle is primarily responsible for producing usable energy for a cell?',
    choices: [
      { id: 'a', label: 'Ribosome' },
      { id: 'b', label: 'Mitochondrion' },
      { id: 'c', label: 'Golgi apparatus' },
      { id: 'd', label: 'Nucleus' }
    ],
    answer: 'b',
    hint: 'Think of the organelle often called the cell’s “powerhouse.”',
    explanation: 'Mitochondria convert energy from nutrients into ATP, a form cells can use.'
  },
  {
    id: 'membrane',
    prompt: 'What is a key role of the cell membrane?',
    choices: [
      { id: 'a', label: 'It stores the cell’s genetic information.' },
      { id: 'b', label: 'It controls what enters and leaves the cell.' },
      { id: 'c', label: 'It assembles proteins from amino acids.' },
      { id: 'd', label: 'It produces glucose through photosynthesis.' }
    ],
    answer: 'b',
    hint: 'Consider how a boundary helps a cell regulate its internal environment.',
    explanation: 'The cell membrane is selectively permeable and helps regulate movement into and out of the cell.'
  },
  {
    id: 'photosynthesis',
    prompt: 'Which structures in plant cells capture light energy for photosynthesis?',
    choices: [
      { id: 'a', label: 'Lysosomes' },
      { id: 'b', label: 'Centrioles' },
      { id: 'c', label: 'Chloroplasts' },
      { id: 'd', label: 'Mitochondria' }
    ],
    answer: 'c',
    hint: 'These structures contain the green pigment chlorophyll.',
    explanation: 'Chloroplasts contain chlorophyll, which absorbs light used in photosynthesis.'
  }
];

let currentIndex = 0;
let correctCount = 0;

const questionPrompt = document.querySelector('#question-prompt');
const choicesContainer = document.querySelector('#choices');
const feedback = document.querySelector('#feedback');
const progressLabel = document.querySelector('#progress-label');
const scoreLabel = document.querySelector('#score-label');
const progressFill = document.querySelector('#progress-fill');
const submitButton = document.querySelector('#submit-answer');
const continueButton = document.querySelector('#continue');
const assessment = document.querySelector('#assessment');
const summary = document.querySelector('#summary');

function renderQuestion() {
  const question = questions[currentIndex];
  questionPrompt.textContent = question.prompt;
  progressLabel.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  scoreLabel.textContent = `${correctCount} correct`;
  progressFill.style.width = `${(currentIndex / questions.length) * 100}%`;
  feedback.hidden = true;
  feedback.textContent = '';
  feedback.className = 'feedback';
  submitButton.hidden = false;
  continueButton.hidden = true;

  choicesContainer.replaceChildren();
  for (const choice of question.choices) {
    const label = document.createElement('label');
    label.className = 'choice';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';
    input.value = choice.id;
    input.id = `${question.id}-${choice.id}`;
    const text = document.createElement('span');
    text.textContent = choice.label;
    label.htmlFor = input.id;
    label.append(input, text);
    choicesContainer.append(label);
  }
}

function showSummary() {
  assessment.hidden = true;
  summary.hidden = false;
  progressFill.style.width = '100%';
  document.querySelector('#summary-score').textContent = `You answered ${correctCount} of ${questions.length} questions correctly.`;
}

document.querySelector('#question-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    feedback.textContent = 'Choose an answer before continuing.';
    feedback.className = 'feedback feedback-neutral';
    feedback.hidden = false;
    return;
  }

  const question = questions[currentIndex];
  if (selected.value === question.answer) {
    correctCount += 1;
    feedback.textContent = `Correct. ${question.explanation}`;
    feedback.className = 'feedback feedback-correct';
    submitButton.hidden = true;
    continueButton.hidden = false;
    scoreLabel.textContent = `${correctCount} correct`;
  } else {
    feedback.textContent = `Not quite. ${question.hint}`;
    feedback.className = 'feedback feedback-incorrect';
  }
  feedback.hidden = false;
});

continueButton.addEventListener('click', () => {
  if (currentIndex === questions.length - 1) {
    showSummary();
    return;
  }
  currentIndex += 1;
  renderQuestion();
});

document.querySelector('#restart').addEventListener('click', () => {
  currentIndex = 0;
  correctCount = 0;
  summary.hidden = true;
  assessment.hidden = false;
  renderQuestion();
});

renderQuestion();
