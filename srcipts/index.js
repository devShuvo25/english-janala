

const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all') //promise of res
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data))
}
loadData();
const displayLesson = (lessons) => {
// 1-> get the container and emty
const lebelContainer = document.getElementById('level-container');
lebelContainer.innerText = '';
  // 2-> get into every lessons
  lessons.forEach(lesson => {
       //     1-> create element
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
    <button onclick="loadWords(${lesson.level_no})" class=" btn btn-outline btn-primary"><i class="fa-solid fa-circle-question"></i> Lesson-${lesson.level_no}</button>
    `;
     //   2-> append */
     lebelContainer.append(btnDiv);
  });
}
const loadWords = (id) => {
const url = `https://openapi.programming-hero.com/api/level/${id}`;
fetch(url)
.then((res) => res.json()) //promise of res
.then((data) => displayWords(data.data))
}

const displayWords = (words) => {
    const wordCardContainer = document.getElementById('word-card-container');
    wordCardContainer.innerText = '';
    const card = document.createElement('div');
    if(words.length !== 0){
            words.forEach(word => {
        const card = document.createElement('div');
            card.classList.add('w-[100%]')
             card.innerHTML = `<div class="lg:m-5 lg:px-5 w-[100%] bg-white rounded-[4px] p-5 space-y-3 space-x-2">
            <div class="text-center p-3">
            <h4 class="font-bold text-[18px] ">${word.word}</h4>
            <p class="text-[8px] my-2 text-gray-600">${word.pronunciation}.</p>
            <p class="text-gray-600 font-semibold text-[14px]">${word.meaning}</p>
            </div>
            <div class="flex justify-between ">
                <i class="fa-solid fa-circle-info bg-[#9cddf4] p-1.5 text-[12px] rounded-[4px]"></i>
                <i class="fa-solid fa-volume-high bg-[#9cddf4] p-1.5 text-[12px] rounded-[4px]"></i>
            </div>
        </div>`
        wordCardContainer.append(card); 
    });
        
    }
    else{
        wordCardContainer.classList.remove('h-[400px]');
        card.classList.add('col-span-4');
        card.innerHTML = `
                <div class="text-center col-span-4 p-5">
                <i class="fa-solid fa-triangle-exclamation text-[30px]"></i>
        <p class="text-[10px] text-gray-500 my-3">এই Lesson এ কোনো Vocabullery যুক্ত করা হয়নি</p>
        <h3 class="text-lg font-bold">পরবর্তী Lesson এ যান</h3>
        </div>
        `
        wordCardContainer.append(card);
    }



}
