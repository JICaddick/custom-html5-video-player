/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
//skips buttons equals anything with a data-skip attribute. We can put data-skip on any element we want.
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() { 
    // when toggling we don't have to hook into the function, we can just use the video object and listen for the event.
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    // console.log(this.dataset.skip);
    //parseFloat will convert our string, this.dataset.skip, to a number.
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}
function handleProgress() {
    //currentTime and duration are properties on the video object.
    const percent = (video.currentTime / video.duration) * 100; 
    progressBar.style.flexBasis = `${percent}%`;
}

// the below function is great but we don't just want to listen for when the mouse is down, we want to listen for when the mouse is down and moving.
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
console.log(e);
}
/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
    skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
// we'll listen for the video to emit an event, timeupdate, and then we'll run the handleProgress function.
let mousedown = false;
progress.addEventListener('click', scrub);
// we'll listen for the mouse to move and then run the scrub function.
//false here is a flag variable that tells the browser to not bubble up the event. When we click we set it to true.
// Here, we're taking the event and hotpotatoing it to the scrub function.
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);