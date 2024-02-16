<script setup lang="ts">
import { ref } from "vue";
import "http://code.jquery.com/jquery-2.1.3.min.js"; // Import jQuery from CDN
import "http://code.jquery.com/ui/1.11.3/jquery-ui.min.js"
import "https://cdnjs.cloudflare.com/ajax/libs/virtual-keyboard/1.30.1/js/jquery.keyboard.min.js"
import "https://cdnjs.cloudflare.com/ajax/libs/virtual-keyboard/1.30.1/js/jquery.keyboard.extension-all.min.js"
const dialog = ref(false);
const valuein = ref('')

async function sendMessage(input:any) {
    let keyboard = {
        display: {
            bksp: "\u2190",
        },
        layout: "custom",
        customLayout: {
            normal: [
                // "n(a):title_or_tooltip"; n = new key, (a) = actual key, ":label" = title_or_tooltip (use an underscore "_" in place of a space " ")
                "0 1 2 3 4",
                "5 6 7 8 9",
                ", .",
                "{bksp} {accept} {cancel}",
            ],
        },
        autoAccept: true,
        tabNavigation: true,
        usePreview: false, // no preveiw
        // restrictInput : true,
        // appendLocally: true,
        
    };
    //@ts-ignore
    $(`#${input}`).keyboard(keyboard).addTyping({
        showTyping: true,
        delay: 250,
    });
    // valuein.value = inputsa.value
    console.log('text', valuein.value)
//     $('#numbers').keyboard({
//     // set this to ISO 639-1 language code to override language set by
//     // the layout: http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
//     // language defaults to ["en"] if not found
//     language: ['love'],
//     rtl: false,

//     // *** choose layout & positioning ***
//     // choose from 'qwerty', 'alpha',
//     // 'international', 'dvorak', 'num' or
//     // 'custom' (to use the customLayout below)
//     layout: 'qwerty',
//     customLayout: {
//       'default': [
//         'd e f a u l t',
//         '{meta1} {meta2} {accept} {cancel}'
//       ],
//       'meta1': [
//         'm y m e t a 1',
//         '{meta1} {meta2} {accept} {cancel}'
//       ],
//       'meta2': [
//         'M Y M E T A 2',
//         '{meta1} {meta2} {accept} {cancel}'
//       ]
//     },
//     // Used by jQuery UI position utility
//     position: {
//       // null = attach to input/textarea;
//       // use $(sel) to attach elsewhere
//       of: $('#numbers'),
//       my: 'center top',
//       at: 'center top',
//       // used when "usePreview" is false
//       at2: 'center bottom'
//     },

//     // allow jQuery position utility to reposition the keyboard on
//     // window resize
//     reposition: true,

//     // true: preview added above keyboard;
//     // false: original input/textarea used
//     usePreview: true,

//     // if true, the keyboard will always be visible
//     alwaysOpen: false,

//     // give the preview initial focus when the keyboard
//     // becomes visible
//     initialFocus: true,
//     // Avoid focusing the input the keyboard is attached to
//     noFocus: false,

//     // if true, keyboard will remain open even if
//     // the input loses focus.
//     stayOpen: false,

//     // Prevents the keyboard from closing when the user clicks or
//     // presses outside the keyboard. The `autoAccept` option must
//     // also be set to true when this option is true or changes are lost
//     userClosed: false,

//     // if true, keyboard will not close if you press escape.
//     ignoreEsc: false,

//     // *** change keyboard language & look ***
//     display: {
//       'meta1': '\u2666', // Diamond
//       'meta2': '\u2665', // Heart

//       // check mark (accept)
//       'a': '\u2714:Accept (Shift-Enter)',
//       'accept': 'Accept:Accept (Shift-Enter)',
//       'alt': 'AltGr:Alternate Graphemes',
//       // Left arrow (same as &larr;)
//       'b': '\u2190:Backspace',
//       'bksp': 'Bksp:Backspace',
//       // big X, close/cancel
//       'c': '\u2716:Cancel (Esc)',
//       'cancel': 'Cancel:Cancel (Esc)',
//       // clear num pad
//       'clear': 'C:Clear',
//       'combo': '\u00f6:Toggle Combo Keys',
//       // num pad decimal '.' (US) & ',' (EU)
//       'dec': '.:Decimal',
//       // down, then left arrow - enter symbol
//       'e': '\u21b5:Enter',
//       'empty': '\u00a0', // &nbsp;
//       'enter': 'Enter:Enter',
//       // left arrow (move caret)
//       'left': '\u2190',
//       // caps lock
//       'lock': '\u21ea Lock:Caps Lock',
//       'next': 'Next \u21e8',
//       'prev': '\u21e6 Prev',
//       // right arrow (move caret)
//       'right': '\u2192',
//       // thick hollow up arrow
//       's': '\u21e7:Shift',
//       'shift': 'Shift:Shift',
//       // +/- sign for num pad
//       'sign': '\u00b1:Change Sign',
//       'space': '\u00a0:Space',
//       // right arrow to bar
//       // \u21b9 is the true tab symbol
//       't': '\u21e5:Tab',
//       'tab': '\u21e5 Tab:Tab',
//       // replaced by an image
//       'toggle': ' ',

//       // added to titles of keys
//       // accept key status when acceptValid:true
//       'valid': 'valid',
//       'invalid': 'invalid',
//       // combo key states
//       'active': 'active',
//       'disabled': 'disabled'

//     },

//     // Message added to the key title while hovering,
//     // if the mousewheel plugin exists
//     wheelMessage: 'Use mousewheel to see other keys',

//     css: {
//       // input & preview
//       input: 'ui-widget-content ui-corner-all',
//       // keyboard container
//       container: 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix',
//       // keyboard container extra class (same as container, but separate)
//       popup: '',
//       // default state
//       buttonDefault: 'ui-state-default ui-corner-all',
//       // hovered button
//       buttonHover: 'ui-state-hover',
//       // Action keys (e.g. Accept, Cancel, Tab, etc);
//       // this replaces "actionClass" option
//       buttonAction: 'ui-state-active',
//       // Active keys
//       // (e.g. shift down, meta keyset active, combo keys active)
//       buttonActive: 'ui-state-active',
//       // used when disabling the decimal button {dec}
//       // when a decimal exists in the input area
//       buttonDisabled: 'ui-state-disabled',
//       // {empty} button class name
//       buttonEmpty: 'ui-keyboard-empty'
//     },

//     // *** Useability ***
//     // Auto-accept content when clicking outside the
//     // keyboard (popup will close)
//     autoAccept: false,
//     // Auto-accept content even if the user presses escape
//     // (only works if `autoAccept` is `true`)
//     autoAcceptOnEsc: false,

//     // Prevents direct input in the preview window when true
//     lockInput: false,

//     // Prevent keys not in the displayed keyboard from being
//     // typed in
//     restrictInput: false,
//     // Additional allowed characters while restrictInput is true
//     restrictInclude: '', // e.g. 'a b foo \ud83d\ude38'

//     // Check input against validate function, if valid the
//     // accept button is clickable; if invalid, the accept
//     // button is disabled.
//     acceptValid: true,
//     // Auto-accept when input is valid; requires `acceptValid`
//     // set `true` & validate callback
//     autoAcceptOnValid: false,

//     // if acceptValid is true & the validate function returns
//     // a false, this option will cancel a keyboard close only
//     // after the accept button is pressed
//     cancelClose: true,

//     // tab to go to next, shift-tab for previous
//     // (default behavior)
//     tabNavigation: false,

//     // enter for next input; shift-enter accepts content &
//     // goes to next shift + "enterMod" + enter ("enterMod"
//     // is the alt as set below) will accept content and go
//     // to previous in a textarea
//     enterNavigation: false,
//     // mod key options: 'ctrlKey', 'shiftKey', 'altKey',
//     // 'metaKey' (MAC only)
//     // alt-enter to go to previous;
//     // shift-alt-enter to accept & go to previous
//     enterMod: 'altKey',

//     // if true, the next button will stop on the last
//     // keyboard input/textarea; prev button stops at first
//     // if false, the next button will wrap to target the
//     // first input/textarea; prev will go to the last
//     stopAtEnd: true,

//     // Set this to append the keyboard immediately after the
//     // input/textarea it is attached to. This option works
//     // best when the input container doesn't have a set width
//     // and when the "tabNavigation" option is true
//     appendLocally: false,
//     // When appendLocally is false, the keyboard will be appended
//     // to this object
//     appendTo: 'body',

//     // If false, the shift key will remain active until the
//     // next key is (mouse) clicked on; if true it will stay
//     // active until pressed again
//     stickyShift: false,

//     // Prevent pasting content into the area
//     preventPaste: false,

//     // caret places at the end of any text
//     caretToEnd: false,

//     // caret stays this many pixels from the edge of the input
//     // while scrolling left/right; use "c" or "center" to center
//     // the caret while scrolling
//     scrollAdjustment: 10,

//     // Set the max number of characters allowed in the input,
//     // setting it to false disables this option
//     maxLength: false,
//     // allow inserting characters @ caret when maxLength is set
//     maxInsert: true,

//     // Mouse repeat delay - when clicking/touching a virtual
//     // keyboard key, after this delay the key will start
//     // repeating
//     repeatDelay: 500,

//     // Mouse repeat rate - after the repeatDelay, this is the
//     // rate (characters per second) at which the key is
//     // repeated. Added to simulate holding down a real keyboard
//     // key and having it repeat. I haven't calculated the upper
//     // limit of this rate, but it is limited to how fast the
//     // javascript can process the keys. And for me, in Firefox,
//     // it's around 20.
//     repeatRate: 20,

//     // resets the keyboard to the default keyset when visible
//     resetDefault: false,

//     // Event (namespaced) on the input to reveal the keyboard.
//     // To disable it, just set it to ''.
//     openOn: 'focus',

//     // Event (namepaced) for when the character is added to the
//     // input (clicking on the keyboard)
//     keyBinding: 'mousedown touchstart',

//     // enable/disable mousewheel functionality
//     // enabling still depends on the mousewheel plugin
//     useWheel: true,

//     // combos (emulate dead keys)
//     // if user inputs `a the script converts it to à,
//     // ^o becomes ô, etc.
//     useCombos: true,
//     // if you add a new combo, you will need to update the
//     // regex below
//     combos: {
//       // uncomment out the next line, then read the Combos
//       //Regex section below
//       '<': { 3: '\u2665' }, // turn <3 into ♥ - change regex below
//       'a': { e: "\u00e6" }, // ae ligature
//       'A': { E: "\u00c6" },
//       'o': { e: "\u0153" }, // oe ligature
//       'O': { E: "\u0152" }
//     },

//     // *** Methods ***
//     // Callbacks - attach a function to any of these
//     // callbacks as desired
//     // initialized: function(e, keyboard, el) {},
//     // beforeVisible: function(e, keyboard, el) {},
//     // visible: function(e, keyboard, el) {},
//     // beforeInsert: function(e, keyboard, el, textToAdd) { return textToAdd; },
//     // change: function(e, keyboard, el) {},
//     // beforeClose: function(e, keyboard, el, accepted) {},
//     // accepted: function(e, keyboard, el) {},
//     // canceled: function(e, keyboard, el) {},
//     // restricted: function(e, keyboard, el) {},
//     // hidden: function(e, keyboard, el) {},

//     // // called instead of base.switchInput
//     // // Go to next or prev inputs
//     // // goToNext = true, then go to next input;
//     // //   if false go to prev
//     // // isAccepted is from autoAccept option or
//     // //   true if user presses shift-enter
//     // switchInput: function(keyboard, goToNext, isAccepted) {},

//     /*
//             // build key callback
//         buildKey : function( keyboard, data ) {
//               /* data = {
//                 // READ ONLY
//                 isAction: [boolean] true if key is an action key
//                 // name... may include decimal ascii value of character
//                 // prefix = 'ui-keyboard-'
//                 name    : [string]  key class name suffix
//                 value   : [string]  text inserted (non-action keys)
//                 title   : [string]  title attribute of key
//                 action  : [string]  keyaction name
//                 // html includes a <span> wrapping the text
//                 html    : [string]  HTML of the key;
//                 // DO NOT MODIFY THE ABOVE SETTINGS

//                 // use to modify key HTML
//                 $key    : [object]  jQuery selector of key already added to keyboard
//               }
//               * /
//               data.$key.html('<span class="ui-keyboard-text">Foo</span>');
//               return data;
//               },
//             */

//     // this callback is called just before the "beforeClose"
//     // to check the value if the value is valid, return true
//     // and the keyboard will continue as it should (close if
//     // not always open, etc)
//     // if the value is not value, return false and the clear
//     // the keyboard value ( like this
//     // "keyboard.$preview.val('');" ), if desired
//     // validate: function(keyboard, value, isClosing) {
//     //   return true;
//     // }

//   })
//   // activate the typing extension
//   .addTyping({
//     showTyping: true,
//     delay: 250
//   });

}
//     $('#numbers').keyboard({
//     // set this to ISO 639-1 language code to override language set by
//     // the layout: http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
//     // language defaults to ["en"] if not found
//     language: ['love'],
//     rtl: false,

