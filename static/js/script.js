function createBar(type, color) {
    const canvas = document.getElementById('canvas');
    const bar = document.createElement('div');
    bar.className = 'bar ' + type + '-bar';

    if (type === 'circle') {
        bar.style.borderColor = color;
        bar.style.backgroundColor = 'transparent';
    } else {
        bar.style.backgroundColor = color;
    }

    // Append the bar to the canvas first to get its dimensions
    canvas.appendChild(bar);
    const width = bar.offsetWidth;
    const height = bar.offsetHeight;

    bar.style.left = (canvas.clientWidth / 2 - width / 2) + 'px';
    bar.style.top = (canvas.clientHeight / 2 - height / 2) + 'px';
    bar.onmousedown = startDrag;

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'X';
    deleteBtn.onclick = function() {
        canvas.removeChild(bar);
    };
    bar.appendChild(deleteBtn);

    canvas.appendChild(bar);
}

function startDrag(event) {
    const bar = event.target.closest('.bar');
    const canvas = document.getElementById('canvas');
    const shiftX = event.clientX - bar.getBoundingClientRect().left;
    const shiftY = event.clientY - bar.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        let newLeft = pageX - shiftX;
        let newTop = pageY - shiftY;

        // Prevent moving beyond the left edge
        if (newLeft < 0) {
            newLeft = 0;
        }

        // Prevent moving beyond the right edge
        if (newLeft + bar.offsetWidth > canvas.clientWidth) {
            newLeft = canvas.clientWidth - bar.offsetWidth;
        }

        // Prevent moving beyond the top edge
        if (newTop < 0) {
            newTop = 0;
        }

        // Prevent moving beyond the bottom edge
        if (newTop + bar.offsetHeight > canvas.clientHeight) {
            newTop = canvas.clientHeight - bar.offsetHeight;
        }

        bar.style.left = newLeft + 'px';
        bar.style.top = newTop + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        document.onmouseup = null;
    };
}

document.onmousedown = function(event) {
    if (!event.target.classList.contains('bar') && !event.target.closest('.bar')) return;
    event.preventDefault();
};

document.ondragstart = function() {
    return false;
};