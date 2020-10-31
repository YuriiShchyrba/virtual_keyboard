const keyboard = {
    elements:{
        main: null,
        keyscontainer: null,
        keys : [],
    },

    eventHandlers:{
        oninput: null,
        onclose: null,
    },

    properties:{
        value:"",
        capslock:false,
    },

    init(){

        this.elements.main = document.createElement("div");
        this.elements.keyscontainer = document.createElement("div");

        this.elements.main.classList.add("keybaord__main","keybaord__main--hidden");
        this.elements.keyscontainer.classList.add("keyboard__keys");

        document.body.appendChild(this.elements.main);
        this.elements.main.appendChild(this.elements.keyscontainer);
        this.elements.keyscontainer.appendChild(this._createKeys());


        this.elements.keys = this.elements.keyscontainer.querySelectorAll('.keyboard__key');


        document.querySelectorAll('.keyboard__input').forEach(element => {
            element.addEventListener("focus", () => {
              this.open(element.value, currentValue => {
                element.value = currentValue;
              });
            });
          });
    },

    _createKeys(){
        const fragment = document.createDocumentFragment();
        const keyLayout = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "space"
            ];

        const createIconHTML = (iconName)=>{
            return `<i class="material-icons">${iconName}</i>`;
        }

        keyLayout.forEach(key=>{
            const keyElement = document.createElement('button');
            const lineBreak = ["backspace","p","enter","?"].indexOf(key)!=-1;

            keyElement.classList.add('keyboard__key');
            keyElement.setAttribute('type','button');

            switch(key){
                case "backspace":
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener('click',()=>{
                        this.properties.value = this.properties.value.substring(0,this.properties.value.length-1);
                        this._triggerEvent('oninput');
                    });

                break;
                case "enter":
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener('click',()=>{
                        this.properties.value +='\n';
                        this._triggerEvent('oninput');
                    });

                break;
                case "caps":
                    keyElement.classList.add('keyboard__key--wide','keyboard__key--activatable');
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener('click',()=>{
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active',this.properties.capslock);
                    });

                break;
                case "space":
                    keyElement.classList.add('keyboard__key--extra-wide');
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener('click',()=>{
                        this.properties.value +=' ';
                        this._triggerEvent('oninput');
                    });

                break;
                case "done":
                    keyElement.classList.add('keyboard__key--wide','keyboard__key--dark');
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener('click',()=>{
                        this.close();
                        this._triggerEvent('onclose');
                    });

                break;
                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener('click',()=>{
                        this.properties.value+= this.properties.capslock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent('oninput');
                    });
                    break;
            }
            fragment.appendChild(keyElement);

            if(lineBreak){
                fragment.appendChild(document.createElement("br"));
            }
        });
        return fragment;
    },

    _triggerEvent(handlerName){
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
          }
    },

    _toggleCapsLock() {
        this.properties.capslock = !this.properties.capslock;
        this.elements.keys.forEach(key=>{
            if(key.childElementCount===0){
                key.textContent = this.properties.capslock ? key.textContent.toUpperCase() :  key.textContent.toLowerCase();
            }
        });
    },

    open(initialValue,oninput,onclose ){
        this.properties.value = initialValue || '';
        this.eventHandlers.onclose = onclose;
        this.eventHandlers.oninput = oninput;
        this.elements.main.classList.remove('keybaord__main--hidden');
    },

    close(){
        this.properties.value = '';
        this.eventHandlers.onclose = onclose;
        this.eventHandlers.oninput = oninput;
        this.elements.main.classList.add('keybaord__main--hidden');
    }

};


window.addEventListener('DOMContentLoaded',()=>{
    keyboard.init();
});