//     // *** choose layout & positioning ***
//     // choose from 'qwerty', 'alpha',
//     // 'international', 'dvorak', 'num' or
//     // 'custom' (to use the customLayout below)
//     layout: 'qwerty',
//     customLayout: {
//       'default': [
//         'd e f a u l t',
//         '{meta1} {meta2} {accept} {cancel}'
//       ],
//       'meta1': [
//         'm y m e t a 1',
//         '{meta1} {meta2} {accept} {cancel}'
//       ],
//       'meta2': [
//         'M Y M E T A 2',
//         '{meta1} {meta2} {accept} {cancel}'
//       ]
//     },
//     // Used by jQuery UI position utility
//     position: {
//       // null = attach to input/textarea;
//       // use $(sel) to attach elsewhere
//       of: $('#numbers'),
//       my: 'center top',
//       at: 'center top',
//       // used when "usePreview" is false
//       at2: 'center bottom'
//     },

//     // allow jQuery position utility to reposition the keyboard on
//     // window resize
//     reposition: true,

//     // true: preview added above keyboard;
//     // false: original input/textarea used
//     usePreview: true,

//     // if true, the keyboard will always be visible
//     alwaysOpen: false,

//     // give the preview initial focus when the keyboard
//     // becomes visible
//     initialFocus: true,
//     // Avoid focusing the input the keyboard is attached to
//     noFocus: false,

