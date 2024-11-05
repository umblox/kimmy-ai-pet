`<template>
  <Frame>
    <Page>
      <ActionBar title="AI Pet Lite" />
      <GridLayout rows="*, auto">
        <StackLayout row="0" class="pet-container">
          <GridLayout class="face" :class="currentMood" @tap="petHead">
            <StackLayout class="eyes">
              <GridLayout columns="auto, auto" class="eye-container">
                <Label col="0" class="eye left-eye" :class="eyeState" />
                <Label col="1" class="eye right-eye" :class="eyeState" />
              </GridLayout>
            </StackLayout>
            <Label class="mouth" :class="mouthState" />
          </GridLayout>

          <Label class="chat-bubble" :text="currentResponse" textWrap="true" 
                 v-if="currentResponse" />
        </StackLayout>

        <GridLayout row="1" columns="*, auto" class="input-area">
          <TextField col="0" v-model="userInput" hint="Katakan sesuatu..." />
          <Button col="1" text="Kirim" @tap="interact" />
        </GridLayout>
      </GridLayout>
    </Page>
  </Frame>
</template>

<script>
export default {
  data() {
    return {
      userInput: "",
      currentResponse: "",
      currentMood: "happy",
      eyeState: "normal",
      mouthState: "smile",
      petCount: 0,
      responses: {
        greeting: ["Hai!", "Halo!", "Senang bertemu denganmu!"],
        happy: ["Yay!", "Asyik!", "Hehe~"],
        sad: ["Huhu...", "Sedih nih...", ":("],
        confused: ["Hmm?", "Aku tidak mengerti", "???"],
        pet: ["*Purr*", "Enak sekali~", "Hehe geli!"],
        love: ["<3", "Aku sayang kamu!", "Kamu baik sekali!"]
      }
    };
  },
  methods: {
    interact() {
      if (!this.userInput.trim()) return;
      
      const input = this.userInput.toLowerCase();
      this.processInput(input);
      this.userInput = "";
    },
    processInput(input) {
      if (input.includes("hai") || input.includes("halo")) {
        this.setMood("happy");
        this.respond("greeting");
      } else if (input.includes("main")) {
        this.setMood("playful");
        this.respond("happy");
      } else if (input.includes("sedih")) {
        this.setMood("sad");
        this.respond("sad");
      } else if (input.includes("sayang")) {
        this.setMood("happy");
        this.respond("love");
      } else {
        this.setMood("confused");
        this.respond("confused");
      }
    },
    petHead() {
      this.petCount++;
      this.setMood("happy");
      if (this.petCount > 2) {
        this.respond("love");
        this.petCount = 0;
      } else {
        this.respond("pet");
      }
    },
    setMood(mood) {
      this.currentMood = mood;
      switch (mood) {
        case "happy":
          this.eyeState = "happy";
          this.mouthState = "smile";
          break;
        case "sad":
          this.eyeState = "sad";
          this.mouthState = "frown";
          break;
        case "confused":
          this.eyeState = "confused";
          this.mouthState = "neutral";
          break;
        case "playful":
          this.eyeState = "happy";
          this.mouthState = "grin";
          break;
      }
    },
    respond(type) {
      const responses = this.responses[type];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      this.currentResponse = randomResponse;
      
      setTimeout(() => {
        this.currentResponse = "";
      }, 2000);
    }
  }
};
</script>

<style scoped>
.pet-container {
  padding: 20;
  align-items: center;
}

.face {
  width: 180;
  height: 180;
  background-color: #FFE4E1;
  border-radius: 90;
  margin: 20;
}

.eyes {
  margin-top: 35;
}

.eye-container {
  width: 100;
}

.eye {
  width: 25;
  height: 25;
  background-color: #333;
  border-radius: 13;
  margin: 8;
}

.mouth {
  width: 70;
  height: 35;
  background-color: #333;
  border-radius: 18;
  margin-top: 25;
}

.chat-bubble {
  background-color: #E8F5E9;
  padding: 8;
  border-radius: 8;
  margin: 8;
}

.input-area {
  padding: 8;
  background-color: #F5F5F5;
}

/* Basic Mood States */
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
  border-radius: 0 0 35 35;
}

.mouth.frown {
  border-radius: 35 35 0 0;
  margin-top: 45;
}

.mouth.grin {
  border-radius: 0 0 40 40;
  transform: scaleY(1.2);
}
</style>`