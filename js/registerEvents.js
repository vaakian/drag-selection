import { isOverlap } from "./utils"

export const keyStatus = {
    Control: 0,
    Meta: 0,
    Shift: 0
}

// 记录按键状态
window.addEventListener('keydown', ({ key }) => {
    keyStatus[key] = 1
})
window.addEventListener('keyup', ({ key }) => {
    keyStatus[key] = 0

})


let update = () => { }
function selectElements(selectElement, fileElements) {
    const selectPos = selectElement.getBoundingClientRect()
    fileElements.forEach(fileEl => {
        const filePos = fileEl.getBoundingClientRect()
        if (keyStatus.Meta) {
            // 如果按下了cmd键，那么就增量选择
            if (isOverlap(selectPos, filePos)) fileEl.className = 'file selected'
        } else {
            fileEl.className = isOverlap(selectPos, filePos) ? 'file selected' : 'file'
        }
    })
}


export function registerEvents(rootElement, fileElements) {
    let enable = false
    let x1, y1
    //创建选择框
    const selectElement = document.createElement('div')
    selectElement.id = 'select'
    rootElement.append(selectElement)

    // 注册事件
    rootElement.onmousedown = event => {
        const { target } = event
        console.log(keyStatus['Meta'])
        if (!keyStatus['Meta']) {
            console.log('clear')
            fileElements.forEach(fileEl => fileEl.className = 'file')
        }
        if (target.className.includes('file')) {
            // 起始位置是文件
            target.className = target.className === 'file' ? 'file selected' : 'file'
        }
        selectElement.style.visibility = 'visible'
        selectElement.style.width = 0
        selectElement.style.height = 0
        selectElement.style.top = '-20px'
        enable = true
        x1 = event.clientX - rootElement.offsetLeft
        y1 = event.clientY - rootElement.offsetTop
    }
    rootElement.onmousemove = event => {
        if (!enable) return
        let x2 = event.clientX - rootElement.offsetLeft
        let y2 = event.clientY - rootElement.offsetTop
        update = () => {
            selectElement.style.left = (x2 > x1 ? x1 : x2) + "px"
            selectElement.style.top = (y2 > y1 ? y1 : y2) + "px"
            selectElement.style.width = Math.abs(x2 - x1) + "px"
            selectElement.style.height = Math.abs(y2 - y1) + "px"
            selectElements(selectElement, fileElements)
        }
        requestAnimationFrame(update)
    }
    rootElement.onmouseup = ev => {
        enable = false
        selectElement.style.visibility = 'hidden'
    }
}