//     // if true, keyboard will remain open even if
//     // the input loses focus.
//     stayOpen: false,

//     // Prevents the keyboard from closing when the user clicks or
//     // presses outside the keyboard. The `autoAccept` option must
//     // also be set to true when this option is true or changes are lost
//     userClosed: false,

//     // if true, keyboard will not close if you press escape.
//     ignoreEsc: false,

//     // *** change keyboard language & look ***
//     display: {
//       'meta1': '\u2666', // Diamond
//       'meta2': '\u2665', // Heart

//       // check mark (accept)
//       'a': '\u2714:Accept (Shift-Enter)',
//       'accept': 'Accept:Accept (Shift-Enter)',
//       'alt': 'AltGr:Alternate Graphemes',
//       // Left arrow (same as &larr;)
//       'b': '\u2190:Backspace',
//       'bksp': 'Bksp:Backspace',
//       // big X, close/cancel
//       'c': '\u2716:Cancel (Esc)',
//       'cancel': 'Cancel:Cancel (Esc)',
//       // clear num pad
//       'clear': 'C:Clear',
//       'combo': '\u00f6:Toggle Combo Keys',
//       // num pad decimal '.' (US) & ',' (EU)
//       'dec': '.:Decimal',
//       // down, then left arrow - enter symbol
//       'e': '\u21b5:Enter',
//       'empty': '\u00a0', // &nbsp;
//       'enter': 'Enter:Enter',
//       // left arrow (move caret)
//       'left': '\u2190',
//       // caps lock
//       'lock': '\u21ea Lock:Caps Lock',
//       'next': 'Next \u21e8',
//       'prev': '\u21e6 Prev',
//       // right arrow (move caret)
//       'right': '\u2192',
//       // thick hollow up arrow
//       's': '\u21e7:Shift',
//       'shift': 'Shift:Shift',
//       // +/- sign for num pad
//       'sign': '\u00b1:Change Sign',
//       'space': '\u00a0:Space',
//       // right arrow to bar
//       // \u21b9 is the true tab symbol
//       't': '\u21e5:Tab',
//       'tab': '\u21e5 Tab:Tab',
//       // replaced by an image
//       'toggle': ' ',

