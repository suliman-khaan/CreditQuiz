let questions =[
   {
       id:1,
       question:"What does your typical payday look like?",
       option:[
           {
            title:"I\’m able to pay my bills and have leftover for spending and saving",
            credit:10
           },
           {
            title:"I’m able to pay all of my bills and have leftover for spending",
            credit:20
           },
           {
            title:"I’m able to pay all of my bills",
            credit:30
           },
           {
            title:"I’m able to pay most of my bills",
            credit:40
           },
       ]
   },
   {
    id:2,
    question:"Do you pay your bills on time?",
    option:[
        {
         title:"Always",
         credit:10
        },
        {
         title:"Mostly",
         credit:20
        },
        {
         title:"Ish",
         credit:30
        },
        {
         title:"It\'s not unusual for me to be late",
         credit:40
        },
    ]
}
]

//varaibles
let answer = document.querySelector('.answer')
let q = document.querySelector("#question")
let questionNumber = document.querySelector("#q-no")
let progressBar = document.querySelector(".progress-bar")


var qNo = 1;
var count= 0;
var lengthOfQ = questions.length;
var perQwidth = (100/lengthOfQ);



//When window load show all question at quiz section
window.onload=()=>{
    show();
    progress();
}

//Making option active when clicked
var toggleActive = ()=>{
    let optionList = document.querySelectorAll(".answer ul li")
    optionList.forEach(element => {
        element.addEventListener('click',()=>{
            optionList.forEach(e=>{
                if(e.classList.contains('active')){
                    e.classList.remove('active')
                }
            })
            element.classList.add('active');
        })
    });
}
var progress = () =>{
    //set progress to 0
    progressBar.style.width= 0;
    progressBar.ariaValueNow = 0;
    
    //Updating Question NO & Progress width and value
    questionNumber.innerHTML = `${qNo}/${lengthOfQ}`;
    progressBar.ariaValueNow = perQwidth*qNo;
    progressBar.style.width= `${perQwidth*qNo}%`
    
}
//next function
var next = ()=>{
    if(qNo==lengthOfQ){
        return false;
    }
    count++
    qNo++;
    show(count)
    progress()
}

//show question
var show = (count=0)=>{
    q.innerHTML = questions[count].question;
    var options = questions[count].option;
        answer.innerHTML = `
        <ul class="list-group">
            <li class="list-group-item" value="${options[0].credit}">${options[0].title}</li>
            <li class="list-group-item" value="${options[1].credit}">${options[1].title}</li>
            <li class="list-group-item" value="${options[2].credit}">${options[2].title}</li>
            <li class="list-group-item" value="${options[3].credit}">${options[3].title}</li>
        </ul>
        `
    toggleActive()
}