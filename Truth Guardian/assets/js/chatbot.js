// Initialize chatbot UI
document.getElementById('chatbot-toggle').addEventListener('click', function() {
    const chat = document.getElementById('chatbot-container');
    chat.style.display = chat.style.display === 'none' ? 'block' : 'none';
  });
  
  document.getElementById('close-chat').addEventListener('click', function() {
    document.getElementById('chatbot-container').style.display = 'none';
  });
  
  // Add your chatbot logic from previous implementation here
  // (The TensorFlow.js and disasterKB code we discussed earlier)