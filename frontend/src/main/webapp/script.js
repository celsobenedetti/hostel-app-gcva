function handleCheck(e){
    let box = e.getElementsByTagName('input')[0];
    let icon = e.getElementsByTagName('lottie-player')[0];

    box.checked ? icon.play() : icon.stop();

}

function mountList(){
    var parent = document.getElementById("list")

    for (let i=0; i<10; i++) {
        parent.innerHTML += generateItem(i)
    }
}

function generateItem(n){

    return `
        <li onclick="handleCheck(this)">
          <div class="checkContainer" key=${n}>
            <input type="checkbox" class="checkbox" id="checkbox1" name="checkbox"/>
            <span></span>
            <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_jbrw3hcz.json" class="checkIcon" id="checkicon1" background="transparent"  speed="1.8"></lottie-player>
          </div>
          <label for="checkContainer">Element ${n}</label>
        </li>
        `
}
mountList()