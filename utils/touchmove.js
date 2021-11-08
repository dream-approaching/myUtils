
// 返回角度
export function GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
}

// 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
export function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;

    // 如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }

    var angle = GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
        result = 4;
    } else if (angle >= 45 && angle < 135) {
        result = 1;
    } else if (angle >= -135 && angle < -45) {
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }

    return result;
}

// 滑动处理
var startX, startY;

document.body.addEventListener('touchstart', function(ev) {
    ev.preventDefault();
    ev.stopPropagation()
    var endX, endY;
    endX = ev.changedTouches[0].pageX;
    endY = ev.changedTouches[0].pageY;
    var direction = GetSlideDirection(startX, startY, endX, endY);
    switch (direction) {
        case 1: console.log('向上'); break;
        case 2: console.log('向下'); break;
        case 3: console.log('向左'); break;
        case 4: console.log('向右'); break;
        default:console.log('未滑动'); break;
    }
})

document.body.addEventListener('touchstart', function(ev) {
    const container = document.querySelector('.customer-filter-list')
    // console.log('container.container', )
    console.log(ev.target.className)
    ev.preventDefault();
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;
})
