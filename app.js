const userInp = document.querySelector(".input")
const btn = document.querySelector(".btn")
const list = document.querySelector(".list")


let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
function renderTasks() {
    list.innerHTML = ""

    tasks.forEach(function (task, index) {
        const li = document.createElement("li")
        li.textContent = task.text

        if (task.completed) {
            li.classList.add("done")
        }

        const delBtn = document.createElement("button")
        delBtn.textContent = "Delete"

        delBtn.addEventListener("click", function (event) {
            event.stopPropagation()
            tasks.splice(index, 1)
            saveTasks()
            renderTasks()
        })

        li.addEventListener("click", function () {
            task.completed = !task.completed
            saveTasks()
            renderTasks()
        })

        li.append(delBtn)
        list.appendChild(li)
    })
}
function addTask() {
    const inpText = userInp.value.trim()

    if (inpText === "") {
        return
    }

    const newTask = {
        text: inpText,
        completed: false
    }
    tasks.push(newTask)
    saveTasks()
    renderTasks()
    userInp.value = ""
}



renderTasks()

btn.addEventListener("click", function () {
    addTask()
})

userInp.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask()
    }
})