//       // added to titles of keys
//       // accept key status when acceptValid:true
//       'valid': 'valid',
//       'invalid': 'invalid',
//       // combo key states
//       'active': 'active',
//       'disabled': 'disabled'

//     },

//     // Message added to the key title while hovering,
//     // if the mousewheel plugin exists
//     wheelMessage: 'Use mousewheel to see other keys',

//     css: {
//       // input & preview
//       input: 'ui-widget-content ui-corner-all',
//       // keyboard container
//       container: 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix',
//       // keyboard container extra class (same as container, but separate)
//       popup: '',
//       // default state
//       buttonDefault: 'ui-state-default ui-corner-all',
//       // hovered button
//       buttonHover: 'ui-state-hover',
//       // Action keys (e.g. Accept, Cancel, Tab, etc);
//       // this replaces "actionClass" option
//       buttonAction: 'ui-state-active',
//       // Active keys
//       // (e.g. shift down, meta keyset active, combo keys active)
//       buttonActive: 'ui-state-active',
//       // used when disabling the decimal button {dec}
//       // when a decimal exists in the input area
//       buttonDisabled: 'ui-state-disabled',
//       // {empty} button class name
//       buttonEmpty: 'ui-keyboard-empty'
//     },

//     // *** Useability ***
//     // Auto-accept content when clicking outside the
//     // keyboard (popup will close)
//     autoAccept: false,
//     // Auto-accept content even if the user presses escape
//     // (only works if `autoAccept` is `true`)
//     autoAcceptOnEsc: false,

