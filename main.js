
const toDoList = [];

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const taskNumber = document.querySelector('h1 span');
const listItems = document.getElementsByClassName('task');
const input = document.querySelector('input');
const searchInput = document.getElementsByClassName('filter')[0];

const removeTask = (e) => {
    // console.log(e.target);
    // console.log(e.target.parentNode);
    // e.target.parentNode.remove();

    let item;
    if(e.target.classList[0] === 'delete-btn'){
        item = e.target.parentNode;
    }
    else{
        item = e.target.parentNode.parentNode;
    }
    
    item.classList.add('fall');
    item.addEventListener('transitionend', (e)=> {
        if(e.propertyName === 'transform'){
        index = e.target.dataset.id;
            // console.log(e.propertyName)
            toDoList.splice(index, 1);
            listRemake();
        }
    })
}

const checkTask= (e)=> {
    const item = e.target;
    if(item.classList[0] === 'complete-btn'){
        item.parentNode.classList.toggle("completed");
    }
    else if(item.parentNode.classList[0] === 'complete-btn'){
        item.parentElement.parentElement.classList.toggle("completed");
    }
}

const addTask = (e) => {
    e.preventDefault();
    let taskText = input.value;

    //add
    if (taskText !==''){
    
        divItem = document.createElement('div');
        divItem.classList.add('todo-div');
        divItem.style.display = 'flex';

        task = document.createElement('li');
        task.className = 'task';
        task.innerHTML = taskText;
        divItem.appendChild(task);

        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = `<i class="fas fa-check">`;
        completeBtn.classList.add('complete-btn');
        divItem.appendChild(completeBtn);

        const deleteeBtn = document.createElement('button');
        deleteeBtn.innerHTML = `<i class="fas fa-trash-alt">`;
        deleteeBtn.classList.add('delete-btn');
        divItem.appendChild(deleteeBtn);

        input.value = '';
        //toDoList.push(task);
        toDoList.push(divItem);
        listRemake()
        searchInput.value = ''
    }
    //remove
    //document.querySelector('li:last-child button').addEventListener('click', removeTask)
    //task.querySelector('button').addEventListener('click', removeTask)
    divItem.querySelector('.delete-btn').addEventListener('click', removeTask)
    divItem.querySelector('.complete-btn').addEventListener('click', checkTask)
}

const listRemake = function(){
    ul.innerHTML = ''
    toDoList.forEach((element, index) =>{
        element.dataset.id = index;
        ul.appendChild(element);
    })
    taskNumber.textContent = toDoList.length;
}

function search(e){
    // const txt = e.target.value;
    const txt = searchInput.value;
    //console.log(txt);
    const filteredTask = toDoList.filter(task=> task.textContent.includes(txt));
    const unFilteredTask = toDoList.filter(task=> !task.textContent.includes(txt));

    ul.innerHTML = '';
    filteredTask.forEach(filteredTask => {
        filteredTask.classList.remove('unfiltered-task');
        ul.appendChild(filteredTask)
    });

    unFilteredTask.forEach(unFilteredTask => {
        unFilteredTask.classList.add('unfiltered-task');
        ul.appendChild(unFilteredTask);
    });
}

form.addEventListener('submit', addTask);
searchInput.addEventListener('input', search);