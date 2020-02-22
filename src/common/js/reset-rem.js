const TIME_THROTTLE = 100;

const elmDoc = document.documentElement;
function refresh(){
  elmDoc.style.fontSize = `${elmDoc.getBoundingClientRect().width / 10}px`;
}


let timerThrottle = null;
function refreshThrottle(){
  clearTimeout(timerThrottle);
  timerThrottle = setTimeout(refresh, TIME_THROTTLE);
}

function handlePageShow(e){
  if (e.persisted) {
    refreshThrottle();
  }
}

function handleResize(){
  refreshThrottle();
}

let hasStarted = false;
export function start(){
  if (hasStarted) {
    return;
  }

  window.addEventListener('pageshow', handlePageShow, false);
  window.addEventListener('resize', handleResize, false);

  refresh();

  hasStarted = true;
}

export function stop(){
  if (!hasStarted) {
    return;
  }

  window.removeEventListener('pageshow', handlePageShow, false);
  window.removeEventListener('resize', handleResize, false);

  hasStarted = false;
}

start();