//     // Prevents direct input in the preview window when true
//     lockInput: false,

//     // Prevent keys not in the displayed keyboard from being
//     // typed in
//     restrictInput: false,
//     // Additional allowed characters while restrictInput is true
//     restrictInclude: '', // e.g. 'a b foo \ud83d\ude38'

//     // Check input against validate function, if valid the
//     // accept button is clickable; if invalid, the accept
//     // button is disabled.
//     acceptValid: true,
//     // Auto-accept when input is valid; requires `acceptValid`
//     // set `true` & validate callback
//     autoAcceptOnValid: false,

//     // if acceptValid is true & the validate function returns
//     // a false, this option will cancel a keyboard close only
//     // after the accept button is pressed
//     cancelClose: true,

//     // tab to go to next, shift-tab for previous
//     // (default behavior)
//     tabNavigation: false,

//     // enter for next input; shift-enter accepts content &
//     // goes to next shift + "enterMod" + enter ("enterMod"
//     // is the alt as set below) will accept content and go
//     // to previous in a textarea
//     enterNavigation: false,
//     // mod key options: 'ctrlKey', 'shiftKey', 'altKey',
//     // 'metaKey' (MAC only)
//     // alt-enter to go to previous;
//     // shift-alt-enter to accept & go to previous
//     enterMod: 'altKey',

