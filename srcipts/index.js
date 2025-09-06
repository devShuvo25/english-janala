const manageSpiner = (status) => {
  const spiner = document.getElementById('spiner');
  const content = document.getElementById('word-card-container');
  if(status === true){
    spiner.classList.remove('hidden');
    content.classList.add('hidden');
  }
  else{
        spiner.classList.add('hidden');
    content.classList.remove('hidden');
  }
}
const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all') //promise of res
    .then((res) => res.json()) //promise of json data
    .then((json) => {
        displayLesson(json.data)
    })
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
    <button  onclick="loadWords(${lesson.level_no})"
     id="btn-lesson-${lesson.level_no}"  class=" btn btn-outline btn-primary lesson">
     <i class="fa-solid fa-circle-question "></i> Lesson-${lesson.level_no}</button>
    `;
     //   2-> append */
     lebelContainer.append(btnDiv);
  });
  manageSpiner(false);
}
const loadWords = (id) => {
  manageSpiner(true);
const url = `https://openapi.programming-hero.com/api/level/${id}`;
fetch(url)
.then((res) => res.json()) //promise of res
.then((data) => {
    const btnActive = document.getElementById(`btn-lesson-${id}`);
    activeClass();
    btnActive.classList.add('active');
    displayWords(data.data)
})
}
const activeClass = () => {
    const btnLessons = document.querySelectorAll('.lesson');
    btnLessons.forEach(btnLesson => {
        btnLesson.classList.remove('active');
    });
}
const loadDetails= (id) => {
const urlDetail = `https://openapi.programming-hero.com/api/word/${id}`
fetch(urlDetail)
.then((res) => res.json())
.then((detail) => {
    disDtl(detail.data)
} );
}
const disDtl = (detailData) => {
    const modal = document.getElementById('my_modal_5');
    modal.innerHTML = ''
    const modalDetails = document.createElement('div');
   const syns = detailData.synonyms;
   const synHtml = (syns.map(syn => `<span class="btn bg-[#def2f9] rounded-md  border-[1px] border-gray-300 me-2">${syn}</span>`)).join(' ');
    modalDetails.innerHTML = `
      <div class="bg-white w-[530px] h-[350px] p-8 rounded-lg">
    <h1 class="text-2xl font-bold mb-3">${detailData.word}</h1>
  <div class="mb-3">
    <p class="text-[16px] font-semibold">Meaning</p>
    <p class="font-style-for-bangla">${detailData.meaning}</p>
  </div>
  <div class="mb-3">
    <p class="text-[16px] font-semibold">Example</p>
    <p class="font-style-for-bangla">${detailData.sentence}</p>
  </div>
  <div class="mb-3">
    <p class="mb-2">সমার্থক শব্দগুলো</p>
    <div>${synHtml}</div>
  </div>
  <div class=" flex ">
    <form method="dialog">
      <button class="btn px-8 bg-[#422AD5] text-white mt-4">Ok</button>
    </form>
  </div>
  </div>`
  modal.append(modalDetails);
}
const  displayWords = async (words) => {
  await new Promise(resolve => setTimeout(resolve, 500));
    const wordCardContainer = document.getElementById('word-card-container');
    wordCardContainer.classList.add('grid','h-[300px]','lg:h-[400px]');
    wordCardContainer.innerText = '';
    const card = document.createElement('div');
    if(words.length !== 0){
            words.forEach(word => {
        const card = document.createElement('div');
            card.classList.add('w-[100%]')
             card.innerHTML = `<div class="lg:px-5 w-[100%] bg-white rounded-[4px] space-x-2 p-4 bg-base-100  shadow-sm">
            <div class="text-center p-3">
            <h4 class="font-bold text-[18px] ">${word.word}</h4>
            <p class="text-[8px] my-2 text-gray-600">${word.pronunciation}.</p>
            <p class="text-gray-600 font-semibold text-[14px]">${word.meaning}</p>
            </div>
            <div class="flex justify-between ">
                <i onclick="my_modal_5.showModal(); loadDetails(${word.id})" id="level-${word.level}" class=" cursor-pointer fa-solid fa-circle-info bg-[#9cddf4] p-1.5 text-[12px] rounded-[4px]"></i>
                <i onclick="showModal()" class="cursor-pointer  fa-solid fa-volume-high bg-[rgb(156,221,244)] p-1.5 text-[12px] rounded-[4px]"></i>
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
        </div>`
        wordCardContainer.append(card);
      }
      manageSpiner(false);
}
let name = 'SHUVO';
console.log(name.toLowerCase())
// search implementations

document.getElementById('btn-search').addEventListener('click', () => {
  const input = document.getElementById('input-search');
  const inputValue = input.value.trim().toLowerCase();
  fetch('https://openapi.programming-hero.com/api/words/all')
  .then((res) => res.json())
  .then((data) => loadSearchData(data.data))
const loadSearchData = (data) =>{
  data.forEach(everyData => {
    if(everyData.word.toLowerCase() === inputValue){
      console.log(everyData)
      const wordCardContainer = document.getElementById('word-card-container');
      wordCardContainer.classList.remove('grid','h-[300px]','lg:h-[400px]');
    wordCardContainer.innerText = '';
      const card = document.createElement('div');
            card.classList.add('w-[100%]','lg:w-[50%]','mx-auto','p-4')
             card.innerHTML = `<div class="lg:px-5 w-[100%] p-4 bg-white rounded-[4px] space-x-2">
            <div class="text-center p-3">
            <h4 class="font-bold text-[18px] ">${everyData.word}</h4>
            <p class="text-[8px] my-2 text-gray-600">
            ${everyData.pronunciation}
            </p>
            <p class="text-gray-600 font-semibold text-[14px]">${everyData.meaning}</p>
            </div>
            <div class="flex justify-between ">
                <i onclick="my_modal_5.showModal(); loadDetails()" id="level-" class=" cursor-pointer fa-solid fa-circle-info bg-[#9cddf4] p-1.5 text-[12px] rounded-[4px]"></i>
                <i onclick="showModal()" class="cursor-pointer  fa-solid fa-volume-high bg-[rgb(156,221,244)] p-1.5 text-[12px] rounded-[4px]"></i>
            </div>
        </div>`
        wordCardContainer.append(card);

    }
    else{

    }
    
    
  });

}
})

