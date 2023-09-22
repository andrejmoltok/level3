// selecting elements by their ID
const bgtxt = document.getElementById('backgroundText');
const flipper = document.getElementById('flipButton');

// colors array
const colors = ['red','yellow','green','blue','orange',
                'gray','pink','aliceblue','antiquewhite',
                'aqua','aquamarine','azure','beige','bisque',
                'black','blueviolet','brown','burlywood',
                'cadetblue','chartreuse','coral','cornsilk',
                'crimson','khaki','magenta','fuchsia','gainsboro',
                'gold','indigo','lavender','lemonchiffon',
                'lime','maroon','mistyrose','moccasin','navy',
                'olive','orchid','peru','purple','salmon',
                'seashell','sienna','silver','skyblue','steelblue',
                'tan','teal','thistle','tomato','turquoise',
                'wheat','violet'];

// element eventlistener, listening and responding to user clicks
flipper.addEventListener('click',function () {

    // randomly generate and index to choose from the `colors` array
    const randomIndex = Math.floor(Math.random() * colors.length);
    
    // display the color on screen
    document.body.style.backgroundColor = colors[randomIndex];

    // style backgroundText div and display the name of the color from the array
    bgtxt.style.backgroundColor = 'black';
    bgtxt.style.color = 'white';
    bgtxt.style.fontSize = '48px';
    bgtxt.style.textAlign = 'center';
    bgtxt.style.display = 'flex';
    bgtxt.style.flexDirection = 'row';
    bgtxt.style.justifyContent = 'center';
    bgtxt.style.alignItems = 'center';
    
    bgtxt.textContent = `BackgroundColor: ${colors[randomIndex]}`
});