//     // if true, the next button will stop on the last
//     // keyboard input/textarea; prev button stops at first
//     // if false, the next button will wrap to target the
//     // first input/textarea; prev will go to the last
//     stopAtEnd: true,

//     // Set this to append the keyboard immediately after the
//     // input/textarea it is attached to. This option works
//     // best when the input container doesn't have a set width
//     // and when the "tabNavigation" option is true
//     appendLocally: false,
//     // When appendLocally is false, the keyboard will be appended
//     // to this object
//     appendTo: 'body',

//     // If false, the shift key will remain active until the
//     // next key is (mouse) clicked on; if true it will stay
//     // active until pressed again
//     stickyShift: false,

//     // Prevent pasting content into the area
//     preventPaste: false,

//     // caret places at the end of any text
//     caretToEnd: false,

//     // caret stays this many pixels from the edge of the input
//     // while scrolling left/right; use "c" or "center" to center
//     // the caret while scrolling
//     scrollAdjustment: 10,

//     // Set the max number of characters allowed in the input,
//     // setting it to false disables this option
//     maxLength: false,
//     // allow inserting characters @ caret when maxLength is set
//     maxInsert: true,

//     // Mouse repeat delay - when clicking/touching a virtual
//     // keyboard key, after this delay the key will start
//     // repeating
//     repeatDelay: 500,

//     // Mouse repeat rate - after the repeatDelay, this is the
//     // rate (characters per second) at which the key is
//     // repeated. Added to simulate holding down a real keyboard
//     // key and having it repeat. I haven't calculated the upper
//     // limit of this rate, but it is limited to how fast the
//     // javascript can process the keys. And for me, in Firefox,
//     // it's around 20.
//     repeatRate: 20,

//     // resets the keyboard to the default keyset when visible
//     resetDefault: false,

//     // Event (namespaced) on the input to reveal the keyboard.
//     // To disable it, just set it to ''.
//     openOn: 'focus',

//     // Event (namepaced) for when the character is added to the
//     // input (clicking on the keyboard)
//     keyBinding: 'mousedown touchstart',

//     // enable/disable mousewheel functionality
//     // enabling still depends on the mousewheel plugin
//     useWheel: true,

//     // combos (emulate dead keys)
//     // if user inputs `a the script converts it to à,
//     // ^o becomes ô, etc.
//     useCombos: true,
//     // if you add a new combo, you will need to update the
//     // regex below
//     combos: {
//       // uncomment out the next line, then read the Combos
//       //Regex section below
//       '<': { 3: '\u2665' }, // turn <3 into ♥ - change regex below
//       'a': { e: "\u00e6" }, // ae ligature
//       'A': { E: "\u00c6" },
//       'o': { e: "\u0153" }, // oe ligature
//       'O': { E: "\u0152" }
//     },

//     // *** Methods ***
//     // Callbacks - attach a function to any of these
//     // callbacks as desired
//     // initialized: function(e, keyboard, el) {},
//     // beforeVisible: function(e, keyboard, el) {},
//     // visible: function(e, keyboard, el) {},
//     // beforeInsert: function(e, keyboard, el, textToAdd) { return textToAdd; },
//     // change: function(e, keyboard, el) {},
//     // beforeClose: function(e, keyboard, el, accepted) {},
//     // accepted: function(e, keyboard, el) {},
//     // canceled: function(e, keyboard, el) {},
//     // restricted: function(e, keyboard, el) {},
//     // hidden: function(e, keyboard, el) {},

//     // // called instead of base.switchInput
//     // // Go to next or prev inputs
//     // // goToNext = true, then go to next input;
//     // //   if false go to prev
//     // // isAccepted is from autoAccept option or
//     // //   true if user presses shift-enter
//     // switchInput: function(keyboard, goToNext, isAccepted) {},

