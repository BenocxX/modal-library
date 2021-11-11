/***
 * Source for custom plain js scrollspy: https://codepen.io/zchee/pen/ogzvZZ
 */
function scrollSpy() {
    let sections = document.querySelectorAll(".doc-element");
    let sectionCoordinates = {};
    let i = 0;

    Array.prototype.forEach.call(sections, function(e) {
        sectionCoordinates[e.id] = e.offsetTop;
    });

    window.onscroll = function() {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        for (i in sectionCoordinates) {
            if (sectionCoordinates[i] <= scrollPosition + 200) {
                document.querySelector('.active').setAttribute('class', ' ');
                document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
            }
        }
    };
}
scrollSpy()