`<template>
  <div class="container">
    <div class="pet-container">
      <h1>Kimmy AI Pet</h1>
      <div class="face" :class="currentMood" @click="petHead">
        <div class="eyes">
          <div class="eye-container">
            <div class="eye left-eye" :class="eyeState"></div>
            <div class="eye right-eye" :class="eyeState"></div>
          </div>
        </div>
        <div class="mouth" :class="mouthState"></div>
      </div>

      <div class="chat-bubble" v-if="currentResponse">
        {{ currentResponse }}
      </div>

      <div class="input-area">
        <input 
          v-model="userInput" 
          @keyup.enter="interact"
          placeholder="Katakan sesuatu ke Kimmy..."
        >
        <button @click="interact">Kirim</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NoSleep from 'nosleep.js';

const noSleep = new NoSleep();
const userInput = ref('');
const currentResponse = ref('');
const currentMood = ref('happy');
const eyeState = ref('normal');
const mouthState = ref('smile');
const petCount = ref(0);

onMounted(() => {
  // Aktifkan NoSleep saat user berinteraksi pertama kali
  document.addEventListener('click', enableNoSleep, { once: true });
  greet();
});

function enableNoSleep() {
  noSleep.enable();
}

async function interact() {
  if (!userInput.value.trim()) return;
  
  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: userInput.value.toLowerCase() })
    });
    
    const data = await response.json();
    setMood(data.mood);
    showResponse(data.response);
    
    userInput.value = '';
  } catch (error) {
    console.error('Error:', error);
    showResponse('Maaf, aku sedang bingung...');
    setMood('confused');
  }
}

function greet() {
  showResponse('Hai! Aku Kimmy!');
  setMood('happy');
}

function petHead() {
  petCount.value++;
  setMood('happy');
  if (petCount.value > 2) {
    showResponse('Aku sayang kamu!');
    petCount.value = 0;
  } else {
    showResponse('*Purr*');
  }
}

function setMood(mood) {
  currentMood.value = mood;
  switch (mood) {
    case 'happy':
      eyeState.value = 'happy';
      mouthState.value = 'smile';
      break;
    case 'sad':
      eyeState.value = 'sad';
      mouthState.value = 'frown';
      break;
    case 'confused':
      eyeState.value = 'confused';
      mouthState.value = 'neutral';
      break;
  }
}

function showResponse(text) {
  currentResponse.value = text;
  setTimeout(() => {
    currentResponse.value = '';
  }, 3000);
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
}

.pet-container {
  text-align: center;
  padding: 20px;
}

.face {
  width: 200px;
  height: 200px;
  background-color: #FFE4E1;
  border-radius: 50%;
  margin: 20px auto;
  position: relative;
  cursor: pointer;
}

.eyes {
  padding-top: 60px;
}

.eye-container {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.eye {
  width: 30px;
  height: 30px;
  background-color: #333;
  border-radius: 50%;
}

.mouth {
  width: 80px;
  height: 40px;
  background-color: #333;
  border-radius: 20px;
  margin: 30px auto 0;
}

.chat-bubble {
  background-color: #E8F5E9;
  padding: 15px;
  border-radius: 20px;
  margin: 20px auto;
  max-width: 80%;
  animation: pop 0.3s ease-out;
}

.input-area {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  width: 60%;
  max-width: 300px;
}

button {
  padding: 10px 20px;
  background-color: #FFE4E1;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

/* Mood Animations */
.happy .eye {
  transform: scale(1.2);
}

.sad .eye {
  transform: scaleY(0.5);
}

.confused .eye {
  transform: rotate(10deg);
}

.mouth.smile {
  border-radius: 0 0 40px 40px;
}

.mouth.frown {
  border-radius: 40px 40px 0 0;
  margin-top: 45px;
}

@keyframes pop {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@media (max-width: 480px) {
  .face {
    width: 150px;
    height: 150px;
  }
  
  .eye {
    width: 20px;
    height: 20px;
  }
  
  .mouth {
    width: 60px;
    height: 30px;
  }
}
</style>`