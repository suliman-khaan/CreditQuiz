let questions = [
    {
        id: 1,
        question: "What does your typical payday look like?",
        option: [
            {
                title: "I\’m able to pay my bills and have leftover for spending and saving",
                credit: 10
            },
            {
                title: "I’m able to pay all of my bills and have leftover for spending",
                credit: 20
            },
            {
                title: "I’m able to pay all of my bills",
                credit: 30
            },
            {
                title: "I’m able to pay most of my bills",
                credit: 40
            },
        ]
    },
    {
        id: 2,
        question: "Do you pay your bills on time?",
        option: [
            {
                title: "Always",
                credit: 10
            },
            {
                title: "Mostly",
                credit: 20
            },
            {
                title: "Ish",
                credit: 30
            },
            {
                title: "It\'s not unusual for me to be late",
                credit: 40
            },
        ]
    }
]

//varaibles
let quizContainer = document.querySelector("#quiz")
let resultContainer = document.querySelector("#result")
let error = document.querySelector("#error")
let answer = document.querySelector('.answer')
let q = document.querySelector("#question")
let questionNumber = document.querySelector("#q-no")
let progressBar = document.querySelector(".progress-bar")


var qNo = 1;
var count = 0;
var lengthOfQ = questions.length;
var perQwidth = (100 / lengthOfQ);
var points = 0; //store user points



//When window load show all question at quiz section
window.onload = () => {
    show();
    progress();
}

//Making option active when clicked
var toggleActive = () => {
    let optionList = document.querySelectorAll(".answer ul li")
    optionList.forEach(element => {
        element.addEventListener('click', () => {
            optionList.forEach(e => {
                if (e.classList.contains('active')) {
                    e.classList.remove('active')
                }
                if (e.ariaSelected) {
                    e.ariaSelected = false
                }
            })
            element.classList.add('active');
            element.ariaSelected = true
        })
    });
}
var progress = () => {
    //set progress to 0
    progressBar.style.width = 0;
    progressBar.ariaValueNow = 0;

    //Updating Question NO & Progress width and value
    questionNumber.innerHTML = `${qNo}/${lengthOfQ}`;
    progressBar.ariaValueNow = perQwidth * qNo;
    progressBar.style.width = `${perQwidth * qNo}%`

}

//next function
var next = () => {
    let ans = document.querySelector(".answer ul li.active")
    if (!ans) {
        error.style.display = "block"
    } else {
        error.style.display = 'none'
    }

    points += ans.value
    if (qNo == lengthOfQ) {
        result(points)
        quizContainer.style.display = 'none'
        resultContainer.style.display = 'flex'
        return;
    }
    count++
    qNo++;
    show(count)
    progress()
}

//show question
var show = (count = 0) => {
    q.innerHTML = questions[count].question;
    var options = questions[count].option;
    answer.innerHTML = `
        <ul class="list-group">
            <li class="list-group-item" aria-selected="false" value="${options[0].credit}">${options[0].title}</li>
            <li class="list-group-item" aria-selected="false" value="${options[1].credit}">${options[1].title}</li>
            <li class="list-group-item" aria-selected="false" value="${options[2].credit}">${options[2].title}</li>
            <li class="list-group-item" aria-selected="false" value="${options[3].credit}">${options[3].title}</li>
        </ul>
        `
    toggleActive()
}

var result = (points) => {
    console.log("Your score:", points)

    var resultImg = document.querySelector("#result img")
    var resultTitle = document.querySelector("#resultTitle")
    var resultDesc = document.querySelector("#resultDesc")

    //used to show result according to the points
    switch (points) {
        case 10 * lengthOfQ:
            resultImg.src = "https://proptionary.com/wp-content/uploads/2022/04/Group-827.svg"
            resultTitle.innerHTML = `Ouch - time to take some 
            steps to get that credit back 
            in tip-top shape!`
            resultDesc.innerHTML = `It’s okay, time and hard work heal all things.  With some 
            planning and discipline, you’ll be getting your credit 
            score back in shape in no time.  But it’s time to start
            changing your habits - check out our resources to see
            how you can start today!`
            break
        case 20 * lengthOfQ:
            resultImg.src = "https://proptionary.com/wp-content/uploads/2022/04/Group-823.svg";
            resultTitle.innerHTML = `You’re a bit below average - 
            but it won’t take you long to 
            make your comeback`
            resultDesc.innerHTML = `It’s okay, time and hard work heal all things.  With some 
            planning and discipline, you’ll be getting your credit 
            score back in shape in no time.  But it’s time to start
            changing your habits - check out our resources to see
            how you can start today!`
            break;
        case 30 * lengthOfQ:
            resultImg.src = "https://proptionary.com/wp-content/uploads/2022/04/Group-825.svg"
            resultTitle.innerHTML = `You’re in average health - 
            not bad!`
            resultDesc.innerHTML = `Hey, keep up the good work!  You’re well on your way 
            to exemplary status in terms of your credit health.  
            Continue to make solid debt payments and make 
            all your debt payments on time.  Otherwise, sit back 
            and let Father Time continue to bump you up! `
            break;
        case 40 * lengthOfQ:
            resultImg.src = "https://proptionary.com/wp-content/uploads/2022/04/Group-826.svg"
            resultTitle.innerHTML = `You are the picture of
                credit health!`
            resultDesc.innerHTML = `Well CHECK YOU OUT!  So far, so good in your credit 
                journey.  You seem to have the gist of it - but just remember, 
                things can go south quickly so make sure you’re making
                all of your payments on time and keeping that debt to income
                ratio at bay.   Well done! `
            break
        default:
            resultImg.src = "https://proptionary.com/wp-content/uploads/2022/04/Group-827.svg"
            resultTitle.innerHTML = `You’re a bit below average - 
            but it won’t take you long to 
            make your comeback`
            resultDesc.innerHTML = `It’s okay, time and hard work heal all things.  With some 
            planning and discipline, you’ll be getting your credit 
            score back in shape in no time.  But it’s time to start
            changing your habits - check out our resources to see
            how you can start today!`
    }
    fetch('test.php', {
        method: 'POST',
        body: JSON.stringify({
            value: points
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(res => res.json())
        .then((result) => {
            if (result.insert == 'success') {
                console.log("Data add")
            } else {
                console.log("Data insertion failed")
            }
        }).catch(err => console.error(err))
}