//     /*
//             // build key callback
//         buildKey : function( keyboard, data ) {
//               /* data = {
//                 // READ ONLY
//                 isAction: [boolean] true if key is an action key
//                 // name... may include decimal ascii value of character
//                 // prefix = 'ui-keyboard-'
//                 name    : [string]  key class name suffix
//                 value   : [string]  text inserted (non-action keys)
//                 title   : [string]  title attribute of key
//                 action  : [string]  keyaction name
//                 // html includes a <span> wrapping the text
//                 html    : [string]  HTML of the key;
//                 // DO NOT MODIFY THE ABOVE SETTINGS

//                 // use to modify key HTML
//                 $key    : [object]  jQuery selector of key already added to keyboard
//               }
//               * /
//               data.$key.html('<span class="ui-keyboard-text">Foo</span>');
//               return data;
//               },
//             */

//     // this callback is called just before the "beforeClose"
//     // to check the value if the value is valid, return true
//     // and the keyboard will continue as it should (close if
//     // not always open, etc)
//     // if the value is not value, return false and the clear
//     // the keyboard value ( like this
//     // "keyboard.$preview.val('');" ), if desired
//     // validate: function(keyboard, value, isClosing) {
//     //   return true;
//     // }

//   })
//   // activate the typing extension
//   .addTyping({
//     showTyping: true,
//     delay: 250
//   });

</script>
<style scoped>
.hide {
    display: none;
}
</style>
<template>
<!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" rel="stylesheet" />
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link href="https://cdnjs.cloudflare.com/ajax/libs/virtual-keyboard/1.30.1/css/keyboard.min.css" rel="stylesheet" /> -->
<!-- <v-container> -->
    <!-- <v-text-field
        v-model="valuein"
        placeholder="Tap on the virtual keyboard to start"
    /> -->
    <!-- <input @focus="sendMessage" id="inputtex" type="text" class="form-control form-control-solid placeholder-no-fix ng-pristine ng-untouched ng-valid ng-empty ui-widget-content ui-corner-all" placeholder="Nhập Id Voucher" aria-required="true" ng-model="idVoucherManager" inputmode="none" aria-invalid="false" aria-haspopup="true" role="textbox"> -->
        <div class="v-input v-input--horizontal v-input--center-affix v-input--density-comfortable v-locale--is-ltr v-text-field" data-v-e7bfa14f="">
            <div class="v-input__control">
                <div class="v-field v-field--center-affix v-field--no-label v-field--variant-outlined v-theme--GREEN_THEME v-locale--is-ltr" role="textbox">
                    <div class="v-field__overlay"></div>
                    <div class="v-field__loader">
                        <div class="v-progress-linear v-theme--GREEN_THEME v-locale--is-ltr" role="progressbar" aria-hidden="true" aria-valuemin="0" aria-valuemax="100" style="top: 0px; height: 0px; --v-progress-linear-height: 2px; left: 50%; transform: translateX(-50%);">
                            <div class="v-progress-linear__background bg-primary" style="width: 100%;"></div>
                            <div class="v-progress-linear__indeterminate">
                                <div class="v-progress-linear__indeterminate long bg-primary"></div>
                                <div class="v-progress-linear__indeterminate short bg-primary"></div>
                            </div>
                        </div>
                    </div>
                    <div class="v-field__field" data-no-activator="">
                        <label class="v-label v-field-label" for="input-15"></label>
                        <input @focus="sendMessage('input-15')" placeholder="Tap on the virtual keyboard to start" size="1" type="text" id="input-15" aria-describedby="input-15-messages" class="v-field__input">
                    </div>
                    <div class="v-field__outline">
                        <div class="v-field__outline__start"></div>
                        <div class="v-field__outline__end"></div>
                    </div>
                </div>
            </div>
            <div class="v-input__details"><div class="v-messages" role="alert" aria-live="polite" id="input-15-messages"></div>
        </div>
    </div>
    
<!-- </v-container> -->
   
  <!-- <div class="text-center">
    <v-btn color="secondary" class="w-100 px-4 " @click="dialog = true" > Open Dialog </v-btn>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" class="px-4  mx-auto"  @click="dialog = false" variant="tonal"
            >Close Dialog</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div> -->
</template>
