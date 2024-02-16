<template>
    <input class="input" placeholder="Tap on the input to see the keyboard" />
			
    <div :class="keyboardClass"></div>
  </template>
  
  <script>
  import Keyboard from "simple-keyboard";
  import "simple-keyboard/build/css/index.css";
  
  import { defineComponent } from 'vue'
export default defineComponent({
    name: "SimpleKeyboard",
    props: {
      keyboardClass: {
        default: "simple-keyboard",
        type: String
      },
      input: {
        type: String
      }
    },
    data: () => ({
      keyboard: null,
    //   const defaultTheme = "hg-theme-default";
      defaultTheme: "hg-theme-default hg-layout-numeric numeric-theme",
      inputDOM: null
    }),
    mounted() {
      this.keyboard = new Keyboard(this.keyboardClass, {
        // onChange: input => onChange(input),
        // onKeyPress: button => onKeyPress(button),
        onChange: this.onChange,
        onKeyPress: this.onKeyPress,
        // theme: "hg-theme-default hg-layout-numeric numeric-theme",
        theme: this.defaultTheme,
        layout: {
            default: ["1 2 3", "4 5 6", "7 8 9", "{shift} 0 _", "{bksp} {enter}"],
            shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp} {enter}"]
        },
        buttonTheme: [
            {
            class: "hg-red",
            buttons: "1 2 3"
            },
            {
            class: "hg-highlight",
            buttons: "Q q"
            }
        ]

      });


    this.inputDOM = document.querySelector(".input");
      /**
     * Keyboard show
     */
    this.inputDOM.addEventListener("focus", (event) => {
        console.log('focus')
        this.showKeyboard();
    });

    /**
     * Keyboard show toggle
     */
    document.addEventListener("click", (event) => {
    if (
        /**
         * Hide the keyboard when you're not clicking it or when clicking an input
         * If you have installed a "click outside" library, please use that instead.
         */
        this.keyboard.options.theme.includes("show-keyboard") &&
        !event.target.className.includes("input") &&
        !event.target.className.includes("hg-button") &&
        !event.target.className.includes("hg-row") &&
        !event.target.className.includes("simple-keyboard")
    ) {
        this.hideKeyboard();
    }
    });

    },
    methods: {
      onChange(input) {
        this.$emit("onChange", input);
      },
      onKeyPress(button) {
        this.$emit("onKeyPress", button);
  
        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") this.handleShift();
      },
      handleShift() {
        let currentLayout = this.keyboard.options.layoutName;
        let shiftToggle = currentLayout === "default" ? "shift" : "default";
  
        this.keyboard.setOptions({
          layoutName: shiftToggle
        });
      },
     showKeyboard() {
        this.keyboard.setOptions({
            theme: `${this.defaultTheme} show-keyboard`
        });
    },
     hideKeyboard() {
        this.keyboard.setOptions({
            theme: this.defaultTheme
        });
        },
    },
    watch: {
      input(input) {
        // this.keyboard.setInput(input);
      }
    }
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
  .numeric-theme {
  max-width: 320px;
  margin: 0 auto;
}

.numeric-theme + .simple-keyboard-preview {
  max-width: 320px;
}
  .simple-keyboard.hg-layout-default .hg-button.hg-red {
  background: rgb(255, 0, 0, 0.7);
  color: white;
}
.simple-keyboard {
  max-width: 850px;
  display: none;
}

.show-keyboard {
  display: block;
}
  </style>
  